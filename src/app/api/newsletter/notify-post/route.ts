import { getSupabaseAdmin } from "@/lib/supabase/server";
import { buildNewPostHtml, isEmailConfigured, sendBulkEmails } from "@/lib/email";
import { baseURL, person } from "@/resources";
import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET || process.env.NEWSLETTER_CRON_SECRET;

function isAuthorized(request: Request): boolean {
  if (!CRON_SECRET) return false;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const headerSecret = request.headers.get("x-cron-secret");
  return bearer === CRON_SECRET || headerSecret === CRON_SECRET;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { title?: string; url?: string; slug?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body. Use { title, url } or { slug }." },
      { status: 400 }
    );
  }

  const postUrl = body.url || (body.slug ? `${baseURL}/blog/${body.slug}` : null);
  const postTitle = body.title || "New blog post";

  if (!postUrl) {
    return NextResponse.json(
      { error: "Provide post url or slug in body." },
      { status: 400 }
    );
  }

  if (!isEmailConfigured()) {
    return NextResponse.json(
      { error: "Email not configured (RESEND_API_KEY)." },
      { status: 503 }
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Database not configured (SUPABASE_SERVICE_ROLE_KEY)." },
      { status: 503 }
    );
  }

  const { data: subscribers, error } = await supabase
    .from("subscriptions")
    .select("email");

  if (error || !subscribers?.length) {
    return NextResponse.json(
      { sent: 0, message: error ? "Database error" : "No subscribers." },
      { status: 200 }
    );
  }

  // Make sure TypeScript knows that 'subscribers' is an array of { email: string | null }
  type Subscriber = { email: string | null };
  const typedSubscribers = subscribers as Subscriber[];

  const emails = typedSubscribers.map((s) => s.email).filter((email): email is string => Boolean(email));
  const subject = `New post: ${postTitle} – ${person.name}`;
  const html = buildNewPostHtml(postTitle, postUrl);

  const result = await sendBulkEmails(emails, subject, html);
  return NextResponse.json({
    success: result.success,
    sent: result.sent,
    total: result.total,
  });
}

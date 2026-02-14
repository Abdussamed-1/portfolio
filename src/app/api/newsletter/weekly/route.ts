import { getSupabaseAdmin } from "@/lib/supabase/server";
import { buildWeeklyDigestHtml, isEmailConfigured, sendBulkEmails } from "@/lib/email";
import { person } from "@/resources";
import { NextResponse } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET || process.env.NEWSLETTER_CRON_SECRET;

function isAuthorized(request: Request): boolean {
  if (!CRON_SECRET) return false;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const cookieSecret = request.headers.get("x-cron-secret");
  return bearer === CRON_SECRET || cookieSecret === CRON_SECRET;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  // Explicitly type subscribers as an array of objects with an email property to fix the lint error
  const emails = (subscribers as { email: string }[])
    .map((s) => s.email)
    .filter(Boolean);

  const subject = `Weekly update from ${person.name}`;
  const html = buildWeeklyDigestHtml();

  const result = await sendBulkEmails(emails, subject, html);
  return NextResponse.json({
    success: result.success,
    sent: result.sent,
    total: result.total,
  });
}

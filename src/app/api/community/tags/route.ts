import { NextRequest, NextResponse } from "next/server";
import {
  authNotConfiguredResponse,
  getClerkUserId,
  unauthorizedResponse,
} from "@/lib/community/auth";
import { getTagPrefs, upsertTagPrefs } from "@/lib/community/db";
import { isClerkConfigured } from "@/lib/clerk/config";

export async function GET() {
  if (!isClerkConfigured()) return authNotConfiguredResponse();
  const userId = await getClerkUserId();
  if (!userId) return unauthorizedResponse();

  const tags = await getTagPrefs(userId);
  return NextResponse.json({ tags });
}

export async function PUT(request: NextRequest) {
  if (!isClerkConfigured()) return authNotConfiguredResponse();
  const userId = await getClerkUserId();
  if (!userId) return unauthorizedResponse();

  let payload: { tags?: string[] };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const tags = Array.isArray(payload.tags)
    ? payload.tags.filter((t): t is string => typeof t === "string").map((t) => t.trim()).filter(Boolean)
    : [];

  const saved = await upsertTagPrefs(userId, tags);
  if (!saved) {
    return NextResponse.json(
      { error: "db_unavailable", hint: "Run community migration and set Supabase env vars" },
      { status: 503 },
    );
  }

  return NextResponse.json({ tags: saved });
}

import { NextRequest, NextResponse } from "next/server";
import {
  authNotConfiguredResponse,
  getClerkUserId,
  unauthorizedResponse,
} from "@/lib/community/auth";
import { insertQuestion, listQuestions } from "@/lib/community/db";
import { isClerkConfigured } from "@/lib/clerk/config";

export async function GET() {
  const questions = await listQuestions();
  return NextResponse.json(
    { questions },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

export async function POST(request: NextRequest) {
  if (!isClerkConfigured()) return authNotConfiguredResponse();

  const userId = await getClerkUserId();
  if (!userId) return unauthorizedResponse();

  let payload: { title?: string; body?: string; tags?: string[] };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  const tags = Array.isArray(payload.tags)
    ? payload.tags.filter((t): t is string => typeof t === "string").map((t) => t.trim()).filter(Boolean)
    : [];

  if (!title || !body) {
    return NextResponse.json({ error: "title_and_body_required" }, { status: 400 });
  }

  const question = await insertQuestion({
    clerk_user_id: userId,
    title,
    body,
    tags,
  });

  if (!question) {
    return NextResponse.json(
      { error: "db_unavailable", hint: "Run community migration and set Supabase env vars" },
      { status: 503 },
    );
  }

  return NextResponse.json({ question }, { status: 201 });
}

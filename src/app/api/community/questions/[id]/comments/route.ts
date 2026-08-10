import { NextRequest, NextResponse } from "next/server";
import {
  authNotConfiguredResponse,
  getClerkUserId,
  unauthorizedResponse,
} from "@/lib/community/auth";
import { insertComment, listComments } from "@/lib/community/db";
import { isClerkConfigured } from "@/lib/clerk/config";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  const comments = await listComments(id);
  return NextResponse.json(
    { comments },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

export async function POST(request: NextRequest, { params }: Params) {
  if (!isClerkConfigured()) return authNotConfiguredResponse();

  const userId = await getClerkUserId();
  if (!userId) return unauthorizedResponse();

  const { id } = await params;
  let payload: { body?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  if (!body) {
    return NextResponse.json({ error: "body_required" }, { status: 400 });
  }

  const comment = await insertComment({
    question_id: id,
    clerk_user_id: userId,
    body,
  });

  if (!comment) {
    return NextResponse.json(
      { error: "db_unavailable", hint: "Run community migration and set Supabase env vars" },
      { status: 503 },
    );
  }

  return NextResponse.json({ comment }, { status: 201 });
}

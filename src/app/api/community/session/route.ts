import { NextResponse } from "next/server";
import { getClerkUserId } from "@/lib/community/auth";
import { isClerkConfigured } from "@/lib/clerk/config";

/** Lightweight probe for client UI (signed-in state). */
export async function GET() {
  if (!isClerkConfigured()) {
    return NextResponse.json({ configured: false, authenticated: false });
  }
  const userId = await getClerkUserId();
  return NextResponse.json({
    configured: true,
    authenticated: Boolean(userId),
  });
}

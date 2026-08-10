import { NextResponse } from "next/server";
import { isClerkConfigured } from "@/lib/clerk/config";

/** Returns Clerk userId when configured + signed in; otherwise null. */
export async function getClerkUserId(): Promise<string | null> {
  if (!isClerkConfigured()) return null;
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const session = await auth();
    return session.userId ?? null;
  } catch {
    return null;
  }
}

export function authNotConfiguredResponse() {
  return NextResponse.json({ error: "auth_not_configured" }, { status: 503 });
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "unauthorized" }, { status: 401 });
}

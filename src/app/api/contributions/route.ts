import { NextRequest } from "next/server";
import { getContributions } from "@/lib/contributions";
import { getSupabase } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const project = request.nextUrl.searchParams.get("project");
  const debug = request.nextUrl.searchParams.get("debug") === "1";

  if (!project) {
    return Response.json({ error: "Missing project query" }, { status: 400 });
  }

  const supabase = getSupabase();
  const list = await getContributions(project);

  if (debug) {
    return Response.json({
      ok: list.length > 0,
      count: list.length,
      project,
      supabaseConfigured: !!supabase,
      envUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? "set" : "missing",
      envKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "set" : "missing",
      data: list,
    });
  }

  return Response.json(list);
}

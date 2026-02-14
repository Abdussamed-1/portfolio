import { getSupabase } from "@/lib/supabase/server";
import type { Contribution } from "@/types/contributions";

export async function getContributions(projectSlug: string): Promise<Contribution[]> {
  const supabase = getSupabase();
  if (!supabase) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[getContributions] Supabase client is null. Check .env.local: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    }
    return [];
  }

  const { data, error } = await supabase
    .from("contributions")
    .select("id, project_slug, name, role, avatar_url, order_index, created_at")
    .eq("project_slug", projectSlug)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("[getContributions] Supabase error:", error.message, { projectSlug, code: error.code });
    return [];
  }
  return (data ?? []) as Contribution[];
}

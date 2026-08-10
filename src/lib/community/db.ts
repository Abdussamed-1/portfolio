import { getSupabase, getSupabaseAdmin } from "@/lib/supabase/server";

export type CommunityQuestionRow = {
  id: string;
  clerk_user_id: string;
  title: string;
  body: string;
  tags: string[];
  created_at: string;
};

export type CommunityCommentRow = {
  id: string;
  question_id: string;
  clerk_user_id: string;
  body: string;
  created_at: string;
};

export async function listQuestions(): Promise<CommunityQuestionRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("community_questions")
    .select("id, clerk_user_id, title, body, tags, created_at")
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) {
    console.error("community_questions list:", error.message);
    return [];
  }
  return (data ?? []) as CommunityQuestionRow[];
}

export async function insertQuestion(input: {
  clerk_user_id: string;
  title: string;
  body: string;
  tags: string[];
}): Promise<CommunityQuestionRow | null> {
  const supabase = getSupabaseAdmin() ?? getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("community_questions")
    .insert({
      clerk_user_id: input.clerk_user_id,
      title: input.title,
      body: input.body,
      tags: input.tags,
    })
    .select("id, clerk_user_id, title, body, tags, created_at")
    .single();
  if (error) {
    console.error("community_questions insert:", error.message);
    return null;
  }
  return data as CommunityQuestionRow;
}

export async function listComments(questionId: string): Promise<CommunityCommentRow[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("community_comments")
    .select("id, question_id, clerk_user_id, body, created_at")
    .eq("question_id", questionId)
    .order("created_at", { ascending: true })
    .limit(100);
  if (error) {
    console.error("community_comments list:", error.message);
    return [];
  }
  return (data ?? []) as CommunityCommentRow[];
}

export async function insertComment(input: {
  question_id: string;
  clerk_user_id: string;
  body: string;
}): Promise<CommunityCommentRow | null> {
  const supabase = getSupabaseAdmin() ?? getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("community_comments")
    .insert({
      question_id: input.question_id,
      clerk_user_id: input.clerk_user_id,
      body: input.body,
    })
    .select("id, question_id, clerk_user_id, body, created_at")
    .single();
  if (error) {
    console.error("community_comments insert:", error.message);
    return null;
  }
  return data as CommunityCommentRow;
}

export async function getTagPrefs(clerkUserId: string): Promise<string[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("community_tag_prefs")
    .select("tags")
    .eq("clerk_user_id", clerkUserId)
    .maybeSingle();
  if (error) {
    console.error("community_tag_prefs get:", error.message);
    return [];
  }
  return (data?.tags as string[] | undefined) ?? [];
}

export async function upsertTagPrefs(clerkUserId: string, tags: string[]): Promise<string[] | null> {
  const supabase = getSupabaseAdmin() ?? getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("community_tag_prefs")
    .upsert(
      { clerk_user_id: clerkUserId, tags, updated_at: new Date().toISOString() },
      { onConflict: "clerk_user_id" },
    )
    .select("tags")
    .single();
  if (error) {
    console.error("community_tag_prefs upsert:", error.message);
    return null;
  }
  return (data?.tags as string[]) ?? tags;
}

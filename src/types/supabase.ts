export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

/** Supabase client GenericSchema uyumu için Views ve Functions zorunlu; tablolarda Relationships gerekli. */
export interface Database {
  public: {
    Tables: {
      contributions: {
        Row: {
          id: string;
          project_slug: string;
          name: string;
          role: string | null;
          avatar_url: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          project_slug: string;
          name: string;
          role?: string | null;
          avatar_url: string;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          project_slug?: string;
          name?: string;
          role?: string | null;
          avatar_url?: string;
          order_index?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      subscriptions: {
        Row: {
          id: string;
          email: string;
          subscribed_at: string;
          source: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          subscribed_at?: string;
          source?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          subscribed_at?: string;
          source?: string | null;
        };
        Relationships: [];
      };
      community_questions: {
        Row: {
          id: string;
          clerk_user_id: string;
          title: string;
          body: string;
          tags: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          clerk_user_id: string;
          title: string;
          body: string;
          tags?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          clerk_user_id?: string;
          title?: string;
          body?: string;
          tags?: string[];
          created_at?: string;
        };
        Relationships: [];
      };
      community_comments: {
        Row: {
          id: string;
          question_id: string;
          clerk_user_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          question_id: string;
          clerk_user_id: string;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          question_id?: string;
          clerk_user_id?: string;
          body?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      community_tag_prefs: {
        Row: {
          clerk_user_id: string;
          tags: string[];
          updated_at: string;
        };
        Insert: {
          clerk_user_id: string;
          tags?: string[];
          updated_at?: string;
        };
        Update: {
          clerk_user_id?: string;
          tags?: string[];
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

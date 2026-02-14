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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

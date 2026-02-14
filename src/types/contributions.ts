export type Contribution = {
  id: string;
  project_slug: string;
  name: string;
  role: string | null;
  avatar_url: string;
  order_index: number;
  created_at: string;
};

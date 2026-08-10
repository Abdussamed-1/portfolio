export type StackOverflowItem = {
  id: string;
  title: string;
  link: string;
  author: string;
  authorUrl?: string;
  tags: string[];
  votes: number;
  published: string;
  updated: string;
  summary: string;
};

export type StackOverflowFeedResponse = {
  items: StackOverflowItem[];
  updated?: string;
  title?: string;
};

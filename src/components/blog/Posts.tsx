import { getPosts } from "@/utils/utils";
import { getLocalizedMetadata, shouldShowPostInLocale } from "@/lib/blog-translations";
import type { Locale } from "@/resources/translations";
import { Grid } from "@once-ui-system/core";
import Post from "./Post";

interface PostsProps {
  range?: [number] | [number, number];
  columns?: "1" | "2" | "3";
  thumbnail?: boolean;
  direction?: "row" | "column";
  exclude?: string[];
  locale?: Locale;
}

export function Posts({
  range,
  columns = "1",
  thumbnail = false,
  exclude = [],
  direction,
  locale,
}: PostsProps) {
  let allBlogs = getPosts(["src", "app", "blog", "posts"]);

  // Exclude by slug (exact match)
  if (exclude.length) {
    allBlogs = allBlogs.filter((post) => !exclude.includes(post.slug));
  }

  // For translated pairs, show only the post that matches the current locale
  if (locale) {
    allBlogs = allBlogs.filter((post) => shouldShowPostInLocale(post.slug, locale));
  }

  const sortedBlogs = allBlogs.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedBlogs = range
    ? sortedBlogs.slice(range[0] - 1, range.length === 2 ? range[1] : sortedBlogs.length)
    : sortedBlogs;

  const postsToRender =
    locale ?
      displayedBlogs.map((post) => ({
        ...post,
        metadata: { ...post.metadata, ...getLocalizedMetadata(post.metadata, locale) },
      }))
      : displayedBlogs;

  return (
    <>
      {postsToRender.length > 0 && (
        <Grid columns={columns} s={{ columns: 1 }} fillWidth marginBottom="40" gap="16">
          {postsToRender.map((post) => (
            <Post key={post.slug} post={post} thumbnail={thumbnail} direction={direction} />
          ))}
        </Grid>
      )}
    </>
  );
}

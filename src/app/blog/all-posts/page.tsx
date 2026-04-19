import { cookies } from "next/headers";
import { Column, Heading, Meta, Schema, SmartLink, Text } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { shouldShowPostInLocale } from "@/lib/blog-translations";
import { baseURL, blog, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import type { Locale } from "@/resources/translations";

const EXCLUDED_POST_SLUGS = [
  "quick-start",
  "components",
  "work",
  "content",
  "styling",
  "seo",
  "password",
  "pages",
  "mailchimp",
  "localization",
  "blog",
];

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";
  const title = locale === "tr" ? "Tum Yazilar" : "All Posts";
  const description =
    locale === "tr"
      ? "Tum blog yazilarinin tarih sirasinda listelendigi sayfa."
      : "Page listing all blog posts in chronological order.";

  return Meta.generate({
    title,
    description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: `${blog.path}/all-posts`,
  });
}

export default async function AllPostsPage() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";
  const allPosts = getPosts(["src", "app", "blog", "posts"]).filter(
    (p) => !EXCLUDED_POST_SLUGS.includes(p.slug) && shouldShowPostInLocale(p.slug, locale)
  );

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={locale === "tr" ? "Tum Yazilar" : "All Posts"}
        description={locale === "tr" ? "Tum yazilarin listesi." : "List of all posts."}
        path={`${blog.path}/all-posts`}
        image={`/api/og/generate?title=${encodeURIComponent(locale === "tr" ? "Tum Yazilar" : "All Posts")}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Heading marginBottom="8" variant="heading-strong-xl" marginLeft="24">
        {locale === "tr" ? "Tum Yazilar" : "All Posts"}
      </Heading>
      <Text onBackground="neutral-weak" marginLeft="24" marginBottom="24">
        {locale === "tr"
          ? `Toplam ${allPosts.length} yazi, en yeniden en eskiye listeleniyor.`
          : `${allPosts.length} posts listed from newest to oldest.`}
      </Text>

      <Posts columns="1" thumbnail direction="row" exclude={EXCLUDED_POST_SLUGS} locale={locale} />

      <Column marginLeft="24">
        <SmartLink href={blog.path}>
          <Text variant="label-strong-m">
            {locale === "tr" ? "Blog ana sayfasina don" : "Back to blog home"}
          </Text>
        </SmartLink>
      </Column>
    </Column>
  );
}

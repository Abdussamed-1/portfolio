import { cookies } from "next/headers";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { shouldShowPostInLocale } from "@/lib/blog-translations";
import { baseURL, person, newsletter, getContent } from "@/resources";
import { getPosts } from "@/utils/utils";
import { stringsByLocale } from "@/resources/translations";
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
  const { blog } = getContent(locale);
  const canonical = `${baseURL}${blog.path}`;
  const baseMeta = Meta.generate({
    title: blog.title,
    description: blog.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
    path: blog.path,
  });
  const ogLocale = locale === "tr" ? "tr_TR" : "en_US";
  return {
    ...baseMeta,
    openGraph: {
      ...baseMeta.openGraph,
      locale: ogLocale,
      alternateLocale: [locale === "tr" ? "en_US" : "tr_TR"],
    },
    alternates: {
      canonical,
      languages: { en: canonical, "x-default": canonical },
    },
  };
}

export default async function Blog() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";
  const { blog } = getContent(locale);
  const allPosts = getPosts(["src", "app", "blog", "posts"]).filter(
    (p) => !EXCLUDED_POST_SLUGS.includes(p.slug) && shouldShowPostInLocale(p.slug, locale)
  );
  const hasEarlierPosts = allPosts.length > 3;

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" marginLeft="24">
        {blog.title}
      </Heading>
      <Column fillWidth flex={1} gap="40">
        <Posts range={[1, 1]} thumbnail exclude={EXCLUDED_POST_SLUGS} locale={locale} />
        <Posts range={[2, 3]} columns="2" thumbnail direction="column" exclude={EXCLUDED_POST_SLUGS} locale={locale} />
        <Mailchimp marginBottom="l" />
        {hasEarlierPosts && (
          <>
            <Heading as="h2" variant="heading-strong-xl" marginLeft="l">
              {stringsByLocale[locale].earlierPosts}
            </Heading>
            <Posts range={[4]} columns="2" exclude={EXCLUDED_POST_SLUGS} locale={locale} />
          </>
        )}
      </Column>
    </Column>
  );
}

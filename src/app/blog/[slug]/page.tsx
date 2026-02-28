import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { CustomMDX, ScrollToHash } from "@/components";
import { stringsByLocale } from "@/resources/translations";
import type { Locale } from "@/resources/translations";
import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
} from "@once-ui-system/core";
import { getLocalizedMetadata, getContentLocaleForSlug, getTranslatedBlogSlug } from "@/lib/blog-translations";
import { baseURL, about, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { getPosts } from "@/utils/utils";
import { calculateReadingTime } from "@/utils/readingTime";
import { Metadata } from "next";
import React from "react";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";

  const posts = getPosts(["src", "app", "blog", "posts"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const contentLocale = getContentLocaleForSlug(slugPath) ?? locale;
  const meta = getLocalizedMetadata(post.metadata, contentLocale);
  const postUrl = `${baseURL}${blog.path}/${post.slug}`;
  const ogImage =
    post.metadata.image?.startsWith("http") ?
      post.metadata.image
      : post.metadata.image
        ? `${baseURL}${post.metadata.image.startsWith("/") ? "" : "/"}${post.metadata.image}`
        : `/api/og/generate?title=${encodeURIComponent(meta.title)}`;
  const baseMetadata = Meta.generate({
    title: meta.title,
    description: meta.summary,
    baseURL: baseURL,
    image: ogImage,
    path: `${blog.path}/${post.slug}`,
  });

  const ogLocale = contentLocale === "tr" ? "tr_TR" : "en_US";
  const alternateLocale = contentLocale === "tr" ? "en_US" : "tr_TR";

  return {
    ...baseMetadata,
    openGraph: {
      ...baseMetadata.openGraph,
      locale: ogLocale,
      alternateLocale: [alternateLocale],
    },
    keywords: [
      meta.title,
      meta.tag,
      contentLocale === "en" ? "blog" : "yazılar",
      person.name,
    ].filter((x): x is string => typeof x === "string"),
    alternates: (() => {
      const enSlug = getTranslatedBlogSlug(slugPath, "en");
      const trSlug = getTranslatedBlogSlug(slugPath, "tr");
      const enUrl = enSlug ? `${baseURL}${blog.path}/${enSlug}` : postUrl;
      const trUrl = trSlug ? `${baseURL}${blog.path}/${trSlug}` : `${postUrl}?locale=tr`;
      return {
        canonical: postUrl,
        languages: { en: enUrl, tr: trUrl },
      };
    })(),
  };
}

export default async function Blog({ params }: { params: Promise<{ slug: string | string[] }> }) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";

  let post = getPosts(["src", "app", "blog", "posts"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const contentLocale = getContentLocaleForSlug(slugPath) ?? locale;
  const meta = getLocalizedMetadata(post.metadata, contentLocale);
  const avatars =
    post.metadata.team?.map((person) => ({
      src: person.avatar,
    })) || [];

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={meta.title}
            description={meta.summary}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.publishedAt}
            image={
              post.metadata.image
                ? post.metadata.image.startsWith("http")
                  ? post.metadata.image
                  : `${baseURL}${post.metadata.image.startsWith("/") ? "" : "/"}${post.metadata.image}`
                : `/api/og/generate?title=${encodeURIComponent(meta.title)}`
            }
            author={{
              name: person.name,
              url: `${baseURL}${about.path}`,
              image: `${baseURL}${person.avatar}`,
            }}
          />
          {/* BlogPosting with inLanguage for SEO (EN/TR content) */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: meta.title,
                description: meta.summary,
                inLanguage: contentLocale === "tr" ? "tr" : "en",
                url: `${baseURL}${blog.path}/${post.slug}`,
                datePublished: post.metadata.publishedAt,
                dateModified: post.metadata.publishedAt,
                image: post.metadata.image
                  ? (post.metadata.image.startsWith("http")
                      ? post.metadata.image
                      : `${baseURL}${post.metadata.image.startsWith("/") ? "" : "/"}${post.metadata.image}`)
                  : `${baseURL}/api/og/generate?title=${encodeURIComponent(meta.title)}`,
                author: {
                  "@type": "Person",
                  name: person.name,
                  url: `${baseURL}${about.path}`,
                  image: `${baseURL}${person.avatar}`,
                },
              }),
            }}
          />
          {/* Breadcrumbs JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                  {
                    "@type": "ListItem",
                    position: 1,
                    name: "Home",
                    item: baseURL,
                  },
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Blog",
                    item: `${baseURL}/blog`,
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: meta.title,
                    item: `${baseURL}/blog/${post.slug}`,
                  },
                ],
              }),
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            <Row gap="12" vertical="center" marginBottom="12">
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
              </Text>
              {post.content && (
                <>
                  <Text variant="body-default-xs" onBackground="neutral-weak">•</Text>
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {calculateReadingTime(post.content)} min read
                  </Text>
                </>
              )}
            </Row>
            <Heading variant="display-strong-m">{meta.title}</Heading>
            {meta.subtitle && (
              <Text 
                variant="body-default-l" 
                onBackground="neutral-weak" 
                align="center"
                style={{ fontStyle: 'italic' }}
              >
                {meta.subtitle}
              </Text>
            )}
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={person.avatar} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {person.name}
              </Text>
            </Row>
          </Row>
          {post.metadata.image && (
            <Media
              src={post.metadata.image}
              alt={meta.title}
              aspectRatio="16/9"
              priority
              unoptimized={!post.metadata.image.startsWith("http")}
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            {meta.intro != null && meta.link ? (
              <>
                <Text
                  variant="body-default-m"
                  onBackground="neutral-medium"
                  style={{ lineHeight: "175%" }}
                  marginTop="8"
                  marginBottom="12"
                >
                  {meta.intro}
                </Text>
                <SmartLink href={meta.link} suffixIcon="arrowUpRightFromSquare">
                  {meta.readMoreText ?? (locale === "tr" ? "Makalenin tamamını Medium'da oku" : "Read the full article on Medium")}
                </SmartLink>
              </>
            ) : (
              <CustomMDX source={post.content} />
            )}
          </Column>
          
          <ShareSection 
            title={meta.title} 
            url={`${baseURL}${blog.path}/${post.slug}`} 
          />

          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Text as="h2" id="recent-posts" variant="heading-strong-xl" marginBottom="24">
              {stringsByLocale[locale].recentPosts}
            </Text>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" locale={locale} />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
      <Column
        maxWidth={12}
        paddingLeft="40"
        fitHeight
        position="sticky"
        top="80"
        gap="16"
        m={{ hide: true }}
      >
        <HeadingNav fitHeight />
      </Column>
    </Row>
  );
}

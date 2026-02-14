import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Schema,
  AvatarGroup,
  Column,
  Heading,
  Media,
  Text,
  SmartLink,
  Row,
  Line,
} from "@once-ui-system/core";
import { baseURL, about, person, work, getProjectContent } from "@/resources";
import { stringsByLocale } from "@/resources/translations";
import type { Locale } from "@/resources/translations";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import { Projects } from "@/components/work/Projects";
import { getContributions } from "@/lib/contributions";
import { Metadata } from "next";

const SLUGS_WITH_RELATED_PROJECTS = ["machine-learning-with-ibm", "hi-kod-workshops"];
const SLUGS_WITH_CONTRIBUTORS = ["huaweict"];

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "work", "projects"]);
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

  const posts = getPosts(["src", "app", "work", "projects"]);
  let post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${post.metadata.title}`,
    path: `${work.path}/${post.slug}`,
  });
}

export default async function Project({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const routeParams = await params;
  const slugPath = Array.isArray(routeParams.slug)
    ? routeParams.slug.join("/")
    : routeParams.slug || "";

  let post = getPosts(["src", "app", "work", "projects"]).find((post) => post.slug === slugPath);

  if (!post) {
    notFound();
  }

  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";
  const strings = stringsByLocale[locale];
  const contentSource = getProjectContent(slugPath, locale) || post.content;

  const contributors =
    SLUGS_WITH_CONTRIBUTORS.includes(slugPath) ? await getContributions(slugPath) : [];

  const contributorAvatarsBySlug: Record<string, { src: string }[]> = {};
  for (const slug of SLUGS_WITH_CONTRIBUTORS) {
    const list = await getContributions(slug);
    contributorAvatarsBySlug[slug] = list.map((c) => ({ src: c.avatar_url }));
  }

  const coverAvatars =
    contributors.length > 0
      ? contributors.map((c) => ({ src: c.avatar_url }))
      : post.metadata.team?.map((person) => ({ src: person.avatar })) || [];

  return (
    <Column as="section" maxWidth="m" horizontal="center" gap="l">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${work.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.publishedAt}
        image={
          post.metadata.image || `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
        }
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column maxWidth="s" gap="16" horizontal="center" align="center">
        <SmartLink href="/work">
          <Text variant="label-strong-m">{strings.projectsLabel}</Text>
        </SmartLink>
        <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
          {post.metadata.publishedAt && formatDate(post.metadata.publishedAt)}
        </Text>
        <Heading variant="display-strong-m">{post.metadata.title}</Heading>
      </Column>
      {(coverAvatars.length > 0 || post.metadata.team) && (
        <Row marginBottom="32" horizontal="center">
          <Row gap="16" vertical="center">
            {coverAvatars.length > 0 && <AvatarGroup reverse avatars={coverAvatars} size="s" />}
            <Text variant="label-default-m" onBackground="brand-weak">
              {contributors.length > 0
                ? contributors.map((c, idx) => (
                    <span key={c.id}>
                      {idx > 0 && (
                        <Text as="span" onBackground="neutral-weak">
                          ,{" "}
                        </Text>
                      )}
                      {c.name}
                    </span>
                  ))
                : post.metadata.team?.map((member, idx) => (
                    <span key={idx}>
                      {idx > 0 && (
                        <Text as="span" onBackground="neutral-weak">
                          ,{" "}
                        </Text>
                      )}
                      <SmartLink href={member.linkedIn}>{member.name}</SmartLink>
                    </span>
                  ))}
            </Text>
          </Row>
        </Row>
      )}
      {post.metadata.images.length > 0 && (
        <Media priority aspectRatio="16 / 9" radius="m" alt="image" src={post.metadata.images[0]} />
      )}
      <Column style={{ margin: "auto" }} as="article" maxWidth="xs">
        <CustomMDX source={contentSource} />
      </Column>
      {contributors.length > 0 && (
        <Column fillWidth gap="16" horizontal="center" marginTop="40">
          <Line maxWidth="40" />
          <Heading as="h2" variant="heading-strong-xl" marginBottom="16">
            {strings.contributorsTitle}
          </Heading>
          <Row gap="24" wrap horizontal="center">
            {contributors.map((c) => (
              <Column key={c.id} gap="4" horizontal="center" align="center" style={{ maxWidth: 96 }}>
                <Media
                  src={c.avatar_url}
                  alt={c.name}
                  aspectRatio="1/1"
                  radius="full"
                  sizes="96px"
                  unoptimized
                />
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {c.name}
                </Text>
                {c.role && (
                  <Text variant="body-default-xs" onBackground="neutral-weak">
                    {c.role}
                  </Text>
                )}
              </Column>
            ))}
          </Row>
        </Column>
      )}
      {SLUGS_WITH_RELATED_PROJECTS.includes(slugPath) && (
        <Column fillWidth gap="40" horizontal="center" marginTop="40">
          <Line maxWidth="40" />
          <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
            {strings.relatedProjects}
          </Heading>
          <Projects
            exclude={[post.slug]}
            range={[2]}
            locale={locale}
            contributorAvatarsBySlug={contributorAvatarsBySlug}
          />
        </Column>
      )}
      <ScrollToHash />
    </Column>
  );
}

import { getPosts } from "@/utils/utils";
import { getProjectContent } from "@/resources";
import type { Locale } from "@/resources/translations";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  locale?: Locale;
  /** Contributor avatars from DB (e.g. huaweict), keyed by project slug */
  contributorAvatarsBySlug?: Record<string, { src: string }[]>;
}

export function Projects({
  range,
  exclude,
  locale = "en",
  contributorAvatarsBySlug = {},
}: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => {
        const content = getProjectContent(post.slug, locale) || post.content;
        return (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={content}
            avatars={
              contributorAvatarsBySlug[post.slug]?.length
                ? contributorAvatarsBySlug[post.slug]
                : post.metadata.team?.map((member) => ({ src: member.avatar })) || []
            }
            link={post.metadata.link || ""}
            locale={locale}
          />
        );
      })}
    </Column>
  );
}

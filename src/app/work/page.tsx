import { cookies } from "next/headers";
import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import type { Locale } from "@/resources/translations";
import { Projects } from "@/components/work/Projects";
import { getContributions } from "@/lib/contributions";

const SLUGS_WITH_CONTRIBUTORS = ["huaweict"];

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default async function Work() {
  const cookieStore = await cookies();
  const locale: Locale = cookieStore.get("locale")?.value === "tr" ? "tr" : "en";

  const contributorAvatarsBySlug: Record<string, { src: string }[]> = {};
  for (const slug of SLUGS_WITH_CONTRIBUTORS) {
    const list = await getContributions(slug);
    contributorAvatarsBySlug[slug] = list.map((c) => ({ src: c.avatar_url }));
  }

  return (
    <Column maxWidth="m" paddingTop="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading marginBottom="l" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>
      <Projects locale={locale} contributorAvatarsBySlug={contributorAvatarsBySlug} />
    </Column>
  );
}

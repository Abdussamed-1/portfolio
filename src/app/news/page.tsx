import { cookies } from "next/headers";
import { Column, Flex, Meta, Schema } from "@once-ui-system/core";
import TechNewsSection from "@/components/news/TechNewsSection";
import { baseURL, getContent, person } from "@/resources";
import type { Locale } from "@/resources/translations";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value === "tr" ? "tr" : "en") as Locale;
  const { gallery } = getContent(locale);
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default async function NewsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value === "tr" ? "tr" : "en") as Locale;
  const { gallery, techNewsTitle } = getContent(locale);

  return (
    <Flex maxWidth="l">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="xl">
        <TechNewsSection title={techNewsTitle} locale={locale} />
      </Column>
    </Flex>
  );
}

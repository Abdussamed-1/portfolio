import { cookies } from "next/headers";
import { Column, Flex, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import WeeklyFeed from "@/components/weekly/WeeklyFeed";
import CommunityPanel from "@/components/weekly/CommunityPanel";
import { baseURL, getContent, person } from "@/resources";
import { stringsByLocale } from "@/resources/translations";
import type { Locale } from "@/resources/translations";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value === "tr" ? "tr" : "en") as Locale;
  const { weekly } = getContent(locale);
  const canonical = `${baseURL}${weekly.path}`;
  return {
    ...Meta.generate({
      title: weekly.title,
      description: weekly.description,
      baseURL: baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(weekly.title)}`,
      path: weekly.path,
    }),
    alternates: { canonical, languages: { en: canonical, "x-default": canonical } },
  };
}

export default async function WeeklyPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value === "tr" ? "tr" : "en") as Locale;
  const { weekly } = getContent(locale);
  const t = stringsByLocale[locale];

  return (
    <Flex maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={weekly.title}
        description={weekly.description}
        path={weekly.path}
        image={`/api/og/generate?title=${encodeURIComponent(weekly.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${weekly.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Column fillWidth gap="l" paddingTop="24">
        <Column gap="8" paddingX="24">
          <Heading as="h1" variant="heading-strong-xl">
            {weekly.title}
          </Heading>
          <Text variant="body-default-m" onBackground="neutral-weak">
            {weekly.description}
          </Text>
        </Column>
        <WeeklyFeed
          locale={locale}
          labels={{
            searchPlaceholder: t.weeklySearchPlaceholder,
            clearTags: t.weeklyClearTags,
            votes: t.weeklyVotes,
            empty: t.weeklyEmpty,
            loading: t.weeklyLoading,
            by: t.weeklyBy,
          }}
        />
        <CommunityPanel
          locale={locale}
          labels={{
            title: t.weeklyCommunityTitle,
            askTitle: t.weeklyAskTitle,
            askBody: t.weeklyAskBody,
            askTags: t.weeklyAskTags,
            submit: t.weeklySubmit,
            signInPrompt: t.weeklySignInPrompt,
            signInCta: t.weeklySignInCta,
            empty: t.weeklyCommunityEmpty,
            authNotReady: t.weeklyAuthNotReady,
            loading: t.weeklyLoading,
            comments: t.weeklyComments,
            addComment: t.weeklyAddComment,
            commentPlaceholder: t.weeklyCommentPlaceholder,
          }}
        />
      </Column>
    </Flex>
  );
}

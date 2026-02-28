import type { Locale } from "@/resources/translations";

/**
 * Maps blog post slug to its translation in the other locale.
 * When user switches TR/EN in header on a post page, we navigate to the translated slug.
 */
export const BLOG_POST_TRANSLATIONS: Record<
  string,
  { en: string; tr: string }
> = {
  "kali-linux-network-security-post-quantum": {
    en: "kali-linux-network-security-post-quantum",
    tr: "kali-linux-ag-guvenlik-post-kuantum-tr",
  },
  "kali-linux-ag-guvenlik-post-kuantum-tr": {
    en: "kali-linux-network-security-post-quantum",
    tr: "kali-linux-ag-guvenlik-post-kuantum-tr",
  },
};

export function getTranslatedBlogSlug(
  slug: string,
  targetLocale: Locale
): string | null {
  const map = BLOG_POST_TRANSLATIONS[slug];
  if (!map) return null;
  return map[targetLocale] ?? null;
}

/**
 * Whether this post slug should be shown in the given locale (for blog listing).
 * Shows only the locale-matching version of translated pairs.
 */
export function shouldShowPostInLocale(slug: string, locale: Locale): boolean {
  const map = BLOG_POST_TRANSLATIONS[slug];
  if (!map) return true; // no translation pair → show in both
  return map[locale] === slug;
}

/**
 * For posts with dedicated EN/TR slugs (e.g. Kali), returns the content language of that URL.
 * For other posts (same URL, cookie-based language) returns null so caller uses cookie locale.
 */
export function getContentLocaleForSlug(slug: string): Locale | null {
  const map = BLOG_POST_TRANSLATIONS[slug];
  if (!map) return null;
  return map.en === slug ? "en" : "tr";
}

type MetadataWithLocales = {
  title: string;
  subtitle?: string;
  summary: string;
  tag?: string;
  link?: string;
  title_en?: string;
  title_tr?: string;
  summary_en?: string;
  summary_tr?: string;
  subtitle_en?: string;
  subtitle_tr?: string;
  tag_en?: string;
  tag_tr?: string;
  intro_en?: string;
  intro_tr?: string;
  readMore_en?: string;
  readMore_tr?: string;
};

/**
 * Resolve title, summary, subtitle, tag, intro, readMoreText from optional _en/_tr fields for display.
 */
export function getLocalizedMetadata(
  metadata: MetadataWithLocales,
  locale: Locale
): {
  title: string;
  summary: string;
  subtitle?: string;
  tag?: string;
  intro?: string;
  readMoreText?: string;
  link?: string;
} {
  const title =
    (locale === "tr" ? metadata.title_tr : metadata.title_en) ?? metadata.title;
  const summary =
    (locale === "tr" ? metadata.summary_tr : metadata.summary_en) ?? metadata.summary;
  const subtitle =
    (locale === "tr" ? metadata.subtitle_tr : metadata.subtitle_en) ?? metadata.subtitle;
  const tag =
    (locale === "tr" ? metadata.tag_tr : metadata.tag_en) ?? metadata.tag;
  const intro =
    (locale === "tr" ? metadata.intro_tr : metadata.intro_en) ?? undefined;
  const readMoreText =
    (locale === "tr" ? metadata.readMore_tr : metadata.readMore_en) ?? undefined;
  return { title, summary, subtitle, tag, intro, readMoreText, link: metadata.link };
}

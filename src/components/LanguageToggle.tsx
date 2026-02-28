"use client";

import { useEffect, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToggleButton, HoverCard, Tooltip } from "@once-ui-system/core";
import { useLocale, useSetLocale } from "@/contexts/LocaleContext";
import { getTranslatedBlogSlug } from "@/lib/blog-translations";
import type { Locale } from "@/resources/translations";
import styles from "./LanguageToggle.module.scss";

const LOCALE_COOKIE = "locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const LanguageToggle = () => {
  const locale = useLocale();
  const setLocale = useSetLocale();
  const pathname = usePathname() ?? "";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEn = locale === "en";

  const blogMatch = pathname.match(/^\/blog\/([^/]+)$/);
  const slug = blogMatch?.[1];
  const otherLocale: Locale = isEn ? "tr" : "en";
  const translatedSlug = slug ? getTranslatedBlogSlug(slug, otherLocale) : null;

  // Prefetch translated blog post so navigation feels instant when user clicks
  useEffect(() => {
    if (translatedSlug && translatedSlug !== slug) {
      router.prefetch(`/blog/${translatedSlug}`);
    }
  }, [router, slug, translatedSlug]);

  const handleToggle = () => {
    const newLocale: Locale = isEn ? "tr" : "en";

    document.cookie = `${LOCALE_COOKIE}=${newLocale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;

    if (translatedSlug && translatedSlug !== slug) {
      startTransition(() => {
        router.push(`/blog/${translatedSlug}`);
      });
    } else {
      setLocale(newLocale);
    }
  };

  const button = (
    <ToggleButton
      className={styles.roundButton}
      label={isEn ? "EN" : "TR"}
      size="s"
      variant="ghost"
      selected
      onClick={handleToggle}
      onMouseEnter={() => {
        if (translatedSlug && translatedSlug !== slug) {
          router.prefetch(`/blog/${translatedSlug}`);
        }
      }}
      aria-label={isEn ? "English – Switch to Turkish" : "Turkish – Switch to English"}
      aria-busy={isPending}
    />
  );

  return (
    <HoverCard
      trigger={button}
      placement="bottom"
      fade={0}
      scale={0.9}
      duration={200}
      offsetDistance="4"
    >
      <Tooltip label={isEn ? "Switch to TR" : "Switch to EN"} />
    </HoverCard>
  );
};

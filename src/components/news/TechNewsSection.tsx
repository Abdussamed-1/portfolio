"use client";

import { useEffect, useState } from "react";
import {
  Column,
  Flex,
  Heading,
  Icon,
  Row,
  Text,
} from "@once-ui-system/core";
import type { TechNewsItem } from "@/app/api/tech-news/route";
import styles from "./TechNewsSection.module.scss";

function formatDate(dateStr: string, locale: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return new Intl.DateTimeFormat(locale, { timeStyle: "short" }).format(date);
    if (diffDays === 1) return locale === "tr-TR" ? "Dün" : "Yesterday";
    if (diffDays < 7) return locale === "tr-TR" ? `${diffDays} gün önce` : `${diffDays} days ago`;
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(date);
  } catch {
    return "";
  }
}

type TechNewsSectionProps = { title: string; locale?: "en" | "tr" };

export default function TechNewsSection({ title, locale = "en" }: TechNewsSectionProps) {
  const [items, setItems] = useState<TechNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const dateLocale = locale === "tr" ? "tr-TR" : "en-GB";

  useEffect(() => {
    fetch("/api/tech-news")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items ?? []);
      })
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading && items.length === 0) {
    return (
      <Column fillWidth gap="m" marginBottom="xl">
        <Heading as="h2" variant="display-strong-xs">
          {title}
        </Heading>
        <Flex padding="l" background="surface" border="neutral-alpha-weak" radius="m">
          <Text onBackground="neutral-weak">…</Text>
        </Flex>
      </Column>
    );
  }

  if (items.length === 0) return null;

  return (
    <Column fillWidth gap="l" marginBottom="xl">
      <Heading as="h2" variant="display-strong-xs">
        {title}
      </Heading>
      <div className={styles.newsGrid}>
        {items.map((item, index) => (
          <a
            key={`${item.link}-${index}`}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.newsCard}
            style={{ textDecoration: "none" }}
          >
            <div className={styles.cardInner}>
              <div className={styles.imageWrap}>
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className={styles.cardImage}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = "block";
                    }}
                  />
                ) : null}
                <div className={styles.imagePlaceholder} aria-hidden style={{ display: item.image ? "none" : "block" }} />
                <span className={styles.sourceBadge}>{item.source}</span>
              </div>
              <Flex
                background="surface"
                padding="l"
                flex={1}
                fillWidth
              >
                <Column fillWidth gap="8" flex={1} minHeight="0">
                  <Text
                    as="h3"
                    variant="heading-default-m"
                    weight="strong"
                    onBackground="neutral-strong"
                    className={styles.cardTitle}
                  >
                    {item.title}
                  </Text>
                  {item.description && (
                    <Text
                      variant="body-default-s"
                      onBackground="neutral-weak"
                      className={styles.description}
                    >
                      {item.description}
                    </Text>
                  )}
                  <Row className={styles.footer} gap="8" vertical="center" wrap>
                    {item.pubDate && (
                      <Text variant="label-default-s" onBackground="neutral-weak">
                        {formatDate(item.pubDate, dateLocale)}
                      </Text>
                    )}
                    <Icon name="openLink" size="xs" onBackground="neutral-weak" style={{ marginLeft: "auto" }} />
                  </Row>
                </Column>
              </Flex>
            </div>
          </a>
        ))}
      </div>
    </Column>
  );
}

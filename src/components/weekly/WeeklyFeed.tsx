"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Column, Text } from "@once-ui-system/core";
import type { StackOverflowItem } from "@/types/stackoverflow";
import { PreferredTagSync } from "@/hooks/usePreferredTagSync";
import styles from "./WeeklyFeed.module.scss";

const STORAGE_KEY = "weekly:preferred-tags";

export const CURATED_TAGS = [
  "javascript",
  "typescript",
  "python",
  "react",
  "next.js",
  "node.js",
  "rust",
  "c#",
  "sql",
  "machine-learning",
];

function formatRelative(dateStr: string, locale: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffHours < 1) return locale === "tr-TR" ? "Az önce" : "Just now";
    if (diffHours < 24) return locale === "tr-TR" ? `${diffHours} saat önce` : `${diffHours}h ago`;
    if (diffDays < 7) return locale === "tr-TR" ? `${diffDays} gün önce` : `${diffDays}d ago`;
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(date);
  } catch {
    return "";
  }
}

function loadPreferredTags(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((t): t is string => typeof t === "string") : [];
  } catch {
    return [];
  }
}

function savePreferredTags(tags: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
  } catch {
    // ignore
  }
}

type WeeklyFeedProps = {
  locale?: "en" | "tr";
  labels: {
    searchPlaceholder: string;
    clearTags: string;
    votes: string;
    empty: string;
    loading: string;
    by: string;
  };
};

export default function WeeklyFeed({ locale = "en", labels }: WeeklyFeedProps) {
  const [items, setItems] = useState<StackOverflowItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const dateLocale = locale === "tr" ? "tr-TR" : "en-GB";

  useEffect(() => {
    const prefs = loadPreferredTags();
    setSelectedTags(prefs);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    savePreferredTags(selectedTags);
  }, [selectedTags, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    const controller = new AbortController();
    setLoading(true);
    const tagsQuery = selectedTags.length ? `?tags=${encodeURIComponent(selectedTags.join(","))}` : "";
    fetch(`/api/stackoverflow${tagsQuery}`, { cache: "force-cache", signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [selectedTags, hydrated]);

  const availableTags = useMemo(() => {
    const fromFeed = new Set<string>();
    for (const item of items) {
      for (const tag of item.tags) fromFeed.add(tag);
    }
    const merged = new Set([...CURATED_TAGS, ...fromFeed, ...selectedTags]);
    return Array.from(merged).sort((a, b) => a.localeCompare(b));
  }, [items, selectedTags]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.author.toLowerCase().includes(q),
    );
  }, [items, query]);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }, []);

  return (
    <Column fillWidth gap="m" className={styles.feed}>
      <PreferredTagSync
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        hydrated={hydrated}
      />
      <div className={styles.toolbar}>
        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.searchPlaceholder}
            aria-label={labels.searchPlaceholder}
          />
          {selectedTags.length > 0 && (
            <button type="button" className={styles.clearTags} onClick={() => setSelectedTags([])}>
              {labels.clearTags}
            </button>
          )}
        </div>
        <div className={styles.tagBar} role="group" aria-label="Tags">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={styles.tagChip}
              data-active={selectedTags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {loading && items.length === 0 ? (
        <Text onBackground="neutral-weak">{labels.loading}</Text>
      ) : filtered.length === 0 ? (
        <div className={styles.empty}>
          <Text onBackground="neutral-weak">{labels.empty}</Text>
        </div>
      ) : (
        <div className={styles.list}>
          {filtered.map((item) => (
            <article key={item.id} className={styles.item}>
              <div className={styles.votes}>
                <span className={styles.voteCount}>{item.votes}</span>
                <span className={styles.voteLabel}>{labels.votes}</span>
              </div>
              <div className={styles.body}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.title}
                >
                  {item.title}
                </a>
                {item.summary && <p className={styles.summary}>{item.summary}</p>}
                <div className={styles.meta}>
                  <div className={styles.itemTags}>
                    {item.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        className={styles.itemTag}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <span className={styles.metaText}>
                    {labels.by}{" "}
                    {item.authorUrl ? (
                      <a href={item.authorUrl} target="_blank" rel="noopener noreferrer">
                        {item.author}
                      </a>
                    ) : (
                      item.author
                    )}{" "}
                    · {formatRelative(item.updated || item.published, dateLocale)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </Column>
  );
}

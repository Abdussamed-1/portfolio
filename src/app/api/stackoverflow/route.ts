import Parser from "rss-parser";
import { NextRequest, NextResponse } from "next/server";
import type { StackOverflowItem } from "@/types/stackoverflow";

const FEED_URL = "https://stackoverflow.com/feeds/week";

const parser = new Parser({
  timeout: 15000,
  headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioWeekly/1.0)" },
  customFields: {
    item: [
      ["re:rank", "rank"],
      ["author", "atomAuthor"],
    ],
  },
});

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTags(item: Record<string, unknown>): string[] {
  const categories = item.categories;
  if (Array.isArray(categories)) {
    return categories
      .map((c) => (typeof c === "string" ? c : String((c as { _?: string; term?: string })?._ ?? (c as { term?: string })?.term ?? "")))
      .filter(Boolean);
  }

  const category = item.category;
  if (Array.isArray(category)) {
    return category
      .map((c) => {
        if (typeof c === "string") return c;
        const obj = c as { $?: { term?: string }; term?: string; _?: string };
        return obj.$?.term ?? obj.term ?? obj._ ?? "";
      })
      .filter(Boolean);
  }
  if (category && typeof category === "object") {
    const obj = category as { $?: { term?: string }; term?: string };
    const term = obj.$?.term ?? obj.term;
    return term ? [term] : [];
  }
  return [];
}

function extractAuthor(item: Record<string, unknown>): { name: string; url?: string } {
  const creator = item.creator;
  if (typeof creator === "string" && creator) return { name: creator };

  const atomAuthor = item.atomAuthor ?? item.author;
  if (typeof atomAuthor === "string" && atomAuthor) return { name: atomAuthor };

  if (atomAuthor && typeof atomAuthor === "object") {
    const a = Array.isArray(atomAuthor) ? atomAuthor[0] : atomAuthor;
    if (a && typeof a === "object") {
      const obj = a as { name?: string; uri?: string; $?: { name?: string } };
      const name = obj.name ?? obj.$?.name ?? "Anonymous";
      const url = typeof obj.uri === "string" ? obj.uri : undefined;
      return { name, url };
    }
  }

  return { name: "Anonymous" };
}

function extractVotes(item: Record<string, unknown>): number {
  const rank = item.rank ?? item["re:rank"];
  if (typeof rank === "number") return rank;
  if (typeof rank === "string") {
    const n = Number.parseInt(rank, 10);
    return Number.isFinite(n) ? n : 0;
  }
  if (rank && typeof rank === "object") {
    const obj = rank as { _?: string; $?: { _: string } };
    const raw = obj._ ?? obj.$?._;
    if (raw) {
      const n = Number.parseInt(String(raw), 10);
      return Number.isFinite(n) ? n : 0;
    }
  }
  return 0;
}

function parseTagFilter(tagsParam: string | null): string[] {
  if (!tagsParam) return [];
  return tagsParam
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

function matchesTags(itemTags: string[], filter: string[]): boolean {
  if (filter.length === 0) return true;
  const lower = itemTags.map((t) => t.toLowerCase());
  return filter.some((t) => lower.includes(t));
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const tagFilter = parseTagFilter(searchParams.get("tags"));

  try {
    const feed = await parser.parseURL(FEED_URL);
    const items: StackOverflowItem[] = (feed.items ?? [])
      .map((raw) => {
        const item = raw as unknown as Record<string, unknown>;
        const { name, url } = extractAuthor(item);
        const summaryHtml =
          (typeof item.content === "string" ? item.content : null) ??
          (typeof item.summary === "string" ? item.summary : null) ??
          (typeof item.contentSnippet === "string" ? item.contentSnippet : null) ??
          "";
        const summary = stripHtml(summaryHtml).slice(0, 320);
        const tags = extractTags(item);
        const id =
          (typeof item.id === "string" && item.id) ||
          (typeof item.guid === "string" && item.guid) ||
          (typeof item.link === "string" && item.link) ||
          "";

        return {
          id,
          title: (typeof item.title === "string" ? item.title : "") || "Untitled",
          link: (typeof item.link === "string" ? item.link : "") || "",
          author: name,
          authorUrl: url,
          tags,
          votes: extractVotes(item),
          published:
            (typeof item.pubDate === "string" && item.pubDate) ||
            (typeof item.isoDate === "string" && item.isoDate) ||
            new Date().toISOString(),
          updated:
            (typeof item.updated === "string" && item.updated) ||
            (typeof item.isoDate === "string" && item.isoDate) ||
            new Date().toISOString(),
          summary,
        } satisfies StackOverflowItem;
      })
      .filter((item) => item.link && matchesTags(item.tags, tagFilter));

    items.sort((a, b) => b.votes - a.votes || new Date(b.updated).getTime() - new Date(a.updated).getTime());

    return NextResponse.json(
      {
        items,
        title: feed.title,
        updated: feed.lastBuildDate ?? new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      },
    );
  } catch (error) {
    console.error("Stack Overflow feed error:", error);
    return NextResponse.json({ items: [], error: "feed_unavailable" }, { status: 200 });
  }
}

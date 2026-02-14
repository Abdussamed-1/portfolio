import Parser from "rss-parser";
import { NextResponse } from "next/server";
import { techNewsFeeds } from "@/resources";

const parser = new Parser({
  timeout: 10000,
  headers: { "User-Agent": "Mozilla/5.0 (compatible; PortfolioTechNews/1.0)" },
  customFields: {
    item: [
      ["media:content", "media:content"],
      ["media:thumbnail", "media:thumbnail"],
      ["content:encoded", "contentEncoded"],
    ],
  },
});

export type TechNewsItem = {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  description?: string;
  image?: string;
};

type ParserItem = {
  enclosure?: { url?: string; type?: string; href?: string };
  content?: string;
  contentEncoded?: string;
  summary?: string;
  description?: string;
  link?: string;
};

function firstImageFromHtml(html: string, baseUrl: string): string | undefined {
  // src veya data-src (lazy img), tek veya çift tırnak
  const match =
    html.match(/<img[^>]+src=["']([^"'>]+)["']/i) ??
    html.match(/<img[^>]+data-src=["']([^"'>]+)["']/i);
  if (!match?.[1]) return undefined;
  try {
    return new URL(match[1].replace(/&amp;/g, "&"), baseUrl).href;
  } catch {
    return undefined;
  }
}

/** Obje veya diziden (xml2js çıktısı) url al: { $: { url } }, { url }, veya string. */
function urlFromMediaNode(node: unknown): string | undefined {
  if (!node || typeof node === "string") return undefined;
  const obj = Array.isArray(node) ? node[0] : node;
  if (!obj || typeof obj !== "object") return undefined;
  const attrs = (obj as { $?: { url?: string }; url?: string });
  return attrs?.$?.url ?? attrs?.url;
}

function extractImageUrl(item: ParserItem & Record<string, unknown>): string | undefined {
  const link = item.link ?? "https://example.com";

  // 1. Enclosure (RSS): url veya href
  const enc = item.enclosure;
  if (enc) {
    const url = enc.url ?? (enc as { href?: string }).href;
    if (url) {
      const type = (enc.type ?? "").toLowerCase();
      if (type === "" || type.startsWith("image/")) return url;
    }
  }

  // 2. media:thumbnail – parser customFields ile "media:thumbnail" anahtarına yazıyor
  const thumb =
    item["media:thumbnail"] ?? item.mediaThumbnail ?? item["mediaThumbnail"];
  const thumbUrl = urlFromMediaNode(thumb);
  if (thumbUrl) return thumbUrl;

  // 3. media:content
  const mediaContent =
    item["media:content"] ?? item.mediaContent ?? item["mediaContent"];
  const contentUrl = urlFromMediaNode(mediaContent);
  if (contentUrl) return contentUrl;

  // 4. Item üzerinde herhangi bir key'de thumbnail/url (bazı feed'ler farklı isim kullanır)
  for (const key of Object.keys(item)) {
    if (/thumbnail|image|media|enclosure/i.test(key) && key !== "enclosure") {
      const val = item[key];
      const u = urlFromMediaNode(val) ?? (typeof val === "string" ? val : undefined);
      if (u && (u.startsWith("http://") || u.startsWith("https://"))) return u;
    }
  }

  // 5. HTML içinden ilk img: content:encoded, content, description, summary
  const html =
    (typeof item.contentEncoded === "string" ? item.contentEncoded : null) ??
    (typeof item["content:encoded"] === "string" ? item["content:encoded"] : null) ??
    (typeof item.content === "string" ? item.content : null) ??
    (typeof item.description === "string" ? item.description : null) ??
    (typeof item.summary === "string" ? item.summary : null) ??
    "";
  return firstImageFromHtml(html, link);
}

export async function GET() {
  const maxItems = 15;
  const allItems: TechNewsItem[] = [];

  try {
    await Promise.all(
      techNewsFeeds.map(async (feedUrl) => {
        try {
          const feed = await parser.parseURL(feedUrl);
          const source = feed.title ?? new URL(feedUrl).hostname;
          (feed.items ?? []).slice(0, 5).forEach((item) => {
            allItems.push({
              title: item.title ?? "",
              link: item.link ?? "",
              pubDate: item.pubDate ?? new Date().toISOString(),
              source,
              description: item.contentSnippet ?? item.content?.slice(0, 200),
              image: extractImageUrl(item as unknown as ParserItem & Record<string, unknown>),
            });
          });
        } catch {
          // Skip failed feed
        }
      })
    );

    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const items = allItems.slice(0, maxItems);

    return NextResponse.json({ items }, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    });
  } catch (error) {
    console.error("Tech news fetch error:", error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}

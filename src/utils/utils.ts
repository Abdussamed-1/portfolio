import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
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

import { notFound } from "next/navigation";

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    title_en: data.title_en,
    title_tr: data.title_tr,
    summary_en: data.summary_en,
    summary_tr: data.summary_tr,
    subtitle_en: data.subtitle_en,
    subtitle_tr: data.subtitle_tr,
    tag_en: data.tag_en,
    tag_tr: data.tag_tr,
    intro_en: data.intro_en,
    intro_tr: data.intro_tr,
    readMore_en: data.readMore_en,
    readMore_tr: data.readMore_tr,
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

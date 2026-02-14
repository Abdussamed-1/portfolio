import { Line, Row, Text } from "@once-ui-system/core";

export type Locale = "en" | "tr";

export const stringsByLocale: Record<
  Locale,
  {
    nav: { home: string; about: string; work: string; blog: string; gallery: string };
    introTitle: string;
    introDescription: React.ReactNode;
    workTitle: string;
    studiesTitle: string;
    technicalTitle: string;
    featuredWork: string;
    workLabel: string;
    headline: React.ReactNode;
    subline: React.ReactNode;
    newsletterTitle: string;
    newsletterDescription: string;
    techNewsTitle: string;
    newsLinksTitle: string;
  }
> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      blog: "Blog",
      gallery: "News",
    },
    introTitle: "Introduction",
    introDescription: (
      <>
        I'm Samet Erkalp — Researcher and Developer. I work with mathematical formulations
        in the quantum world and bring that lens into AI, data science and bioinformatics —
        turning equations into code and systems that actually run. I like building pipelines from
        ideas, tools from models, and things people can use from papers.
      </>
    ),
    workTitle: "Work Experience",
    studiesTitle: "Studies",
    technicalTitle: "Technical skills",
    featuredWork: "Featured",
    workLabel: "Work",
    headline: <>From data to decisions — computational solutions at the edge of science</>,
    subline: (
      <>
        I&apos;m Samet — I work at the intersection of <Text as="span" size="xl" weight="strong">AI</Text>, data science and bioinformatics, <br />
        building software and computational solutions for real-world problems. I&apos;m also exploring quantum computing.
      </>
    ),
    newsletterTitle: "Subscribe to Samet's Newsletter",
    newsletterDescription: "Updates on AI, data science and side projects",
    techNewsTitle: "Featured Tech News",
    newsLinksTitle: "Useful links",
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımda",
      work: "Projeler",
      blog: "Blog",
      gallery: "Haberler",
    },
    introTitle: "Giriş",
    introDescription: (
      <>
        Ben Samet Erkalp. Araştırmacı ve Geliştiriciyim. Kuantum dünyasındaki matematiksel
        formulasyonlarla uğraşıyor, bu bakışı yapay zeka, veri bilimi ve biyoinformatikte denklemlerden
        koda ve gerçekten çalışan sistemlere taşıyorum. Fikirleri pipelinelere, modelleri araçlara,
        makaleleri insanların kullanabileceği ürünlere dönüştürmeyi seviyorum.
      </>
    ),
    workTitle: "İş Deneyimi",
    studiesTitle: "Eğitim",
    technicalTitle: "Teknik beceriler",
    featuredWork: "Öne çıkan",
    workLabel: "İş",
    headline: <>Veriden karara — bilimin sınırında hesaplamalı çözümler</>,
    subline: (
      <>
        Ben Samet — <Text as="span" size="xl" weight="strong">Yapay zeka</Text>, veri bilimi ve biyoinformatik kesişiminde çalışıyorum; <br />
        gerçek dünya problemleri için yazılım ve hesaplamalı çözümler geliştiriyorum. Kuantum hesaplama ile de ilgileniyorum.
      </>
    ),
    newsletterTitle: "Samet'in bültenine abone ol",
    newsletterDescription: "Yapay zeka, veri bilimi ve projelerden güncellemeler",
    techNewsTitle: "Ayın teknoloji bülteni",
    newsLinksTitle: "Faydalı linkler",
  },
};

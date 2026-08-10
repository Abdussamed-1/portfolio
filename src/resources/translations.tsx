import { Line, Row, Text } from "@once-ui-system/core";

export type Locale = "en" | "tr";

export const stringsByLocale: Record<
  Locale,
  {
    nav: { home: string; about: string; work: string; blog: string; weekly: string; gallery: string };
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
    projectsLabel: string;
    relatedProjects: string;
    readCaseStudy: string;
    viewProject: string;
    contributorsTitle: string;
    blogPageTitle: string;
    blogPageDescription: string;
    earlierPosts: string;
    recentPosts: string;
    weeklyPageTitle: string;
    weeklyPageDescription: string;
    weeklySearchPlaceholder: string;
    weeklyClearTags: string;
    weeklyVotes: string;
    weeklyEmpty: string;
    weeklyLoading: string;
    weeklyBy: string;
    weeklyCommunityTitle: string;
    weeklyAskTitle: string;
    weeklyAskBody: string;
    weeklyAskTags: string;
    weeklySubmit: string;
    weeklySignInPrompt: string;
    weeklySignInCta: string;
    weeklyCommunityEmpty: string;
    weeklyAuthNotReady: string;
    weeklyComments: string;
    weeklyAddComment: string;
    weeklyCommentPlaceholder: string;
  }
> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      work: "Work",
      blog: "Blog",
      weekly: "Weekly",
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
    headline: <>Build. Optimize. Evolve.</>,
    subline: (
      <>
        I&apos;m Samet — An <Text as="span" size="xl" weight="strong">AI & Data Science Engineer</Text> building intelligent systems at the intersection of machine learning, bioinformatics, and quantum computing. <br />
        I transform complex data into scalable solutions, optimize algorithms for real-world impact, and evolve ideas from research to production.
      </>
    ),
    newsletterTitle: "Subscribe to Samet's Newsletter",
    newsletterDescription: "Updates on AI, data science and side projects",
    techNewsTitle: "Featured Tech News",
    newsLinksTitle: "Useful links",
    projectsLabel: "Projects",
    relatedProjects: "Related projects",
    readCaseStudy: "Read case study",
    viewProject: "View project",
    contributorsTitle: "Contributors",
    blogPageTitle: "Blog",
    blogPageDescription: "Blog by Samet Erkalp: AI, data science, cybersecurity, Kubernetes, and tech. Tutorials and articles.",
    earlierPosts: "Earlier posts",
    recentPosts: "Recent posts",
    weeklyPageTitle: "Weekly",
    weeklyPageDescription:
      "Hot weekly Stack Overflow questions filtered by your tags, plus a community space to ask and discuss.",
    weeklySearchPlaceholder: "Search questions…",
    weeklyClearTags: "Clear tags",
    weeklyVotes: "votes",
    weeklyEmpty: "No questions match your filters.",
    weeklyLoading: "Loading weekly feed…",
    weeklyBy: "by",
    weeklyCommunityTitle: "Community",
    weeklyAskTitle: "Question title",
    weeklyAskBody: "Details",
    weeklyAskTags: "Tags (comma-separated)",
    weeklySubmit: "Post question",
    weeklySignInPrompt: "Sign in to ask a question or leave a comment.",
    weeklySignInCta: "Sign in",
    weeklyCommunityEmpty: "No community questions yet. Be the first.",
    weeklyAuthNotReady: "Auth is not configured yet. Add Clerk keys to enable posting.",
    weeklyComments: "Comments",
    weeklyAddComment: "Reply",
    weeklyCommentPlaceholder: "Write a comment…",
  },
  tr: {
    nav: {
      home: "Ana Sayfa",
      about: "Hakkımda",
      work: "Projeler",
      blog: "Blog",
      weekly: "Haftalık",
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
    headline: <>İnşa Et. Optimize Et. Geliştir.</>,
    subline: (
      <>
        Ben Samet — Makine öğrenmesi, biyoinformatik ve kuantum hesaplama kesişiminde akıllı sistemler geliştiren bir <Text as="span" size="xl" weight="strong">Yapay Zeka & Veri Bilimi Mühendisi</Text>. <br />
        Karmaşık verileri ölçeklenebilir çözümlere dönüştürüyor, gerçek dünya etkisi için algoritmaları optimize ediyor ve fikirleri araştırmadan üretime taşıyorum.
      </>
    ),
    newsletterTitle: "Samet'in bültenine abone ol",
    newsletterDescription: "Yapay zeka, veri bilimi ve projelerden güncellemeler",
    techNewsTitle: "Ayın teknoloji bülteni",
    newsLinksTitle: "Faydalı linkler",
    projectsLabel: "Projeler",
    relatedProjects: "İlgili projeler",
    readCaseStudy: "Proje detayı",
    viewProject: "Projeyi görüntüle",
    contributorsTitle: "Katkıda bulunanlar",
    blogPageTitle: "Yazılar",
    blogPageDescription: "Samet Erkalp'in blogu: yapay zeka, veri bilimi, siber güvenlik, Kubernetes ve teknoloji. Rehberler ve yazılar.",
    earlierPosts: "Önceki yazılar",
    recentPosts: "Son yazılar",
    weeklyPageTitle: "Haftalık",
    weeklyPageDescription:
      "Stack Overflow haftanın öne çıkan soruları, seçtiğin etiketlerle filtrele; soru sorup tartışabileceğin topluluk alanı.",
    weeklySearchPlaceholder: "Soru ara…",
    weeklyClearTags: "Etiketleri temizle",
    weeklyVotes: "oy",
    weeklyEmpty: "Filtrelere uyan soru yok.",
    weeklyLoading: "Haftalık akış yükleniyor…",
    weeklyBy: "yazar",
    weeklyCommunityTitle: "Topluluk",
    weeklyAskTitle: "Soru başlığı",
    weeklyAskBody: "Detaylar",
    weeklyAskTags: "Etiketler (virgülle)",
    weeklySubmit: "Soruyu gönder",
    weeklySignInPrompt: "Soru sormak veya yorum yapmak için giriş yap.",
    weeklySignInCta: "Giriş yap",
    weeklyCommunityEmpty: "Henüz topluluk sorusu yok. İlk sen ol.",
    weeklyAuthNotReady: "Kimlik doğrulama henüz yapılandırılmadı. Gönderim için Clerk anahtarlarını ekle.",
    weeklyComments: "Yorumlar",
    weeklyAddComment: "Yanıtla",
    weeklyCommentPlaceholder: "Yorum yaz…",
  },
};

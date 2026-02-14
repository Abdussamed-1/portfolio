import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";
import type { Locale } from "@/resources/translations";
import { stringsByLocale } from "@/resources/translations";

const person: Person = {
  firstName: "Samet",
  lastName: "Erkalp",
  name: "Samet Erkalp",
  role: "AI & Data Science Engineer",
  avatar: "/favicon-source.png",
  email: "abdulsamet@chinarqai.com",
  location: "Europe/Istanbul",
  locationLabel: "Istanbul, Europe",
  languages: ["English", "Turkish"],
};

const getNewsletter = (locale: Locale): Newsletter => ({
  display: true,
  title: <>{stringsByLocale[locale].newsletterTitle}</>,
  description: <>{stringsByLocale[locale].newsletterDescription}</>,
});

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/Abdussamed-1",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/sameterkalp/",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/once_ui/",
    essential: false,
  },
  {
    name: "X",
    icon: "x",
    link: "https://x.com/AErkalp71676",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const homeBase: Omit<Home, "label" | "headline" | "subline"> = {
  path: "/",
  image: "/images/og/home.jpg",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  featured: {
    display: true,
    href: "/work/building-once-ui-a-customizable-design-system",
    title: null, // overridden in getHome
  },
};

const getHome = (locale: Locale): Home => ({
  ...homeBase,
  label: stringsByLocale[locale].nav.home,
  headline: stringsByLocale[locale].headline,
  subline: stringsByLocale[locale].subline,
  featured: {
    display: true,
    href: homeBase.featured.href,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">{stringsByLocale[locale].featuredWork}</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          {stringsByLocale[locale].workLabel}
        </Text>
      </Row>
    ),
  },
});

const aboutBase: Omit<About, "label" | "intro"> = {
  path: "/about",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Chinar Quantum AI Türkiye",
        timeframe: "Aug 2025 - Present",
        role: "Quantum Machine Learning Intern · Paid Quantum Intern",
        achievements: [
          <>Istanbul · Hybrid / On-site. BB84 Protocol, Quantum Computing, Mid-Circuit.</>,
        ],
        images: [],
      },
      {
        company: "HSD İNÖNÜ",
        timeframe: "Feb 2025 - Present",
        role: "DevOps Developer",
        achievements: [
          <>Malatya · Full-time. RAG, Apache Spark, ECS, Cloud Computing.</>,
        ],
        images: [],
      },
      {
        company: "UNILAB Vision Turkiye",
        timeframe: "Aug 2024 - Feb 2026",
        role: "Data Scientist",
        achievements: [
          <>Istanbul · Remote. Python, Git, Veri Analizi, EDA, Data Analysis.</>,
        ],
        images: [],
      },
      {
        company: "UNIDEV Software Türkiye",
        timeframe: "Jul 2024 - Feb 2026",
        role: "Veri Bilimi Uzmanı",
        achievements: [
          <>Istanbul · Freelance, Remote. Deep Learning, Django, React.js, ML, Biyoenformatik.</>,
        ],
        images: [],
      },
      {
        company: "MyUNI Türkiye",
        timeframe: "Aug 2024 - Feb 2026",
        role: "Software Developer",
        achievements: [
          <>Istanbul · Freelance.</>,
        ],
        images: [],
      },
      {
        company: "QTurkey",
        timeframe: "Feb 2025 - Mar 2025",
        role: "Mentör",
        achievements: [
          <>Remote · Seasonal. Koçluk & Mentörlük.</>,
        ],
        images: [],
      },
      {
        company: "İNÜGEN – İnönü Üniversitesi Genetik Topluluğu",
        timeframe: "Aug 2024 - Mar 2025",
        role: "Project Manager",
        achievements: [
          <>Malatya · Student Services, Project Manager.</>,
        ],
        images: [],
      },
      {
        company: "Qursunoglu Quantum Computing",
        timeframe: "Dec 2024 - Feb 2025",
        role: "Software Programmer",
        achievements: [
          <>Ankara · Hybrid. Git, Araştırma, analitik beceriler.</>,
        ],
        images: [],
      },
      {
        company: "MBG Türkiye (Moleküler Biyoloji ve Genetik)",
        timeframe: "Mar 2023 - Jan 2025",
        role: "Content Writer · Volunteer · Co-Chairman",
        achievements: [
          <>Istanbul · Remote. İçerik üretimi, CRM, ekip liderliği, araştırma.</>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Studies",
    institutions: [
      {
        name: "İnönü Üniversitesi",
        description: <>Undergraduate, Molecular Biology and Genetics. Oct 2023 - Jul 2027.</>,
      },
      {
        name: "İnönü Üniversitesi – Hazırlık",
        description: <>Undergraduate, Prep School. Sep 2022 - Jun 2023. Grade: 78.</>,
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Kuantum & ML",
        description: <>Kuantum hesaplama, kuantum makine öğrenmesi ve ilgili protokoller.</>,
        tags: [
          { name: "Quantum Computing" },
          { name: "BB84 Protocol" },
          { name: "Mid-Circuit" },
          { name: "Quantum Programming" },
          { name: "QBronze" },
        ],
        images: [],
      },
      {
        title: "Veri bilimi & derin öğrenme",
        description: <>Makine öğrenmesi, istatistik, NLP ve biyoenformatik.</>,
        tags: [
          { name: "Python" },
          { name: "Machine Learning" },
          { name: "Deep Learning" },
          { name: "NLP" },
          { name: "RAG" },
          { name: "Statistics" },
          { name: "Exploratory Data Analysis" },
          { name: "Linear Regression" },
          { name: "Logistic Regression" },
          { name: "CNN" },
          { name: "Reinforcement Learning" },
          { name: "Biyoenformatik" },
        ],
        images: [],
      },
      {
        title: "Yazılım & veritabanı",
        description: <>Geliştirme, veritabanı ve versiyon kontrolü.</>,
        tags: [
          { name: "React.js", icon: "javascript" },
          { name: "Django" },
          { name: "Git", icon: "github" },
          { name: "GitHub" },
          { name: "PostgreSQL" },
          { name: "SQL" },
          { name: "Microsoft SQL Server" },
          { name: "DBMS" },
        ],
        images: [],
      },
      {
        title: "DevOps & bulut",
        description: <>Bulut, ECS ve pipeline araçları.</>,
        tags: [
          { name: "Apache Spark" },
          { name: "Cloud Computing" },
          { name: "ECS" },
          { name: "Load Balancing" },
          { name: "VPN" },
        ],
        images: [],
      },
    ],
  },
};

const getAbout = (locale: Locale): About => ({
  ...aboutBase,
  label: stringsByLocale[locale].nav.about,
  intro: {
    display: true,
    title: stringsByLocale[locale].introTitle,
    description: stringsByLocale[locale].introDescription,
  },
  work: { ...aboutBase.work, title: stringsByLocale[locale].workTitle },
  studies: { ...aboutBase.studies, title: stringsByLocale[locale].studiesTitle },
  technical: { ...aboutBase.technical, title: stringsByLocale[locale].technicalTitle },
});

const blogBase = {
  path: "/blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
};

const getBlog = (locale: Locale): Blog => ({
  ...blogBase,
  label: stringsByLocale[locale].nav.blog,
});

const workBase = {
  path: "/work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
};

const getWork = (locale: Locale): Work => ({
  ...workBase,
  label: stringsByLocale[locale].nav.work,
});

const galleryBase = {
  path: "/news",
  title: `News – ${person.name}`,
  description: `Tech news and updates`,
  images: [] as { src: string; alt: string; orientation: "horizontal" | "vertical" }[],
};

const getGallery = (locale: Locale): Gallery => ({
  ...galleryBase,
  label: stringsByLocale[locale].nav.gallery,
});

function getContent(locale: Locale) {
  return {
    person,
    social,
    newsletter: getNewsletter(locale),
    home: getHome(locale),
    about: getAbout(locale),
    blog: getBlog(locale),
    work: getWork(locale),
    gallery: getGallery(locale),
    techNewsTitle: stringsByLocale[locale].techNewsTitle,
  };
}

const newsletter = getNewsletter("en");
const home = getHome("en");
const about = getAbout("en");
const blog = getBlog("en");
const work = getWork("en");
const gallery = getGallery("en");

export { person, social, newsletter, home, about, blog, work, gallery, getContent };

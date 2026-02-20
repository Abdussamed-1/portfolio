import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";

import classNames from "classnames";
import { cookies } from "next/headers";

import { Column, Flex, Meta } from "@once-ui-system/core";
import { Analytics } from "@vercel/analytics/react";
import BackgroundWithMobileFlow from "@/components/BackgroundWithMobileFlow";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { baseURL, effects, fonts, getContent, style, dataStyle, person, social } from "@/resources";
import type { Locale } from "@/resources/translations";

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value === "tr" ? "tr" : "en") as Locale;
  const { home } = getContent(locale);
  const metadata = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
  
  // Add siteName for og:site_name
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      siteName: person.name,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("locale")?.value === "tr" ? "tr" : "en") as Locale;

  return (
    <Flex
      suppressHydrationWarning
      as="html"
      lang={locale}
      fillWidth
      className={classNames(
        fonts.heading.variable,
        fonts.body.variable,
        fonts.label.variable,
        fonts.code.variable,
      )}
    >
      <head>
        {/* JSON-LD Structured Data: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: person.name,
              givenName: person.firstName,
              familyName: person.lastName,
              jobTitle: person.role,
              email: person.email,
              image: `${baseURL}${person.avatar}`,
              url: baseURL,
              sameAs: social
                .filter((s) => s.link && !s.link.startsWith("mailto:"))
                .map((s) => s.link),
              address: {
                "@type": "PostalAddress",
                addressLocality: person.locationLabel,
              },
              knowsLanguage: person.languages,
            }),
          }}
        />
        {/* JSON-LD Structured Data: Organization/Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: `${person.name} - Portfolio`,
              description: `Portfolio website of ${person.name}, ${person.role}`,
              url: baseURL,
              author: {
                "@type": "Person",
                name: person.name,
              },
              inLanguage: [locale, locale === "en" ? "tr" : "en"],
            }),
          }}
        />
        {/* hreflang tags for EN/TR */}
        <link rel="alternate" hrefLang="en" href={baseURL} />
        <link rel="alternate" hrefLang="tr" href={`${baseURL}?locale=tr`} />
        <link rel="alternate" hrefLang="x-default" href={baseURL} />
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const root = document.documentElement;
                  const defaultTheme = 'system';
                  
                  // Set defaults from config
                  const config = ${JSON.stringify({
                    brand: style.brand,
                    accent: style.accent,
                    neutral: style.neutral,
                    solid: style.solid,
                    "solid-style": style.solidStyle,
                    border: style.border,
                    surface: style.surface,
                    transition: style.transition,
                    scaling: style.scaling,
                    "viz-style": dataStyle.variant,
                  })};
                  
                  // Apply default values
                  Object.entries(config).forEach(([key, value]) => {
                    root.setAttribute('data-' + key, value);
                  });
                  
                  // Resolve theme
                  const resolveTheme = (themeValue) => {
                    if (!themeValue || themeValue === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeValue;
                  };
                  
                  // Apply saved theme
                  const savedTheme = localStorage.getItem('data-theme');
                  const resolvedTheme = resolveTheme(savedTheme);
                  root.setAttribute('data-theme', resolvedTheme);
                  
                  // Apply any saved style overrides
                  const styleKeys = Object.keys(config);
                  styleKeys.forEach(key => {
                    const value = localStorage.getItem('data-' + key);
                    if (value) {
                      root.setAttribute('data-' + key, value);
                    }
                  });
                } catch (e) {
                  console.error('Failed to initialize theme:', e);
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <LocaleProvider initialLocale={locale}>
        <Providers>
          <Column
          as="body"
          background="page"
          fillWidth
          style={{ minHeight: "100vh" }}
          margin="0"
          padding="0"
          horizontal="center"
        >
          <BackgroundWithMobileFlow effects={effects} />
          <Flex fillWidth minHeight="16" s={{ hide: true }} />
          <Header />
          <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
            <Flex horizontal="center" fillWidth minHeight="0">
              <RouteGuard>{children}</RouteGuard>
            </Flex>
          </Flex>
          <Footer />
        </Column>
      </Providers>
      <Analytics />
      </LocaleProvider>
    </Flex>
  );
}

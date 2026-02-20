import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes.map((route) => {
    const isHome = route === "/";
    return {
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString(),
      changeFrequency: (isHome ? ("weekly" as const) : ("monthly" as const)),
      priority: isHome ? 1.0 : 0.9,
    };
  });

  return [...routes, ...blogs, ...works];
}

import mdx from "@next/mdx";
import { dirname } from "path";
import { fileURLToPath } from "url";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "vyiejdlbqrdkqawfikup.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  async redirects() {
    return [{ source: "/gallery", destination: "/news", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  compress: true,
  // Next 16+: turbopack config is top-level (not experimental).
  // Setting this prevents Next from picking a wrong workspace root
  // when unrelated lockfiles exist elsewhere on the machine.
  turbopack: {
    root: __dirname,
  },
};

export default withMDX(nextConfig);

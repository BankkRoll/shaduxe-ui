import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ["localhost", "shaduxe.com"],
  },
  async redirects() {
    return [
      {
        source: "/components",
        destination: "/docs/components/avatar",
        permanent: true,
      },
      {
        source: "/components/:path*",
        destination: "/docs/components/:path*",
        permanent: true,
      },
      {
        source: "/docs/templates",
        destination: "/docs/templates/emaily",
        permanent: true,
      },
      {
        source: "/docs/blocks",
        destination: "/docs/blocks/pricing-one",
        permanent: true,
      },
      {
        source: "/docs/components",
        destination: "/docs/components/avatar",
        permanent: true,
      },
      {
        source: "/r/:name",
        destination: "/r/styles/default/:name.json",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);

import type { NextConfig } from "next";

// Set STATIC_EXPORT=true to build a fully static bundle (e.g. for GitLab Pages),
// which has no Node server and therefore can't run the /api/contact route handler —
// see the "Hosting" section in README.md.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
    basePath: process.env.PAGES_BASE_PATH || "",
  }),
};

export default nextConfig;

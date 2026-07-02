import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const isStaticExport = isGitHubPages || process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGitHubPages ? "/lockin" : "");

const nextConfig: NextConfig = {
  devIndicators: false,
  ...(isStaticExport
    ? {
        output: "export",
        ...(basePath
          ? {
              assetPrefix: basePath,
              basePath,
            }
          : {}),
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {}),
};

export default nextConfig;

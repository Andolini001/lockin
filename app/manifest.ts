import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return {
    name: "LOCKIN",
    short_name: "LOCKIN",
    description: "Ежедневные реальные квесты, proof, XP, streak и squad.",
    start_url: `${basePath}/dashboard`,
    display: "standalone",
    background_color: "#050711",
    theme_color: "#050711",
    icons: [
      {
        src: `${basePath}/favicon.ico`,
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

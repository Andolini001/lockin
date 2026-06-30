import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LOCKIN",
    short_name: "LOCKIN",
    description: "Ежедневные реальные квесты, proof, XP, streak и squad.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#050711",
    theme_color: "#050711",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}

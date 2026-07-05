import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cabinet Dentaire Pool of Bethesa",
    short_name: "Pool of Bethesa",
    description:
      "Des soins dentaires modernes, précis et personnalisés à Douala.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#134fbf",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

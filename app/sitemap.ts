import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: "https://averyromain.com", lastModified, changeFrequency: "monthly", priority: 1 },
    { url: "https://averyromain.com/resume", lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}

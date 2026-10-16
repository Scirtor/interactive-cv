import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/resume",
    ...caseStudies.map((study) => `/cases/${study.slug}`),
  ].map((path) => ({ url: `https://scirtor.com${path}` }));
}

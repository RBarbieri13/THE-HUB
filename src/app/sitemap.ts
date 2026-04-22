import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://donationcloset.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/get-equipment",
    "/donate-equipment",
    "/inventory",
    "/how-it-works",
    "/faq",
    "/contact",
    "/partners",
    "/accessibility",
    "/privacy",
    "/terms",
    "/login",
    "/signup",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/inventory" ? 0.9 : 0.7,
  }));
}

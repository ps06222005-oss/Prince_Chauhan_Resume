/**
 * Global Site & Personal Brand SEO Configuration
 * Single Source of Truth for canonical domain, metadata, Open Graph, and search indexing.
 *
 * FUTURE CUSTOM DOMAIN INSTRUCTIONS:
 * When you connect your custom domain (e.g. https://princechauhan.dev):
 * 1. Simply update `CANONICAL_DOMAIN` below (or set VITE_SITE_URL in your environment).
 * 2. Everything across the application (canonical tags, Open Graph, Twitter cards,
 *    JSON-LD structured data, sitemaps, and robots.txt) updates automatically.
 */

const CANONICAL_DOMAIN = "https://ps06222005-oss.github.io";

export const SITE_CONFIG = {
  // Primary Canonical URL — Single source of truth
  url: (typeof process !== "undefined" && process.env?.VITE_SITE_URL) || CANONICAL_DOMAIN,

  // Authentic Personal Brand Identity
  author: "Prince Chauhan",
  title: "Prince Chauhan | AI/ML Developer & Creative Technologist",
  shortTitle: "Prince Chauhan",
  headline: "AI/ML Developer & Creative Technologist",
  role: "AI / ML Developer",
  discipline: "Creative Technologist",
  degree: "B.Tech CSE (AI & ML)",
  institution: "Sunderdeep Global University",
  college: "Sunderdeep Engineering College",
  location: "Ghaziabad, Uttar Pradesh, India",

  // Concise, compelling, authentic description (No generic AI marketing fluff)
  description:
    "Official portfolio of Prince Chauhan, AI/ML Developer and Creative Technologist (B.Tech CSE AI & ML). Architecting autonomous neural systems, low-latency voice pipelines, and interactive spatial software.",

  // Primary visual asset for social sharing & previews
  ogImage: "/og-image.png",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "Prince Chauhan | AI/ML Developer & Creative Technologist Portfolio Preview",

  // Locale & Theme
  locale: "en_IN",
  language: "en",
  themeColor: "#07080a",

  // Verified External Profiles
  github: "https://github.com/ps06222005-oss",
  linkedin: "https://www.linkedin.com/in/prince-chauhan-3418a3288",
  email: "ps06222005@gmail.com",
  phone: "+91 70424 81850",

  // Search Verification
  googleSiteVerification: "sfkMJj9uSqAkgufz7UyiQxF6VXsPQ6lphA-VOJF0nSE",

  // Section Anchors for Navigation & Crawling
  sections: [
    { id: "", label: "Overview", priority: "1.0", changefreq: "weekly" },
    { id: "about", label: "Identity & Vision", priority: "0.8", changefreq: "monthly" },
    { id: "projects", label: "Engineered Artifacts", priority: "0.9", changefreq: "weekly" },
    { id: "skills", label: "Technology Lineage", priority: "0.8", changefreq: "monthly" },
    { id: "github", label: "Repository Ledger", priority: "0.8", changefreq: "weekly" },
    { id: "education", label: "Academic Foundation", priority: "0.7", changefreq: "monthly" },
    { id: "certifications", label: "Verified Credentials", priority: "0.7", changefreq: "monthly" },
    { id: "contact", label: "Direct Channel", priority: "0.9", changefreq: "monthly" },
  ],
} as const;

export function getCanonicalUrl(path = ""): string {
  const base = SITE_CONFIG.url.replace(/\/+$/, "");
  if (!path) return `${base}/`;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export function getOgImageUrl(): string {
  const base = SITE_CONFIG.url.replace(/\/+$/, "");
  return `${base}${SITE_CONFIG.ogImage}`;
}

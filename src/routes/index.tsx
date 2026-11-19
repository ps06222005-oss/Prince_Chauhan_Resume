import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { GitHubStats } from "@/components/portfolio/GitHubStats";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { PROFILE } from "@/lib/portfolio-data";
import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WorkspaceProvider, useWorkspace } from "@/context/WorkspaceContext";
import { BiosEntryPortal } from "@/components/workspace/BiosEntryPortal";
import { WorkspaceHudDock } from "@/components/workspace/WorkspaceHudDock";
import { CreativeWorldView } from "@/components/workspace/CreativeWorldView";
import { TechnicalWorldView } from "@/components/workspace/TechnicalWorldView";

// Lazy-load heavy 3D / Three.js components so initial page load remains lightweight
const HolographicWorkspace = lazy(() =>
  import("@/components/workspace/HolographicWorkspace").then((m) => ({
    default: m.HolographicWorkspace,
  })),
);
const WorldCanvas = lazy(() =>
  import("@/components/portfolio/WorldCanvas").then((m) => ({
    default: m.WorldCanvas,
  })),
);

// Overlay widgets are interaction-only: split them out of the first payload and
// mount after the page is idle so they never compete with LCP.
const AIAssistant = lazy(() =>
  import("@/components/portfolio/AIAssistant").then((m) => ({ default: m.AIAssistant })),
);
const CommandPalette = lazy(() =>
  import("@/components/portfolio/CommandPalette").then((m) => ({ default: m.CommandPalette })),
);
const EasterEggs = lazy(() =>
  import("@/components/portfolio/EasterEggs").then((m) => ({ default: m.EasterEggs })),
);

function DeferredOverlays() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    if (idle) {
      const id = idle(() => setReady(true));
      return () =>
        (window as unknown as { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(
          id,
        );
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <AIAssistant />
      <CommandPalette />
      <EasterEggs />
    </Suspense>
  );
}

import { SITE_CONFIG, getCanonicalUrl, getOgImageUrl } from "@/data/site";

const TITLE = SITE_CONFIG.title;
const DESC = SITE_CONFIG.description;
const CANONICAL = getCanonicalUrl();
const OG_IMAGE = getOgImageUrl();

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "author", content: SITE_CONFIG.author },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "googlebot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      {
        name: "bingbot",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { name: "language", content: SITE_CONFIG.language },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: CANONICAL },
      { property: "og:site_name", content: SITE_CONFIG.title },
      { property: "og:locale", content: SITE_CONFIG.locale },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: String(SITE_CONFIG.ogImageWidth) },
      { property: "og:image:height", content: String(SITE_CONFIG.ogImageHeight) },
      { property: "og:image:alt", content: SITE_CONFIG.ogImageAlt },
      { property: "profile:first_name", content: "Prince" },
      { property: "profile:last_name", content: "Chauhan" },
      { property: "profile:username", content: PROFILE.githubUser },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: SITE_CONFIG.ogImageAlt },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "@id": `${CANONICAL}#person`,
          name: "Prince Chauhan",
          givenName: "Prince",
          familyName: "Chauhan",
          url: CANONICAL,
          image: OG_IMAGE,
          jobTitle: "AI/ML Developer & Creative Technologist",
          headline: "AI/ML Developer & Creative Technologist | B.Tech CSE (AI & ML)",
          description: DESC,
          email: PROFILE.email,
          telephone: PROFILE.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ghaziabad",
            addressRegion: "Uttar Pradesh",
            addressCountry: "IN",
          },
          alumniOf: {
            "@type": "EducationalOrganization",
            name: "Sunderdeep Global University",
            alternateName: "Sunderdeep Engineering College",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Ghaziabad",
              addressRegion: "Uttar Pradesh",
              addressCountry: "IN",
            },
          },
          hasCredential: {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: "Bachelor of Technology in Computer Science and Engineering (Artificial Intelligence and Machine Learning)",
            recognizedBy: {
              "@type": "EducationalOrganization",
              name: "Sunderdeep Global University",
            },
          },
          knowsAbout: [
            "Artificial Intelligence",
            "Machine Learning",
            "Python",
            "TypeScript",
            "React",
            "Autonomous Agents",
            "Creative Technology",
            "Natural Language Processing",
            "Computer Vision",
            "Neural Software Engineering",
          ],
          seeks: {
            "@type": "Demand",
            name: "AI/ML Developer and Software Engineering internship opportunities",
          },
          sameAs: [PROFILE.github, PROFILE.linkedin],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${CANONICAL}#profilepage`,
          url: CANONICAL,
          name: TITLE,
          description: DESC,
          inLanguage: SITE_CONFIG.language,
          isPartOf: {
            "@type": "WebSite",
            "@id": `${CANONICAL}#website`,
            name: SITE_CONFIG.title,
            url: CANONICAL,
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: OG_IMAGE,
            width: SITE_CONFIG.ogImageWidth,
            height: SITE_CONFIG.ogImageHeight,
          },
          mainEntity: { "@type": "Person", "@id": `${CANONICAL}#person` },
          about: { "@type": "Person", "@id": `${CANONICAL}#person` },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: CANONICAL },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${CANONICAL}#projects` },
              { "@type": "ListItem", position: 3, name: "About", item: `${CANONICAL}#about` },
              { "@type": "ListItem", position: 4, name: "Skills", item: `${CANONICAL}#skills` },
              { "@type": "ListItem", position: 5, name: "GitHub", item: `${CANONICAL}#github` },
              {
                "@type": "ListItem",
                position: 6,
                name: "Certifications",
                item: `${CANONICAL}#certifications`,
              },
              { "@type": "ListItem", position: 7, name: "Contact", item: `${CANONICAL}#contact` },
            ],
          },
        }),
      },
    ],
  }),
});

function Portfolio() {
  return (
    <WorkspaceProvider>
      <PortfolioContent />
    </WorkspaceProvider>
  );
}

function WorkspaceStageFallback() {
  return (
    <div className="min-h-dvh w-full bg-background text-foreground flex items-center justify-center px-4">
      <div className="rounded-2xl border border-border bg-card px-6 py-4 shadow-sm font-mono text-xs text-muted-foreground flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse" />
        <span>Initializing 3D Holographic Workspace...</span>
      </div>
    </div>
  );
}

function PortfolioContent() {
  const { mode } = useWorkspace();

  return (
    <AnimatePresence mode="wait" initial={false}>
      {mode === "portal" && (
        <motion.main
          key="portal"
          initial={{ opacity: 0, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-dvh bg-background text-foreground selection:bg-blue-500 selection:text-white"
        >
          <div aria-hidden className="noise-overlay" />
          <CustomCursor />
          <BiosEntryPortal />
        </motion.main>
      )}

      {mode === "creative" && (
        <motion.main
          key="creative"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-dvh bg-background text-foreground selection:bg-blue-500 selection:text-white pb-24"
        >
          <div aria-hidden className="noise-overlay" />
          <CustomCursor />
          <CreativeWorldView />
          <WorkspaceHudDock />
          <DeferredOverlays />
        </motion.main>
      )}

      {mode === "technical" && (
        <motion.main
          key="technical"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-dvh bg-background text-foreground selection:bg-blue-500 selection:text-white pb-24"
        >
          <div aria-hidden className="noise-overlay" />
          <CustomCursor />
          <TechnicalWorldView />
          <WorkspaceHudDock />
          <DeferredOverlays />
        </motion.main>
      )}

      {mode === "workspace" && (
        <motion.main
          key="workspace"
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-dvh bg-background text-foreground selection:bg-blue-500 selection:text-white"
        >
          <div aria-hidden className="noise-overlay" />
          <CustomCursor />
          <Suspense fallback={<WorkspaceStageFallback />}>
            <HolographicWorkspace />
          </Suspense>
          <DeferredOverlays />
        </motion.main>
      )}

      {mode === "full" && (
        <motion.main
          key="full"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-dvh bg-background text-foreground selection:bg-blue-500 selection:text-white pb-24"
        >
          <div aria-hidden className="noise-overlay" />
          <Suspense fallback={null}>
            <WorldCanvas />
          </Suspense>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />

          {/* Narrative Continuum Chapters */}
          <Hero />
          <Projects />
          <About />
          <Skills />
          <GitHubStats />
          <Certifications />
          <Contact />

          <Footer />
          <BackToTop />
          <WorkspaceHudDock />
          <DeferredOverlays />
        </motion.main>
      )}
    </AnimatePresence>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { WhyHireMe } from "@/components/portfolio/WhyHireMe";
import { LearningJourney } from "@/components/portfolio/LearningJourney";
import { GitHubStats } from "@/components/portfolio/GitHubStats";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Achievements } from "@/components/portfolio/Achievements";
import { TerminalMode } from "@/components/portfolio/Terminal";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { AIAssistant } from "@/components/portfolio/AIAssistant";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { BeyondCoding } from "@/components/portfolio/BeyondCoding";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { EasterEggs } from "@/components/portfolio/EasterEggs";


const SITE = "https://princechauhan.lovable.app";
const OG_IMAGE = `${SITE}/og-image.png`;
const TITLE = "Prince Chauhan | AI & ML Student | Aspiring Software Developer";
const DESC =
  "B.Tech CSE (AI & ML) student specializing in Python, React and machine learning. Building real projects and open to software and AI internships.";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "author", content: "Prince Chauhan" },
      { name: "robots", content: "index, follow" },
      { name: "language", content: "en" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:site_name", content: "Prince Chauhan Portfolio" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:secure_url", content: OG_IMAGE },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Prince Chauhan — B.Tech CSE (AI & ML) student and aspiring software developer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
      { name: "twitter:image:alt", content: "Prince Chauhan portfolio preview" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Prince Chauhan",
          url: `${SITE}/`,
          image: OG_IMAGE,
          jobTitle: "B.Tech CSE (AI & ML) Student",
          description: "Aspiring software developer learning React, JavaScript and Python. Open to internship opportunities.",
          address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
          email: "ps06222005@gmail.com",
          knowsAbout: ["Python", "JavaScript", "React", "Artificial Intelligence", "Machine Learning", "Web Development"],
          seeks: { "@type": "Demand", name: "Software development and AI/ML internship opportunities" },
          sameAs: [
            "https://github.com/ps06222005-oss",
            "https://www.linkedin.com/in/prince-chauhan-3418a3288",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${SITE}/#profilepage`,
          url: `${SITE}/`,
          name: TITLE,
          description: DESC,
          inLanguage: "en",
          isPartOf: { "@type": "WebSite", name: "Prince Chauhan Portfolio", url: `${SITE}/` },
          primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE, width: 1200, height: 630 },
          mainEntity: { "@type": "Person", name: "Prince Chauhan", url: `${SITE}/` },
          about: { "@type": "Person", name: "Prince Chauhan" },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${SITE}/#projects` },
              { "@type": "ListItem", position: 3, name: "Certifications", item: `${SITE}/#certifications` },
              { "@type": "ListItem", position: 4, name: "Contact", item: `${SITE}/#contact` },
            ],
          },
        }),
      },
    ],
  }),
});


function Portfolio() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <div aria-hidden className="noise-overlay" />
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <WhyHireMe />
      <LearningJourney />
      <GitHubStats />
      <Education />
      <Certifications />
      <Achievements />
      <BeyondCoding />
      <TerminalMode />
      <Contact />
      <Footer />
      <BackToTop />
      <AIAssistant />
      <CommandPalette />
      <EasterEggs />
    </main>
  );

}

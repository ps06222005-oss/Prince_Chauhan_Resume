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

const SITE = "https://princechauhan.lovable.app";
const OG_IMAGE = `${SITE}/og-image.png`;
const TITLE = "Prince Chauhan | B.Tech AI & ML Student & Aspiring Developer";
const DESC =
  "Portfolio of Prince Chauhan — B.Tech CSE (AI & ML) student from Ghaziabad, India, learning React, JavaScript and Python. Explore projects, skills, certificates and contact. Open to internships.";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Prince Chauhan, Prince Chauhan Portfolio, Prince Chauhan Website, Prince Chauhan Developer, B.Tech AI & ML Student, Aspiring Software Developer, React Portfolio, Python Projects, Portfolio Website, Student Developer" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:site_name", content: "Prince Chauhan" },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Prince Chauhan — B.Tech CSE (AI & ML) student and aspiring software developer" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
      { name: "twitter:image", content: OG_IMAGE },
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
    ],
  }),
});


function Portfolio() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <LoadingScreen />
      <ScrollProgress />
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
      <TerminalMode />
      <Contact />
      <Footer />
      <BackToTop />
      <AIAssistant />
      <CommandPalette />
    </main>
  );
}

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

const TITLE = "Prince Chauhan — Aspiring Software Developer & AI Enthusiast";
const DESC =
  "Portfolio of Prince Chauhan, B.Tech CSE (AI & ML) student from Ghaziabad, India. Python projects, JARVIS voice assistant, and open to software development & AI internships.";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "keywords", content: "Prince Chauhan, portfolio, software developer, AI enthusiast, Python, machine learning, B.Tech CSE, internship, JARVIS" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: "Prince Chauhan Portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Prince Chauhan",
          jobTitle: "B.Tech CSE (AI & ML) Student",
          description: "Aspiring Software Developer & AI Enthusiast",
          address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
          email: "ps06222005@gmail.com",
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
    <main className="relative min-h-screen bg-[#050816] text-foreground">
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

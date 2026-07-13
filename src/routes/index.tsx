import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { BackToTop } from "@/components/portfolio/BackToTop";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Certifications } from "@/components/portfolio/Certifications";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  component: Portfolio,
  head: () => ({
    meta: [
      { title: "Prince Chauhan — B.Tech CSE (AI & ML) Student & Aspiring Developer" },
      {
        name: "description",
        content:
          "Portfolio of Prince Chauhan — B.Tech CSE (AI & ML) student building Python projects and looking for software development and AI/ML internships.",
      },
      { property: "og:title", content: "Prince Chauhan — Portfolio" },
      {
        property: "og:description",
        content:
          "B.Tech CSE (AI & ML) student. Python projects, AI experiments, and internship-ready.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
      <Education />
      <Certifications />
      <Achievements />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}

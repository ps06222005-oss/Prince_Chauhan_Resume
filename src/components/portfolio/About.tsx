import {
  GraduationCap,
  Sparkles,
  Target,
  Compass,
  Download,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { MagneticButton } from "./MagneticButton";

/**
 * About — About Me & Capabilities matching the reference design:
 * - Clean light surface (#f8fafc)
 * - "Curious. Consistent. Always Building."
 * - Education card (SDGU B.Tech CSE AI & ML)
 * - Focus Areas, Open To, and "Turning Ideas Into Real Products" vision card
 */
export function About() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="about"
      aria-label="About Prince Chauhan"
      className="relative w-full overflow-hidden bg-[#f8fafc] text-slate-900 py-20 sm:py-28 border-t border-slate-200"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Main Grid: Left Story / Right Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* -----------------------------------------------------------------
              LEFT COLUMN (5 COLS): STORY & ACTIONS
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 tracking-wider uppercase">
                <span className="text-blue-500">◆</span>
                <span>ABOUT ME</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-slate-950 leading-[1.1]">
                Curious. Consistent. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                  Always Building.
                </span>
              </h2>
            </div>

            <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              I'm Prince Chauhan, a B.Tech CSE (AI &amp; ML) student passionate about building
              useful products and exploring new technologies. I enjoy working on web development,
              machine learning, and automation projects that solve real problems.
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-500 leading-relaxed">
              My engineering approach focuses on first principles: understanding the audio buffer,
              the speech recognition pipeline, and modern reactive web architectures rather than
              simply relying on opaque black-box tools.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollTo("skills")}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 font-sans text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <span>More About Me</span>
                <ArrowRight size={14} />
              </button>

              <MagneticButton
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Resume"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 font-sans text-xs font-semibold shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <Download size={14} className="text-blue-600" />
                <span>Download Resume</span>
              </MagneticButton>
            </div>
          </div>

          {/* -----------------------------------------------------------------
              RIGHT COLUMN (7 COLS): BENTO CARDS SPREAD
              ----------------------------------------------------------------- */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Bento Card 1: Education */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Education
                  </div>
                  <div className="font-display font-bold text-sm text-slate-900">
                    B.Tech CSE (AI &amp; ML)
                  </div>
                </div>
              </div>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                <strong>Sunderdeep Global University (SDGU)</strong> <br />
                Ghaziabad, Uttar Pradesh · Delhi NCR <br />
                <span className="text-blue-600 font-medium">2024 – 2028 | Pursuing</span>
              </p>
            </div>

            {/* Bento Card 2: Focus Areas */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-50 text-violet-600 border border-violet-100">
                  <Target size={20} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Focus Areas
                  </div>
                  <div className="font-display font-bold text-sm text-slate-900">
                    Engineering Domains
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Full Stack Development",
                  "AI / Machine Learning",
                  "Automation Systems",
                  "Real World Projects",
                ].map((area) => (
                  <span
                    key={area}
                    className="rounded-md bg-slate-100 border border-slate-200/80 px-2 py-0.5 text-[11px] font-sans font-medium text-slate-700"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Bento Card 3: Open To */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
                  <Compass size={20} />
                </div>
                <div>
                  <div className="font-mono text-[10px] text-slate-400 uppercase font-semibold">
                    Open To
                  </div>
                  <div className="font-display font-bold text-sm text-slate-900">Opportunities</div>
                </div>
              </div>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Actively seeking Software Development &amp; AI/ML Internships, technical open-source
                collaborations, and innovative project builds.
              </p>
              <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <span>Responds within 24 hours</span>
              </div>
            </div>

            {/* Bento Card 4: Inspirational Vision Card */}
            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-violet-50/50 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 text-blue-600 font-mono text-[10px] uppercase font-bold">
                  <Sparkles size={12} />
                  <span>CREATIVE TECH VISION</span>
                </div>
                <h3 className="font-display font-black text-xl text-slate-950 leading-tight">
                  Turning Ideas Into Real Products.
                </h3>
              </div>
              <p className="font-sans text-xs text-slate-600 leading-relaxed">
                Building at the intersection of modern Web, AI intelligence, and human creativity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

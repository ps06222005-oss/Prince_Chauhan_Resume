import { GraduationCap, ArrowRight, Download, Sparkles } from "lucide-react";
import { RESUME_PATH, RESUME_FILENAME } from "@/lib/resume";
import { MagneticButton } from "./MagneticButton";

/**
 * About — 3-Column Bento Section matching reference image:
 *
 * Col 1: ◆ ABOUT ME eyebrow, headline "Curious. Consistent. Always Building.",
 *        narrative bio, SDGU education callout, and "More About Me →" + Resume actions.
 * Col 2: 2x2 Metric Grid:
 *        - 10+ Projects Completed
 *        - 2+ Years Learning
 *        - 5+ Technologies
 *        - 100% Dedication
 * Col 3: Dark quote card with subtle atmospheric glow and handwritten cursive quote:
 *        "Better Tools Brighter Tomorrows. — Prince Chauhan"
 */
export function About() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="about"
      aria-label="About Prince Chauhan"
      className="relative w-full overflow-hidden bg-[#f8fafc] text-slate-900 py-20 sm:py-28 border-t border-slate-200/80"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 3-Column Layout from Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
          {/* =================================================================
              COLUMN 1 (4 COLS): NARRATIVE & IDENTITY
              ================================================================= */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-600 tracking-wider uppercase">
                <span className="text-blue-500">◆</span>
                <span>ABOUT ME</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl xl:text-5xl tracking-tight text-slate-950 leading-[1.1]">
                Curious. Consistent. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  Always Building.
                </span>
              </h2>

              <p className="font-sans text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                I'm Prince Chauhan, a B.Tech CSE (AI &amp; ML) student passionate about building
                useful products and exploring new technologies. I enjoy working on web development,
                machine learning, and automation projects that solve real problems.
              </p>

              {/* Education Callout */}
              <div className="rounded-xl border border-slate-200/90 bg-white p-3.5 shadow-xs flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                  <GraduationCap size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-display font-bold text-xs text-slate-900 leading-tight">
                    Sunderdeep Global University (SDGU)
                  </div>
                  <div className="font-sans text-[11px] text-slate-500 mt-0.5">
                    B.Tech CSE (AI &amp; ML) · 2024–2028 · Delhi NCR
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: "More About Me →" + Download Resume */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => scrollTo("skills")}
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 hover:bg-slate-800 text-white px-5 py-2.5 font-sans text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
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
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 px-4 py-2.5 font-sans text-xs font-semibold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <Download size={13} className="text-blue-600" />
                <span>Resume</span>
              </MagneticButton>
            </div>
          </div>

          {/* =================================================================
              COLUMN 2 (4 COLS): 2x2 METRIC CARDS
              ================================================================= */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            {/* Metric 1 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                10+
              </div>
              <div className="mt-2 font-sans text-xs text-slate-500 font-medium leading-tight">
                Projects Completed
              </div>
            </div>

            {/* Metric 2 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                2+
              </div>
              <div className="mt-2 font-sans text-xs text-slate-500 font-medium leading-tight">
                Years Learning
              </div>
            </div>

            {/* Metric 3 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="font-display font-black text-3xl sm:text-4xl text-slate-950 tracking-tight">
                5+
              </div>
              <div className="mt-2 font-sans text-xs text-slate-500 font-medium leading-tight">
                Technologies
              </div>
            </div>

            {/* Metric 4 */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="font-display font-black text-3xl sm:text-4xl text-blue-600 tracking-tight">
                100%
              </div>
              <div className="mt-2 font-sans text-xs text-slate-500 font-medium leading-tight">
                Dedication
              </div>
            </div>
          </div>

          {/* =================================================================
              COLUMN 3 (4 COLS): CINEMATIC DARK QUOTE CARD
              ================================================================= */}
          <div className="lg:col-span-4 rounded-3xl bg-[#090d18] border border-slate-800/90 text-white p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden min-h-[300px]">
            {/* Ambient Lighting & Bokeh Mesh */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/40 via-slate-900 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-violet-600/25 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px]"
            />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-mono font-semibold text-cyan-300 border border-white/10">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>PHILOSOPHY</span>
              </div>
              <span className="text-white/40 text-[10px] font-mono tracking-wider">01 // CODE</span>
            </div>

            {/* Cursive Quote Display */}
            <div className="relative z-10 my-auto py-6">
              <p className="font-script text-white text-3xl sm:text-4xl xl:text-[42px] leading-[1.2] tracking-wide select-none drop-shadow-md font-normal">
                “Better Tools <br />
                Brighter Tomorrows.”
              </p>
            </div>

            {/* Card Attribution Footer */}
            <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-sm text-white">Prince Chauhan</div>
                <div className="font-mono text-[11px] text-slate-400">
                  AI/ML Student &amp; Full Stack Builder
                </div>
              </div>
              <div className="font-mono text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Sparkles size={13} className="text-amber-400" />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

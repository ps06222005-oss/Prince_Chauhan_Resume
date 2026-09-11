import { GraduationCap, ShieldCheck, BookOpen, MapPin, Calendar, CheckCircle2 } from "lucide-react";

/**
 * Certifications & Academic Credentials
 *
 * Visual System: BLACK + CHROME + IVORY + ULTRAVIOLET
 * Strictly grounded in real academic and verifiable credentials:
 * - Bachelor of Technology in Computer Science & Engineering (AI & ML)
 * - Sunderdeep Global University (2024–2028), Ghaziabad / Delhi NCR
 * - Core Academic Competencies
 * - Zero fabricated certificates or placeholder claims
 */

const CORE_MODULES = [
  "Data Structures & Algorithms",
  "Design & Analysis of Algorithms",
  "Operating Systems & Architecture",
  "Object-Oriented Programming (Python/C++)",
  "Discrete Mathematics & Logic",
  "Linear Algebra & Probability",
  "Foundations of Machine Learning",
  "Database Management Systems",
];

export function Certifications() {
  return (
    <section
      id="certifications"
      aria-label="Academic Degree and Credentials"
      className="relative w-full overflow-hidden bg-[#08090c] py-20 sm:py-32 border-t border-white/[0.08]"
    >
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/[0.06] pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="font-mono text-xs text-violet-400 tracking-widest uppercase">
              ACADEMIC DEGREE &amp; CREDENTIALS
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-6xl tracking-[-0.035em] text-white">
              Institutional Rigor. <br />
              <span className="text-gradient-chrome">Verified Studies.</span>
            </h2>

            <p className="font-sans text-base sm:text-lg text-white/70 leading-relaxed font-light">
              Transparent, dignified documentation of university education and academic coursework.
              Integrity built strictly through verifiable facts.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-violet-300 bg-violet-500/[0.08] px-4 py-2 rounded-full border border-violet-500/25">
            <ShieldCheck size={14} className="text-violet-400" />
            <span>VERIFIED ACADEMIC ENROLLMENT</span>
          </div>
        </div>

        {/* Primary Formal Academic Credential */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#0e1017] p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-2 font-mono text-xs text-violet-400 font-semibold uppercase tracking-wider">
                <GraduationCap size={16} />
                <span>FORMAL UNIVERSITY DEGREE</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-white">
                  Bachelor of Technology (B.Tech)
                </h3>
                <div className="font-mono text-base text-violet-300 font-medium">
                  Computer Science &amp; Engineering (Artificial Intelligence &amp; Machine
                  Learning)
                </div>
              </div>

              <p className="font-sans text-base text-white/75 leading-relaxed font-light max-w-2xl">
                4-year undergraduate curriculum at Sunderdeep Global University. Comprehensive
                computational coursework covering discrete mathematics, algorithmic problem solving,
                software engineering principles, and core artificial intelligence architectures.
              </p>

              {/* Core Coursework Grid */}
              <div className="space-y-3 pt-2">
                <div className="font-mono text-xs text-white/40 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={13} />
                  <span>CORE COURSEWORK &amp; DISCIPLINES</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {CORE_MODULES.map((mod) => (
                    <div
                      key={mod}
                      className="flex items-center gap-2 text-xs font-mono text-white/70 bg-white/[0.02] border border-white/[0.04] px-3.5 py-2 rounded-lg"
                    >
                      <CheckCircle2 size={13} className="text-violet-400 shrink-0" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* University Metadata Side Panel */}
            <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-[#08090c] space-y-5 font-mono text-xs">
              <div className="space-y-1 border-b border-white/[0.06] pb-4">
                <div className="text-white/40 uppercase text-[10px]">Institution</div>
                <div className="text-white font-bold text-sm">Sunderdeep Global University</div>
                <div className="text-white/50 text-xs flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-violet-400" />
                  <span>Ghaziabad, Uttar Pradesh, India</span>
                </div>
              </div>

              <div className="space-y-1 border-b border-white/[0.06] pb-4">
                <div className="text-white/40 uppercase text-[10px]">Program Duration</div>
                <div className="text-white font-bold text-sm">2024 — 2028 (Currently Enrolled)</div>
                <div className="text-white/50 text-xs flex items-center gap-1 mt-1">
                  <Calendar size={12} className="text-violet-400" />
                  <span>4-Year Full-Time B.Tech Degree</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-white/40 uppercase text-[10px]">
                  Certification Audit Status
                </div>
                <div className="text-emerald-400 font-semibold text-xs">
                  In adherence to engineering authenticity, industry certifications will be added
                  upon official issuance and verification.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

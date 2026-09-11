import React from "react";

interface PCLogoProps {
  className?: string;
  glow?: boolean;
}

/**
 * Luxury PC brand monogram matching the new design identity:
 * Black + Chrome + Ivory + Ultraviolet.
 * Dual-tone metallic platinum/chrome 'P' with deep electric ultraviolet 'C'.
 * Fully vector-based, responsive, and razor-sharp on all displays.
 */
export function PCLogo({ className = "h-8 w-auto", glow = true }: PCLogoProps) {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {glow && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1.5 opacity-40 blur-md bg-[radial-gradient(ellipse_at_70%_50%,rgba(139,92,246,0.5),rgba(56,189,248,0.2),transparent_75%)]"
        />
      )}
      <svg
        viewBox="0 0 110 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-auto overflow-visible"
        aria-label="Prince Chauhan Monogram"
      >
        <defs>
          {/* Metallic Chrome / Platinum gradient for 'P' */}
          <linearGradient id="pc-p-chrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Electric Ultraviolet / Deep Violet gradient for 'C' */}
          <linearGradient id="pc-c-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="35%" stopColor="#8B5CF6" />
            <stop offset="75%" stopColor="#6D28D9" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>

          {/* Subtle inner highlight / bevel depth */}
          <linearGradient id="pc-depth-bevel" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
          </linearGradient>

          {/* Soft ultraviolet glow */}
          <filter id="pc-violet-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LETTER 'P' (Bold geometric sans stem & loop in polished chrome) --- */}
        <path
          d="M 6 6 L 36 6 C 45 6 50 11 50 20 C 50 29 44 34 35 34 L 20 34 L 20 46 L 6 46 Z"
          fill="url(#pc-p-chrome)"
        />
        {/* 'P' inner cutout */}
        <path
          d="M 20 16 L 33 16 C 36 16 38 18 38 20 C 38 22 36 24 33 24 L 20 24 Z"
          fill="#08090c"
        />
        {/* 'P' metallic highlight facet */}
        <path
          d="M 6 6 L 36 6 C 45 6 50 11 50 20 C 50 20.5 49.9 21 49.8 21.5 C 48.5 13.5 43 9 34 9 L 9 9 L 9 46 L 6 46 Z"
          fill="url(#pc-depth-bevel)"
          opacity="0.75"
        />

        {/* --- LETTER 'C' (Interlocking glowing electric ultraviolet arc) --- */}
        <g filter="url(#pc-violet-glow)">
          <path
            d="M 96 15 L 83 23 C 80 18 73 16 67 16 C 55 16 48 24 48 31 C 48 38 55 46 67 46 C 74 46 81 43 85 37 L 98 44 C 91 53 80 52 67 52 C 47 52 34 39 34 31 C 34 19 47 10 67 10 C 79 10 90 14 96 15 Z"
            fill="url(#pc-c-violet)"
          />
          {/* 'C' upper rim highlight */}
          <path
            d="M 96 15 L 83 23 C 80 18 73 16 67 16 C 55 16 48 24 48 25 C 49 19 56 12 67 12 C 79 12 90 15 96 15 Z"
            fill="#DDD6FE"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  );
}

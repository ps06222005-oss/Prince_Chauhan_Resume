import React, { useRef, useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  download?: string;
  target?: string;
  rel?: string;
  title?: string;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  "aria-label"?: string;
  dataCursor?: string;
}

/**
 * MagneticButton — Deterministic SSR-safe tactile spring magnet
 *
 * Pulls subtly toward cursor position on hover without SSR/client hydration branching.
 */
export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  download,
  target,
  rel,
  title,
  strength = 0.32,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
  dataCursor = "link",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const wrapperStyle: React.CSSProperties = {
    transform:
      position.x === 0 && position.y === 0
        ? undefined
        : `translate3d(${position.x.toFixed(2)}px, ${position.y.toFixed(2)}px, 0)`,
    transition: "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
  };

  if (href) {
    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={wrapperStyle}
        className="inline-block"
      >
        <a
          href={href}
          download={download}
          target={target}
          rel={rel}
          title={title}
          aria-label={ariaLabel}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          data-cursor={dataCursor}
          className={className}
        >
          {children}
        </a>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={wrapperStyle}
      className="inline-block"
    >
      <button
        type={type}
        title={title}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        data-cursor={dataCursor}
        className={className}
      >
        {children}
      </button>
    </div>
  );
}

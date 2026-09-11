import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
 * MagneticButton — Framer Motion tactile spring magnet
 *
 * Pulls subtly toward cursor position on hover with organic mass and damping.
 * Automatically respects `prefers-reduced-motion`.
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
  strength = 0.35,
  type = "button",
  disabled = false,
  "aria-label": ariaLabel,
  dataCursor = "link",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || disabled || !ref.current) return;
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

  const motionProps = {
    animate: shouldReduceMotion ? { x: 0, y: 0 } : { x: position.x, y: position.y },
    transition: { type: "spring", stiffness: 220, damping: 18, mass: 0.1 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: "inline-block",
  };

  if (href) {
    return (
      <motion.div ref={ref} {...motionProps}>
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
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} {...motionProps}>
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
    </motion.div>
  );
}

import { useEffect, useState, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Duration in seconds */
  duration?: number;
  /** Direction from which the element slides into view */
  direction?: RevealDirection;
  /** Pixel distance for the slide transition */
  distance?: number;
  /** Whether to animate only the first time the element enters the viewport */
  once?: boolean;
  /** Viewport intersection threshold (0 to 1) */
  amount?: number;
}

/**
 * ScrollReveal — SSR-Safe Framer Motion Scroll-Triggered Fade & Slide Component
 *
 * - Animates elements fading and sliding into view (`whileInView`) as the user scrolls down the page.
 * - Strictly respects the user's `prefers-reduced-motion` OS/browser setting (combined with global `<MotionConfig reducedMotion="user">`).
 * - Deterministic initial SSR & client render state to guarantee zero hydration mismatches.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  direction = "up",
  distance = 28,
  once = true,
  amount = 0.15,
}: ScrollRevealProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const getInitialOffset = (): { x: number; y: number } => {
    if (prefersReducedMotion) return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      case "none":
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{
        opacity: prefersReducedMotion ? 1 : 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, amount, margin: "0px 0px -48px 0px" }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}

/**
 * StaggerRevealGroup — Orchestrates sequential fade-and-slide animations for child items on scroll.
 */
export function StaggerRevealGroup({
  children,
  className,
  staggerChildren = 0.09,
  delayChildren = 0.04,
  once = true,
  amount = 0.12,
}: StaggerContainerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            staggerChildren,
            delayChildren,
          },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -40px 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

/**
 * StaggerRevealItem — Child element within a StaggerRevealGroup that fades and slides into view.
 */
export function StaggerRevealItem({ children, className, distance = 22 }: StaggerItemProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const itemVariants: Variants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : {
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

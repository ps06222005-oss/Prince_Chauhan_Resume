import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ImageOff, Sparkles } from "lucide-react";

interface LazyProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
}

export function LazyProjectImage({
  src,
  alt,
  className = "",
  containerClassName = "",
  priority = false,
}: LazyProjectImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (priority || isInView) return;

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "250px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority, isInView]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800/60 ${containerClassName}`}
    >
      {/* Animated Shimmer Skeleton Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-slate-200/70 dark:bg-slate-800">
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent animate-shimmer" />
          <div className="flex flex-col items-center gap-1 text-muted-foreground/60">
            <Sparkles className="h-5 w-5 animate-pulse text-sky-500/50" />
            <span className="font-mono text-[10px] tracking-widest uppercase">Loading Asset</span>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 via-sky-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-sky-950/60 p-6 text-center">
          <ImageOff className="h-6 w-6 text-primary/70" />
          <span className="font-mono text-xs font-medium text-foreground/80">{alt}</span>
          <span className="font-mono text-[10px] text-muted-foreground">
            Switch to Live Simulation for interactive view
          </span>
        </div>
      )}

      {/* Lazy Loaded Image with Blur-Up Transition */}
      {isInView && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          initial={{ opacity: 0, filter: "blur(14px) scale(1.04)" }}
          animate={
            isLoaded
              ? { opacity: 1, filter: "blur(0px) scale(1)" }
              : { opacity: 0, filter: "blur(14px) scale(1.04)" }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`w-full h-full object-cover transition-transform duration-500 ${className}`}
        />
      )}
    </div>
  );
}

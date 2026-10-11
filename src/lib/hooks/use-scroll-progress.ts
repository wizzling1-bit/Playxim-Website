"use client";

import * as React from "react";

export interface ScrollProgressOptions {
  /** Offset thresholds: [start, end] where 0 is when top enters bottom of viewport, 1 is when bottom leaves top */
  startOffset?: number; // 0 to 1
  endOffset?: number; // 0 to 1
}

/**
 * High-performance, rAF-based element scroll progress hook.
 * Returns a smoothed normalized value between 0 and 1 representing the element's position in the viewport.
 * Works seamlessly with both native window scroll and Lenis smooth scroll.
 */
export function useElementScroll(
  ref: React.RefObject<HTMLElement | null>,
  options: ScrollProgressOptions = {}
) {
  const { startOffset = 0, endOffset = 1 } = options;
  const [progress, setProgress] = React.useState<number>(0);
  const progressRef = React.useRef<number>(0);
  const rafId = React.useRef<number>(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0.5);
      return;
    }

    const calculate = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Element top relative to viewport bottom
      // 0 when rect.top == windowHeight (just entering)
      // 1 when rect.bottom == 0 (just leaving top)
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      let rawProgress = totalDist > 0 ? currentDist / totalDist : 0;

      // Normalize with start/end offsets
      const span = Math.max(0.001, endOffset - startOffset);
      const normalized = Math.min(1, Math.max(0, (rawProgress - startOffset) / span));

      if (Math.abs(normalized - progressRef.current) > 0.002) {
        progressRef.current = normalized;
        setProgress(normalized);
      }
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(() => {
          calculate();
          ticking = false;
        });
      }
    };

    calculate();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Also subscribe to Lenis if available on window
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ref, startOffset, endOffset]);

  return progress;
}

/**
 * Global window scroll progress and velocity tracker.
 */
export function useWindowScroll() {
  const [scrollY, setScrollY] = React.useState(0);
  const [velocity, setVelocity] = React.useState(0);
  const lastScrollRef = React.useRef(0);
  const rafId = React.useRef(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;
    const update = () => {
      const current = window.scrollY;
      const delta = current - lastScrollRef.current;
      lastScrollRef.current = current;

      setScrollY(current);
      setVelocity(delta);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return { scrollY, velocity };
}

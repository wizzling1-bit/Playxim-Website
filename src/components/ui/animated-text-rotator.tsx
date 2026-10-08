"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface AnimatedTextRotatorProps {
  words: string[];
  intervalMs?: number;
  className?: string;
  gradient?: boolean;
}

export function AnimatedTextRotator({
  words,
  intervalMs = 3000,
  className,
  gradient = true,
}: AnimatedTextRotatorProps) {
  const [index, setIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  React.useEffect(() => {
    if (words.length <= 1) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsTransitioning(false);
      }, 350); // half duration for slide-out before slide-in
    }, intervalMs);

    return () => clearInterval(interval);
  }, [words.length, intervalMs]);

  const currentWord = words[index];

  return (
    <span
      className={cn(
        "inline-block transition-all duration-300 transform",
        isTransitioning
          ? "opacity-0 -translate-y-2 blur-[2px]"
          : "opacity-100 translate-y-0 blur-0",
        gradient && "text-gradient-shimmer font-extrabold",
        className
      )}
      style={{
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {currentWord}
    </span>
  );
}

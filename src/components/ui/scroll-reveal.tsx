"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: "fade-up" | "fade-down" | "fade-in" | "zoom-in" | "slide-left" | "slide-right";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delayMs = 0,
  durationMs = 650,
  threshold = 0.1,
  once = true,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const domRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // If user prefers reduced motion, show immediately without animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, once]);

  // Initial vs target transforms per animation style
  const getTransformStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: "none",
      };
    }

    switch (animation) {
      case "fade-up":
        return {
          opacity: 0,
          transform: "translateY(24px)",
        };
      case "fade-down":
        return {
          opacity: 0,
          transform: "translateY(-24px)",
        };
      case "zoom-in":
        return {
          opacity: 0,
          transform: "scale(0.95)",
        };
      case "slide-left":
        return {
          opacity: 0,
          transform: "translateX(24px)",
        };
      case "slide-right":
        return {
          opacity: 0,
          transform: "translateX(-24px)",
        };
      case "fade-in":
      default:
        return {
          opacity: 0,
          transform: "none",
        };
    }
  };

  const dynamicStyles: React.CSSProperties = {
    ...getTransformStyles(),
    transitionProperty: "opacity, transform",
    transitionDuration: `${durationMs}ms`,
    transitionDelay: `${delayMs}ms`,
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)", // Apple-like decelerated spring
    willChange: isVisible ? "auto" : "opacity, transform",
    ...style,
  };

  return (
    <div
      ref={domRef}
      className={cn("w-full", className)}
      style={dynamicStyles}
      {...props}
    >
      {children}
    </div>
  );
}

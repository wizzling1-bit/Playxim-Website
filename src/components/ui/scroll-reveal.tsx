"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  delay?: number;
  delayMs?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  animation?: string;
  distance?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  variant?: "slide" | "fade" | "scale" | "subtle" | "perspective";
}

export function ScrollReveal({
  children,
  delay = 0,
  delayMs,
  direction = "up",
  animation,
  distance = 24,
  duration = 680,
  className,
  once = true,
  variant = "slide",
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  const effectiveDelay = delayMs !== undefined ? delayMs : delay;
  const effectiveDirection = animation?.includes("down")
    ? "down"
    : animation?.includes("left")
    ? "left"
    : animation?.includes("right")
    ? "right"
    : direction;

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(isReduced);

    if (isReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && elementRef.current) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [once]);

  const getTransform = () => {
    if (prefersReducedMotion) return "none";
    if (isVisible) return "perspective(1200px) translate3d(0, 0, 0) scale(1) rotateX(0deg)";

    if (variant === "fade") {
      return "none";
    }

    if (variant === "perspective") {
      return `perspective(1200px) rotateX(3.5deg) translate3d(0, ${distance + 8}px, 0) scale(0.985)`;
    }

    if (variant === "scale") {
      return "perspective(1200px) scale(0.96) translate3d(0, 16px, 0)";
    }

    if (variant === "subtle") {
      return "perspective(1200px) translate3d(0, 12px, 0)";
    }

    // Default slide with restrained perspective tilt
    switch (effectiveDirection) {
      case "up":
        return `perspective(1200px) rotateX(2deg) translate3d(0, ${distance}px, 0)`;
      case "down":
        return `perspective(1200px) rotateX(-2deg) translate3d(0, -${distance}px, 0)`;
      case "left":
        return `perspective(1200px) translate3d(${distance}px, 0, 0)`;
      case "right":
        return `perspective(1200px) translate3d(-${distance}px, 0, 0)`;
      default:
        return "none";
    }
  };

  const getFilter = () => {
    if (prefersReducedMotion) return "none";
    return isVisible ? "blur(0px)" : "blur(2px)";
  };

  return (
    <div
      ref={elementRef}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        filter: getFilter(),
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${effectiveDelay}ms`,
        willChange: "opacity, transform, filter",
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;

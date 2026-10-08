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
}

export function ScrollReveal({
  children,
  delay = 0,
  delayMs,
  direction = "up",
  animation,
  distance = 32,
  duration = 750,
  className,
  once = true,
  ...props
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  const effectiveDelay = delayMs !== undefined ? delayMs : delay;
  const effectiveDirection = animation?.includes("down")
    ? "down"
    : animation?.includes("left")
    ? "left"
    : animation?.includes("right")
    ? "right"
    : direction;

  React.useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        rootMargin: "0px 0px -40px 0px",
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
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";
    switch (effectiveDirection) {
      case "up":
        return `translate3d(0, ${distance}px, 0) scale(0.99)`;
      case "down":
        return `translate3d(0, -${distance}px, 0) scale(0.99)`;
      case "left":
        return `translate3d(${distance}px, 0, 0) scale(0.99)`;
      case "right":
        return `translate3d(-${distance}px, 0, 0) scale(0.99)`;
      default:
        return "translate3d(0, 0, 0) scale(0.99)";
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        transform: getTransform(),
        opacity: isVisible ? 1 : 0,
        transitionProperty: "opacity, transform",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${effectiveDelay}ms`,
        willChange: "opacity, transform",
      }}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;

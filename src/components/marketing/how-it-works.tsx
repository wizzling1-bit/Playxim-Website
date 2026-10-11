"use client";

import * as React from "react";
import { UploadCloud, Link as LinkIcon, Share2, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function HowItWorksSection() {
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setScrollProgress(1);
      return;
    }

    let rafId: number;
    let ticking = false;

    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress starting when section enters middle of screen
      // 0 when rect.top == windowHeight * 0.8
      // 1 when rect.bottom == windowHeight * 0.3
      const start = windowHeight * 0.8;
      const end = windowHeight * 0.2;
      const rawProgress = (start - rect.top) / (rect.height + (start - end));
      const p = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(p);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", onScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", onScroll);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const steps = [
    {
      step: "01",
      title: "Upload Your File",
      description: "Upload any video, APK, or document via web dashboard or our Telegram bot.",
      icon: <UploadCloud className="h-6 w-6 text-brand-primary" />,
      color: "border-brand-primary/40 bg-brand-primary/10 text-brand-primary",
      activeGlow: "shadow-brand-primary/25 ring-2 ring-brand-primary/50",
      threshold: 0.15,
    },
    {
      step: "02",
      title: "Get Instant Link",
      description: "Get a clean, direct share link ready to send with a single click.",
      icon: <LinkIcon className="h-6 w-6 text-brand-secondary" />,
      color: "border-brand-secondary/40 bg-brand-secondary/10 text-brand-secondary",
      activeGlow: "shadow-brand-secondary/25 ring-2 ring-brand-secondary/50",
      threshold: 0.4,
    },
    {
      step: "03",
      title: "Share with Viewers",
      description: "Post your link on Telegram channels, WhatsApp groups, YouTube, or forums.",
      icon: <Share2 className="h-6 w-6 text-emerald-500" />,
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
      activeGlow: "shadow-emerald-500/25 ring-2 ring-emerald-500/50",
      threshold: 0.65,
    },
    {
      step: "04",
      title: "Earn & Cash Out",
      description: "Earn $1.00 for every 1,000 views and withdraw daily to UPI, Bank, or Crypto.",
      icon: <DollarSign className="h-6 w-6 text-amber-500" />,
      color: "border-amber-500/40 bg-amber-500/10 text-amber-500",
      activeGlow: "shadow-amber-500/25 ring-2 ring-amber-500/50",
      threshold: 0.88,
    },
  ];

  // Dynamic line fill percentage based on continuous scroll progress, with hover override preview
  const activePercent = hoveredIndex !== null
    ? ((hoveredIndex + 1) / steps.length) * 100
    : Math.min(100, Math.max(0, scrollProgress * 115));

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 sm:py-28 border-t border-brand-border bg-transparent relative overflow-hidden"
    >
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600} variant="subtle">
          <SectionHeader
            badge={<Badge variant="default">Simple Workflow</Badge>}
            title="Start Earning in 4 Simple Steps"
            description="From uploading your first file to receiving your first payout in under 5 minutes. No complicated setup."
          />
        </ScrollReveal>

        {/* 4 Connected Circular Steps with Progressive Bidirectional Activation Track */}
        <div className="relative mt-12 sm:mt-18">
          {/* Desktop Connecting Line — Base Track */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-slate-200 dark:bg-slate-800 -z-0" />

          {/* Desktop Connecting Line — Bidirectional Animated Illuminating Flow */}
          <div
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-brand-primary via-emerald-400 to-amber-400 -z-0 transition-all duration-300 ease-out"
            style={{
              clipPath: `polygon(0 0, ${activePercent}% 0, ${activePercent}% 100%, 0 100%)`,
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 relative z-10">
            {steps.map((item, idx) => {
              const isPassed = scrollProgress >= item.threshold;
              const isHovered = hoveredIndex === idx;
              const isNodeActive = isPassed || (hoveredIndex !== null && hoveredIndex >= idx);

              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`flex flex-col items-center text-center p-7 rounded-2xl bg-brand-surface border transition-all duration-300 group h-full cursor-default ${
                    isHovered
                      ? "border-brand-primary/60 shadow-lg -translate-y-1.5"
                      : isNodeActive
                      ? "border-brand-primary/30 shadow-md -translate-y-0.5"
                      : "border-brand-border shadow-xs hover:border-brand-primary/40 hover:-translate-y-1"
                  }`}
                >
                  {/* Step Circle with Icon */}
                  <div className="relative mb-5">
                    <div
                      className={`h-20 w-20 rounded-full border-2 flex items-center justify-center shadow-lg transition-all duration-300 ${
                        item.color
                      } ${isNodeActive ? item.activeGlow : "opacity-80"} ${
                        isHovered ? "scale-110" : isNodeActive ? "scale-105" : "scale-100"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`absolute -bottom-2 -right-1 font-mono text-xs font-black px-2 py-0.5 rounded-full border shadow-xs transition-colors duration-300 ${
                        isNodeActive
                          ? "bg-brand-primary text-white border-brand-primary"
                          : "bg-brand-surface text-brand-text border-brand-border"
                      }`}
                    >
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-display font-bold text-brand-text mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <ScrollReveal delay={250} duration={600} variant="subtle">
          <div className="mt-12 text-center">
            <Link href="/auth/sign-up">
              <Button size="lg" variant="primary" className="rounded-full shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                <span>Create Free Account Now</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export default HowItWorksSection;

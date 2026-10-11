"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FinalCtaSection() {
  const [inView, setInView] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 relative overflow-hidden border-t border-brand-border bg-gradient-to-b from-transparent via-brand-primary/[0.04] to-transparent"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-tr from-brand-primary/15 via-brand-secondary/10 to-transparent blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Decorative Settling Accents */}
      <div
        className={`hidden lg:flex absolute top-16 left-12 items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface/90 border border-brand-border shadow-md backdrop-blur-md text-xs font-semibold text-brand-muted pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? "opacity-90 translate-y-0" : "opacity-0 -translate-y-6"
        }`}
      >
        <Zap className="h-3.5 w-3.5 text-brand-primary" />
        <span>Instant Setup</span>
      </div>

      <div
        className={`hidden lg:flex absolute bottom-16 right-12 items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface/90 border border-brand-border shadow-md backdrop-blur-md text-xs font-semibold text-brand-muted pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          inView ? "opacity-90 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ transitionDelay: "150ms" }}
      >
        <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
        <span>Daily Payouts Verified</span>
      </div>

      <Container className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 space-y-7">
        <ScrollReveal duration={700} variant="subtle">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-surface border border-brand-border shadow-xs text-brand-primary">
            <Sparkles className="h-3.5 w-3.5 text-brand-primary" />
            <span>Start in Under 60 Seconds</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text leading-[1.08] mt-4 max-w-3xl mx-auto">
            Ready to Start Earning from Your Videos?
          </h2>

          {/* Supporting Line */}
          <p className="text-base sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed mt-4">
            Join over 500,000 creators who use Playxim for unlimited cloud storage, instant share links, and guaranteed{" "}
            <strong className="text-brand-text font-semibold">$1.00 per 1,000 views</strong> daily payouts.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                variant="primary"
                className="h-12 sm:h-13 px-8 text-sm sm:text-base font-semibold rounded-full group shadow-xl shadow-brand-primary/25 hover:shadow-brand-secondary/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start Uploading Free</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="https://t.me/playxim" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 sm:h-13 px-7 text-sm sm:text-base font-semibold rounded-full bg-brand-surface text-brand-text border border-brand-border shadow-xs hover:bg-brand-bg-soft hover:scale-[1.01] active:scale-[0.98] transition-all"
              >
                Open Telegram Bot
              </Button>
            </a>
          </div>

          {/* Reassurance Line */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-brand-muted font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>No Credit Card Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Unlimited Free Storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Daily Payouts from $5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>24/7 Creator Support</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

export default FinalCtaSection;

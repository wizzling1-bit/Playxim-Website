"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function FinalCtaSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden border-t border-brand-border bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent">
      {/* Background ambient animated glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-gradient-to-tr from-brand-primary/20 via-brand-glow/15 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-7">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-surface border border-brand-border shadow-xs text-brand-primary">
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-primary" />
          <span>Start in Under 60 Seconds</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text leading-[1.08]">
          Ready to Monetize Your Content?
        </h2>

        {/* Supporting Line */}
        <p className="text-base sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
          Join over 500,000 creators who trust Playxim for unlimited cloud storage, high-speed streaming, and automated daily payouts.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              variant="primary"
              className="h-12 sm:h-13 px-8 text-sm sm:text-base font-semibold rounded-full group shadow-xl shadow-brand-primary/25 hover:shadow-brand-glow/30"
            >
              <span>Start Uploading Free</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
          <a href="#pricing">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 sm:h-13 px-7 text-sm sm:text-base font-semibold rounded-full border border-brand-border hover:bg-brand-bg-soft"
            >
              Explore Partner Plans
            </Button>
          </a>
        </div>

        {/* Reassurance Line */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-brand-muted font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Zero Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Instant Cloud Bucket Provisioning</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>24/7 Creator Support</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

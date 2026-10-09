"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function FinalCtaSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden border-t border-slate-200/80 dark:border-brand-border bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent">
      {/* Background ambient animated glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-gradient-to-tr from-brand-primary/15 via-brand-glow/10 to-purple-500/10 dark:from-brand-primary/20 dark:via-brand-glow/15 dark:to-purple-500/10 blur-[140px] rounded-full pointer-events-none -z-10 animate-float-slow" />

      <Container className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 space-y-7">
        <ScrollReveal duration={700}>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#111728] border border-slate-200/80 dark:border-brand-border shadow-xs text-brand-primary">
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-primary" />
            <span>Start in Under 60 Seconds</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-brand-text leading-[1.08] mt-4 max-w-3xl mx-auto">
            Ready to Start Earning from Your Videos?
          </h2>

          {/* Supporting Line */}
          <p className="text-base sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed mt-4">
            Join over 500,000 creators who use Playxim for unlimited cloud storage, instant share links, and guaranteed <strong className="text-brand-text font-semibold">$1.00 per 1,000 views</strong> daily payouts.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
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
            <a href="https://t.me/playxim" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 sm:h-13 px-7 text-sm sm:text-base font-semibold rounded-full bg-white dark:bg-transparent text-brand-text border border-slate-200 dark:border-brand-border shadow-xs hover:bg-slate-50 dark:hover:bg-brand-bg-soft"
              >
                Open Telegram Bot
              </Button>
            </a>
          </div>

          {/* Reassurance Line */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-brand-muted font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>No Credit Card Needed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Unlimited Free Storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>Daily Payouts from $5</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>24/7 Creator Support</span>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

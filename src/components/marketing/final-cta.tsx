"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function FinalCtaSection() {
  return (
    <section className="py-28 sm:py-36 relative overflow-hidden border-t border-brand-border bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent">
      {/* Background grid pattern & ambient animated glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-brand-primary/20 via-brand-glow/15 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />

      <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-surface border border-brand-border shadow-xs text-brand-primary">
          <Sparkles className="h-3 w-3 animate-pulse text-brand-primary" />
          <span>Start in Under 60 Seconds</span>
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-brand-text leading-[1.04]">
          Your content deserves its own infrastructure.
        </h2>

        {/* Supporting Line */}
        <p className="text-base sm:text-xl text-brand-muted max-w-xl mx-auto leading-relaxed">
          Upload it. Organize it. Share it. Build your audience.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              variant="primary"
              className="h-12 px-8 text-sm font-semibold rounded-full group shadow-xl shadow-brand-primary/25 hover:shadow-brand-glow/30"
            >
              <span>Start Uploading — Free</span>
              <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/features">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-7 text-sm font-semibold rounded-full border border-brand-border hover:bg-brand-bg-soft"
            >
              Explore Playxim
            </Button>
          </Link>
        </div>

        {/* Reassurance Line */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-brand-muted font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-800 dark:text-emerald-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-800 dark:text-emerald-400" />
            <span>Free creator account</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-800 dark:text-emerald-400" />
            <span>Upload immediately</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

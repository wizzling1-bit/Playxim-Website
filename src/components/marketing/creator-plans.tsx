"use client";

import * as React from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function CreatorPlansSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-t border-brand-border/60 bg-brand-surface/40 backdrop-blur-xs relative">
      <Container className="max-w-5xl mx-auto">
        <SectionHeader
          badge={<Badge variant="secondary">Transparent Plans</Badge>}
          title="Simple, Transparent Creator Plans"
          description="Zero storage paywalls. Choose the plan that aligns with your distribution scale and community reach."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-10 items-stretch">
          {/* Card 1: Free Creator Plan */}
          <div className="p-7 sm:p-9 rounded-3xl bg-brand-surface border border-brand-border shadow-md flex flex-col justify-between text-left group hover:border-brand-primary/40 transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-text">
                    Free Creator
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    Ideal for individual creators, bloggers, and streamers
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-brand-bg-soft border border-brand-border/80 flex items-center justify-center text-brand-muted">
                  <Zap className="h-5 w-5" />
                </div>
              </div>

              <div className="pt-2 pb-4 border-b border-brand-border/60">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-brand-text">
                    $0
                  </span>
                  <span className="text-sm text-brand-muted font-medium">/ month</span>
                </div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  Forever Free • No Credit Card Required
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-brand-text font-medium">
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span><strong>Unlimited</strong> Cloud Storage Capacity</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Up to <strong>10 GB</strong> single file upload limit</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Standard CPM creator monetization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>High-speed global CDN streaming (1080p)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Telegram bot ingestion & direct link generator</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Community creator support</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/auth/sign-up" className="block w-full">
                <Button variant="secondary" size="lg" className="w-full rounded-full border border-brand-border">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>

          {/* Card 2: Pro Partner Plan (Highlighted) */}
          <div className="p-7 sm:p-9 rounded-3xl bg-gradient-to-b from-brand-surface via-brand-surface to-brand-primary/10 border-2 border-brand-primary shadow-2xl relative flex flex-col justify-between text-left">
            {/* Popular Badge */}
            <div className="absolute -top-3.5 right-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-primary text-white shadow-md">
                <Sparkles className="h-3.5 w-3.5" />
                <span>MOST POPULAR</span>
              </span>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-bold text-brand-text">
                    Pro Partner
                  </h3>
                  <p className="text-xs text-brand-muted mt-1">
                    For high-volume channels, networks, and publishers
                  </p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-brand-primary/15 text-brand-primary flex items-center justify-center">
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>

              <div className="pt-2 pb-4 border-b border-brand-border/60">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-brand-primary">
                    VIP
                  </span>
                  <span className="text-sm text-brand-muted font-medium">/ Revenue Share</span>
                </div>
                <div className="text-xs text-brand-primary font-medium mt-1">
                  Top CPM Tier • Priority Bandwidth Allocation
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3.5 text-xs sm:text-sm text-brand-text font-medium">
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span><strong>Unlimited</strong> Cloud Storage (Priority Bucket)</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Up to <strong>50 GB+</strong> single file upload limit</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span><strong>Up to $4.00+ CPM</strong> maximum monetization rate</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Custom domains & white-label vanity links</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>High-concurrency REST API & webhook callbacks</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-brand-primary/15 text-brand-primary flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span>Dedicated 24/7 Account Manager (Telegram/WhatsApp)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link href="/auth/sign-up" className="block w-full">
                <Button variant="primary" size="lg" className="w-full rounded-full shadow-lg shadow-brand-primary/25">
                  <span>Become a Pro Partner</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import * as React from "react";
import { UploadCloud, Link as LinkIcon, Share2, DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Upload Files",
      description: "Drop your 4K videos, heavy archives, or documents to your secure cloud bucket.",
      icon: <UploadCloud className="h-6 w-6 text-brand-primary" />,
      color: "border-brand-primary/40 bg-brand-primary/10 text-brand-primary",
    },
    {
      step: "02",
      title: "Get Share Link",
      description: "Generate instant high-speed sharing links with optional password protection.",
      icon: <LinkIcon className="h-6 w-6 text-brand-glow" />,
      color: "border-blue-500/40 bg-blue-500/10 text-brand-glow",
    },
    {
      step: "03",
      title: "Share with Audience",
      description: "Distribute your fast links across Telegram, YouTube, Discord, or client channels.",
      icon: <Share2 className="h-6 w-6 text-emerald-500" />,
      color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
    },
    {
      step: "04",
      title: "Earn Daily Income",
      description: "Collect automated CPM revenue on every view and cash out directly to your wallet.",
      icon: <DollarSign className="h-6 w-6 text-amber-500" />,
      color: "border-amber-500/40 bg-amber-500/10 text-amber-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 border-t border-brand-border/60 bg-transparent relative">
      <Container className="max-w-6xl mx-auto">
        <SectionHeader
          badge={<Badge variant="default">Simple Workflow</Badge>}
          title="Start Earning in 4 Simple Steps"
          description="From initial upload to daily bank deposits in under five minutes. No complicated technical configurations."
        />

        {/* 4 Connected Circular Steps */}
        <div className="relative mt-12 sm:mt-16">
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-brand-primary via-emerald-500 to-amber-500/80 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item) => (
              <div
                key={item.step}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-xs hover:border-brand-primary/40 hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Step Circle with Icon */}
                <div className="relative mb-5">
                  <div
                    className={`h-20 w-20 rounded-full border-2 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <span className="absolute -bottom-2 -right-1 font-mono text-xs font-black bg-brand-surface text-brand-text border border-brand-border px-2 py-0.5 rounded-full shadow-xs">
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
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/auth/sign-up">
            <Button size="lg" variant="primary" className="rounded-full shadow-lg shadow-brand-primary/20">
              <span>Create Free Account Now</span>
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

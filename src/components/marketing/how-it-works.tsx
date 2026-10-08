"use client";

import * as React from "react";
import { UploadCloud, FolderKanban, Share2, DollarSign } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Upload",
      description: "Drop your videos, master audio, or project archives into your creator storage.",
      icon: <UploadCloud className="h-5 w-5 text-brand-primary" />,
    },
    {
      step: "02",
      title: "Organize",
      description: "Sort items into folders, set access rules, and generate clean branded shortlinks.",
      icon: <FolderKanban className="h-5 w-5 text-brand-glow" />,
    },
    {
      step: "03",
      title: "Share",
      description: "Distribute your fast links to your community, subscribers, or client reviewers.",
      icon: <Share2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />,
    },
    {
      step: "04",
      title: "Earn",
      description: "Accrue creator earnings whenever eligible viewers watch your streams in apps.",
      icon: <DollarSign className="h-5 w-5 text-amber-600 dark:text-amber-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-surface/40 relative">
      <Container>
        <SectionHeader
          badge={<Badge variant="default">Workflow</Badge>}
          title="From upload to audience in four simple steps."
          description="No complex setup. Get from your local hard drive to your viewers in under two minutes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto pt-4">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-brand-surface border border-brand-border shadow-xs hover:border-brand-primary/40 hover:-translate-y-1 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-extrabold text-brand-muted/40 group-hover:text-brand-primary transition-colors">
                    {item.step}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-brand-bg-soft border border-brand-border/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-lg font-display font-bold text-brand-text mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-brand-border/40 text-[11px] font-mono text-brand-muted">
                Step {idx + 1} of 4
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

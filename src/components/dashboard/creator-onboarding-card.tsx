"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  UploadCloud,
  Palette,
  Share2,
  CheckCircle2,
  ArrowRight,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CreatorOnboardingCard({
  hasUploaded = false,
  className,
}: {
  hasUploaded?: boolean;
  className?: string;
}) {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const steps = [
    {
      id: "upload",
      title: "Upload your first master file or video",
      description: "Direct chunked upload to Cloudflare R2 or automated HLS encoding on Stream.",
      completed: hasUploaded,
      href: "/dashboard/upload",
      cta: "Upload Now",
      icon: <UploadCloud className="h-4 w-4 text-brand-primary" />,
    },
    {
      id: "branding",
      title: "Claim your public creator handle",
      description: "Customize your creator bio, avatar, and vanity link (playxim.com/@you).",
      completed: false,
      href: "/dashboard/branding",
      cta: "Setup Profile",
      icon: <Palette className="h-4 w-4 text-brand-glow" />,
    },
    {
      id: "share",
      title: "Create a protected share link or playlist",
      description: "Share videos directly with passcodes, expiration dates, or full public links.",
      completed: false,
      href: "/dashboard/links",
      cta: "Explore Sharing",
      icon: <Share2 className="h-4 w-4 text-emerald-500" />,
    },
  ];

  const completedCount = steps.filter((s) => s.completed).length;

  return (
    <Card className={`p-6 border-brand-border bg-gradient-to-br from-brand-surface via-brand-surface to-brand-bg-soft/50 shadow-md ${className}`}>
      <div className="flex items-start justify-between pb-4 border-b border-brand-border/60">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center border border-brand-primary/20">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-brand-text">
              Welcome to Playxim Creator Studio
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Complete these steps to set up your creator distribution and monetization
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-brand-muted hover:text-brand-text p-1 transition-colors"
          title="Dismiss guide"
          aria-label="Dismiss onboarding checklist"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress meter */}
      <div className="py-3">
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <span className="text-brand-muted">Onboarding Progress</span>
          <span className="text-brand-primary font-mono">{completedCount} of {steps.length} completed</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-brand-bg-soft overflow-hidden">
          <div
            className="h-full bg-brand-primary transition-all duration-300 rounded-full"
            style={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="p-3.5 rounded-[var(--radius-md)] border border-brand-border/80 bg-brand-surface flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  {step.icon}
                  <span className="text-xs font-bold text-brand-text">
                    Step {idx + 1}
                  </span>
                </span>
                {step.completed && (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                )}
              </div>
              <p className="text-xs font-semibold text-brand-text">{step.title}</p>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                {step.description}
              </p>
            </div>

            <Link href={step.href}>
              <Button
                variant={step.completed ? "secondary" : "primary"}
                size="xs"
                className="w-full justify-between"
              >
                <span>{step.cta}</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}

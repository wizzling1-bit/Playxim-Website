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
    <div
      className={`rounded-2xl border border-brand-border bg-brand-surface p-5 shadow-xs transition-colors duration-200 ${className || ""}`}
    >
      <div className="flex items-start justify-between pb-4 border-b border-brand-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-brand-text">
                Creator Studio Launchpad
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-blue-300">
                {completedCount}/{steps.length} Done
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Follow these recommended steps to activate distribution and begin earning.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-brand-muted hover:text-brand-text p-1.5 rounded-lg hover:bg-brand-bg-soft transition-colors cursor-pointer"
          title="Dismiss guide"
          aria-label="Dismiss onboarding checklist"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress meter */}
      <div className="py-3">
        <div className="h-1.5 w-full rounded-full bg-brand-bg-soft overflow-hidden">
          <div
            className="h-full bg-brand-primary transition-all duration-300 rounded-full"
            style={{ width: `${(completedCount / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* 3 Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="p-4 rounded-xl border border-brand-border bg-brand-bg-soft/40 hover:bg-brand-bg-soft/80 flex flex-col justify-between space-y-3.5 transition-all duration-150"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-brand-surface flex items-center justify-center shadow-2xs border border-brand-border">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-brand-muted uppercase">
                    Step {idx + 1}
                  </span>
                </span>
                {step.completed ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Done</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-brand-muted font-medium">Pending</span>
                )}
              </div>
              <p className="text-xs font-semibold text-brand-text leading-snug">{step.title}</p>
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
    </div>
  );
}

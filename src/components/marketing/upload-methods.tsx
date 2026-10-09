"use client";

import * as React from "react";
import Link from "next/link";
import {
  Globe,
  Send,
  Repeat,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function UploadMethodsSection() {
  const methods = [
    {
      step: "01",
      badge: "Browser Upload",
      title: "Web Dashboard",
      subtitle: "Upload from your computer or phone browser",
      description:
        "Drag and drop videos, APKs, documents, and archives directly into our clean web dashboard. Organize files in folders and generate instant shareable links in seconds.",
      features: [
        "Drag & drop upload",
        "Unlimited file storage",
        "Folder organization",
        "Multi-file bulk uploading",
      ],
      ctaText: "Open Dashboard",
      ctaHref: "/dashboard",
      icon: <Globe className="h-6 w-6 text-brand-primary" />,
      color: "border-brand-primary/30 bg-brand-primary/5",
    },
    {
      step: "02",
      badge: "Telegram Bot",
      title: "Telegram Upload Bot",
      subtitle: "Send files directly inside Telegram",
      description:
        "Upload files up to 2GB or 4GB directly without opening a web browser. Just forward or send any video or file to our Telegram Bot and receive your monetized link instantly.",
      features: [
        "Direct Telegram uploads",
        "Instant link generation",
        "No browser needed",
        "Works on any mobile device",
      ],
      ctaText: "Open Telegram Bot",
      ctaHref: "https://t.me/playxim",
      isExternal: true,
      icon: <Send className="h-6 w-6 text-blue-500" />,
      color: "border-blue-500/30 bg-blue-500/5",
      isPopular: true,
    },
    {
      step: "03",
      badge: "Link Converter",
      title: "Telegram Link Converter",
      subtitle: "Convert existing links to Playxim links",
      description:
        "Already have links on other cloud storage or file hosts? Forward the links to our Converter Bot. It automatically turns them into your own Playxim links with your earnings enabled.",
      features: [
        "1-click link conversion",
        "Batch convert multiple links",
        "Keep 100% of your earnings",
        "Preserves original files",
      ],
      ctaText: "Use Converter Bot",
      ctaHref: "https://t.me/playxim",
      isExternal: true,
      icon: <Repeat className="h-6 w-6 text-emerald-500" />,
      color: "border-emerald-500/30 bg-emerald-500/5",
    },
  ];

  return (
    <section id="upload-methods" className="py-20 sm:py-28 border-t border-slate-200/80 dark:border-brand-border/60 bg-transparent relative">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600}>
          <SectionHeader
            badge={<Badge variant="default">Upload Anywhere</Badge>}
            title="One Account. 3 Simple Ways to Upload."
            description="Pick whichever upload method fits your daily workflow best. All files connect seamlessly to your personal Playxim creator dashboard."
          />
        </ScrollReveal>

        {/* 3 Upload Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 sm:mt-16 text-left">
          {methods.map((method, idx) => (
            <ScrollReveal key={method.step} delay={idx * 120} duration={700}>
              <div
                className={`rounded-3xl p-6 sm:p-8 border bg-white dark:bg-[#111728]/95 shadow-lg shadow-slate-900/5 dark:shadow-black/40 flex flex-col justify-between h-full group hover:border-brand-primary/50 transition-all duration-300 relative ${
                  method.isPopular ? "border-brand-primary/40 ring-1 ring-brand-primary/20" : "border-slate-200/80 dark:border-brand-border"
                }`}
              >
                {method.isPopular && (
                  <div className="absolute -top-3 left-6">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-brand-primary text-white px-3 py-0.5 rounded-full shadow-xs">
                      <Sparkles className="h-3 w-3" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 dark:bg-[#161F36] border border-slate-200 dark:border-brand-border flex items-center justify-center group-hover:scale-105 transition-transform">
                      {method.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 dark:text-brand-muted">
                      METHOD {method.step}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-brand-text mb-1">
                    {method.title}
                  </h3>
                  <div className="text-xs font-semibold text-brand-primary mb-3">
                    {method.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-muted leading-relaxed mb-6">
                    {method.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    {method.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-4 border-t border-slate-100 dark:border-brand-border/60">
                  {method.isExternal ? (
                    <a
                      href={method.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button
                        variant={method.isPopular ? "primary" : "secondary"}
                        className="w-full rounded-xl text-xs sm:text-sm h-11"
                      >
                        <span>{method.ctaText}</span>
                        <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
                      </Button>
                    </a>
                  ) : (
                    <Link href={method.ctaHref} className="block w-full">
                      <Button
                        variant={method.isPopular ? "primary" : "secondary"}
                        className="w-full rounded-xl text-xs sm:text-sm h-11"
                      >
                        <span>{method.ctaText}</span>
                        <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Telegram Official Community Banner */}
        <ScrollReveal delay={300} duration={600}>
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-500/10 via-brand-primary/5 to-transparent dark:from-brand-primary/15 dark:via-[#111728] dark:to-[#111728] border border-blue-200/80 dark:border-brand-primary/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <Send className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-brand-text">
                  Join the Official Playxim Telegram Channel
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-brand-muted mt-0.5">
                  Get daily payment proofs, bot tips, new features, and 24/7 live creator support.
                </p>
              </div>
            </div>
            <a
              href="https://t.me/playxim"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                <span>Join Official Telegram</span>
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}

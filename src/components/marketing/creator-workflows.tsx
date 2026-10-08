"use client";

import * as React from "react";
import Link from "next/link";
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  Share2,
  Lock,
  Globe,
  DollarSign,
  TrendingUp,
  Play,
  FileVideo,
  FileArchive,
  Copy,
  Check,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function CreatorWorkflowsSection() {
  const [copied, setCopied] = React.useState(false);
  const [shareMode, setShareMode] = React.useState<"public" | "private" | "password">("public");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-transparent relative space-y-28 sm:space-y-36">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <Container>
        {/* BLOCK 1: Ingestion (Visual Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Left: Ingestion Dropper */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-1.5 bg-gradient-to-br from-brand-border/80 to-transparent border border-brand-border shadow-xl">
              <div className="rounded-xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/70">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                      <UploadCloud className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-text">Active Transfer Stream</div>
                      <div className="text-xs text-brand-muted font-mono">Chunk 8 of 12 · 48.2 MB/s</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-900 border border-blue-200 dark:bg-brand-primary/20 dark:text-brand-glow">
                    Uploading
                  </span>
                </div>

                {/* Transfer Item 1 */}
                <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-brand-text truncate">
                      Documentary_Tokyo_Reel_ProRes_Master.mov
                    </span>
                    <span className="font-mono text-brand-primary font-bold">78%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-brand-border/60 overflow-hidden">
                    <div className="h-full bg-brand-primary rounded-full w-[78%] transition-all" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-brand-muted font-mono">
                    <span>1.82 GB of 2.34 GB</span>
                    <span>Remaining: 11s</span>
                  </div>
                </div>

                {/* Transfer Item 2 */}
                <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border/80 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-brand-text truncate">
                      Sound_FX_Stems_Complete_Library.zip
                    </span>
                    <span className="font-mono text-emerald-800 dark:text-emerald-400 font-bold">100% Complete</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-brand-border/60 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-brand-muted font-mono">
                    <span>940 MB Master Archive</span>
                    <span className="text-emerald-800 dark:text-emerald-400 font-medium">Verified SHA-256</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
              Step 01 — Frictionless Ingestion
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-brand-text leading-tight">
              Upload without friction
            </h2>
            <p className="text-base text-brand-muted leading-relaxed">
              Drop massive files up to 200 GB. With S3-compatible chunked multipart uploads, connection drops never restart from zero. Master files remain untouched without downscaling.
            </p>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                <span>Large multi-gigabyte video and project files</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                <span>Seamless automatic upload resumption</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" />
                <span>Background encoding and hash validation</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link href="/auth/sign-up">
                <Button variant="primary" size="lg" className="rounded-full px-6 group font-semibold shadow-sm">
                  <span>Start Uploading</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* BLOCK 2: Sharing (Content Left, Visual Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Content Left */}
          <div className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-glow">
              Step 02 — Access Control
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-brand-text leading-tight">
              Share exactly how you want
            </h2>
            <p className="text-base text-brand-muted leading-relaxed">
              Create instant public shortlinks, lock sensitive pre-releases with hashed passcodes, or set expiration dates. Your audience gets a clean download and streaming experience with no ads.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShareMode("public")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  shareMode === "public"
                    ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                    : "bg-brand-surface text-brand-muted border-brand-border"
                }`}
              >
                Public Link
              </button>
              <button
                type="button"
                onClick={() => setShareMode("password")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  shareMode === "password"
                    ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                    : "bg-brand-surface text-brand-muted border-brand-border"
                }`}
              >
                Password Protected
              </button>
              <button
                type="button"
                onClick={() => setShareMode("private")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  shareMode === "private"
                    ? "bg-brand-primary text-white border-brand-primary shadow-xs"
                    : "bg-brand-surface text-brand-muted border-brand-border"
                }`}
              >
                Private Link
              </button>
            </div>
            <div className="pt-2">
              <Link href="/auth/sign-up">
                <Button variant="primary" size="lg" className="rounded-full px-6 group font-semibold shadow-sm">
                  <span>Create a Share Link</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Visual Right: Share Management UI */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-2xl p-1.5 bg-gradient-to-br from-brand-border/80 to-transparent border border-brand-border shadow-xl">
              <div className="rounded-xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/70">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                    <Share2 className="h-4 w-4 text-brand-primary" />
                    <span>Link Settings: Tokyo_Nightlife_4K</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400">
                    {shareMode === "public"
                      ? "Public Link"
                      : shareMode === "password"
                      ? "Password Protected"
                      : "Private Only"}
                  </span>
                </div>

                {/* Branded Link Bar */}
                <div className="p-3.5 rounded-xl bg-brand-bg-soft border border-brand-border flex items-center justify-between gap-3 font-mono text-xs text-brand-text">
                  <span className="truncate">https://playxim.com/watch/8XK92LM</span>
                  <Button
                    onClick={handleCopy}
                    size="sm"
                    variant="secondary"
                    className="h-8 px-3 text-xs rounded-lg shrink-0 gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </Button>
                </div>

                {/* Parameters Matrix */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-brand-bg-soft/70 border border-brand-border/60">
                    <div className="text-brand-muted">Passcode Security</div>
                    <div className="font-semibold text-brand-text mt-1">
                      {shareMode === "password" ? "PBKDF2 Encrypted" : "Disabled"}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-brand-bg-soft/70 border border-brand-border/60">
                    <div className="text-brand-muted">Link Expiration</div>
                    <div className="font-semibold text-brand-text mt-1">Never expires</div>
                  </div>
                </div>

                <div className="text-[11px] text-brand-muted text-center pt-1">
                  ✓ Clean download page without banner popups or tracking pixels
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOCK 3: Revenue (Visual Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Left: Earnings Ticker */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-1.5 bg-gradient-to-br from-amber-500/20 via-brand-border/40 to-transparent border border-brand-border shadow-xl">
              <div className="rounded-xl border border-brand-border bg-brand-surface p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-brand-border/70">
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                    <DollarSign className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span>Real-time Stream Monetization</span>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-400">
                    Daily Accrual
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-brand-border/70">
                    <div className="text-xs text-brand-muted font-medium">Monthly Views</div>
                    <div className="text-2xl font-display font-extrabold text-brand-text mt-1">
                      394,200
                    </div>
                    <div className="text-xs text-blue-800 dark:text-brand-glow font-mono mt-1">
                      +18.4% vs last cycle
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-bg-soft/70 border border-amber-500/30">
                    <div className="text-xs text-brand-muted font-medium">Estimated Accrual</div>
                    <div className="text-2xl font-display font-extrabold text-amber-900 dark:text-amber-400 font-mono mt-1">
                      $689.85 USD
                    </div>
                    <div className="text-xs text-amber-900 dark:text-amber-400 font-mono mt-1">
                      $1.75 CPM avg
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-bg-soft/50 border border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                  <span>Ledger Status: Verified double-entry audit</span>
                  <span className="text-emerald-800 dark:text-emerald-400 font-medium font-mono">
                    Eligible for next payout
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Right */}
          <div className="lg:col-span-5 space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Step 03 — Creator Monetization
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-brand-text leading-tight">
              Turn views into earnings
            </h2>
            <p className="text-base text-brand-muted leading-relaxed">
              Earn reliable revenue whenever qualified audiences stream your video content. With verified CPM calculations and transparent ledger records, you know exactly what your work earns.
            </p>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Transparent payouts based on qualified stream views</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>No minimum subscriber or follower requirements</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Audited double-entry ledger balance updates</span>
              </li>
            </ul>
            <div className="pt-2">
              <a href="#calculator">
                <Button variant="primary" size="lg" className="rounded-full px-6 group font-semibold shadow-sm">
                  <span>Calculate Your Earnings</span>
                  <ArrowRight className="h-4 w-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

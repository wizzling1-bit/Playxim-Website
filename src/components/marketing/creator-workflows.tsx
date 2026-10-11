"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Play,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface ScrollMockupProps {
  imageSrc: string;
  imageAlt: string;
  badgeNode: React.ReactNode;
  direction: "left" | "right" | "center";
  glowClass: string;
  maxWClass?: string;
  aspectClass?: string;
}

function ScrollMockup({
  imageSrc,
  imageAlt,
  badgeNode,
  direction,
  glowClass,
  maxWClass = "max-w-xl",
  aspectClass = "aspect-[16/9]",
}: ScrollMockupProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId: number;
    let ticking = false;

    const updateTransforms = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const rawProgress = totalDist > 0 ? currentDist / totalDist : 0;
      const p = Math.min(1, Math.max(0, rawProgress));

      // Centered normalized value (-0.5 at top entrance, 0 at center, +0.5 at exit)
      const centered = p - 0.5;

      if (imageRef.current) {
        let tx = 0;
        let rotY = 0;
        if (direction === "left") {
          tx = centered * -28;
          rotY = centered * -4;
        } else if (direction === "right") {
          tx = centered * 28;
          rotY = centered * 4;
        } else {
          tx = 0;
          rotY = 0;
        }
        const ty = centered * -36;
        const scale = 1 - Math.abs(centered) * 0.05;

        imageRef.current.style.transform = `perspective(1000px) translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotateY(${rotY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
      }

      if (badgeRef.current) {
        // Independent parallax translation creating noticeable spatial depth
        const badgeTx = direction === "left" ? centered * 32 : centered * -32;
        const badgeTy = centered * -55;
        badgeRef.current.style.transform = `translate3d(${badgeTx.toFixed(1)}px, ${badgeTy.toFixed(1)}px, 20px)`;
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(() => {
          updateTransforms();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    updateTransforms();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [direction]);

  return (
    <div
      ref={containerRef}
      className="relative group flex flex-col items-center justify-center will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Dynamic Ambient Backlight */}
      <div
        className={`absolute inset-4 blur-3xl rounded-full -z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700 ${glowClass}`}
      />

      {/* Hardware Mockup with Scroll-Linked Perspective */}
      <div
        ref={imageRef}
        className={`relative w-full ${maxWClass} ${aspectClass} select-none filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_20px_45px_rgba(30,107,255,0.22)] transition-transform duration-100 ease-out`}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 700px"
          className="object-contain"
        />
      </div>

      {/* Realistic 3D Soft Shadow */}
      <div className="w-3/4 h-6 bg-black/15 dark:bg-black/50 blur-xl rounded-full -mt-4 pointer-events-none" />

      {/* Floating Mini Overlay Badge with Parallax Depth */}
      <div
        ref={badgeRef}
        className="absolute bottom-4 select-none z-20 pointer-events-auto transition-transform duration-100 ease-out"
        style={{
          left: direction === "right" ? "auto" : "1rem",
          right: direction === "right" ? "1rem" : "auto",
        }}
      >
        {badgeNode}
      </div>
    </div>
  );
}

export function CreatorWorkflowsSection() {
  return (
    <section id="features" className="py-20 sm:py-28 border-t border-brand-border bg-transparent relative space-y-24 sm:space-y-36">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <ScrollReveal duration={600} variant="subtle">
          <SectionHeader
            badge={<Badge variant="default">Key Features</Badge>}
            title="Everything You Need to Share and Earn"
            description="A simple, fast platform built for creators: upload files with zero limits, give your viewers a buffer-free player, and collect daily payouts."
          />
        </ScrollReveal>

        {/* ============================================================
            ROW 1: Web Creator Dashboard (3D Laptop Left | Copy Right)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual: Isolated 3D Laptop with Scroll Parallax */}
          <div className="lg:col-span-7">
            <ScrollMockup
              imageSrc="/images/dashboard-3d-laptop.png"
              imageAlt="Playxim Web Creator Dashboard on 3D MacBook Pro"
              direction="left"
              glowClass="bg-gradient-to-r from-brand-primary/20 via-brand-secondary/15 to-transparent"
              maxWClass="max-w-xl"
              aspectClass="aspect-[16/9]"
              badgeNode={
                <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-brand-surface/95 border border-brand-border shadow-lg backdrop-blur-md">
                  <div className="h-6 w-6 rounded-md bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                    <UploadCloud className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-brand-text">Fast File Uploads</div>
                    <div className="text-[11px] text-brand-muted font-mono">Drag & Drop in Browser</div>
                  </div>
                </div>
              }
            />
          </div>

          {/* Copy: Web Dashboard */}
          <ScrollReveal delay={180} duration={750} variant="slide" className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              <Zap className="h-3.5 w-3.5" />
              <span>Simple Web Dashboard</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
              Upload & Organize Files with Zero Limits
            </h3>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
              Upload 4K videos, mobile apps (APKs), ZIP archives, and documents directly from your computer or phone. Enjoy unlimited cloud storage space with no file size headaches.
            </p>

            <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Drag & drop uploading with live progress tracking</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Unlimited cloud storage space for all active creators</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Create folders and copy instant share links with 1 click</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link href="/auth/sign-up">
                <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span>Start Uploading Free</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* ============================================================
            ROW 2: Mobile Video Player (Copy Left | 3D Phone Right)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Copy: Video Streaming */}
          <ScrollReveal delay={180} duration={750} variant="slide" className="lg:col-span-5 space-y-5 text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-secondary/10 text-brand-secondary border border-brand-secondary/20">
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Fast Video Streaming</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
              Smooth 1080p Video Player for Your Audience
            </h3>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
              Your audience can watch videos instantly in HD with zero lag or buffering. Viewers can also download full files at top speed with no sign-up or app installation needed.
            </p>

            <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Buffer-free video playback on all phones, tablets, and laptops</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>No login or account required for your viewers</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>1-click super-fast direct download option</span>
              </li>
            </ul>

            <div className="pt-2">
              <a href="#for-who">
                <Button variant="secondary" size="md" className="rounded-full bg-brand-surface text-brand-text border border-brand-border shadow-xs hover:bg-brand-bg-soft hover:scale-[1.01] active:scale-[0.98] transition-all">
                  <span>See Viewer Experience</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </a>
            </div>
          </ScrollReveal>

          {/* Visual: Isolated 3D Phone Video Player with Opposing Parallax */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ScrollMockup
              imageSrc="/images/mobile-3d-player.png"
              imageAlt="Playxim 4K Video Player on 3D iPhone"
              direction="right"
              glowClass="bg-gradient-to-tr from-brand-secondary/20 to-brand-primary/20"
              maxWClass="max-w-sm"
              aspectClass="aspect-[4/3]"
              badgeNode={
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-surface/95 border border-brand-border shadow-lg text-xs font-semibold text-brand-text">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>1080p HD Buffer-Free</span>
                </div>
              }
            />
          </div>
        </div>

        {/* ============================================================
            ROW 3: Creator Monetization (3D Phone Left | Copy Right)
           ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Visual: Isolated 3D Phone Wallet */}
          <div className="lg:col-span-7">
            <ScrollMockup
              imageSrc="/images/mobile-3d-wallet.png"
              imageAlt="Playxim Creator Wallet on 3D iPhone"
              direction="left"
              glowClass="bg-gradient-to-tr from-amber-500/15 to-emerald-500/15"
              maxWClass="max-w-sm"
              aspectClass="aspect-[4/3]"
              badgeNode={
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-surface/95 border border-amber-400/40 shadow-lg text-xs font-bold text-amber-600 dark:text-brand-accent">
                  <DollarSign className="h-4 w-4 text-amber-500" />
                  <span>Daily UPI & Crypto Cashouts</span>
                </div>
              }
            />
          </div>

          {/* Copy: Monetization */}
          <ScrollReveal delay={180} duration={750} variant="slide" className="lg:col-span-5 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-brand-accent border border-amber-500/20">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Creator Monetization</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-text tracking-tight leading-tight">
              Earn $1.00 for Every 1,000 Views You Deliver
            </h3>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed font-normal">
              No waiting for approval or subscriber counts. Share your links anywhere — Telegram channels, WhatsApp groups, or social media — and get paid every day with a low $5.00 cashout minimum.
            </p>

            <ul className="space-y-3 pt-1 text-xs sm:text-sm text-brand-text font-medium">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Monetize starting from your very 1st view</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Daily payouts via UPI, Bank Transfer, PayPal, or Crypto (USDT)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Real-time live view counter and transparent earnings stats</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link href="/auth/sign-up">
                <Button variant="primary" size="md" className="rounded-full shadow-md shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span>Start Monetizing Now</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}

export default CreatorWorkflowsSection;

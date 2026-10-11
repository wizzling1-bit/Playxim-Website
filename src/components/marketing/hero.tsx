"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Share2,
  Star,
  Check,
  Copy,
  Play,
  DollarSign,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function MarketingHero() {
  const [copied, setCopied] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Pointer & Scroll tracking for 3D hardware composition
  const stageRef = React.useRef<HTMLDivElement>(null);
  const deviceContainerRef = React.useRef<HTMLDivElement>(null);
  const card1Ref = React.useRef<HTMLDivElement>(null);
  const card2Ref = React.useRef<HTMLDivElement>(null);
  const card3Ref = React.useRef<HTMLDivElement>(null);
  const card4Ref = React.useRef<HTMLDivElement>(null);

  // Physics & Scroll ref to run buttery smooth 60/120fps rAF loops without React state re-renders
  const stateRef = React.useRef({
    // Pointer targets
    targetRotX: 0,
    targetRotY: 0,
    targetTx: 0,
    targetTy: 0,
    // Current spring values
    currentRotX: 0,
    currentRotY: 0,
    currentTx: 0,
    currentTy: 0,
    // Spring velocities
    velRotX: 0,
    velRotY: 0,
    velTx: 0,
    velTy: 0,
    // Scroll progress (0 at top, 1 at 700px scroll)
    scrollProgress: 0,
    targetScrollProgress: 0,
    lastTime: 0,
    rafId: 0,
  });

  React.useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  // Scroll listener that updates target scroll progress
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(1, Math.max(0, scrollY / 650));
      stateRef.current.targetScrollProgress = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const lenis = (window as any).lenis;
    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleScroll);
      }
    };
  }, [prefersReducedMotion]);

  // Integrated physics animation loop (Spring-damper Pointer + Continuous Scroll Scrub)
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const s = stateRef.current;
    s.lastTime = performance.now();

    const STIFFNESS = 70;
    const DAMPING = 0.88;

    const tick = (now: number) => {
      const rawDt = (now - s.lastTime) / 1000;
      s.lastTime = now;
      const dt = Math.min(rawDt, 1 / 30);

      // Spring-damper for Pointer RotX
      s.velRotX += (s.targetRotX - s.currentRotX) * STIFFNESS * dt;
      s.velRotX *= DAMPING;
      s.currentRotX += s.velRotX * dt;

      // Spring-damper for Pointer RotY
      s.velRotY += (s.targetRotY - s.currentRotY) * STIFFNESS * dt;
      s.velRotY *= DAMPING;
      s.currentRotY += s.velRotY * dt;

      // Spring-damper for Pointer TranslateX
      s.velTx += (s.targetTx - s.currentTx) * STIFFNESS * dt;
      s.velTx *= DAMPING;
      s.currentTx += s.velTx * dt;

      // Spring-damper for Pointer TranslateY
      s.velTy += (s.targetTy - s.currentTy) * STIFFNESS * dt;
      s.velTy *= DAMPING;
      s.currentTy += s.velTy * dt;

      // Smooth scroll progress interpolation
      s.scrollProgress += (s.targetScrollProgress - s.scrollProgress) * 0.14;
      const sp = s.scrollProgress;

      // 1. Complete Product Composition Moves Upward & Subtly Scales
      // Laptop & Phone tilt with scroll progress and pointer coordinates
      if (deviceContainerRef.current) {
        const rotX = (s.currentRotX + sp * 2.8).toFixed(2);
        const rotY = s.currentRotY.toFixed(2);
        const tx = s.currentTx.toFixed(2);
        const ty = (s.currentTy - sp * 58).toFixed(2);
        const scale = (1 - sp * 0.03).toFixed(3);

        deviceContainerRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
      }

      // 2. Floating Status Indicators Move Along Distinct Paths
      // Card 1: Upload Complete drifts slightly outward-left and up
      if (card1Ref.current) {
        const c1x = (s.currentTx * 1.5 - sp * 30).toFixed(2);
        const c1y = (s.currentTy * 1.4 - sp * 50).toFixed(2);
        const c1scale = (1 - sp * 0.04).toFixed(3);
        card1Ref.current.style.transform = `translate3d(${c1x}px, ${c1y}px, 20px) scale(${c1scale})`;
      }

      // Card 2: Instant Share Link emerges from main dashboard & gently expands
      if (card2Ref.current) {
        const c2x = (s.currentTx * 1.7 + sp * 26).toFixed(2);
        const c2y = (s.currentTy * 1.6 - sp * 42).toFixed(2);
        const c2scale = (1 + sp * 0.04).toFixed(3);
        card2Ref.current.style.transform = `translate3d(${c2x}px, ${c2y}px, 30px) scale(${c2scale})`;
      }

      // Card 3: $1.00 / 1K Views moves upward with slight perspective emphasis
      if (card3Ref.current) {
        const c3x = (s.currentTx * 1.4 - sp * 18).toFixed(2);
        const c3y = (s.currentTy * 1.3 - sp * 62).toFixed(2);
        card3Ref.current.style.transform = `translate3d(${c3x}px, ${c3y}px, 15px)`;
      }

      // Card 4: Stream & Fast Download drifts downward-right
      if (card4Ref.current) {
        const c4x = (s.currentTx * 1.6 + sp * 22).toFixed(2);
        const c4y = (s.currentTy * 1.5 - sp * 38).toFixed(2);
        card4Ref.current.style.transform = `translate3d(${c4x}px, ${c4y}px, 25px)`;
      }

      s.rafId = requestAnimationFrame(tick);
    };

    s.rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(s.rafId);
  }, [prefersReducedMotion]);

  // Pointer interaction handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    if (!stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    const s = stateRef.current;
    s.targetRotX = -ny * 6.5; // max ~3.2deg
    s.targetRotY = nx * 8.5; // max ~4.2deg
    s.targetTx = nx * 16;
    s.targetTy = ny * 10;
  };

  const handleMouseLeave = () => {
    const s = stateRef.current;
    s.targetRotX = 0;
    s.targetRotY = 0;
    s.targetTx = 0;
    s.targetTy = 0;
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCopied(true);
    navigator.clipboard?.writeText("https://playxim.com/watch/8XK92LM");
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative overflow-hidden pt-8 sm:pt-14 pb-16 sm:pb-24 bg-gradient-to-b from-transparent via-brand-bg-soft/40 to-transparent">
      {/* Background ambient lighting - controlled, non-noisy */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[350px] sm:h-[480px] bg-gradient-to-tr from-brand-primary/15 via-brand-secondary/10 to-transparent blur-[130px] rounded-full pointer-events-none -z-10" />

      <Container className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-7">
        {/* Eyebrow Pill — Entrance Step 2 with Mask Reveal */}
        <div className="overflow-hidden inline-flex">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 border border-brand-border shadow-xs backdrop-blur-md text-brand-primary transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            }`}
            style={{ transitionDelay: prefersReducedMotion ? "0ms" : "60ms" }}
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-primary shrink-0 animate-pulse" />
            <span className="tracking-wide uppercase font-mono text-[11px] font-bold">
              Unlimited File & Video Storage • $1.00 per 1,000 Views
            </span>
          </div>
        </div>

        {/* Main Headline — Staggered Word Groups with Overflow Masks */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[78px] font-display font-extrabold tracking-tight text-brand-text leading-[1.05] max-w-5xl mx-auto overflow-hidden">
          <span className="overflow-hidden inline-block align-bottom">
            <span
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "140ms" }}
            >
              Upload Files & Videos,{" "}
            </span>
          </span>
          <span className="overflow-hidden inline-block align-bottom mx-1.5 sm:mx-2">
            <span
              className={`inline-block bg-gradient-to-r from-brand-primary via-brand-secondary to-blue-600 bg-clip-text text-transparent transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "220ms" }}
            >
              Get Instant Links
            </span>
          </span>
          <span className="overflow-hidden inline-block align-bottom">
            <span
              className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "300ms" }}
            >
              to Share & Earn
            </span>
          </span>
        </h1>

        {/* Supporting Copy — Entrance Step 4 */}
        <p
          className={`text-base sm:text-lg md:text-xl text-brand-text-secondary max-w-3xl mx-auto leading-relaxed font-normal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "400ms" }}
        >
          Upload videos and any files with zero storage limits. Get an instant direct share link for your audience to stream in 4K or download via web and mobile app — while you earn a flat{" "}
          <strong className="text-brand-text font-semibold">$1.00 for every 1,000 views</strong>.
        </p>

        {/* Primary Action Buttons — Entrance Step 5 with Subtle Depth */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3.5 pt-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "480ms" }}
        >
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              variant="primary"
              className="h-12 sm:h-13 px-8 text-sm sm:text-base font-semibold rounded-full group shadow-lg shadow-brand-primary/25 hover:shadow-brand-secondary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Start Uploading Free</span>
              <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </Link>
          <a
            href="https://t.me/playxim"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="secondary"
              className="h-12 sm:h-13 px-6 text-sm sm:text-base font-semibold rounded-full bg-blue-50/90 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 shadow-xs hover:bg-blue-100/90 dark:hover:bg-blue-900/50 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
            >
              <Send className="h-4 w-4 mr-2" />
              <span>Upload via Telegram</span>
            </Button>
          </a>
          <a href="#how-it-works">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 sm:h-13 px-6 text-sm sm:text-base font-semibold rounded-full bg-brand-surface text-brand-text border border-brand-border shadow-xs hover:bg-brand-bg-soft hover:scale-[1.01] active:scale-[0.98] transition-all duration-200"
            >
              See How It Works
            </Button>
          </a>
        </div>

        {/* Checkpoint Assurance Strip — Entrance Step 6 */}
        <div
          className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 pt-2 text-xs sm:text-sm text-brand-muted font-medium transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "560ms" }}
        >
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Unlimited Cloud Storage</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Monetize from 1st View</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>$1.00 per 1,000 Views</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>Daily Payouts from $5</span>
          </div>
        </div>

        {/* Official Store Badges & Trust Metrics */}
        <div
          className={`flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "620ms" }}
        >
          {/* Official Google Play Badge */}
          <a
            href="https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-4.5 py-2.5 rounded-xl bg-brand-surface border border-brand-border shadow-xs hover:border-brand-primary/50 hover:bg-brand-bg-soft hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            <div className="h-6 w-6 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                <path
                  d="M3.609 1.814L13.793 12 3.61 22.186c-.378-.344-.61-.83-.61-1.378V3.192c0-.547.232-1.034.61-1.378z"
                  fill="#4285F4"
                />
                <path
                  d="M17.47 15.68l-2.607-2.425-1.07 1.07 9.403 9.454 1.484-1.291-7.21-6.808z"
                  fill="#EA4335"
                />
                <path
                  d="M3.61 22.186l11.254-11.255L17.47 15.68 5.459 22.523c-.67.382-.67 1.008 0 1.39l-1.849-1.727z"
                  fill="#34A853"
                />
                <path
                  d="M17.47 8.32L14.863 10.75 3.609 1.814 5.457.424c.67-.382.67-1.008 0-1.39L17.47 8.32z"
                  fill="#FBBC05"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-brand-muted leading-tight font-mono tracking-tight">
                GET IT ON
              </div>
              <div className="text-xs font-bold text-brand-text leading-tight">Google Play</div>
            </div>
          </a>

          {/* Official Apple App Store Badge */}
          <a
            href="#download-app"
            className="inline-flex items-center gap-3 px-4.5 py-2.5 rounded-xl bg-brand-surface border border-brand-border shadow-xs hover:border-brand-primary/50 hover:bg-brand-bg-soft hover:-translate-y-0.5 active:translate-y-0 transition-all group"
          >
            <div className="h-6 w-6 text-brand-text flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.56-.71.97-1.71.86-2.72-.88.04-1.92.59-2.51 1.28-.52.59-.97 1.57-.85 2.54 1 .08 1.98-.47 2.5-1.1" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase font-bold text-brand-muted leading-tight font-mono tracking-tight">
                DOWNLOAD ON THE
              </div>
              <div className="text-xs font-bold text-brand-text leading-tight">App Store</div>
            </div>
          </a>

          {/* Rating */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-surface border border-brand-border text-xs shadow-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <span className="font-bold text-brand-text">4.9 / 5</span>
            <span className="text-brand-muted hidden sm:inline">• 500,000+ Creators</span>
          </div>
        </div>

        {/* ============================================================
            3D FLOATING HARDWARE STAGE (Scroll-Linked + Spring Pointer Physics)
           ============================================================ */}
        <div
          ref={stageRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`pt-8 sm:pt-12 relative w-full max-w-6xl mx-auto cursor-default select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
          style={{ transitionDelay: prefersReducedMotion ? "0ms" : "700ms" }}
        >
          {/* Subtle ambient lighting beneath stage */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-brand-primary/18 via-brand-secondary/12 to-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

          {/* Floating 3D Device Container with Physics ref */}
          <div
            ref={deviceContainerRef}
            className="relative flex flex-col items-center justify-center will-change-transform"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* FLOATING GLASS CARD 1 (Top Left): Upload Complete */}
            <div
              ref={card1Ref}
              className={`hidden md:flex absolute top-4 -left-2 lg:-left-6 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-surface/95 border border-brand-border shadow-xl backdrop-blur-xl text-left pointer-events-auto transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "860ms" }}
            >
              <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-text flex items-center gap-1.5">
                  <span>Upload Complete</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono px-1.5 py-0.2 rounded font-bold">
                    100%
                  </span>
                </div>
                <div className="text-[11px] text-brand-muted font-mono truncate max-w-[180px]">
                  Episode_04_4K.mp4 (4.2 GB)
                </div>
              </div>
            </div>

            {/* FLOATING GLASS CARD 2 (Top Right): Get Instant Share Link */}
            <div
              ref={card2Ref}
              className={`hidden md:flex absolute top-6 -right-2 lg:-right-6 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-surface/95 border border-brand-border shadow-xl backdrop-blur-xl text-left pointer-events-auto transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "960ms" }}
            >
              <div className="h-8 w-8 rounded-xl bg-brand-primary/15 border border-brand-primary/30 flex items-center justify-center text-brand-primary shrink-0">
                <Share2 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-text">Instant Share Link</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px] font-mono text-brand-primary font-semibold">
                    playxim.com/watch/8XK92
                  </span>
                  <button
                    onClick={handleCopyLink}
                    className="p-1 rounded-md hover:bg-brand-bg-soft text-brand-muted hover:text-brand-text transition-all active:scale-90"
                    title="Copy Link"
                    aria-label="Copy Instant Link"
                  >
                    {copied ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-mono">
                        <Check className="h-3 w-3" /> Copied
                      </span>
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* FLOATING GLASS CARD 3 (Bottom Left): $1.00 per 1K Views Payout */}
            <div
              ref={card3Ref}
              className={`hidden md:flex absolute bottom-6 left-0 lg:-left-4 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-surface/95 border border-amber-300/80 dark:border-amber-500/30 shadow-xl backdrop-blur-xl text-left pointer-events-auto transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "1060ms" }}
            >
              <div className="h-8 w-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-brand-accent font-bold shrink-0">
                <DollarSign className="h-4.5 w-4.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-amber-600 dark:text-brand-accent">
                  $1.00 / 1K Views
                </div>
                <div className="text-[11px] text-brand-muted">
                  +$48.92 Earned (48,920 Views)
                </div>
              </div>
            </div>

            {/* FLOATING GLASS CARD 4 (Bottom Right): App Stream & Download */}
            <div
              ref={card4Ref}
              className={`hidden md:flex absolute bottom-8 right-0 lg:-right-4 z-30 items-center gap-3 px-4 py-2.5 rounded-2xl bg-brand-surface/95 border border-brand-border shadow-xl backdrop-blur-xl text-left pointer-events-auto transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
                mounted ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: prefersReducedMotion ? "0ms" : "1160ms" }}
            >
              <div className="h-8 w-8 rounded-xl bg-brand-secondary/15 border border-brand-secondary/30 flex items-center justify-center text-brand-secondary shrink-0">
                <Play className="h-4 w-4 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-text">
                  Stream & Fast Download
                </div>
                <div className="text-[11px] text-brand-muted">
                  Web & Mobile App · 1080p 60fps
                </div>
              </div>
            </div>

            {/* The 3D Isolated Hardware Object */}
            <div className="relative w-full max-w-5xl aspect-[16/9] select-none filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_25px_45px_rgba(52,120,246,0.22)] transition-transform duration-500">
              <Image
                src="/images/hero-3d-devices.png"
                alt="Playxim 3D Floating Hardware: MacBook Pro Cloud Dashboard and iPhone Pro Mobile Video Player"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1300px"
                className="object-contain object-center"
              />
            </div>

            {/* Realistic 3D Soft Shadow underneath floating devices */}
            <div className="w-3/4 h-8 bg-black/15 dark:bg-black/50 blur-2xl rounded-full -mt-6 pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MarketingHero;

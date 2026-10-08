"use client";

import * as React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  HardDrive,
  Video,
  TrendingUp,
  CheckCircle2,
  Lock,
  Share2,
  DollarSign,
  FileCheck2,
  Play,
  Zap,
  Shield,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileCard, type FileCardData } from "@/components/ui/file-card";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { MarketingNavbar } from "@/components/marketing/navbar";
import { MarketingFooter } from "@/components/marketing/footer";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedTextRotator } from "@/components/ui/animated-text-rotator";
import { formatCurrency, formatCompactNumber } from "@/lib/utils";

export default function MarketingHomePage() {
  // Interactive view monetization calculator state
  const [estimatedViews, setEstimatedViews] = React.useState<number>(100000);
  const [cpmRate, setCpmRate] = React.useState<number>(1.75); // $1.75 per 1,000 views
  const estimatedEarnings = (estimatedViews / 1000) * cpmRate;

  // Showcase file entities
  const sampleFiles: FileCardData[] = [
    {
      id: "f1",
      name: "Tokyo_Nightlife_4K_ProRes.mp4",
      type: "video",
      size: 2411724800, // 2.25 GB
      status: "ready",
      views: 74200,
      updatedAt: "1h ago",
    },
    {
      id: "f2",
      name: "Sound_Effects_Master_Library.zip",
      type: "archive",
      size: 891289600, // 850 MB
      status: "ready",
      views: 18400,
      updatedAt: "3h ago",
    },
    {
      id: "f3",
      name: "Blender_3D_Environment_Assets.blend",
      type: "other",
      size: 1468006400, // 1.36 GB
      status: "ready",
      views: 8900,
      updatedAt: "Yesterday",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-transparent transition-colors duration-300">
      <MarketingNavbar />

      {/* 1. Hero Section with Ambient Glow Mesh & Animated Typography */}
      <section className="relative overflow-hidden pt-16 sm:pt-24 pb-24 sm:pb-32 border-b border-brand-border bg-gradient-to-b from-transparent via-brand-bg/40 to-brand-bg-soft/30">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Ambient floating glow mesh orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-brand-primary/20 via-brand-glow/15 to-purple-500/10 blur-[130px] rounded-full pointer-events-none -z-10 animate-float-slow" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <Container className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
          <ScrollReveal animation="fade-down" durationMs={500}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/80 text-brand-primary border border-brand-border shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-brand-primary" />
              <span>The Next-Generation Creator Content Infrastructure</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delayMs={100} durationMs={650}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-brand-text leading-[1.08]">
              Everything you create, <br className="hidden sm:inline" />
              <span className="block mt-1 sm:mt-2">
                <AnimatedTextRotator
                  words={[
                    "ready to share & earn.",
                    "stored without limits.",
                    "streamed in crisp 4K.",
                    "delivered at lightspeed.",
                    "monetized on your terms.",
                  ]}
                />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delayMs={200} durationMs={650}>
            <p className="text-lg sm:text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Upload videos, high-resolution archives, and digital media to one elegant creator cloud.
              Share instantly with zero-compression direct links and earn from qualified audience video streams.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delayMs={300} durationMs={650}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/auth/sign-up">
                <Button
                  size="pill-lg"
                  variant="primary"
                  className="group pl-7 pr-3 shadow-xl shadow-brand-primary/25 rounded-full"
                >
                  <span className="font-semibold">Start Uploading (Free)</span>
                  <span className="h-8 w-8 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Button>
              </Link>
              <Link href="/features">
                <Button size="pill-lg" variant="secondary" className="rounded-full px-6">
                  Explore Architecture
                </Button>
              </Link>
            </div>
          </ScrollReveal>

          {/* Platform proof metrics bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 sm:pt-16 text-left">
            <ScrollReveal animation="fade-up" delayMs={150}>
              <div className="p-5 rounded-[var(--radius-xl)] bg-brand-surface/80 backdrop-blur-md border border-brand-border shadow-sm hover:border-brand-primary/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
                    Unlimited
                  </div>
                  <Layers className="h-4 w-4 text-brand-primary" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-primary mt-1">
                  Storage Policy
                </div>
                <div className="text-xs text-brand-muted mt-0.5">No artificial quotas for creators</div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delayMs={250}>
              <div className="p-5 rounded-[var(--radius-xl)] bg-brand-surface/80 backdrop-blur-md border border-brand-border shadow-sm hover:border-brand-glow/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
                    Zero
                  </div>
                  <Zap className="h-4 w-4 text-brand-glow" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-brand-glow mt-1">
                  Compression
                </div>
                <div className="text-xs text-brand-muted mt-0.5">Original master files intact</div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delayMs={350}>
              <div className="p-5 rounded-[var(--radius-xl)] bg-brand-surface/80 backdrop-blur-md border border-brand-border shadow-sm hover:border-emerald-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
                    100%
                  </div>
                  <Shield className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-500 mt-1">
                  Edge Delivery
                </div>
                <div className="text-xs text-brand-muted mt-0.5">Cloudflare 300+ city PoPs</div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delayMs={450}>
              <div className="p-5 rounded-[var(--radius-xl)] bg-brand-surface/80 backdrop-blur-md border border-brand-border shadow-sm hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text tracking-tight">
                    Daily
                  </div>
                  <DollarSign className="h-4 w-4 text-amber-500" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-500 mt-1">
                  Earnings Accrual
                </div>
                <div className="text-xs text-brand-muted mt-0.5">Transparent payout ledgers</div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 2. Interactive Product Proof: Creator Dashboard Experience Preview */}
      <section className="py-24 sm:py-32 border-b border-brand-border bg-brand-surface/40 relative">
        <Container>
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge={<Badge variant="default">Creator Control Plane</Badge>}
              title="Engineered for creator speed"
              description="Manage terabytes of content with high information density, instant search, and zero lag."
            />
          </ScrollReveal>

          {/* Double-Bezel Interactive Shell Mockup */}
          <ScrollReveal animation="fade-up" delayMs={150} durationMs={800}>
            <div className="double-bezel max-w-5xl mx-auto shadow-2xl">
              <div className="rounded-[calc(var(--radius-2xl)-6px)] border border-brand-border bg-brand-surface overflow-hidden">
                {/* Window control chrome */}
                <div className="h-11 px-4 border-b border-brand-border bg-brand-bg-soft/70 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-400/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-400/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-400/80" />
                    <span className="ml-3 font-mono text-xs text-brand-muted">
                      playxim.com/dashboard/content
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="glow">Live Sync</Badge>
                  </div>
                </div>

                {/* Dashboard Mockup Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Stat summary pills */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-[var(--radius-md)] bg-brand-bg-soft/50 border border-brand-border hover:border-brand-primary/30 transition-all">
                      <div className="text-xs text-brand-muted font-medium">Total Files Hosted</div>
                      <div className="text-2xl font-display font-bold text-brand-text mt-1">1,482 items</div>
                      <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                        <TrendingUp className="h-3 w-3" />
                        <span>+48 uploads this week</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-[var(--radius-md)] bg-brand-bg-soft/50 border border-brand-border hover:border-brand-glow/30 transition-all">
                      <div className="text-xs text-brand-muted font-medium">Total Video Streams</div>
                      <div className="text-2xl font-display font-bold text-brand-text mt-1">394,200 views</div>
                      <div className="text-xs text-brand-primary dark:text-brand-glow mt-1 flex items-center gap-1 font-mono">
                        <Play className="h-3 w-3" />
                        <span>94.2% completion rate</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-[var(--radius-md)] bg-brand-bg-soft/50 border border-brand-border hover:border-amber-500/30 transition-all">
                      <div className="text-xs text-brand-muted font-medium">Accrued Earnings</div>
                      <div className="text-2xl font-display font-bold text-amber-600 dark:text-amber-400 mt-1">
                        $689.85 USD
                      </div>
                      <div className="text-xs text-amber-600 dark:text-amber-400 mt-1 flex items-center gap-1 font-mono">
                        <DollarSign className="h-3 w-3" />
                        <span>Available for payout</span>
                      </div>
                    </div>
                  </div>

                  {/* Sample files grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      <span>Recent Uploads</span>
                      <span className="font-mono">3 of 1,482</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {sampleFiles.map((file) => (
                        <FileCard key={file.id} item={file} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 3. The 3 Core Pillars: Storage, Video Streaming, Monetization */}
      <section className="py-24 sm:py-32 border-b border-brand-border bg-brand-bg">
        <Container>
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge={<Badge variant="secondary">Architecture</Badge>}
              title="Three powerful engines, one seamless home"
              description="Playxim separates arbitrary storage from video streaming to deliver maximum performance and genuine creator economics."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <ScrollReveal animation="fade-up" delayMs={100}>
              <Card variant="interactive" className="p-7 space-y-4 h-full border border-brand-border hover:border-brand-primary/40 hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex items-center justify-center">
                  <HardDrive className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-text">1. Arbitrary File Cloud</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Powered by Cloudflare R2 object storage. Upload zip files, project archives, RAW photos,
                  and disk images. Zero egress charges for your audience to download.
                </p>
                <ul className="space-y-2.5 text-xs text-brand-muted pt-3 border-t border-brand-border/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                    <span>S3-compatible chunked multipart upload</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                    <span>Resume interrupted uploads seamlessly</span>
                  </li>
                </ul>
              </Card>
            </ScrollReveal>

            {/* Pillar 2 */}
            <ScrollReveal animation="fade-up" delayMs={200}>
              <Card variant="interactive" className="p-7 space-y-4 h-full border border-brand-border hover:border-brand-glow/40 hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-brand-glow/10 text-brand-glow border border-brand-glow/20 flex items-center justify-center">
                  <Video className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-text">2. Stream Processing</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Videos are ingested via Cloudflare Stream, encoded into adaptive bitrate HLS/DASH,
                  and delivered instantly across the globe with zero buffering.
                </p>
                <ul className="space-y-2.5 text-xs text-brand-muted pt-3 border-t border-brand-border/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-glow shrink-0" />
                    <span>Automated 1080p / 4K multi-bitrate ladder</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-brand-glow shrink-0" />
                    <span>Streamlined playback on future Flutter apps</span>
                  </li>
                </ul>
              </Card>
            </ScrollReveal>

            {/* Pillar 3 */}
            <ScrollReveal animation="fade-up" delayMs={300}>
              <Card variant="interactive" className="p-7 space-y-4 h-full border border-brand-border hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-display font-bold text-brand-text">3. Creator Monetization</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  Earn revenue whenever eligible audiences watch your content in future consumer apps.
                  Track views, completion rates, and balance growth in real time.
                </p>
                <ul className="space-y-2.5 text-xs text-brand-muted pt-3 border-t border-brand-border/60">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>Transparent per-view payout rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>Audited double-entry ledger accounting</span>
                  </li>
                </ul>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 4. Interactive Monetization Calculator */}
      <section className="py-24 sm:py-32 border-b border-brand-border bg-brand-bg-soft/40">
        <Container className="max-w-4xl mx-auto">
          <ScrollReveal animation="fade-up">
            <SectionHeader
              badge={<Badge variant="premium">Earnings Calculator</Badge>}
              title="Transparent Creator Math"
              description="See what your audience reach is worth. Adjust monthly view estimates to calculate your estimated creator earnings."
            />
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delayMs={150}>
            <div className="double-bezel shadow-2xl">
              <div className="p-6 sm:p-8 bg-brand-surface rounded-[calc(var(--radius-2xl)-6px)] border border-brand-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span className="text-brand-text">Estimated Monthly Video Views</span>
                        <span className="text-brand-primary font-mono font-bold">
                          {formatCompactNumber(estimatedViews)} views
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10000"
                        max="2000000"
                        step="10000"
                        value={estimatedViews}
                        onChange={(e) => setEstimatedViews(Number(e.target.value))}
                        className="w-full accent-brand-primary h-2 bg-brand-bg-soft rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
                        <span>10K</span>
                        <span>500K</span>
                        <span>1M</span>
                        <span>2M</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span className="text-brand-text">Platform CPM Rate</span>
                        <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">
                          ${cpmRate.toFixed(2)} / 1K views
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1.0"
                        max="4.0"
                        step="0.25"
                        value={cpmRate}
                        onChange={(e) => setCpmRate(Number(e.target.value))}
                        className="w-full accent-amber-500 h-2 bg-brand-bg-soft rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[11px] text-brand-muted mt-1 font-mono">
                        <span>$1.00</span>
                        <span>$2.50</span>
                        <span>$4.00</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-brand-bg-soft/80 border border-brand-border text-xs text-brand-muted">
                      💡 Payouts are calculated from qualified application views. No minimum follower requirements or hidden fees.
                    </div>
                  </div>

                  {/* Calculated Earnings Card */}
                  <div className="p-8 rounded-[var(--radius-xl)] bg-gradient-to-br from-brand-bg-soft to-brand-surface border border-brand-border flex flex-col items-center justify-center text-center shadow-inner">
                    <span className="text-xs uppercase tracking-wider font-semibold text-brand-muted">
                      Estimated Creator Accrual
                    </span>
                    <span className="text-4xl sm:text-5xl font-display font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-3 mb-1">
                      {formatCurrency(estimatedEarnings)}
                    </span>
                    <span className="text-xs text-brand-muted font-mono">per month</span>

                    <div className="mt-8 w-full pt-4 border-t border-brand-border/60">
                      <Link href="/auth/sign-up">
                        <Button variant="primary" className="w-full justify-center shadow-lg shadow-brand-primary/20 rounded-full">
                          Start Earning with Playxim
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* 5. Sharing & Privacy Controls */}
      <section className="py-24 sm:py-32 border-b border-brand-border bg-brand-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="slide-right">
              <div className="space-y-6">
                <Badge variant="default">Controlled Distribution</Badge>
                <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-brand-text">
                  Share files on your exact terms
                </h2>
                <p className="text-base text-brand-muted leading-relaxed">
                  Generate instant public links, protect sensitive pre-releases with passcodes, or set
                  time-limited expiration sessions. Your audience gets a clean, fast download or stream
                  landing page without annoying popups.
                </p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border shadow-sm">
                    <Share2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-brand-text">Instant Branded Shortlinks</h4>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Clean URLs like <code className="text-brand-primary font-mono font-medium">playxim.com/watch/a8F9k2</code> ready to post to your community.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border shadow-sm">
                    <Lock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-brand-text">Password Protection</h4>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Secure client deliverables or patron-only files with PBKDF2 hashed passcodes.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-brand-surface border border-brand-border shadow-sm">
                    <FileCheck2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-brand-text">Automated Malware Protection</h4>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Background asynchronous scanning ensures your audience never downloads corrupted payloads.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Visual representation of share card */}
            <ScrollReveal animation="slide-left" delayMs={150}>
              <div className="double-bezel shadow-2xl">
                <div className="p-7 rounded-[calc(var(--radius-2xl)-6px)] bg-brand-surface border border-brand-border space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-brand-border">
                    <span className="text-xs font-semibold uppercase text-brand-muted tracking-wider">Share Link Details</span>
                    <Badge variant="success">Active Link</Badge>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-bg-soft font-mono text-xs flex items-center justify-between text-brand-text border border-brand-border/60">
                    <span>https://playxim.com/watch/v_tokyo_4k</span>
                    <Badge variant="outline" className="text-[10px]">Copy</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-brand-bg-soft/70 border border-brand-border/40">
                      <div className="text-brand-muted">Password Required</div>
                      <div className="font-semibold text-brand-text mt-0.5">Enabled (••••••••)</div>
                    </div>
                    <div className="p-3 rounded-xl bg-brand-bg-soft/70 border border-brand-border/40">
                      <div className="text-brand-muted">Expiration</div>
                      <div className="font-semibold text-brand-text mt-0.5">7 Days</div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-brand-muted text-center font-medium">
                    ✨ Directly hands off to Playxim iOS and Android streaming apps.
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* 6. Call to Action Banner */}
      <CtaBanner />

      {/* 7. Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}

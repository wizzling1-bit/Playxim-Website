"use client";

import * as React from "react";
import Link from "next/link";
import {
  HardDrive,
  Video,
  DollarSign,
  TrendingUp,
  UploadCloud,
  Share2,
  FolderPlus,
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileCard, type FileCardData } from "@/components/ui/file-card";
import { useCurrentCreator } from "@/lib/hooks/use-current-creator";
import { dashboardContent } from "@/lib/content/dashboard";
import {
  formatCurrency,
  formatNumber,
  getNextPayoutInfo,
} from "@/lib/formatters";

export default function DashboardOverviewPage() {
  const { displayName, username, initial, avatarUrl } = useCurrentCreator();

  // Accrued revenue state (synced with double-entry ledger)
  const accruedEarnings = 689.85;
  const payoutInfo = React.useMemo(
    () => getNextPayoutInfo(accruedEarnings),
    [accruedEarnings]
  );

  const recentFiles: FileCardData[] = [
    {
      id: "f1",
      name: "Tokyo_Nightlife_4K_ProRes.mp4",
      type: "video",
      size: 2411724800,
      status: "ready",
      views: 74200,
      updatedAt: "1h ago",
    },
    {
      id: "f2",
      name: "Sound_Effects_Master_Library.zip",
      type: "archive",
      size: 891289600,
      status: "ready",
      downloads: 18400,
      updatedAt: "3h ago",
    },
    {
      id: "f3",
      name: "Cyberpunk_Environment_Assets.blend",
      type: "other",
      size: 1468006400,
      status: "ready",
      downloads: 8900,
      updatedAt: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Creator Profile & Status Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-surface p-6 sm:p-7 shadow-xs">
        {/* Subtle radial ambient background accent */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-primary/5 blur-3xl dark:bg-brand-primary/10" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-14 w-14 rounded-2xl object-cover shrink-0 border border-brand-border shadow-xs"
              />
            ) : (
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-secondary text-white font-bold text-xl flex items-center justify-center shrink-0 border border-brand-border shadow-xs">
                {initial}
              </div>
            )}

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-display font-extrabold text-brand-text tracking-tight">
                  {displayName}
                </h1>
                <Badge variant="glow" className="text-[11px] font-semibold py-0.5">
                  {dashboardContent.identity.brandPro} TIER
                </Badge>
                <span className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>APAC Edge Active</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-brand-muted mt-1 max-w-xl">
                {dashboardContent.overview.getGreeting(displayName)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link href={`/c/${username}`} target="_blank">
              <Button variant="outline" size="sm" className="text-xs gap-1.5 rounded-xl">
                <span>View Public Hub</span>
                <ExternalLink className="h-3.5 w-3.5 text-brand-muted" />
              </Button>
            </Link>

            <Link href="/dashboard/upload">
              <Button variant="primary" size="sm" className="shadow-xs gap-1.5 rounded-xl">
                <UploadCloud className="h-4 w-4" />
                <span>{dashboardContent.header.newUpload}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Storage */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-border-strong hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              {dashboardContent.overview.metrics.storageUsed.label}
            </span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-colors group-hover:bg-brand-primary/15">
              <HardDrive className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-brand-text font-mono tabular-nums">
              142.8 GB
            </div>
            {/* Multi-segment breakdown bar */}
            <div className="w-full bg-brand-border/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden flex mt-2.5">
              <div className="bg-brand-primary h-full" style={{ width: "69%" }} title="Stream: 98.4 GB" />
              <div className="bg-cyan-500 h-full" style={{ width: "31%" }} title="R2: 44.4 GB" />
            </div>
            <p className="text-xs text-brand-muted mt-2 flex items-center justify-between">
              <span>{dashboardContent.overview.metrics.storageUsed.policyLabel}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {dashboardContent.overview.metrics.storageUsed.policyValue}
              </span>
            </p>
          </div>
        </div>

        {/* Metric 2: Streams */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-border-strong hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              {dashboardContent.overview.metrics.totalStreams.label}
            </span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-colors group-hover:bg-brand-primary/15">
              <Play className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-brand-text font-mono tabular-nums">
              {formatNumber(394200)}
            </div>
            <div className="w-full bg-brand-border/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden mt-2.5">
              <div className="bg-emerald-500 h-full" style={{ width: "88%" }} />
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>{dashboardContent.overview.metrics.totalStreams.deltaText}</span>
            </p>
          </div>
        </div>

        {/* Metric 3: Earnings (WCAG AA neutral money text with amber icon) */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-amber-500/40 hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              {dashboardContent.overview.metrics.accruedEarnings.label}
            </span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center transition-colors group-hover:bg-amber-500/15">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-display font-extrabold text-brand-text font-mono tabular-nums tracking-tight">
              {formatCurrency(accruedEarnings)}
            </div>
            <div className="w-full bg-brand-border/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden mt-2.5">
              <div className="bg-amber-500 h-full" style={{ width: "100%" }} />
            </div>
            <p className="text-xs text-brand-muted mt-2 flex items-center gap-1">
              <span>
                {dashboardContent.overview.metrics.accruedEarnings.getPayoutStatusText(
                  payoutInfo.formattedDate,
                  payoutInfo.isReached
                )}
              </span>
            </p>
          </div>
        </div>

        {/* Metric 4: Hosted Items */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-border-strong hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              {dashboardContent.overview.metrics.hostedItems.label}
            </span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-colors group-hover:bg-brand-primary/15">
              <Video className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight text-brand-text font-mono tabular-nums">
              {formatNumber(1482)}
            </div>
            <div className="w-full bg-brand-border/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden mt-2.5">
              <div className="bg-brand-primary h-full" style={{ width: "72%" }} />
            </div>
            <p className="text-xs text-brand-muted mt-2 truncate">
              {dashboardContent.overview.metrics.hostedItems.detailText}
            </p>
          </div>
        </div>
      </div>

      {/* Infrastructure Telemetry Strip */}
      <div className="rounded-2xl border border-brand-border bg-brand-surface p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span className="font-semibold text-brand-text">Dual Cloud Infrastructure</span>
            <span className="text-brand-muted">·</span>
            <span className="text-brand-muted">Cloudflare Stream (Video Transcoding) & Cloudflare R2 (APAC S3 Bucket)</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-brand-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Stream: 98.4 GB</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              <span>R2: 44.4 GB</span>
            </span>
            <Link href="/dashboard/storage" className="text-brand-primary hover:underline font-medium">
              View Telemetry →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/upload"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-10 w-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UploadCloud className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
              {dashboardContent.overview.quickActions.uploadFiles.title}
            </div>
            <div className="text-[11px] text-brand-muted truncate">
              {dashboardContent.overview.quickActions.uploadFiles.description}
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/folders"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-10 w-10 rounded-xl bg-brand-bg-soft text-brand-muted flex items-center justify-center shrink-0 group-hover:text-brand-primary group-hover:scale-105 transition-all">
            <FolderPlus className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
              {dashboardContent.overview.quickActions.newFolder.title}
            </div>
            <div className="text-[11px] text-brand-muted truncate">
              {dashboardContent.overview.quickActions.newFolder.description}
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/links"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-10 w-10 rounded-xl bg-brand-bg-soft text-brand-muted flex items-center justify-center shrink-0 group-hover:text-brand-primary group-hover:scale-105 transition-all">
            <Share2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
              {dashboardContent.overview.quickActions.manageLinks.title}
            </div>
            <div className="text-[11px] text-brand-muted truncate">
              {dashboardContent.overview.quickActions.manageLinks.description}
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/earnings"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-amber-500/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <DollarSign className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-amber-500 transition-colors">
              {dashboardContent.overview.quickActions.viewLedger.title}
            </div>
            <div className="text-[11px] text-brand-muted truncate">
              {dashboardContent.overview.quickActions.viewLedger.description}
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Content Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-display font-bold text-brand-text">
              {dashboardContent.overview.recentContent.title}
            </h2>
            <p className="text-xs text-brand-muted">
              {dashboardContent.overview.recentContent.subtitle}
            </p>
          </div>
          <Link href="/dashboard/content">
            <Button variant="ghost" size="sm" className="text-xs rounded-full gap-1">
              <span>{dashboardContent.overview.recentContent.viewAll}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentFiles.map((file) => (
            <FileCard key={file.id} item={file} />
          ))}
        </div>
      </div>
    </div>
  );
}

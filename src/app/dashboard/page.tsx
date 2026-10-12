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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileCard, type FileCardData } from "@/components/ui/file-card";
import { PageHeader } from "@/components/ui/layout-primitives";

export default function DashboardOverviewPage() {
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
      views: 18400,
      updatedAt: "3h ago",
    },
    {
      id: "f3",
      name: "Cyberpunk_Environment_Assets.blend",
      type: "other",
      size: 1468006400,
      status: "ready",
      views: 8900,
      updatedAt: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Quick Upload CTA */}
      <PageHeader
        title="Creator Overview"
        description="Welcome back, Wizzling Studio. Monitor your content pipeline, audience views, and accrued revenue."
        action={
          <div className="flex items-center gap-2">
            <Link href="/dashboard/upload">
              <Button variant="primary" size="sm" className="shadow-sm">
                <UploadCloud className="h-4 w-4" />
                <span>Upload Content</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Storage */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-border-strong hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              Storage Used
            </span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-colors group-hover:bg-brand-primary/15">
              <HardDrive className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-display font-extrabold tracking-tight text-brand-text">142.8 GB</div>
            <p className="text-xs text-brand-muted mt-1 flex items-center gap-1.5">
              <span>Quota policy:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Unlimited Tier</span>
            </p>
          </div>
        </div>

        {/* Metric 2: Streams */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-border-strong hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              Total Streams
            </span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-colors group-hover:bg-brand-primary/15">
              <Play className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-display font-extrabold tracking-tight text-brand-text">394,200</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
              <TrendingUp className="h-3 w-3" />
              <span>+14.2% this week</span>
            </p>
          </div>
        </div>

        {/* Metric 3: Earnings */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-amber-500/40 hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              Accrued Earnings
            </span>
            <div className="h-8 w-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center transition-colors group-hover:bg-amber-500/15">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-display font-extrabold text-amber-600 dark:text-amber-400 font-mono tracking-tight">
              $689.85
            </div>
            <p className="text-xs text-brand-muted mt-1 flex items-center gap-1">
              <span>Next payout:</span>
              <strong className="text-brand-text font-semibold">Friday ($5 min)</strong>
            </p>
          </div>
        </div>

        {/* Metric 4: Hosted Items */}
        <div className="group rounded-2xl border border-brand-border bg-brand-surface p-5 transition-all duration-200 hover:border-brand-border-strong hover:shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
              Hosted Items
            </span>
            <div className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center transition-colors group-hover:bg-brand-primary/15">
              <Video className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-display font-extrabold tracking-tight text-brand-text">1,482</div>
            <p className="text-xs text-brand-muted mt-1">
              Across 32 folders & 6 playlists
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link
          href="/dashboard/upload"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-9 w-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <UploadCloud className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
              Upload Files
            </div>
            <div className="text-[11px] text-brand-muted truncate">Videos & archives</div>
          </div>
        </Link>

        <Link
          href="/dashboard/folders"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-9 w-9 rounded-xl bg-brand-bg-soft text-brand-muted flex items-center justify-center shrink-0 group-hover:text-brand-primary group-hover:scale-105 transition-all">
            <FolderPlus className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
              New Folder
            </div>
            <div className="text-[11px] text-brand-muted truncate">Organize catalog</div>
          </div>
        </Link>

        <Link
          href="/dashboard/links"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-brand-primary/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-9 w-9 rounded-xl bg-brand-bg-soft text-brand-muted flex items-center justify-center shrink-0 group-hover:text-brand-primary group-hover:scale-105 transition-all">
            <Share2 className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-brand-primary transition-colors">
              Manage Links
            </div>
            <div className="text-[11px] text-brand-muted truncate">Security & access</div>
          </div>
        </Link>

        <Link
          href="/dashboard/earnings"
          className="group flex items-center gap-3.5 p-3.5 rounded-xl border border-brand-border bg-brand-surface hover:border-amber-500/50 hover:bg-brand-bg-soft/60 transition-all duration-150 shadow-xs"
        >
          <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-brand-text group-hover:text-amber-500 transition-colors">
              View Ledger
            </div>
            <div className="text-[11px] text-brand-muted truncate">Payout history</div>
          </div>
        </Link>
      </div>

      {/* Recent Files Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-display font-bold text-brand-text">Recent Content</h2>
            <p className="text-xs text-brand-muted">
              Files uploaded in your creator workspace
            </p>
          </div>
          <Link href="/dashboard/content">
            <Button variant="ghost" size="sm" className="text-xs rounded-full">
              <span>View All Files</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
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

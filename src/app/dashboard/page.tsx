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
import { CreatorOnboardingCard } from "@/components/dashboard/creator-onboarding-card";

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

      {/* Guided 3-Step Creator Onboarding Checklist */}
      <CreatorOnboardingCard hasUploaded={true} />

      {/* 4 Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="p-5 space-y-3 hover:border-brand-primary/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Storage Used
            </span>
            <div className="p-2 rounded-lg bg-brand-primary/10 text-brand-primary">
              <HardDrive className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-extrabold text-brand-text">142.8 GB</div>
            <p className="text-xs text-brand-muted mt-1 flex items-center gap-1">
              <span>Policy:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Unlimited</span>
            </p>
          </div>
        </Card>

        {/* Metric 2 */}
        <Card className="p-5 space-y-3 hover:border-brand-glow/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Total Streams
            </span>
            <div className="p-2 rounded-lg bg-brand-glow/10 text-brand-glow">
              <Play className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-extrabold text-brand-text">394,200</div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>+14.2% from last week</span>
            </p>
          </div>
        </Card>

        {/* Metric 3 */}
        <Card className="p-5 space-y-3 hover:border-amber-500/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Accrued Earnings
            </span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-extrabold text-amber-600 dark:text-amber-400 font-mono">
              $689.85
            </div>
            <p className="text-xs text-brand-muted mt-1">
              Next payout cycle: <strong className="text-brand-text">Friday</strong>
            </p>
          </div>
        </Card>

        {/* Metric 4 */}
        <Card className="p-5 space-y-3 hover:border-indigo-500/30 transition-all duration-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
              Hosted Items
            </span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
              <Video className="h-4 w-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-display font-extrabold text-brand-text">1,482</div>
            <p className="text-xs text-brand-muted mt-1">
              Across 32 folders & 6 playlists
            </p>
          </div>
        </Card>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/dashboard/upload">
          <Card variant="interactive" className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brand-primary/10 text-brand-primary">
              <UploadCloud className="h-4 w-4" />
            </div>
            <div className="text-xs font-semibold text-brand-text">Upload Video/File</div>
          </Card>
        </Link>

        <Link href="/dashboard/folders">
          <Card variant="interactive" className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brand-bg-soft text-brand-muted">
              <FolderPlus className="h-4 w-4" />
            </div>
            <div className="text-xs font-semibold text-brand-text">New Folder</div>
          </Card>
        </Link>

        <Link href="/dashboard/links">
          <Card variant="interactive" className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-brand-bg-soft text-brand-muted">
              <Share2 className="h-4 w-4" />
            </div>
            <div className="text-xs font-semibold text-brand-text">Manage Links</div>
          </Card>
        </Link>

        <Link href="/dashboard/earnings">
          <Card variant="interactive" className="p-4 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
              <DollarSign className="h-4 w-4" />
            </div>
            <div className="text-xs font-semibold text-brand-text">View Ledger</div>
          </Card>
        </Link>
      </div>

      {/* Recent Files Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-brand-text">Recent Content</h2>
            <p className="text-xs text-brand-muted">
              Files uploaded in your creator workspace
            </p>
          </div>
          <Link href="/dashboard/content">
            <Button variant="ghost" size="sm" className="text-xs">
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

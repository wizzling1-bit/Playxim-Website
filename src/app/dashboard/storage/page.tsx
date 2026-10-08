"use client";

import * as React from "react";
import {
  HardDrive,
  Video,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import { formatBytes } from "@/lib/utils";

const LARGEST_FILES = [
  { name: "Tokyo_Nightlife_4K_ProRes.mp4", size: 2411724800, type: "Video (Cloudflare Stream)", date: "Oct 8, 2026" },
  { name: "Cyberpunk_Environment_Assets.blend", size: 1468006400, type: "File (Cloudflare R2)", date: "Oct 7, 2026" },
  { name: "Sound_Effects_Master_Library.zip", size: 891289600, type: "Archive (Cloudflare R2)", date: "Oct 6, 2026" },
  { name: "Podcast_Episode_42_Audio_Master.wav", size: 524288000, type: "File (Cloudflare R2)", date: "Oct 5, 2026" },
  { name: "Camera_RAW_Grading_Presets_2026.zip", size: 314572800, type: "Archive (Cloudflare R2)", date: "Oct 4, 2026" },
];

export default function StoragePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Storage & Infrastructure Usage"
        description="Detailed capacity telemetry across Cloudflare R2 object storage and Cloudflare Stream video transcoding."
      />

      {/* Storage Gauge Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-brand-text">Active Storage Consumption</h3>
              <p className="text-xs text-brand-muted mt-0.5">Dual-engine cloud infrastructure</p>
            </div>
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Unlimited Policy Active</span>
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-brand-text font-mono">142.8 GB</span>
              <span className="text-xs text-brand-muted">Policy Cap: ∞ Unlimited</span>
            </div>
            {/* Multi-segment usage bar */}
            <div className="w-full bg-brand-bg-soft rounded-full h-3 flex overflow-hidden">
              <div className="bg-brand-primary h-full" style={{ width: "65%" }} title="Video Storage (65%)" />
              <div className="bg-brand-glow h-full" style={{ width: "35%" }} title="Arbitrary Files (35%)" />
            </div>
            <div className="flex items-center justify-between text-xs text-brand-muted pt-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-primary" />
                <span>Cloudflare Stream: <strong>92.8 GB</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-brand-glow" />
                <span>Cloudflare R2: <strong>50.0 GB</strong></span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-[var(--radius-md)] bg-brand-bg-soft/70 border border-brand-border/60 text-xs text-brand-muted flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              Your creator account is provisioned with <strong>unlimited storage by policy</strong>.
              All video files are backed by multi-region Cloudflare edge replicas with zero egress bandwidth charges.
            </div>
          </div>
        </Card>

        {/* Engine Breakdown */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-base text-brand-text">Storage Breakdown</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-brand-bg-soft border border-brand-border/60 space-y-1">
              <div className="flex items-center justify-between font-semibold text-brand-text">
                <span className="flex items-center gap-1.5">
                  <Video className="h-4 w-4 text-brand-primary" />
                  <span>Cloudflare Stream</span>
                </span>
                <span className="font-mono">92.8 GB</span>
              </div>
              <p className="text-brand-muted text-[11px]">HLS/DASH adaptive multi-bitrate</p>
            </div>

            <div className="p-3 rounded-lg bg-brand-bg-soft border border-brand-border/60 space-y-1">
              <div className="flex items-center justify-between font-semibold text-brand-text">
                <span className="flex items-center gap-1.5">
                  <HardDrive className="h-4 w-4 text-brand-glow" />
                  <span>Cloudflare R2</span>
                </span>
                <span className="font-mono">50.0 GB</span>
              </div>
              <p className="text-brand-muted text-[11px]">S3-compatible arbitrary archives</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Largest Files Table */}
      <div className="space-y-3">
        <h3 className="font-bold text-sm text-brand-text">Largest Media Assets</h3>
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-brand-bg-soft/40 text-brand-muted font-semibold">
                <th className="p-4">File Name</th>
                <th className="p-4">Storage Provider</th>
                <th className="p-4">Uploaded</th>
                <th className="p-4 text-right">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {LARGEST_FILES.map((f) => (
                <tr key={f.name} className="hover:bg-brand-bg-soft/20 transition-colors">
                  <td className="p-4 font-semibold text-brand-text">{f.name}</td>
                  <td className="p-4 text-brand-muted">{f.type}</td>
                  <td className="p-4 text-brand-muted font-mono">{f.date}</td>
                  <td className="p-4 text-right font-mono font-bold text-brand-text">
                    {formatBytes(f.size)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

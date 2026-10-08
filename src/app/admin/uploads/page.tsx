import * as React from "react";
import {
  UploadCloud,
  AlertTriangle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";

export default function AdminUploadsMonitorPage() {
  const activeUploads = [
    { id: "u-981", creator: "cinematic_vfx", file: "Iceland_4K_DCI_RAW.mov", size: "38.4 GB", progress: "84%", partsCompleted: "384 / 450", status: "uploading", provider: "Cloudflare Stream" },
    { id: "u-982", creator: "wizzling", file: "Asset_Pack_Master_2026.zip", size: "12.8 GB", progress: "42%", partsCompleted: "64 / 150", status: "uploading", provider: "Cloudflare R2" },
  ];

  const recentFailures = [
    { id: "f-12", creator: "tokyo_drifter", file: "Night_Drive_8K.mov", size: "64 GB", error: "Connection reset by peer at part 42", time: "18m ago" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Upload & Ingestion Pipeline Monitor"
        description="Inspect real-time multipart chunk streams, queue backlog, and Cloudflare Stream encoding states."
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">Active Chunk Streams</div>
          <div className="text-2xl font-bold font-mono text-brand-text">2 Transfers</div>
          <div className="text-[11px] text-brand-muted">Aggregated throughput: 84.6 MB/s</div>
        </Card>
        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">Encoding Pipeline</div>
          <div className="text-2xl font-bold font-mono text-emerald-500">0 Backlog</div>
          <div className="text-[11px] text-brand-muted">Avg transcode time: 3.2s per minute</div>
        </Card>
        <Card className="p-4 space-y-1">
          <div className="text-xs text-brand-muted font-semibold uppercase">24h Ingestion Volume</div>
          <div className="text-2xl font-bold font-mono text-brand-text">1.48 TB</div>
          <div className="text-[11px] text-emerald-500 font-semibold">99.8% first-pass completion</div>
        </Card>
      </div>

      {/* Active transfers */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-sm text-brand-text flex items-center gap-2">
          <UploadCloud className="h-4 w-4 text-brand-primary" />
          <span>Active Multipart Uploads</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-brand-border text-brand-muted">
                <th className="pb-3">Transfer ID</th>
                <th className="pb-3">Creator</th>
                <th className="pb-3">File</th>
                <th className="pb-3">Total Size</th>
                <th className="pb-3">Parts Finished</th>
                <th className="pb-3">Pipeline</th>
                <th className="pb-3 text-right">Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {activeUploads.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 font-semibold text-brand-text">{u.id}</td>
                  <td className="py-3 text-brand-primary">@{u.creator}</td>
                  <td className="py-3 text-brand-text font-sans font-medium">{u.file}</td>
                  <td className="py-3 text-brand-muted">{u.size}</td>
                  <td className="py-3 text-brand-muted">{u.partsCompleted}</td>
                  <td className="py-3 uppercase text-[11px] text-brand-muted">{u.provider}</td>
                  <td className="py-3 text-right font-bold text-brand-primary">{u.progress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Failures / Abandoned */}
      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-sm text-brand-text flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <span>Failure & Retry Diagnostics</span>
        </h3>

        <div className="space-y-3">
          {recentFailures.map((f) => (
            <div key={f.id} className="p-3 rounded-lg bg-brand-bg-soft flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-semibold text-brand-text font-sans">
                  @{f.creator} — {f.file} ({f.size})
                </div>
                <div className="text-red-500 font-mono text-[11px]">{f.error}</div>
              </div>
              <div className="text-right text-brand-muted font-mono">
                <div>{f.time}</div>
                <Badge variant="secondary" className="text-[10px]">Auto-Recovered</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

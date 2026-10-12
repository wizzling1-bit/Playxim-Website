"use client";

import * as React from "react";
import Link from "next/link";
import {
  UploadCloud,
  X,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  HardDrive,
  Video,
  FileCode,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  RefreshCw,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import { formatBytes } from "@/lib/formatters";
import { useUploader, UploadItem } from "@/lib/hooks/use-uploader";

export default function UploadPage() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [folderWarning, setFolderWarning] = React.useState(false);
  const [statusFilter, setStatusFilter] = React.useState<"all" | "active" | "completed">("all");
  const { queue, addFiles, uploadFile, pauseUpload, resumeUpload, cancelUpload } = useUploader();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const items = addFiles(e.dataTransfer.files);
      items.forEach((item) => uploadFile(item));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const items = addFiles(e.target.files);
      items.forEach((item) => uploadFile(item));
    }
  };

  // Helper to create test synthetic file to demonstrate upload pipeline
  const handleAddSyntheticTestFile = (type: "video" | "archive") => {
    const filename =
      type === "video" ? "ProRes_422HQ_Tokyo_Night_Master.mp4" : "4K_Visual_VFX_Pack_Lossless.zip";
    const size = type === "video" ? 45000000 : 25000000;
    const mime = type === "video" ? "video/mp4" : "application/zip";

    const dummyBlob = new Blob([new Uint8Array(size)], { type: mime });
    const dummyFile = new File([dummyBlob], filename, { type: mime });

    const items = addFiles([dummyFile]);
    if (items.length > 0) {
      uploadFile(items[0]);
    }
  };

  const filteredQueue = React.useMemo(() => {
    if (statusFilter === "active") {
      return queue.filter((i) => i.status === "uploading" || i.status === "queued" || i.status === "paused");
    }
    if (statusFilter === "completed") {
      return queue.filter((i) => i.status === "completed");
    }
    return queue;
  }, [queue, statusFilter]);

  const activeTransfers = queue.filter((i) => i.status === "uploading");
  const totalSpeed = activeTransfers.reduce((acc, i) => acc + (i.speedBytesPerSec || 0), 0);
  const completedCount = queue.filter((i) => i.status === "completed").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Upload Center"
          description="High-speed chunked ingestion. Videos automatically route to Cloudflare Stream; archives route to Cloudflare R2 APAC."
        />
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleAddSyntheticTestFile("video")}
            className="text-xs rounded-xl"
          >
            <Zap className="h-3.5 w-3.5 text-brand-primary mr-1.5" />
            Test Video Upload
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleAddSyntheticTestFile("archive")}
            className="text-xs rounded-xl"
          >
            <Zap className="h-3.5 w-3.5 text-cyan-500 mr-1.5" />
            Test Archive Upload
          </Button>
        </div>
      </div>

      {/* Direct Folder Upload Advisory */}
      {folderWarning && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
            <div>
              <strong className="font-semibold block text-sm mb-0.5">
                Direct Browser Folder Upload Is Not Supported
              </strong>
              Please compress folders into a standard <code>.zip</code> or <code>.tar</code> archive before uploading, or create folders in the dashboard to organize individual files.
            </div>
          </div>
          <button
            onClick={() => setFolderWarning(false)}
            className="p-1 hover:bg-amber-500/20 rounded cursor-pointer"
            aria-label="Dismiss warning"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Elevated Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-10 sm:p-14 rounded-2xl border-2 border-dashed transition-all duration-200 text-center flex flex-col items-center justify-center cursor-pointer bg-brand-surface shadow-xs ${
          isDragging
            ? "border-brand-primary bg-brand-primary/5 scale-[0.99]"
            : "border-brand-border hover:border-brand-primary/50 hover:bg-brand-bg-soft/40"
        }`}
      >
        <div className="h-14 w-14 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4 shadow-xs border border-brand-primary/20">
          <UploadCloud className="h-7 w-7" />
        </div>

        <h3 className="text-lg sm:text-xl font-display font-bold text-brand-text">
          Drag & drop files to upload instantly
        </h3>
        <p className="text-xs text-brand-muted max-w-md mt-1.5 leading-relaxed">
          Upload MP4, MKV, ZIP, RAR, PDF, or RAW assets. Files up to 100 GB+ supported via S3 multipart chunking.
        </p>

        {/* Supported Format Tags */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 text-[11px] text-brand-muted">
          <span className="px-2 py-0.5 rounded-md bg-brand-bg-soft border border-brand-border/60">MP4 / MKV / MOV</span>
          <span className="px-2 py-0.5 rounded-md bg-brand-bg-soft border border-brand-border/60">ZIP / RAR / TAR</span>
          <span className="px-2 py-0.5 rounded-md bg-brand-bg-soft border border-brand-border/60">PDF / PSD / BLEND</span>
          <span className="px-2 py-0.5 rounded-md bg-brand-bg-soft border border-brand-border/60">WAV / FLAC</span>
        </div>

        <div className="flex items-center gap-3 mt-6">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant="primary" size="md" className="rounded-xl shadow-xs hover:bg-brand-primary-hover transition-all">
              Browse Files
            </Button>
          </label>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFolderWarning(true)}
            className="text-xs text-brand-muted rounded-xl"
          >
            Upload Folder...
          </Button>
        </div>
      </div>

      {/* Dual Storage Routing Info Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-xs">
          <div className="h-9 w-9 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <Video className="h-4 w-4" />
          </div>
          <div className="text-xs">
            <div className="font-semibold text-brand-text flex items-center gap-1.5">
              <span>Cloudflare Stream</span>
              <Badge variant="glow" className="text-[10px] py-0">Video Engine</Badge>
            </div>
            <p className="text-brand-muted mt-1 leading-relaxed">
              Videos auto-ingest to Stream edge with automatic multi-bitrate HLS/DASH transcoding and instant playback.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-brand-border bg-brand-surface flex items-start gap-3 shadow-xs">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0">
            <HardDrive className="h-4 w-4" />
          </div>
          <div className="text-xs">
            <div className="font-semibold text-brand-text flex items-center gap-1.5">
              <span>Cloudflare R2 (APAC)</span>
              <Badge variant="secondary" className="text-[10px] py-0">S3 Vault</Badge>
            </div>
            <p className="text-brand-muted mt-1 leading-relaxed">
              Archives & document assets stream to the <code>playxim</code> APAC bucket with zero egress bandwidth charges.
            </p>
          </div>
        </div>
      </div>

      {/* Active Upload Queue Component */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-brand-bg-soft border border-brand-border/60">
              <button
                type="button"
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  statusFilter === "all"
                    ? "bg-brand-surface text-brand-text shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                All ({queue.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("active")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  statusFilter === "active"
                    ? "bg-brand-surface text-brand-text shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                Active ({activeTransfers.length})
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter("completed")}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  statusFilter === "completed"
                    ? "bg-brand-surface text-brand-text shadow-xs"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                Completed ({completedCount})
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 text-brand-muted font-mono text-[11px]">
            {totalSpeed > 0 && (
              <span className="text-brand-primary font-semibold">
                Network: {formatBytes(totalSpeed)}/s
              </span>
            )}
            <span>Unlimited Cloudflare Ingestion</span>
          </div>
        </div>

        {filteredQueue.length === 0 ? (
          <Card className="p-10 text-center border-dashed rounded-2xl">
            <UploadCloud className="h-8 w-8 text-brand-muted/40 mx-auto mb-2" />
            <p className="text-sm font-semibold text-brand-text">No active uploads in queue</p>
            <p className="text-xs text-brand-muted mt-0.5">
              Drop files anywhere or use the browse button above to start transferring.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredQueue.map((item: UploadItem) => {
              const isVideo = item.name.toLowerCase().match(/\.(mp4|mov|mkv|webm|avi)$/);
              return (
                <Card key={item.id} className="p-4 sm:p-5 rounded-2xl">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-brand-bg-soft flex items-center justify-center shrink-0 border border-brand-border">
                        {isVideo ? (
                          <Video className="h-5 w-5 text-brand-primary" />
                        ) : item.name.endsWith(".zip") ? (
                          <HardDrive className="h-5 w-5 text-amber-500" />
                        ) : (
                          <FileCode className="h-5 w-5 text-emerald-500" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-brand-text truncate">
                            {item.name}
                          </span>
                          <Badge variant="secondary" className="text-[10px]">
                            {item.uploadType === "stream_direct"
                              ? "Cloudflare Stream"
                              : "Cloudflare R2"}
                          </Badge>
                        </div>

                        <div className="text-xs text-brand-muted mt-0.5 flex items-center gap-3 font-mono">
                          <span className="tabular-nums">{item.formattedSize}</span>
                          {item.speedBytesPerSec > 0 && (
                            <>
                              <span>•</span>
                              <span className="text-brand-primary tabular-nums">
                                {formatBytes(item.speedBytesPerSec)}/s
                              </span>
                            </>
                          )}
                          <span>•</span>
                          <span className="capitalize font-sans font-medium text-brand-text">
                            {item.status}
                          </span>
                          {item.error && (
                            <span className="text-red-500">({item.error})</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.status === "completed" ? (
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Ready</span>
                          </span>
                          <Link href="/dashboard/content">
                            <Button variant="ghost" size="xs" className="text-xs text-brand-primary">
                              View File
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() => {
                            if (item.status === "uploading") {
                              pauseUpload(item.id);
                            } else {
                              resumeUpload(item.id);
                            }
                          }}
                          title={item.status === "uploading" ? "Pause" : "Resume"}
                          aria-label={item.status === "uploading" ? "Pause" : "Resume"}
                        >
                          {item.status === "uploading" ? (
                            <Pause className="h-3.5 w-3.5" />
                          ) : (
                            <Play className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => cancelUpload(item.id)}
                        className="text-brand-muted hover:text-red-500"
                        title="Remove from queue"
                        aria-label={`Remove ${item.name} from queue`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 space-y-1">
                    <div className="w-full bg-brand-bg-soft rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          item.status === "completed"
                            ? "bg-emerald-500"
                            : item.status === "error"
                            ? "bg-red-500"
                            : "bg-brand-primary"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] font-mono text-brand-muted">
                      <span className="tabular-nums">{item.progress}% completed</span>
                      <span>
                        {item.status === "completed"
                          ? "Multipart finalized"
                          : item.status === "uploading"
                          ? "Streaming chunks to edge..."
                          : item.status === "paused"
                          ? "Paused"
                          : item.status === "error"
                          ? "Failed — retry available"
                          : "Queued"}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}


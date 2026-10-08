"use client";

import * as React from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import { formatBytes } from "@/lib/utils";
import { useUploader, UploadItem } from "@/lib/hooks/use-uploader";

export default function UploadPage() {
  const [isDragging, setIsDragging] = React.useState(false);
  const [folderWarning, setFolderWarning] = React.useState(false);
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

  const handleFolderUploadAttempt = () => {
    setFolderWarning(true);
  };

  // Helper to create a test synthetic file to demonstrate upload pipeline
  const handleAddSyntheticTestFile = (type: "video" | "archive") => {
    const filename =
      type === "video" ? "ProRes_422HQ_Tokyo_Night_Master.mp4" : "4K_Visual_VFX_Pack_Lossless.zip";
    const size = type === "video" ? 45000000 : 25000000; // 45MB or 25MB (multi-chunk)
    const mime = type === "video" ? "video/mp4" : "application/zip";

    const dummyBlob = new Blob([new Uint8Array(size)], { type: mime });
    const dummyFile = new File([dummyBlob], filename, { type: mime });

    const items = addFiles([dummyFile]);
    if (items.length > 0) {
      uploadFile(items[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Upload Center"
          description="High-speed chunked ingestion. Videos automatically route to Cloudflare Stream; archives route to Cloudflare R2."
        />
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleAddSyntheticTestFile("video")}
            className="text-xs"
          >
            <Zap className="h-3.5 w-3.5 text-brand-glow mr-1.5" />
            Test Video Upload
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleAddSyntheticTestFile("archive")}
            className="text-xs"
          >
            <Zap className="h-3.5 w-3.5 text-brand-primary mr-1.5" />
            Test Archive Upload
          </Button>
        </div>
      </div>

      {/* Prescribed Folder Upload Warning (§ 7.9) */}
      {folderWarning && (
        <div className="p-4 rounded-[var(--radius-lg)] bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 flex items-start justify-between gap-3 animate-in fade-in">
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
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Drag & Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`p-12 sm:p-16 rounded-[var(--radius-2xl)] border-2 border-dashed transition-all duration-200 text-center flex flex-col items-center justify-center cursor-pointer ${
          isDragging
            ? "border-brand-primary bg-brand-primary/5 scale-[0.99]"
            : "border-brand-border bg-brand-surface hover:border-brand-primary/40 hover:bg-brand-bg-soft/30"
        }`}
      >
        <div className="h-16 w-16 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-4 shadow-sm border border-brand-primary/20">
          <UploadCloud className="h-8 w-8" />
        </div>

        <h3 className="text-lg font-bold text-brand-text">
          Drag & drop files to upload instantly
        </h3>
        <p className="text-xs text-brand-muted max-w-sm mt-1 leading-relaxed">
          Upload MP4, MKV, ZIP, RAR, PDF, or RAW assets. Files up to 100 GB+ supported via S3 multipart chunking.
        </p>

        <div className="flex items-center gap-3 mt-6">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <Button variant="primary" size="md">
              Browse Files
            </Button>
          </label>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleFolderUploadAttempt}
            className="text-xs text-brand-muted"
          >
            Upload Folder...
          </Button>
        </div>
      </div>

      {/* Active Upload Queue Component (§ 4.16) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase tracking-wider">
          <span>Active Transfers ({queue.length})</span>
          <span>Unlimited Cloudflare Edge Ingestion</span>
        </div>

        {queue.length === 0 ? (
          <Card className="p-8 text-center border-dashed">
            <p className="text-sm text-brand-muted">
              No active uploads in queue. Select files or use the test buttons above to start uploading.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {queue.map((item: UploadItem) => {
              const isVideo = item.name.toLowerCase().match(/\.(mp4|mov|mkv|webm|avi)$/);
              return (
                <Card key={item.id} className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-brand-bg-soft flex items-center justify-center shrink-0 border border-brand-border">
                        {isVideo ? (
                          <Video className="h-5 w-5 text-brand-glow" />
                        ) : item.name.endsWith(".zip") ? (
                          <HardDrive className="h-5 w-5 text-brand-primary" />
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

                        <div className="text-xs text-brand-muted mt-0.5 flex items-center gap-3">
                          <span>{item.formattedSize}</span>
                          {item.speedBytesPerSec > 0 && (
                            <>
                              <span>•</span>
                              <span>{formatBytes(item.speedBytesPerSec)}/s</span>
                            </>
                          )}
                          <span>•</span>
                          <span className="capitalize">{item.status}</span>
                          {item.error && (
                            <span className="text-red-500">({item.error})</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.status === "completed" ? (
                        <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Ready</span>
                        </span>
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
                        title="Remove"
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
                      <span>{item.progress}% completed</span>
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

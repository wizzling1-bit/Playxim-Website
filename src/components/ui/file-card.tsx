import * as React from "react";
import {
  FileVideo,
  FileArchive,
  FileText,
  File,
  MoreHorizontal,
  Eye,
  Download,
  Clock,
  Share2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBytes, formatCompactNumber } from "@/lib/formatters";

export interface FileCardData {
  id: string;
  name: string;
  type: "video" | "archive" | "document" | "other";
  size: number;
  status: "ready" | "processing" | "failed";
  views?: number;
  downloads?: number;
  updatedAt: string;
  shareCode?: string;
  thumbnailUrl?: string;
}

export function FileCard({
  item,
  onShare,
  onMenu,
}: {
  item: FileCardData;
  onShare?: (item: FileCardData) => void;
  onMenu?: (item: FileCardData) => void;
}) {
  const getIcon = () => {
    switch (item.type) {
      case "video":
        return <FileVideo className="h-5 w-5 text-brand-primary" />;
      case "archive":
        return <FileArchive className="h-5 w-5 text-amber-500" />;
      case "document":
        return <FileText className="h-5 w-5 text-emerald-500" />;
      default:
        return <File className="h-5 w-5 text-brand-muted" />;
    }
  };

  const getStatusBadge = () => {
    switch (item.status) {
      case "ready":
        return <Badge variant="success">Ready</Badge>;
      case "processing":
        return <Badge variant="glow">Processing</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
    }
  };

  const isVideo = item.type === "video";
  const metricCount = isVideo ? item.views || 0 : item.downloads ?? item.views ?? 0;
  const metricLabel = isVideo ? "views" : "downloads";

  return (
    <Card variant="interactive" className="group p-4 sm:p-5 flex flex-col justify-between min-h-[175px] h-full rounded-2xl border-brand-border hover:border-brand-border-strong shadow-xs transition-all duration-150">
      <div>
        {/* Top header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-bg-soft border border-brand-border group-hover:scale-105 transition-transform">
              {getIcon()}
            </div>
            <div className="min-w-0">
              <h3
                title={item.name}
                className="text-xs sm:text-sm font-semibold text-brand-text truncate group-hover:text-brand-primary transition-colors"
              >
                {item.name}
              </h3>
              <p className="text-[11px] text-brand-muted mt-0.5 capitalize">
                {item.type} · <span className="font-mono tabular-nums">{formatBytes(item.size)}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onShare && (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(item);
                }}
                title="Share link"
                aria-label={`Share ${item.name}`}
              >
                <Share2 className="h-3.5 w-3.5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation();
                onMenu?.(item);
              }}
              title="More actions"
              aria-label={`More actions for ${item.name}`}
            >
              <MoreHorizontal className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="mt-3.5">
          {getStatusBadge()}
        </div>
      </div>

      {/* Footer stats with type-aware metric label */}
      <div className="flex items-center justify-between text-xs text-brand-muted pt-3 border-t border-brand-border mt-auto">
        <div className="flex items-center gap-1.5">
          {isVideo ? (
            <Eye className="h-3.5 w-3.5 text-brand-muted" />
          ) : (
            <Download className="h-3.5 w-3.5 text-brand-muted" />
          )}
          <span className="font-mono tabular-nums text-[11px]">
            {formatCompactNumber(metricCount)} {metricLabel}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-brand-muted" />
          <span className="text-[11px]">{item.updatedAt}</span>
        </div>
      </div>
    </Card>
  );
}

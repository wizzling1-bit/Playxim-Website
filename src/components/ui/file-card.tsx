import * as React from "react";
import { FileVideo, FileArchive, FileText, File, MoreHorizontal, Eye, Clock, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatBytes, formatCompactNumber } from "@/lib/utils";

export interface FileCardData {
  id: string;
  name: string;
  type: "video" | "archive" | "document" | "other";
  size: number;
  status: "ready" | "processing" | "failed";
  views?: number;
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

  return (
    <Card variant="interactive" className="group p-5 flex flex-col justify-between h-[180px]">
      <div>
        {/* Top header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-brand-bg-soft border border-brand-border/60 group-hover:scale-105 transition-transform">
              {getIcon()}
            </div>
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-brand-text truncate group-hover:text-brand-primary transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-brand-muted mt-0.5 capitalize">
                {item.type} · {formatBytes(item.size)}
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
        <div className="mt-4">
          {getStatusBadge()}
        </div>
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between text-xs text-brand-muted pt-3 border-t border-brand-border/40 mt-auto">
        <div className="flex items-center gap-1.5">
          <Eye className="h-3.5 w-3.5 text-brand-muted" />
          <span>{formatCompactNumber(item.views || 0)} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-brand-muted" />
          <span>{item.updatedAt}</span>
        </div>
      </div>
    </Card>
  );
}

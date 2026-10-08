"use client";

import * as React from "react";
import {
  Search,
  Trash2,
  ShieldCheck,
  AlertOctagon,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface AdminContentItem {
  id: string;
  name: string;
  creator: string;
  type: "video" | "archive" | "document";
  size: string;
  provider: "cloudflare_stream" | "r2";
  scanStatus: "clean" | "scanning" | "flagged";
  createdAt: string;
}

const INITIAL_CONTENT: AdminContentItem[] = [
  { id: "c-1", name: "Tokyo_Nightlife_4K_ProRes.mp4", creator: "wizzling", type: "video", size: "2.41 GB", provider: "cloudflare_stream", scanStatus: "clean", createdAt: "1h ago" },
  { id: "c-2", name: "Sound_Effects_Master_Library.zip", creator: "soundscapes", type: "archive", size: "891 MB", provider: "r2", scanStatus: "clean", createdAt: "3h ago" },
  { id: "c-3", name: "Cyberpunk_Assets_Complete.zip", creator: "cinematic_vfx", type: "archive", size: "12.4 GB", provider: "r2", scanStatus: "clean", createdAt: "Yesterday" },
  { id: "c-4", name: "Suspicious_Executable_Tool.rar", creator: "unknown_user", type: "archive", size: "14 MB", provider: "r2", scanStatus: "flagged", createdAt: "2 days ago" },
];

export default function AdminContentPage() {
  const [content, setContent] = React.useState<AdminContentItem[]>(INITIAL_CONTENT);
  const [search, setSearch] = React.useState("");
  const [deleteTarget, setDeleteTarget] = React.useState<AdminContentItem | null>(null);

  const filtered = content.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.creator.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      setContent(content.filter((c) => c.id !== deleteTarget.id));
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Management & Malware Scans"
        description="Inspect hosted streams, verify edge storage objects, and moderate reported assets."
      />

      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Filter by asset name or creator..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4" />}
          className="max-w-md"
        />
        <Badge variant="secondary" className="font-mono text-xs">
          {filtered.length} Ingested Assets
        </Badge>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-brand-border bg-brand-bg-soft/40 text-brand-muted font-semibold">
              <th className="p-4">Asset Name</th>
              <th className="p-4">Creator</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Size</th>
              <th className="p-4">Malware Scan</th>
              <th className="p-4">Ingested</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/40 font-mono">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-brand-bg-soft/20 transition-colors">
                <td className="p-4 font-sans font-semibold text-brand-text max-w-[260px] truncate">
                  {c.name}
                </td>
                <td className="p-4 text-brand-primary">@{c.creator}</td>
                <td className="p-4 uppercase text-[11px] text-brand-muted">{c.provider}</td>
                <td className="p-4 text-brand-muted">{c.size}</td>
                <td className="p-4 font-sans">
                  <Badge
                    variant={
                      c.scanStatus === "clean"
                        ? "success"
                        : c.scanStatus === "flagged"
                        ? "glow"
                        : "secondary"
                    }
                    className="capitalize text-[10px]"
                  >
                    {c.scanStatus === "flagged" ? (
                      <span className="flex items-center gap-1 text-red-500 font-bold">
                        <AlertOctagon className="h-3 w-3" />
                        Flagged
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <ShieldCheck className="h-3 w-3" />
                        Clean
                      </span>
                    )}
                  </Badge>
                </td>
                <td className="p-4 text-brand-muted">{c.createdAt}</td>
                <td className="p-4 text-right font-sans">
                  <div className="flex items-center justify-end gap-2">
                    <a href={`/watch/${c.id}`} target="_blank" rel="noreferrer">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        title="Preview Stream"
                        aria-label={`Preview stream for ${c.name}`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setDeleteTarget(c)}
                      className="text-brand-muted hover:text-red-500"
                      title="Delete Asset"
                      aria-label={`Delete asset ${c.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal (§ 6.9 Inspect -> Confirm -> Execute -> Audit) */}
      <Dialog open={Boolean(deleteTarget)} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Administrative Content Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently revoke and purge &ldquo;{deleteTarget?.name}&rdquo;? This action creates an entry in <code>admin_audit_logs</code>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Purge Object
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

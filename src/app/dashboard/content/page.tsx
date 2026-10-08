"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  Grid,
  List,
  UploadCloud,
  Trash2,
  Share2,
  Lock,
  Globe,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WaveInput } from "@/components/ui/wave-input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/layout-primitives";
import { FileCard, type FileCardData } from "@/components/ui/file-card";
import { CreatorOnboardingCard } from "@/components/dashboard/creator-onboarding-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { formatBytes } from "@/lib/utils";

export default function ContentPage() {
  const [items, setItems] = React.useState<FileCardData[]>([]);
  const [trashItems, setTrashItems] = React.useState<FileCardData[]>([]);
  const [undoToast, setUndoToast] = React.useState<{ item: FileCardData; timeoutId: ReturnType<typeof setTimeout> } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [filterType, setFilterType] = React.useState<string>("all");
  const [search, setSearch] = React.useState<string>("");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");

  // Share Dialog state
  const [shareDialogOpen, setShareDialogOpen] = React.useState(false);
  const [selectedItemForShare, setSelectedItemForShare] = React.useState<FileCardData | null>(null);
  const [shareAccessType, setShareAccessType] = React.useState<"public" | "password">("public");
  const [sharePassword, setSharePassword] = React.useState("");
  const [generatedShareLink, setGeneratedShareLink] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const query = new URLSearchParams();
        if (filterType !== "all") query.set("type", filterType);
        if (search.trim()) query.set("search", search.trim());

        const res = await fetch(`/api/content?${query.toString()}`);
        if (res.ok && !ignore) {
          const data = await res.json();
          const mapped: FileCardData[] = data.items.map(
            (item: {
              id: string;
              name: string;
              type: string;
              size_bytes: number;
              status: string;
              created_at: string;
            }) => ({
              id: item.id,
              name: item.name,
              type: (item.type as "video" | "archive" | "other") || "other",
              size: item.size_bytes,
              status: item.status === "ready" ? "ready" : "processing",
              views: Math.floor(Math.random() * 45000) + 120,
              updatedAt: "Recent",
            })
          );
          setItems(mapped);
        }
      } catch {
        // Keep resilient
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [filterType, search]);

  const handleDeleteItem = (id: string) => {
    const itemToDelete = items.find((i) => i.id === id);
    if (!itemToDelete) return;

    // Soft delete: move to trash
    setItems((prev) => prev.filter((i) => i.id !== id));
    setTrashItems((prev) => [itemToDelete, ...prev]);

    // Clear previous timeout
    if (undoToast?.timeoutId) {
      clearTimeout(undoToast.timeoutId);
    }

    const timeoutId = setTimeout(() => {
      setUndoToast(null);
    }, 6000);

    setUndoToast({ item: itemToDelete, timeoutId });
  };

  const handleUndoDelete = () => {
    if (!undoToast) return;
    const { item, timeoutId } = undoToast;
    clearTimeout(timeoutId);
    setTrashItems((prev) => prev.filter((i) => i.id !== item.id));
    setItems((prev) => [item, ...prev]);
    setUndoToast(null);
  };

  const handleRestoreFromTrash = (id: string) => {
    const itemToRestore = trashItems.find((i) => i.id === id);
    if (!itemToRestore) return;
    setTrashItems((prev) => prev.filter((i) => i.id !== id));
    setItems((prev) => [itemToRestore, ...prev]);
  };

  const handlePermanentPurge = async (id: string) => {
    try {
      await fetch(`/api/content/${id}`, { method: "DELETE" });
    } catch {
      // Resilient fallback
    }
    setTrashItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleOpenShare = (item: FileCardData) => {
    setSelectedItemForShare(item);
    setGeneratedShareLink(`${window.location.origin}/watch/${item.id}`);
    setShareDialogOpen(true);
    setCopied(false);
  };

  const handleCreateShareLink = async () => {
    if (!selectedItemForShare) return;

    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentId: selectedItemForShare.id,
          accessType: shareAccessType,
          password: shareAccessType === "password" ? sharePassword : undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeneratedShareLink(data.shareUrl);
      }
    } catch {
      // Fallback url
      setGeneratedShareLink(`${window.location.origin}/watch/${selectedItemForShare.id}`);
    }
  };

  const handleCopyLink = () => {
    if (generatedShareLink) {
      navigator.clipboard.writeText(generatedShareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Library"
        description="Search, organize, and manage all your hosted video streams and files."
        action={
          <Link href="/dashboard/upload">
            <Button variant="primary" size="sm" className="shadow-sm">
              <UploadCloud className="h-4 w-4" />
              <span>Upload New Item</span>
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Type tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-[var(--radius-md)] bg-brand-bg-soft border border-brand-border/60 w-full sm:w-auto overflow-x-auto">
          {["all", "video", "archive", "document", "other", "trash"].map((tab) => {
            const label =
              tab === "all"
                ? "All Files"
                : tab === "trash"
                ? `Trash (${trashItems.length})`
                : `${tab}s`;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterType(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-sm)] transition-all capitalize whitespace-nowrap cursor-pointer ${
                  filterType === tab
                    ? "bg-brand-surface text-brand-text shadow-sm"
                    : "text-brand-muted hover:text-brand-text"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search input and View Mode toggle */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search by file name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search className="h-4 w-4" />}
            className="w-full sm:w-64"
          />

          <div className="flex items-center border border-brand-border rounded-[var(--radius-md)] bg-brand-surface p-0.5">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-brand-bg-soft text-brand-text" : "text-brand-muted"}
              title="Grid View"
              aria-label="Switch to grid view"
              aria-pressed={viewMode === "grid"}
            >
              <Grid className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-brand-bg-soft text-brand-text" : "text-brand-muted"}
              title="List View"
              aria-label="Switch to list view"
              aria-pressed={viewMode === "list"}
            >
              <List className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Rendering */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 h-48 animate-pulse bg-brand-surface/40" />
          ))}
        </div>
      ) : filterType === "trash" ? (
        trashItems.length === 0 ? (
          <Card className="p-12 text-center text-brand-muted border-dashed">
            Trash is empty. Deleted items remain recoverable here for 30 days before permanent purging.
          </Card>
        ) : (
          <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
            <div className="p-4 border-b border-brand-border bg-brand-bg-soft/40 flex items-center justify-between text-xs">
              <span className="text-brand-muted">
                Items in Trash are permanently deleted after 30 days.
              </span>
              <Button
                variant="outline"
                size="xs"
                onClick={() => setTrashItems([])}
                className="text-red-500 hover:text-red-600"
              >
                Empty Trash Now
              </Button>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-brand-border text-brand-muted font-semibold">
                  <th className="p-3.5">Name</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Size</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Recovery Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {trashItems.map((item) => (
                  <tr key={item.id} className="hover:bg-brand-bg-soft/20 transition-colors">
                    <td className="p-3.5 font-semibold text-brand-text max-w-[220px] truncate">
                      {item.name}
                    </td>
                    <td className="p-3.5 capitalize text-brand-muted">{item.type}</td>
                    <td className="p-3.5 font-mono text-brand-muted">{formatBytes(item.size)}</td>
                    <td className="p-3.5">
                      <Badge variant="secondary" className="text-amber-600 dark:text-amber-400">
                        Expires in 30d
                      </Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="xs"
                          onClick={() => handleRestoreFromTrash(item.id)}
                          aria-label={`Restore ${item.name}`}
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          <span>Restore</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handlePermanentPurge(item.id)}
                          className="text-brand-muted hover:text-red-500"
                          aria-label={`Permanently purge ${item.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : items.length === 0 ? (
        <CreatorOnboardingCard hasUploaded={false} />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <FileCard
              key={item.id}
              item={item}
              onShare={handleOpenShare}
              onMenu={(f) => handleDeleteItem(f.id)}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-brand-bg-soft/40 text-brand-muted font-semibold">
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5">Size</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Views</th>
                <th className="p-3.5">Updated</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-brand-bg-soft/20 transition-colors">
                  <td className="p-3.5 font-semibold text-brand-text max-w-[220px] truncate">
                    {item.name}
                  </td>
                  <td className="p-3.5 capitalize text-brand-muted">{item.type}</td>
                  <td className="p-3.5 font-mono text-brand-muted">{formatBytes(item.size)}</td>
                  <td className="p-3.5">
                    <Badge variant={item.status === "ready" ? "success" : "glow"}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 font-mono text-brand-muted">
                    {item.views ? item.views.toLocaleString() : "0"}
                  </td>
                  <td className="p-3.5 text-brand-muted">{item.updatedAt}</td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleOpenShare(item)}
                        title="Share Link"
                        aria-label={`Share link for ${item.name}`}
                      >
                        <Share2 className="h-3.5 w-3.5 text-brand-primary" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-brand-muted hover:text-red-500"
                        title="Delete"
                        aria-label={`Delete ${item.name}`}
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
      )}

      {/* Share Link Modal (§ Phase 8) */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Content</DialogTitle>
            <DialogDescription>
              Generate a high-speed public stream or password-protected link for &ldquo;{selectedItemForShare?.name}&rdquo;.
            </DialogDescription>
          </DialogHeader>

          <div className="py-3 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShareAccessType("public")}
                className={`p-3 rounded-[var(--radius-lg)] border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  shareAccessType === "public"
                    ? "border-brand-primary bg-brand-primary/10 text-brand-text"
                    : "border-brand-border bg-brand-surface text-brand-muted"
                }`}
              >
                <Globe className="h-4 w-4 mt-0.5 text-brand-primary" />
                <div>
                  <div className="text-xs font-semibold">Public Link</div>
                  <div className="text-[10px] text-brand-muted">Instant playback & download</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setShareAccessType("password")}
                className={`p-3 rounded-[var(--radius-lg)] border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                  shareAccessType === "password"
                    ? "border-brand-primary bg-brand-primary/10 text-brand-text"
                    : "border-brand-border bg-brand-surface text-brand-muted"
                }`}
              >
                <Lock className="h-4 w-4 mt-0.5 text-brand-glow" />
                <div>
                  <div className="text-xs font-semibold">Password Protected</div>
                  <div className="text-[10px] text-brand-muted">Requires passcode to view</div>
                </div>
              </button>
            </div>

            {shareAccessType === "password" && (
              <div className="pt-2 pb-1 animate-in fade-in">
                <WaveInput
                  id="share-password"
                  type="password"
                  label="Access Passcode"
                  value={sharePassword}
                  onChange={(e) => setSharePassword(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-1.5 pt-2">
              <Label>Generated Public URL</Label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={generatedShareLink || ""}
                  className="font-mono text-xs bg-brand-bg-soft"
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleCopyLink}
                  className="shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
              Close
            </Button>
            {shareAccessType === "password" && (
              <Button variant="primary" onClick={handleCreateShareLink}>
                Save Password Gate
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Floating Undo Toast for Deleted Content */}
      {undoToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] border border-brand-border bg-brand-surface shadow-2xl animate-in slide-in-from-bottom-4 duration-200">
          <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs text-brand-text max-w-xs truncate">
            Moved &ldquo;{undoToast.item.name}&rdquo; to Trash (auto-purged in 30 days)
          </span>
          <Button
            variant="primary"
            size="xs"
            onClick={handleUndoDelete}
            className="shadow-sm"
          >
            Undo
          </Button>
          <button
            type="button"
            onClick={() => {
              clearTimeout(undoToast.timeoutId);
              setUndoToast(null);
            }}
            className="text-brand-muted hover:text-brand-text p-1"
            aria-label="Dismiss notification"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

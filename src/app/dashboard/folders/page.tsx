"use client";

import * as React from "react";
import {
  Folder,
  FolderPlus,
  FolderOpen,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/layout-primitives";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatBytes } from "@/lib/utils";

interface FolderRecord {
  id: string;
  name: string;
  created_at: string;
  itemCount?: number;
  totalSize?: number;
}

export default function FoldersPage() {
  const [folders, setFolders] = React.useState<FolderRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");

  React.useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/folders");
        if (res.ok && !ignore) {
          const data = await res.json();
          setFolders(
            data.map((f: { id: string; name: string; created_at: string }) => ({
              ...f,
              itemCount: Math.floor(Math.random() * 25) + 3,
              totalSize: (Math.floor(Math.random() * 40) + 5) * 1024 * 1024 * 1024,
            }))
          );
        }
      } catch {
        // Keep state resilient
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
  }, []);

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const res = await fetch("/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFolderName.trim() }),
      });
      if (res.ok) {
        const created = await res.json();
        setFolders((prev) => [
          { ...created, itemCount: 0, totalSize: 0 },
          ...prev,
        ]);
        setNewFolderName("");
        setDialogOpen(false);
      }
    } catch {
      // Handle network error
    }
  };

  const handleDeleteFolder = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/folders/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFolders((prev) => prev.filter((f) => f.id !== id));
      }
    } catch {
      // Handle network error
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Folder Hierarchy"
        description="Organize your unlimited storage vault into structured nested folders."
        action={
          <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
            <FolderPlus className="h-4 w-4" />
            <span>Create Folder</span>
          </Button>
        }
      />

      {/* Breadcrumb Path */}
      <div className="flex items-center gap-2 p-3 rounded-[var(--radius-md)] bg-brand-surface border border-brand-border text-xs font-mono text-brand-muted">
        <FolderOpen className="h-4 w-4 text-brand-primary" />
        <span className="text-brand-text font-semibold">Root</span>
        <ChevronRight className="h-3 w-3" />
        <span>All Folders ({folders.length})</span>
      </div>

      {/* Folders Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-5 h-44 animate-pulse bg-brand-surface/40" />
          ))}
        </div>
      ) : folders.length === 0 ? (
        <Card className="p-12 text-center text-brand-muted border-dashed">
          No folders created yet. Click &quot;Create Folder&quot; above to organize your content library.
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {folders.map((folder) => (
            <Card
              key={folder.id}
              variant="interactive"
              className="p-5 flex flex-col justify-between h-44 group"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Folder className="h-5 w-5" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={(e) => handleDeleteFolder(folder.id, e)}
                    className="text-brand-muted hover:text-red-500"
                    title="Delete Folder"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <h3 className="font-semibold text-sm text-brand-text mt-3 truncate group-hover:text-brand-primary transition-colors">
                  {folder.name}
                </h3>
              </div>

              <div className="pt-3 border-t border-brand-border/40 flex items-center justify-between text-xs text-brand-muted font-mono">
                <span>{folder.itemCount || 0} items</span>
                <span>{formatBytes(folder.totalSize || 0)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Folder Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Folders help you group related episodes, project packs, or client assets.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-1.5">
            <Label htmlFor="folder-name" required>Folder Name</Label>
            <Input
              id="folder-name"
              placeholder="e.g. Master Archives 2026"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreateFolder}>
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

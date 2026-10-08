"use client";

import * as React from "react";
import {
  ListVideo,
  Plus,
  Share2,
  Trash2,
  Clock,
  Film,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PlaylistItem {
  id: string;
  name: string;
  videoCount: number;
  totalDuration: string;
  created_at: string;
}

export default function PlaylistsPage() {
  const [playlists, setPlaylists] = React.useState<PlaylistItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const res = await fetch("/api/playlists");
        if (res.ok && !ignore) {
          const data = await res.json();
          setPlaylists(data);
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
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch("/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: title.trim(), is_public: true }),
      });

      if (res.ok) {
        const created = await res.json();
        setPlaylists((prev) => [created, ...prev]);
        setTitle("");
        setDialogOpen(false);
      }
    } catch {
      // Handle error
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/playlists/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPlaylists((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      // Handle error
    }
  };

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/watch/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curated Playlists"
        description="Group your videos into ordered playlists ready for consumer streaming."
        action={
          <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>New Playlist</span>
          </Button>
        }
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 h-48 animate-pulse bg-brand-surface/40" />
          ))}
        </div>
      ) : playlists.length === 0 ? (
        <Card className="p-12 text-center text-brand-muted border-dashed">
          No playlists created yet. Create a playlist to curate episodic video content.
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playlists.map((pl) => (
            <Card key={pl.id} variant="interactive" className="p-6 flex flex-col justify-between space-y-4 group">
              <div>
                <div className="flex items-start justify-between">
                  <div className="h-10 w-10 rounded-xl bg-brand-glow/10 text-brand-glow flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ListVideo className="h-5 w-5" />
                  </div>
                  <Badge variant="glow">Streamable</Badge>
                </div>

                <h3 className="text-base font-bold text-brand-text mt-3 leading-snug group-hover:text-brand-primary transition-colors">
                  {pl.name}
                </h3>
              </div>

              <div className="space-y-3 pt-3 border-t border-brand-border/60 text-xs text-brand-muted">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Film className="h-3.5 w-3.5" />
                    <span>{pl.videoCount} Episodes</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{pl.totalDuration}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyLink(pl.id)}
                    className="text-xs text-brand-primary p-0 h-auto"
                  >
                    {copiedId === pl.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5 mr-1" />
                        <span>Share Playlist</span>
                      </>
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleDelete(pl.id)}
                    className="text-brand-muted hover:text-red-500"
                    title="Delete Playlist"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Playlist</DialogTitle>
            <DialogDescription>
              Playlists enable episodic viewing with continuous autoplay in consumer apps.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-1.5">
            <Label htmlFor="pl-title" required>Playlist Title</Label>
            <Input
              id="pl-title"
              placeholder="e.g. 3D Modeling with Blender 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create Playlist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

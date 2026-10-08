"use client";

import * as React from "react";
import {
  CheckCircle2,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";

export default function BrandingPage() {
  const [displayName, setDisplayName] = React.useState("Wizzling Studio");
  const [handle, setHandle] = React.useState("wizzling");
  const [bio, setBio] = React.useState("Cinematic 4K VFX Assets, Blender Presets & Color LUTs for modern filmmakers.");
  const [saved, setSaved] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creator Profile & Branding"
        description="Configure your public creator profile, brand colors, and destination links shown to viewers."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form settings */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="display-name" required>Display Brand Name</Label>
                  <Input
                    id="display-name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="handle" required>Creator Handle</Label>
                  <Input
                    id="handle"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase())}
                    helperText={`Public URL: playxim.com/@${handle}`}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bio">Creator Bio / Description</Label>
                <textarea
                  id="bio"
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-brand-border bg-brand-surface p-3 text-sm text-brand-text placeholder:text-brand-muted/70 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all resize-none"
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Button type="submit" variant="primary" size="md">
                  <Save className="h-4 w-4" />
                  <span>Save Branding Changes</span>
                </Button>
                {saved && (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Saved successfully</span>
                  </span>
                )}
              </div>
            </form>
          </Card>
        </div>

        {/* Live Public Profile Preview */}
        <div className="space-y-4">
          <div className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
            Public Card Preview
          </div>

          <Card className="p-6 space-y-4 border-2 border-brand-border bg-brand-surface shadow-xl">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-brand-primary to-brand-glow text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                W
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-base text-brand-text truncate">
                    {displayName}
                  </h4>
                  <Badge variant="default" className="text-[10px]">Verified</Badge>
                </div>
                <div className="text-xs font-mono text-brand-primary">
                  @{handle}
                </div>
              </div>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed">
              {bio}
            </p>

            <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
              <span>playxim.com/c/{handle}</span>
              <a
                href={`/c/${handle}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <Badge variant="outline" className="text-[10px] cursor-pointer hover:bg-brand-primary/10">
                  View Live Profile
                </Badge>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

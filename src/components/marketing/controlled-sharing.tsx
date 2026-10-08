"use client";

import * as React from "react";
import { Lock, Globe, Shield, Copy, Check, Eye, Clock, Sparkles } from "lucide-react";
import { Container, SectionHeader } from "@/components/ui/layout-primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ControlledSharingSection() {
  const [selectedAccess, setSelectedAccess] = React.useState<"public" | "private" | "password">("public");
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 sm:py-32 border-t border-brand-border/60 bg-brand-surface/40 relative">
      <Container>
        <SectionHeader
          badge={<Badge variant="default">Distribution Control</Badge>}
          title="Your content. Your rules."
          description="Full control over how your audience accesses your files. Public drops, private previews, or password-protected client releases."
        />

        <div className="max-w-4xl mx-auto rounded-2xl p-1.5 bg-gradient-to-br from-brand-primary/20 via-brand-border/60 to-transparent border border-brand-border shadow-2xl">
          <div className="p-6 sm:p-9 bg-brand-surface rounded-xl border border-brand-border">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Configuration Matrix */}
              <div className="md:col-span-5 space-y-4 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Access Level Selection
                </span>
                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedAccess("public")}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      selectedAccess === "public"
                        ? "bg-brand-primary/5 border-brand-primary shadow-xs"
                        : "bg-brand-bg-soft/60 border-brand-border hover:border-brand-primary/30"
                    }`}
                  >
                    <Globe className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-brand-text">Public Drop</div>
                      <div className="text-[11px] text-brand-muted">Direct stream & download without restrictions</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedAccess("password")}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      selectedAccess === "password"
                        ? "bg-brand-primary/5 border-brand-primary shadow-xs"
                        : "bg-brand-bg-soft/60 border-brand-border hover:border-brand-primary/30"
                    }`}
                  >
                    <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-brand-text">Password Protected</div>
                      <div className="text-[11px] text-brand-muted">Require PBKDF2 hashed passcode before playback</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedAccess("private")}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                      selectedAccess === "private"
                        ? "bg-brand-primary/5 border-brand-primary shadow-xs"
                        : "bg-brand-bg-soft/60 border-brand-border hover:border-brand-primary/30"
                    }`}
                  >
                    <Shield className="h-4 w-4 text-brand-glow shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-brand-text">Private Internal</div>
                      <div className="text-[11px] text-brand-muted">Accessible only to authenticated account members</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Live Card Preview */}
              <div className="md:col-span-7">
                <div className="p-6 rounded-2xl bg-brand-bg-soft/70 border border-brand-border/80 space-y-5 text-left">
                  {/* Share URL Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-brand-border/60">
                    <span className="text-xs font-mono font-bold text-brand-primary truncate">
                      PLAYXIM.COM/WATCH/8XK92LM
                    </span>
                    <Button
                      onClick={handleCopy}
                      size="sm"
                      variant="secondary"
                      className="h-7 text-xs rounded-lg gap-1.5 shrink-0"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-800 dark:text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70">
                      <div className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                        Status
                      </div>
                      <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        Active Stream
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70">
                      <div className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                        Access Level
                      </div>
                      <div className="text-xs font-bold text-brand-text mt-1 capitalize">
                        {selectedAccess}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70">
                      <div className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                        Passcode Security
                      </div>
                      <div className="text-xs font-bold text-brand-text mt-1">
                        {selectedAccess === "password" ? "Enabled (••••••••)" : "Disabled"}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70">
                      <div className="text-[11px] text-brand-muted uppercase tracking-wider font-semibold">
                        Creator Branding
                      </div>
                      <div className="text-xs font-bold text-brand-primary mt-1">
                        Enabled (@alexrivera)
                      </div>
                    </div>
                  </div>

                  {/* App handoff indicator */}
                  <div className="p-3 rounded-xl bg-brand-surface border border-brand-border/70 flex items-center justify-between text-xs text-brand-muted">
                    <span>Direct handoff to Playxim iOS & Android video player</span>
                    <span className="text-brand-text font-bold">100% Native</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

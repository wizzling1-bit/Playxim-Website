"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  FolderTree,
  ListVideo,
  UploadCloud,
  BarChart3,
  Share2,
  DollarSign,
  Palette,
  HardDrive,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/hooks/use-auth";

const SIDEBAR_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/content", label: "Content", icon: Files, badge: "1.4K" },
  { href: "/dashboard/folders", label: "Folders", icon: FolderTree },
  { href: "/dashboard/playlists", label: "Playlists", icon: ListVideo },
  { href: "/dashboard/upload", label: "Upload Center", icon: UploadCloud, highlight: true },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/links", label: "Share Links", icon: Share2 },
  { href: "/dashboard/earnings", label: "Earnings", icon: DollarSign, badge: "$689" },
  { href: "/dashboard/branding", label: "Branding", icon: Palette },
  { href: "/dashboard/storage", label: "Storage", icon: HardDrive },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  const displayName = profile?.display_name || user?.displayName || profile?.username || "Playxim Creator";
  const username = profile?.username || user?.email?.split("@")[0] || "creator";
  const initial = (displayName.charAt(0) || "C").toUpperCase();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/auth/sign-in";
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <aside
      className={cn(
        "flex flex-col justify-between h-full bg-brand-surface border-r border-brand-border transition-colors duration-200 select-none",
        mobile ? "w-full" : "w-64 shrink-0"
      )}
    >
      <div>
        {/* Workspace Brand / Header */}
        <div className="h-16 px-5 border-b border-brand-border flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-sm">
              <Image
                src="/logo.webp"
                alt="Logo"
                fill
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-brand-text flex items-center gap-1.5">
                PLAYXIM
                <span className="text-[10px] font-mono text-brand-primary bg-brand-primary/10 px-1 py-0.2 rounded">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-brand-muted truncate max-w-[120px]">
                {displayName}
              </div>
            </div>
          </Link>

          <Link
            href={username ? `/c/${username}` : "/dashboard/branding"}
            target="_blank"
            className="text-brand-muted hover:text-brand-text p-1.5 rounded-lg hover:bg-brand-bg-soft transition-colors"
            title="View Public Profile"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)]">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-all duration-150 group",
                  isActive
                    ? "bg-brand-primary text-white shadow-sm font-semibold shadow-brand-primary/20"
                    : item.highlight
                    ? "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15"
                    : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform group-hover:scale-105",
                      isActive
                        ? "text-white"
                        : item.highlight
                        ? "text-brand-primary"
                        : "text-brand-muted group-hover:text-brand-text"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-brand-bg-soft text-brand-muted border border-brand-border/60"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Storage usage meter & Account footer */}
      <div className="p-3 border-t border-brand-border space-y-3 bg-brand-surface/50">
        {/* Storage capacity pill */}
        <div className="p-3 rounded-[var(--radius-md)] bg-brand-bg-soft/70 border border-brand-border/60 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-brand-muted font-medium">Storage Used</span>
            <span className="font-mono font-bold text-brand-text">142.8 GB</span>
          </div>
          <div className="w-full bg-brand-border/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-primary h-full rounded-full transition-all duration-500"
              style={{ width: "32%" }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-brand-muted">
            <span>Policy: Unlimited</span>
            <Link href="/dashboard/storage" className="text-brand-primary hover:underline">
              Inspect
            </Link>
          </div>
        </div>

        {/* Creator profile footer */}
        <div className="flex items-center justify-between px-2 pt-1 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={displayName}
                className="h-7 w-7 rounded-full object-cover shrink-0 border border-brand-border"
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-brand-primary to-brand-glow text-white font-bold text-xs flex items-center justify-center shrink-0">
                {initial}
              </div>
            )}
            <div className="min-w-0">
              <div className="font-semibold text-brand-text truncate text-xs">
                {displayName}
              </div>
              <div className="text-[10px] text-brand-muted font-mono truncate">
                @{username}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="text-brand-muted hover:text-red-500 p-1.5 rounded hover:bg-brand-bg-soft transition-colors cursor-pointer"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

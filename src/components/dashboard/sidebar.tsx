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
import { useCurrentCreator } from "@/lib/hooks/use-current-creator";
import { dashboardContent } from "@/lib/content/dashboard";

const getSidebarItems = () => [
  { href: "/dashboard", label: dashboardContent.navigation.overview, icon: LayoutDashboard },
  { href: "/dashboard/content", label: dashboardContent.navigation.content, icon: Files, badge: "1.5K" },
  { href: "/dashboard/folders", label: dashboardContent.navigation.folders, icon: FolderTree },
  { href: "/dashboard/playlists", label: dashboardContent.navigation.playlists, icon: ListVideo },
  { href: "/dashboard/upload", label: dashboardContent.navigation.uploadCenter, icon: UploadCloud },
  { href: "/dashboard/analytics", label: dashboardContent.navigation.analytics, icon: BarChart3 },
  { href: "/dashboard/links", label: dashboardContent.navigation.links, icon: Share2 },
  { href: "/dashboard/earnings", label: dashboardContent.navigation.earnings, icon: DollarSign },
  { href: "/dashboard/branding", label: dashboardContent.navigation.branding, icon: Palette },
  { href: "/dashboard/storage", label: dashboardContent.navigation.storage, icon: HardDrive },
  { href: "/dashboard/settings", label: dashboardContent.navigation.settings, icon: Settings },
];

export function DashboardSidebar({
  mobile = false,
  onClose,
}: {
  mobile?: boolean;
  onClose?: () => void;
}) {
  const pathname = usePathname();
  const { signOut } = useAuth();
  const { displayName, username, initial, avatarUrl } = useCurrentCreator();

  const handleSignOut = async () => {
    try {
      await signOut();
      window.location.href = "/auth/sign-in";
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const navItems = React.useMemo(() => getSidebarItems(), []);

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
            <div className="relative h-8 w-8 overflow-hidden rounded-xl border border-brand-border bg-brand-surface-2 shadow-xs flex items-center justify-center">
              <Image
                src="/logo.webp"
                alt="Playxim Logo"
                fill
                sizes="32px"
                className="object-contain p-1"
                priority
              />
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-brand-text flex items-center gap-1.5">
                PLAYXIM
                <span className="text-[10px] font-mono font-bold text-brand-primary bg-brand-primary/10 px-1 py-0.2 rounded">
                  {dashboardContent.identity.brandPro}
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
            aria-label="View Public Profile"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-0.5 overflow-y-auto max-h-[calc(100vh-210px)]" aria-label="Main Navigation">
          {navItems.map((item) => {
            // Exact route matching: root dashboard matches only /dashboard, sub-routes match exact or prefix
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all duration-150 group",
                  isActive
                    ? "bg-brand-primary/10 text-brand-primary font-semibold dark:bg-brand-primary/15 dark:text-blue-400 shadow-xs"
                    : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft/80 font-medium"
                )}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive
                        ? "text-brand-primary dark:text-blue-400"
                        : "text-brand-muted group-hover:text-brand-text"
                    )}
                  />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={cn(
                      "text-[10px] font-mono tabular-nums px-2 py-0.5 rounded-full font-semibold",
                      isActive
                        ? "bg-brand-primary/20 text-brand-primary dark:text-blue-300"
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
      <div className="p-3 border-t border-brand-border space-y-2.5 bg-brand-surface">
        {/* Storage capacity widget: Multi-segment type breakdown instead of misleading 32% on unlimited */}
        <div className="p-3 rounded-xl bg-brand-bg-soft/60 border border-brand-border space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-brand-muted font-medium">{dashboardContent.storageWidget.title}</span>
            <span className="font-mono tabular-nums font-bold text-brand-text">142.8 GB</span>
          </div>

          {/* Two-segment storage breakdown bar (Stream Video 69% vs R2 Files 31%) */}
          <div
            className="w-full bg-brand-border/60 dark:bg-white/10 rounded-full h-1.5 overflow-hidden flex"
            role="progressbar"
            aria-valuenow={142.8}
            aria-valuemin={0}
            aria-valuetext="142.8 GB used across Stream and R2 on unlimited tier"
          >
            <div
              className="bg-brand-primary h-full transition-all duration-500"
              style={{ width: "69%" }}
              title="Cloudflare Stream: 98.4 GB"
            />
            <div
              className="bg-cyan-500 dark:bg-cyan-400 h-full transition-all duration-500"
              style={{ width: "31%" }}
              title="Cloudflare R2: 44.4 GB"
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-brand-muted">
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              {dashboardContent.storageWidget.policy}
            </span>
            <Link
              href="/dashboard/storage"
              className="text-brand-primary hover:underline font-medium"
            >
              {dashboardContent.storageWidget.details}
            </Link>
          </div>
        </div>

        {/* Creator profile footer */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-xl hover:bg-brand-bg-soft/60 transition-colors text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-7 w-7 rounded-full object-cover shrink-0 border border-brand-border"
              />
            ) : (
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
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
            className="text-brand-muted hover:text-red-500 p-1.5 rounded-lg hover:bg-brand-bg-soft transition-colors cursor-pointer"
            title={dashboardContent.navigation.signOut}
            aria-label={dashboardContent.navigation.signOut}
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

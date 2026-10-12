"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UploadCloud, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { useCurrentCreator } from "@/lib/hooks/use-current-creator";
import { usePlatformShortcut } from "@/lib/hooks/use-platform-shortcut";
import { dashboardContent } from "@/lib/content/dashboard";

export function DashboardHeader({
  onOpenMobileSidebar,
}: {
  onOpenMobileSidebar: () => void;
}) {
  const pathname = usePathname();
  const { displayName, initial, avatarUrl } = useCurrentCreator();
  const { symbol: shortcutSymbol } = usePlatformShortcut();
  const [commandOpen, setCommandOpen] = React.useState(false);

  // Derive human-readable subpage label
  const getSubpageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return null;
    const sub = segments[1];
    return sub.charAt(0).toUpperCase() + sub.slice(1);
  };

  const subpageTitle = getSubpageTitle();

  return (
    <header className="h-16 border-b border-brand-border bg-brand-surface/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onOpenMobileSidebar}
          className="lg:hidden text-brand-muted hover:text-brand-text"
          aria-label="Open Navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Semantic Breadcrumb (No duplicate H1, uniform sans typography) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-brand-muted font-medium">
          <Link
            href="/dashboard"
            className="hover:text-brand-text transition-colors"
          >
            {dashboardContent.header.dashboardBreadcrumb}
          </Link>

          {subpageTitle && (
            <>
              <span className="text-brand-border-strong select-none">/</span>
              <span className="text-brand-text font-semibold">{subpageTitle}</span>
            </>
          )}
        </nav>
      </div>

      {/* Right Action Group */}
      <div className="flex items-center gap-2.5">
        {/* Quick Search / Command Palette Trigger with OS-aware shortcut */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-brand-border bg-brand-bg-soft/50 hover:bg-brand-bg-soft hover:border-brand-border-strong text-brand-muted hover:text-brand-text text-xs transition-colors cursor-pointer"
          aria-label={`Open command palette (${shortcutSymbol})`}
        >
          <Search className="h-3.5 w-3.5" />
          <span>{dashboardContent.header.quickActions}</span>
          <kbd className="ml-1.5 font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-muted font-medium">
            {shortcutSymbol}
          </kbd>
        </button>

        {/* Quick Upload action */}
        <Link href="/dashboard/upload">
          <Button variant="primary" size="sm" className="shadow-xs">
            <UploadCloud className="h-4 w-4" />
            <span className="hidden sm:inline">{dashboardContent.header.newUpload}</span>
          </Button>
        </Link>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-brand-muted hover:text-brand-text"
          title={dashboardContent.header.notifications}
          aria-label={dashboardContent.header.notifications}
        >
          <Bell className="h-4 w-4" />
        </Button>

        {/* Theme switcher */}
        <ThemeToggle />

        {/* User avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-8 w-8 rounded-full object-cover shrink-0 border border-brand-border"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-brand-primary text-white font-bold text-xs flex items-center justify-center shrink-0 border border-brand-border shadow-xs">
            {initial}
          </div>
        )}
      </div>

      {/* Global Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}

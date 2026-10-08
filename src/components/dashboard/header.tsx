"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, UploadCloud, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPalette } from "@/components/dashboard/command-palette";
import { useAuth } from "@/lib/hooks/use-auth";

export function DashboardHeader({
  onOpenMobileSidebar,
}: {
  onOpenMobileSidebar: () => void;
}) {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const [commandOpen, setCommandOpen] = React.useState(false);

  const displayName = profile?.display_name || user?.displayName || "Creator";
  const initial = (displayName.charAt(0) || "C").toUpperCase();

  // Compute breadcrumb title based on route
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Creator Overview";
    const sub = segments[1];
    return sub.charAt(0).toUpperCase() + sub.slice(1);
  };

  return (
    <header className="h-16 border-b border-brand-border bg-brand-surface/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 transition-colors">
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

        {/* Breadcrumb title */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-brand-muted hidden sm:inline">
            Dashboard
          </span>
          <span className="text-brand-muted hidden sm:inline">/</span>
          <h1 className="text-sm font-bold text-brand-text tracking-tight">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Right Action Group */}
      <div className="flex items-center gap-2.5">
        {/* Quick Search / Command Palette Trigger */}
        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border border-brand-border bg-brand-bg-soft/70 hover:bg-brand-bg-soft text-brand-muted hover:text-brand-text text-xs transition-colors cursor-pointer"
          aria-label="Open command palette"
        >
          <Search className="h-3.5 w-3.5" />
          <span>Quick actions...</span>
          <kbd className="ml-1.5 font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-surface border border-brand-border text-brand-muted">
            ⌘K
          </kbd>
        </button>

        {/* Quick Upload action */}
        <Link href="/dashboard/upload">
          <Button variant="primary" size="sm" className="shadow-sm shadow-brand-primary/20">
            <UploadCloud className="h-4 w-4" />
            <span className="hidden sm:inline">New Upload</span>
          </Button>
        </Link>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-brand-muted"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
        </Button>

        {/* Theme switcher */}
        <ThemeToggle />

        {/* User avatar */}
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={displayName}
            className="h-8 w-8 rounded-full object-cover shrink-0 border border-brand-border"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-glow text-white font-bold text-xs flex items-center justify-center shrink-0 border border-brand-border">
            {initial}
          </div>
        )}
      </div>

      {/* Global Command Palette */}
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}

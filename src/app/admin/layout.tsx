import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Film,
  UploadCloud,
  HardDrive,
  DollarSign,
  Sliders,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users & Creators", icon: Users },
  { href: "/admin/content", label: "Content & Moderation", icon: Film },
  { href: "/admin/uploads", label: "Upload Monitor", icon: UploadCloud },
  { href: "/admin/storage", label: "Storage & R2", icon: HardDrive },
  { href: "/admin/earnings", label: "Earnings & Ledger", icon: DollarSign },
  { href: "/admin/settings", label: "Platform Settings", icon: Sliders },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-brand-border bg-brand-surface/95 flex flex-col justify-between shrink-0 hidden md:flex sticky top-0 h-screen">
        <div>
          {/* Admin Header */}
          <div className="h-16 px-6 border-b border-brand-border flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <Image
                src="/logo.webp"
                alt="Playxim"
                width={26}
                height={26}
                className="rounded-lg object-contain"
              />
              <span className="font-bold text-sm tracking-tight text-brand-text">
                Playxim Admin
              </span>
            </Link>
            <Badge variant="glow" className="text-[10px] uppercase font-mono">
              Ops
            </Badge>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)] text-xs font-semibold text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft/50 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-brand-border space-y-3">
          <div className="flex items-center justify-between text-xs text-brand-muted">
            <span className="flex items-center gap-1.5 font-mono text-[11px]">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span>Superadmin</span>
            </span>
            <ThemeToggle />
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-brand-primary hover:underline"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Creator Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-brand-border bg-brand-surface/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-mono text-brand-muted">
            <span className="text-emerald-500 font-bold">●</span>
            <span>Cluster: us-east-production</span>
            <span>•</span>
            <span>R2: Synced</span>
            <span>•</span>
            <span>Stream: Operational</span>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="font-mono text-[10px]">
              Schema v1.2
            </Badge>
          </div>
        </header>

        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { DashboardHeader } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-brand-bg transition-colors duration-200">
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex h-full">
        <DashboardSidebar />
      </div>

      {/* Mobile Sidebar Slide-Over Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-50 w-72 h-full bg-brand-surface shadow-2xl animate-in slide-in-from-left duration-200">
            <DashboardSidebar mobile onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Viewport Shell */}
      <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
        <DashboardHeader onOpenMobileSidebar={() => setMobileSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

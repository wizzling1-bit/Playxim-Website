"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout-primitives";

export function MarketingFooter() {
  return (
    <footer className="border-t border-slate-200/80 dark:border-brand-border bg-slate-50 dark:bg-[#07090E] text-slate-600 dark:text-brand-muted text-xs sm:text-sm pt-16 pb-12 transition-colors">
      <Container className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12 text-left">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-slate-200 dark:border-brand-border bg-white dark:bg-brand-surface shadow-xs">
                <Image
                  src="/logo.webp"
                  alt="Playxim Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold tracking-tight text-base text-slate-900 dark:text-brand-text">
                PLAYXIM
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-brand-muted max-w-sm leading-relaxed">
              Upload videos and files without limits. Get instant share links, stream in 4K or download via web and mobile app, and earn $1.00 for every 1,000 views.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational (99.98% Uptime)</span>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              Product
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#features" className="hover:text-brand-text transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#upload-methods" className="hover:text-brand-text transition-colors">
                  Ways to Upload
                </a>
              </li>
              <li>
                <a href="#for-who" className="hover:text-brand-text transition-colors">
                  Creators vs Viewers
                </a>
              </li>
              <li>
                <a href="#earnings-calculator" className="hover:text-brand-text transition-colors">
                  Earnings Calculator
                </a>
              </li>
              <li>
                <a
                  href="https://play.google.com/store/apps/details?id=com.playxim.app&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-text transition-colors inline-flex items-center gap-1 text-brand-primary"
                >
                  <span>Play Store App</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Creators links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              Community & Help
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://t.me/playxim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-text transition-colors text-blue-500 font-semibold inline-flex items-center gap-1"
                >
                  <span>Official Telegram</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <a href="#comparison" className="hover:text-brand-text transition-colors">
                  Why Playxim
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-brand-text transition-colors">
                  FAQ & Rules
                </a>
              </li>
              <li>
                <Link href="/auth/sign-up" className="hover:text-brand-text transition-colors">
                  Create Free Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Legal links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              Legal
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy" className="hover:text-brand-text transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-text transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/creator-agreement" className="hover:text-brand-text transition-colors">
                  Creator Agreement
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-brand-text transition-colors">
                  DMCA Notice
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-text transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200/80 dark:border-brand-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <p>© 2026 Playxim Inc. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Domain: playxim.com</span>
            <span>•</span>
            <span>Unlimited Cloud & Stream Platform</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

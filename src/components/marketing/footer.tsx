import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/layout-primitives";

export function MarketingFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-surface text-brand-muted text-sm pt-16 pb-12 transition-colors">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg border border-brand-border bg-brand-surface shadow-sm">
                <Image
                  src="/logo.webp"
                  alt="Playxim Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold tracking-tight text-base text-brand-text">
                PLAYXIM
              </span>
            </Link>
            <p className="text-xs text-brand-muted max-w-sm leading-relaxed">
              Playxim is a creator-first platform providing unlimited-by-policy content storage,
              zero-compression file delivery, and application video streaming monetization.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Operational (99.98% Uptime)</span>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              Product
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/features" className="hover:text-brand-text transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/why-playxim" className="hover:text-brand-text transition-colors">
                  Why Playxim
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-brand-text transition-colors">
                  Pricing & Limits
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-brand-text transition-colors">
                  Consumer Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Creators links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              Creators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/creator" className="hover:text-brand-text transition-colors">
                  Creator Program
                </Link>
              </li>
              <li>
                <Link href="/creator#monetization" className="hover:text-brand-text transition-colors">
                  View Earnings Math
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-brand-text transition-colors">
                  Creator FAQ
                </Link>
              </li>
              <li>
                <Link href="/auth/sign-up" className="hover:text-brand-text transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-text">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/terms" className="hover:text-brand-text transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-text transition-colors">
                  Privacy Policy
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
        <div className="border-t border-brand-border/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-brand-muted gap-4">
          <p>© 2026 Playxim Inc. All rights reserved.</p>
          <p className="flex items-center gap-4">
            <span>Domain: playxim.com</span>
            <span>•</span>
            <span>Apple × Linear Precision</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

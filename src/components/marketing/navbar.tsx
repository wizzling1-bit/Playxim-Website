"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Sparkles, ChevronDown, HardDrive, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Container } from "@/components/ui/layout-primitives";
import { cn } from "@/lib/utils";

const PLATFORM_ITEMS = [
  {
    href: "/features",
    label: "Features & Architecture",
    description: "Cloudflare R2 storage, adaptive Stream encoding, edge delivery.",
    icon: <Sparkles className="h-4 w-4 text-brand-primary" />,
  },
  {
    href: "/why-playxim",
    label: "Why Playxim",
    description: "Zero egress fees, no artificial storage tiers, pure creator cloud.",
    icon: <HardDrive className="h-4 w-4 text-brand-glow" />,
  },
  {
    href: "/download",
    label: "Apps & Ecosystem",
    description: "Seamless player handoffs for iOS, Android, and Web.",
    icon: <Smartphone className="h-4 w-4 text-emerald-500" />,
  },
];

const MAIN_NAV_LINKS = [
  { href: "/creator", label: "Creators" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
];

export function MarketingNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [platformOpen, setPlatformOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [prevPath, setPrevPath] = React.useState(pathname);

  // Close mobile menu and dropdown on route change
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileMenuOpen(false);
    setPlatformOpen(false);
  }

  // Close dropdown on click outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setPlatformOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isPlatformActive =
    pathname === "/features" || pathname === "/why-playxim" || pathname === "/download";

  return (
    <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-xl border-b border-brand-border">
      <Container className="flex h-16 items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-sm transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.webp"
                alt="Playxim Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <span className="font-bold tracking-tight text-lg text-brand-text flex items-center gap-1.5">
              PLAYXIM
              <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                Creator Cloud
              </span>
            </span>
          </Link>

          {/* Streamlined Desktop Navigation (<=4 items) */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {/* Platform Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setPlatformOpen(true)}
              onMouseLeave={() => setPlatformOpen(false)}
            >
              <button
                type="button"
                onClick={() => setPlatformOpen(!platformOpen)}
                className={cn(
                  "flex items-center gap-1.5 py-1 transition-colors cursor-pointer border-b-2",
                  isPlatformActive
                    ? "text-brand-primary border-brand-primary font-semibold"
                    : "text-brand-muted hover:text-brand-text border-transparent"
                )}
                aria-expanded={platformOpen}
                aria-haspopup="true"
              >
                <span>Platform</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-150",
                    platformOpen && "rotate-180"
                  )}
                />
              </button>

              {platformOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface/95 backdrop-blur-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="space-y-1">
                    {PLATFORM_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-start gap-3 p-2.5 rounded-[var(--radius-md)] transition-colors hover:bg-brand-bg-soft",
                          pathname === item.href && "bg-brand-primary/10 text-brand-primary"
                        )}
                      >
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <div>
                          <div className="text-xs font-semibold text-brand-text">
                            {item.label}
                          </div>
                          <div className="text-[11px] text-brand-muted leading-tight mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Standalone Nav Links */}
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors duration-150 py-1 border-b-2",
                    isActive
                      ? "text-brand-primary border-brand-primary font-semibold"
                      : "text-brand-muted hover:text-brand-text border-transparent"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop CTA & Theme Switcher */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/auth/sign-in">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button variant="primary" size="sm" className="shadow-sm">
              <span>Start Uploading</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation-menu" className="lg:hidden border-b border-brand-border bg-brand-surface/95 backdrop-blur-2xl px-4 py-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-muted px-3 pt-1">
              Platform
            </div>
            {PLATFORM_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2.5",
                  pathname === item.href
                    ? "bg-brand-primary/10 text-brand-primary font-semibold"
                    : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-muted px-3 pt-2">
              Community & Plans
            </div>
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary font-semibold"
                      : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-4 border-t border-brand-border/60 flex flex-col gap-2">
              <Link href="/auth/sign-in">
                <Button variant="secondary" className="w-full justify-center">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button variant="primary" className="w-full justify-center">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Uploading (Free)</span>
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

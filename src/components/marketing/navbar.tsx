"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles, ChevronDown, HardDrive, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
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
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [platformOpen, setPlatformOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [prevPath, setPrevPath] = React.useState(pathname);

  // Monitor scroll threshold to morph navbar
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isScrolled
          ? "py-2 sm:py-2.5 backdrop-blur-2xl bg-brand-bg/80 border-b border-brand-border/80 shadow-md shadow-black/5 dark:shadow-black/40"
          : "py-3.5 sm:py-4 bg-transparent border-b border-transparent"
      )}
    >
      <div
        className={cn(
          "mx-auto transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] px-4 sm:px-6 lg:px-8",
          isScrolled ? "max-w-7xl" : "max-w-7xl"
        )}
      >
        <div className="flex h-12 sm:h-14 items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo.webp"
                  alt="Playxim Logo"
                  fill
                  className="object-contain p-1"
                  priority
                />
              </div>
              <span className="font-display font-bold tracking-tight text-lg text-brand-text flex items-center gap-2">
                PLAYXIM
                <span className="hidden sm:inline-flex text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                  Creator Cloud
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
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
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer",
                    isPlatformActive
                      ? "text-brand-primary font-semibold bg-brand-primary/10"
                      : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                  )}
                  aria-expanded={platformOpen}
                  aria-haspopup="true"
                >
                  <span>Platform</span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
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
                      "px-3 py-1.5 rounded-full transition-all duration-200",
                      isActive
                        ? "text-brand-primary font-semibold bg-brand-primary/10"
                        : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
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
              <Button
                variant="primary"
                size="sm"
                className="group pl-4 pr-2 shadow-sm rounded-full"
              >
                <span>Start Uploading</span>
                <span className="h-6 w-6 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative h-9 w-9 rounded-xl border border-brand-border bg-brand-surface/80 flex flex-col items-center justify-center gap-1.5 transition-colors hover:bg-brand-bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <span
                className={cn(
                  "h-0.5 w-5 bg-brand-text transition-all duration-200",
                  mobileMenuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-brand-text transition-all duration-200",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 bg-brand-text transition-all duration-200",
                  mobileMenuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="lg:hidden border-b border-brand-border bg-brand-surface/95 backdrop-blur-2xl px-5 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
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
                <Button variant="primary" className="w-full justify-center group">
                  <Sparkles className="h-4 w-4" />
                  <span>Start Uploading (Free)</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

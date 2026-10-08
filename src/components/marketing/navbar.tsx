"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles, ChevronDown, HardDrive, Smartphone, Menu, X } from "lucide-react";
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
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#monetization", label: "Earn $1/1K Views" },
  { href: "#faq", label: "FAQ" },
];

export function MarketingNavbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [platformOpen, setPlatformOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [prevPath, setPrevPath] = React.useState(pathname);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileMenuOpen(false);
    setPlatformOpen(false);
  }

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
    <div
      className={cn(
        "sticky top-0 z-50 w-full pointer-events-none transition-all duration-400",
        isScrolled ? "pt-3 sm:pt-4 px-3 sm:px-6" : "pt-0 px-0"
      )}
    >
      <header
        className={cn(
          "pointer-events-auto mx-auto transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled
            ? "max-w-5xl rounded-full bg-brand-surface/92 dark:bg-[#111728]/92 backdrop-blur-2xl border border-brand-border/90 shadow-xl shadow-black/5 dark:shadow-black/40 py-1.5 px-4 sm:px-6 scale-[0.99]"
            : "max-w-7xl border-b border-brand-border/40 bg-brand-bg/60 dark:bg-[#07090E]/60 backdrop-blur-md py-3.5 sm:py-4 px-4 sm:px-8 lg:px-10 rounded-none shadow-none"
        )}
      >
        <div className="flex h-10 sm:h-11 items-center justify-between gap-3">
          {/* Brand Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Playxim Home">
            <div className="relative h-7 w-7 sm:h-8 sm:w-8 overflow-hidden rounded-lg border border-brand-border/80 bg-brand-surface shadow-xs transition-transform duration-200 group-hover:scale-105">
              <Image
                src="/logo.webp"
                alt="Playxim Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <span className="font-display font-bold tracking-tight text-base sm:text-lg text-brand-text">
              PLAYXIM
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium" aria-label="Main Navigation">
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
                  "flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-xs font-semibold",
                  isPlatformActive
                    ? "text-brand-primary bg-brand-primary/10"
                    : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                )}
                aria-expanded={platformOpen}
                aria-haspopup="true"
              >
                <span>Platform</span>
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200 opacity-70",
                    platformOpen && "rotate-180"
                  )}
                />
              </button>

              {platformOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface/98 backdrop-blur-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="space-y-1">
                    {PLATFORM_ITEMS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-start gap-2.5 p-2 rounded-[var(--radius-md)] transition-colors hover:bg-brand-bg-soft",
                          pathname === item.href && "bg-brand-primary/10 text-brand-primary"
                        )}
                      >
                        <div className="mt-0.5 shrink-0">{item.icon}</div>
                        <div>
                          <div className="text-xs font-semibold text-brand-text">
                            {item.label}
                          </div>
                          <div className="text-xs text-brand-muted leading-tight mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Standalone Links */}
            {MAIN_NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-full transition-all duration-200 text-xs font-semibold",
                    isActive
                      ? "text-brand-primary bg-brand-primary/10"
                      : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <Link href="/auth/sign-in">
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-semibold rounded-full">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button
                variant="primary"
                size="sm"
                className="h-8 px-3.5 text-xs font-semibold group rounded-full shadow-sm hover:shadow-brand-glow/20"
              >
                <span>Start Uploading</span>
                <ArrowRight className="h-3 w-3 ml-1 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1.5">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-8 w-8 rounded-full border border-brand-border bg-brand-surface flex items-center justify-center text-brand-text transition-colors hover:bg-brand-bg-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-brand-border/60 mt-2 space-y-2 animate-in fade-in duration-150">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-brand-muted px-2 pt-1">
                Platform
              </div>
              {PLATFORM_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2",
                    pathname === item.href
                      ? "bg-brand-primary/10 text-brand-primary font-semibold"
                      : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="text-xs font-bold uppercase tracking-wider text-brand-muted px-2 pt-2">
                Navigation
              </div>
              {MAIN_NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    pathname === link.href
                      ? "bg-brand-primary/10 text-brand-primary font-semibold"
                      : "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-brand-border/60 flex items-center gap-2">
              <Link href="/auth/sign-in" className="flex-1">
                <Button variant="secondary" size="sm" className="w-full text-xs rounded-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up" className="flex-1">
                <Button variant="primary" size="sm" className="w-full text-xs rounded-full">
                  Start Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

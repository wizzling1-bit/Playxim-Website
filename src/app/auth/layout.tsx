import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-brand-bg transition-colors duration-200 relative overflow-hidden">
      {/* Background grid pattern & ambient glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-brand-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Auth Top Header */}
      <header className="w-full px-6 py-6 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Image
              src="/logo.webp"
              alt="Playxim Logo"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <span className="font-display font-bold tracking-tight text-lg text-brand-text">
            PLAYXIM
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-auto relative z-10">
        <div className="w-full max-w-md double-bezel shadow-2xl">
          {children}
        </div>
      </main>

      {/* Auth Footer */}
      <footer className="w-full py-6 text-center text-xs text-brand-muted border-t border-brand-border/40">
        <p>© 2026 Playxim Inc. Protected by Firebase Authentication & Cloud Firestore Security Rules.</p>
      </footer>
    </div>
  );
}

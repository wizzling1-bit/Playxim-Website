import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";

export function CtaBanner({
  title = "Ready to own your content infrastructure?",
  subtitle = "Join creators worldwide uploading without storage caps and earning from qualified video streams.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-20 relative overflow-hidden bg-brand-bg-soft/50 border-t border-brand-border">
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <Container className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>No Credit Card Required • Instant Setup</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-text leading-tight">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/auth/sign-up">
            <Button size="pill-lg" variant="primary" className="shadow-lg shadow-brand-primary/20">
              <span>Start Uploading Now</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/creator">
            <Button size="pill-lg" variant="secondary">
              Calculate Potential Earnings
            </Button>
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-brand-muted">
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span>Unlimited-by-policy storage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span>Zero file compression</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span>Global edge distribution</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

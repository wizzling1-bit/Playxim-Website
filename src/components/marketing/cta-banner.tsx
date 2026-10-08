import Link from "next/link";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/layout-primitives";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CtaBanner({
  title = "Ready to own your content infrastructure?",
  subtitle = "Join creators around the world uploading without limits and getting paid for their videos.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-brand-bg-soft/50 border-t border-brand-border">
      {/* Background grid pattern & ambient glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <Container className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
        <ScrollReveal animation="fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-brand-surface/90 text-brand-primary border border-brand-border shadow-sm backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>No Credit Card Required • Instant Setup</span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delayMs={100}>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-brand-text leading-tight">
            {title}
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delayMs={200}>
          <p className="text-base sm:text-lg text-brand-muted max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delayMs={300}>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/auth/sign-up">
              <Button
                size="pill-lg"
                variant="primary"
                className="group pl-7 pr-3 shadow-xl shadow-brand-primary/25 rounded-full"
              >
                <span>Start Uploading Now</span>
                <span className="h-8 w-8 rounded-full bg-white/20 dark:bg-white/10 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
            <Link href="/creator">
              <Button size="pill-lg" variant="secondary" className="rounded-full px-6">
                Calculate Potential Earnings
              </Button>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delayMs={400}>
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
        </ScrollReveal>
      </Container>
    </section>
  );
}

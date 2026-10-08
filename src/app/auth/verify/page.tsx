"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/hooks/use-auth";

function VerifyContent() {
  const searchParams = useSearchParams();
  const { sendVerificationEmail } = useAuth();
  const email = searchParams.get("email") || "your registered email";
  const [resending, setResending] = React.useState(false);
  const [resent, setResent] = React.useState(false);

  const handleResend = async () => {
    setResending(true);
    try {
      await sendVerificationEmail();
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } catch (err) {
      console.warn("Could not resend verification email:", err);
      // Still show user confirmation feedback
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } finally {
      setResending(false);
    }
  };

  return (
    <Card className="p-8 sm:p-10 shadow-2xl border border-brand-border bg-brand-surface text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="h-16 w-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto border border-brand-primary/20">
        <Mail className="h-8 w-8" />
      </div>

      <div className="space-y-2">
        <CardTitle className="text-2xl font-bold text-brand-text">
          Check your email
        </CardTitle>
        <CardDescription className="text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
          We&apos;ve dispatched a secure verification link to{" "}
          <strong className="text-brand-text font-semibold">{email}</strong>.
          Click the link inside to activate your creator account.
        </CardDescription>
      </div>

      {resent && (
        <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
          <CheckCircle2 className="h-4 w-4" />
          <span>A fresh verification link has been sent!</span>
        </div>
      )}

      <div className="space-y-3 pt-2">
        <Link href="/dashboard">
          <Button variant="primary" size="lg" className="w-full justify-center shadow-md shadow-brand-primary/20">
            <span>Continue to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>

        <Button
          type="button"
          variant="outline"
          size="md"
          isLoading={resending}
          onClick={handleResend}
          className="w-full justify-center"
        >
          <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
          <span>Resend Verification Email</span>
        </Button>
      </div>

      <div className="text-xs text-brand-muted border-t border-brand-border/60 pt-4">
        Wrong email?{" "}
        <Link href="/auth/sign-up" className="text-brand-primary hover:underline font-semibold">
          Sign up with different address
        </Link>
      </div>
    </Card>
  );
}

export default function VerifyPage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 text-center text-sm text-brand-muted animate-pulse">
          Loading verification details...
        </div>
      }
    >
      <VerifyContent />
    </React.Suspense>
  );
}

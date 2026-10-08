"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPasswordSchema } from "@/lib/validations/auth";
import { useAuth } from "@/lib/hooks/use-auth";

export default function ForgotPasswordPage() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = forgotPasswordSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err: unknown) {
      console.error("Password reset error:", err);
      // For security, still show success or display specific error
      const message =
        err instanceof Error ? err.message : "Failed to dispatch recovery link.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 sm:p-10 shadow-2xl border border-brand-border bg-brand-surface animate-in fade-in zoom-in-95 duration-200">
      <CardHeader className="p-0 mb-6 text-center">
        <CardTitle className="text-2xl font-bold text-brand-text">
          Reset password
        </CardTitle>
        <CardDescription className="text-xs text-brand-muted mt-1">
          Enter your email to receive recovery instructions
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 space-y-4">
        {sent ? (
          <div className="py-6 text-center space-y-4 animate-in fade-in duration-300">
            <div className="h-14 w-14 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <p className="text-sm text-brand-text font-medium">
              Recovery link dispatched!
            </p>
            <p className="text-xs text-brand-muted leading-relaxed">
              If an account exists for <strong className="text-brand-text">{email}</strong>, you will receive password reset instructions shortly.
            </p>
            <Link href="/auth/sign-in" className="inline-block pt-2">
              <Button variant="outline" size="sm">
                Back to Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" required>Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="alex@creatorstudio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="h-4 w-4" />}
                required
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={loading}
              className="w-full justify-center shadow-md shadow-brand-primary/20"
            >
              <Send className="h-4 w-4" />
              <span>Send Recovery Link</span>
            </Button>
          </form>
        )}

        <div className="text-center text-xs text-brand-muted pt-3 border-t border-brand-border/60">
          <Link href="/auth/sign-in" className="hover:text-brand-text inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

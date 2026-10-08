"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WaveInput } from "@/components/ui/wave-input";
import { signUpSchema } from "@/lib/validations/auth";
import { useAuth } from "@/lib/hooks/use-auth";

export default function SignUpPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [agreeTerms, setAgreeTerms] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // Live password validation feedback
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = signUpSchema.safeParse({
      email,
      username,
      password,
      agreeTerms,
    });

    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      await signUpWithEmail(email, password, username);
      router.push(`/auth/verify?email=${encodeURIComponent(email)}`);
    } catch (err: unknown) {
      console.error("Sign up error:", err);
      const message =
        err instanceof Error
          ? err.message.includes("auth/email-already-in-use")
            ? "An account with this email already exists."
            : err.message
          : "Failed to create account. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      console.error("Google sign up error:", err);
      const message =
        err instanceof Error ? err.message : "Failed to sign up with Google.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 sm:p-10 shadow-2xl border border-brand-border bg-brand-surface animate-in fade-in zoom-in-95 duration-200">
      <CardHeader className="p-0 mb-6 text-center">
        <CardTitle className="text-2xl font-bold text-brand-text">
          Create creator account
        </CardTitle>
        <CardDescription className="text-xs text-brand-muted mt-1">
          Unlimited-by-policy storage • Zero compression • Direct payouts
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 space-y-5">
        {/* Google OAuth Provider */}
        <Button
          type="button"
          variant="secondary"
          onClick={handleGoogleSignUp}
          className="w-full justify-center gap-3 h-11 border-brand-border font-medium"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Sign up with Google</span>
        </Button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-brand-border w-full" />
          <span className="bg-brand-surface px-3 text-[11px] uppercase tracking-wider text-brand-muted absolute font-medium">
            or with email
          </span>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <WaveInput
            id="email"
            type="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            autoComplete="email"
            required
          />

          <WaveInput
            id="username"
            label="Claim Creator Username"
            value={username}
            onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
            leftIcon={<User className="h-4 w-4" />}
            helperText={`Your public handle will be playxim.com/@${username || "handle"}`}
            required
          />

          <div className="space-y-1">
            <WaveInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Secure Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              autoComplete="new-password"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-brand-text transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              }
              required
            />

            {/* Password checklist */}
            <div className="grid grid-cols-3 gap-1 pt-1 text-[11px] text-brand-muted">
              <span className={hasMinLength ? "text-emerald-500 flex items-center gap-1" : ""}>
                {hasMinLength ? <Check className="h-3 w-3" /> : "•"} 8+ chars
              </span>
              <span className={hasUppercase ? "text-emerald-500 flex items-center gap-1" : ""}>
                {hasUppercase ? <Check className="h-3 w-3" /> : "•"} 1 Uppercase
              </span>
              <span className={hasNumber ? "text-emerald-500 flex items-center gap-1" : ""}>
                {hasNumber ? <Check className="h-3 w-3" /> : "•"} 1 Number
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 accent-brand-primary"
              required
            />
            <label htmlFor="terms" className="text-xs text-brand-muted leading-tight">
              I agree to the{" "}
              <Link href="/terms" className="text-brand-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/creator-agreement" className="text-brand-primary hover:underline">
                Creator Agreement
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={loading}
            className="w-full justify-center shadow-md shadow-brand-primary/20"
          >
            <span>Create Creator Account</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="text-center text-xs text-brand-muted pt-2 border-t border-brand-border/60">
          Already have an account?{" "}
          <Link href="/auth/sign-in" className="text-brand-primary font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

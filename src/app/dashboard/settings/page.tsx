"use client";

import * as React from "react";
import {
  Shield,
  Key,
  Save,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import { useAuth } from "@/lib/hooks/use-auth";

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const [apiKeyCopied, setApiKeyCopied] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const copyApiKey = () => {
    navigator.clipboard.writeText("px_live_9f82a17cb09e43128df2b947");
    setApiKeyCopied(true);
    setTimeout(() => setApiKeyCopied(false), 2000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Preferences"
        description="Manage your creator authentication, notification rules, and developer API credentials."
      />

      <div className="space-y-6 max-w-4xl">
        {/* Account Credentials */}
        <Card className="p-6">
          <CardHeader className="p-0 mb-4">
            <CardTitle className="text-base font-bold text-brand-text">Account Information</CardTitle>
            <CardDescription className="text-xs text-brand-muted">
              Your primary authentication email managed via Firebase Authentication
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="email">Registered Email</Label>
                <Input
                  id="email"
                  defaultValue={user?.email || "creator@playxim.com"}
                  disabled
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="account-id">Creator UID</Label>
                <Input
                  id="account-id"
                  defaultValue={user?.uid || profile?.id || "usr_playxim_demo"}
                  disabled
                  className="font-mono text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="submit" variant="primary" size="sm">
                <Save className="h-4 w-4" />
                <span>Save Account Changes</span>
              </Button>
              {saved && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Changes saved</span>
                </span>
              )}
            </div>
          </form>
        </Card>

        {/* Developer API Token */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-brand-text flex items-center gap-2">
                <Key className="h-4 w-4 text-brand-primary" />
                <span>Playxim API Keys</span>
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Use your secret key to automate programmatic multipart uploads via CLI or CI/CD scripts.
              </p>
            </div>
            <Badge variant="glow">v1 Active</Badge>
          </div>

          <div className="flex items-center gap-3">
            <Input
              value="px_live_9f82a17cb09e43128df2b947"
              readOnly
              className="font-mono text-xs bg-brand-bg-soft"
            />
            <Button variant="outline" size="sm" onClick={copyApiKey} className="shrink-0 gap-1.5">
              {apiKeyCopied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{apiKeyCopied ? "Copied" : "Copy Key"}</span>
            </Button>
          </div>
        </Card>

        {/* Security & 2FA Status */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-brand-text flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>Security & Row-Level Authorization</span>
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Every file and database row is partitioned by owner_id with cryptographic checks.
              </p>
            </div>
            <Badge variant="success">Secured by RLS</Badge>
          </div>

          <div className="p-4 rounded-[var(--radius-md)] bg-brand-bg-soft text-xs text-brand-muted flex items-center justify-between">
            <span>Two-Factor Authentication (TOTP)</span>
            <Button variant="outline" size="xs">
              Enable 2FA
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

"use client";

import * as React from "react";
import {
  Copy,
  Lock,
  Globe,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/layout-primitives";
import { formatCompactNumber } from "@/lib/utils";

interface ShareLinkItem {
  id: string;
  code: string;
  targetName: string;
  isPasswordProtected: boolean;
  views: number;
  downloads: number;
  createdAt: string;
  expiresIn: string;
}

const INITIAL_LINKS: ShareLinkItem[] = [
  {
    id: "l1",
    code: "tokyo_4k_master",
    targetName: "Tokyo_Nightlife_4K_ProRes.mp4",
    isPasswordProtected: true,
    views: 74200,
    downloads: 1200,
    createdAt: "2 days ago",
    expiresIn: "Never",
  },
  {
    id: "l2",
    code: "vfx_sound_pack",
    targetName: "Sound_Effects_Master_Library.zip",
    isPasswordProtected: false,
    views: 18400,
    downloads: 4800,
    createdAt: "4 days ago",
    expiresIn: "30 days left",
  },
  {
    id: "l3",
    code: "blender_cyberpunk",
    targetName: "Cyberpunk_Environment_Assets.blend",
    isPasswordProtected: false,
    views: 8900,
    downloads: 1950,
    createdAt: "1 week ago",
    expiresIn: "Never",
  },
];

export default function LinksPage() {
  const [links, setLinks] = React.useState<ShareLinkItem[]>(INITIAL_LINKS);
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const copyUrl = (code: string) => {
    navigator.clipboard.writeText(`https://playxim.com/watch/${code}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Share Links"
        description="Monitor, customize, and revoke public distribution links for your hosted files and videos."
      />

      <div className="overflow-x-auto rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-brand-border bg-brand-bg-soft/40 text-brand-muted font-semibold">
              <th className="p-4">Shortlink & Target</th>
              <th className="p-4">Access Type</th>
              <th className="p-4">Views</th>
              <th className="p-4">Downloads</th>
              <th className="p-4">Expiration</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/40">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-brand-bg-soft/20 transition-colors">
                <td className="p-4">
                  <div className="font-mono font-bold text-brand-primary flex items-center gap-1.5">
                    <span>playxim.com/watch/{link.code}</span>
                  </div>
                  <div className="text-[11px] text-brand-muted mt-0.5 truncate max-w-[240px]">
                    {link.targetName}
                  </div>
                </td>

                <td className="p-4">
                  {link.isPasswordProtected ? (
                    <Badge variant="warning" className="gap-1">
                      <Lock className="h-3 w-3" />
                      <span>Password Protected</span>
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="gap-1">
                      <Globe className="h-3 w-3" />
                      <span>Public</span>
                    </Badge>
                  )}
                </td>

                <td className="p-4 font-mono font-semibold text-brand-text">
                  {formatCompactNumber(link.views)}
                </td>

                <td className="p-4 font-mono text-brand-muted">
                  {formatCompactNumber(link.downloads)}
                </td>

                <td className="p-4 text-brand-muted font-mono text-[11px]">
                  {link.expiresIn}
                </td>

                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyUrl(link.code)}
                      className="text-xs gap-1 h-8"
                    >
                      {copiedCode === link.code ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-500" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setLinks(links.filter((l) => l.id !== link.id))}
                      className="text-brand-muted hover:text-red-500"
                      title="Revoke Link"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

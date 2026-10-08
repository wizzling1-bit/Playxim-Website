import * as React from "react";
import {
  HardDrive,
  Video,
  FileArchive,
  TrendingUp,
  Layers,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/layout-primitives";

export default function AdminStoragePage() {
  const topCreators = [
    { username: "cinematic_vfx", usage: "8.12 TB", items: 64, growth: "+420 GB/mo" },
    { username: "wizzling", usage: "4.28 TB", items: 38, growth: "+210 GB/mo" },
    { username: "soundscapes", usage: "1.45 TB", items: 19, growth: "+85 GB/mo" },
    { username: "indie_filmmaker", usage: "940 GB", items: 12, growth: "+45 GB/mo" },
  ];

  const largestFiles = [
    { name: "Tokyo_Nightlife_4K_ProRes.mov", creator: "wizzling", size: "38.4 GB", provider: "Cloudflare Stream" },
    { name: "Unreal_Engine_Megapack.zip", creator: "cinematic_vfx", size: "28.1 GB", provider: "Cloudflare R2" },
    { name: "Symphony_Orchestra_Lossless_FLAC.tar", creator: "soundscapes", size: "14.2 GB", provider: "Cloudflare R2" },
    { name: "SciFi_Environment_Raw_Plate_01.mkv", creator: "cinematic_vfx", size: "12.0 GB", provider: "Cloudflare Stream" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Global Storage Analytics & Capacity"
        description="Monitor multi-terabyte R2 object buckets, Cloudflare Stream storage consumption, and heaviest assets."
      />

      {/* Top Storage Split Cards (§ 6.6) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Total R2 Object Storage</span>
            <HardDrive className="h-4 w-4 text-brand-primary" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-brand-text">32.8 TB</div>
          <p className="text-xs text-brand-muted">Non-video archives, sound libraries & documents</p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>Cloudflare Stream Video</span>
            <Video className="h-4 w-4 text-brand-glow" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-brand-text">15.4 TB</div>
          <p className="text-xs text-brand-muted">Transcoded HLS / DASH adaptive bitrates</p>
        </Card>

        <Card className="p-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-muted uppercase">
            <span>30-Day Storage Growth</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">+4.8 TB</div>
          <p className="text-xs text-brand-muted">Within predicted infrastructure capacity</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Largest Creators */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-brand-text flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand-primary" />
            <span>Highest Ingestion Creators</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {topCreators.map((c) => (
              <div key={c.username} className="p-3 rounded-lg bg-brand-bg-soft flex items-center justify-between">
                <div>
                  <div className="font-sans font-semibold text-brand-text">@{c.username}</div>
                  <div className="text-brand-muted text-[11px]">{c.items} total hosted items</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-brand-primary">{c.usage}</div>
                  <div className="text-[11px] text-emerald-500">{c.growth}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Largest Files */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-brand-text flex items-center gap-2">
            <FileArchive className="h-4 w-4 text-brand-glow" />
            <span>Top Individual Media Files</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            {largestFiles.map((f) => (
              <div key={f.name} className="p-3 rounded-lg bg-brand-bg-soft flex items-center justify-between">
                <div className="min-w-0 pr-3">
                  <div className="font-sans font-semibold text-brand-text truncate">{f.name}</div>
                  <div className="text-brand-muted text-[11px]">@{f.creator} • {f.provider}</div>
                </div>
                <div className="font-bold text-brand-text shrink-0">{f.size}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

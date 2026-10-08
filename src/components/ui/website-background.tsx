"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@/components/theme-provider";

// Dynamically import CursorRingField with SSR disabled to prevent WebGL canvas hydration errors
const CursorRingField = dynamic(
  () => import("@/components/ui/cursor-ring-field"),
  { ssr: false }
);

const DARK_COLORS = ["#38BDF8", "#1E6BFF", "#818CF8", "#00D2FF", "#6366F1"];
const LIGHT_COLORS = ["#1E6BFF", "#0284C7", "#2563EB", "#3B82F6", "#4F46E5"];

export function WebsiteBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-60 dark:opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    >
      <CursorRingField
        background="transparent"
        colors={colors}
        density={180}
        dotSize={100}
        speed={4.5}
        cameraDistance={160}
        ring={{
          push: 35,
          width: 9,
          radius: 13,
          turbulence: 80,
        }}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default WebsiteBackground;

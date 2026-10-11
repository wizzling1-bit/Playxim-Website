"use client";

import * as React from "react";
import { useTheme } from "@/components/theme-provider";

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

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-500"
      aria-hidden="true"
    >
      {isDark ? (
        <>
          {/* Subtle top ambient radial lighting */}
          <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.12)_0%,rgba(60,200,255,0.03)_45%,transparent_70%)] pointer-events-none" />
          {/* Mid subtle accent glow */}
          <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(30,107,255,0.06)_0%,transparent_65%)] pointer-events-none" />
          {/* Lower accent */}
          <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(60,200,255,0.04)_0%,transparent_65%)] pointer-events-none" />
        </>
      ) : (
        <>
          {/* Light mode top soft illumination */}
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(30,107,255,0.06)_0%,rgba(14,165,233,0.02)_40%,transparent_70%)] pointer-events-none" />
        </>
      )}
    </div>
  );
}

export default WebsiteBackground;

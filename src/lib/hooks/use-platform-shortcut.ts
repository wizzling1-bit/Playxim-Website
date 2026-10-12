"use client";

import * as React from "react";

/**
 * OS-Aware Keyboard Shortcut Hook
 * Returns '⌘K' on macOS/iOS and 'Ctrl K' on Windows/Linux to prevent incorrect modifier display.
 */
export function usePlatformShortcut(): { symbol: string; label: string } {
  // Safe SSR default
  const [symbol, setSymbol] = React.useState<string>("Ctrl K");
  const [label, setLabel] = React.useState<string>("Control K");

  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      const nav = navigator as any;
      const platformString =
        nav.userAgentData?.platform || nav.platform || nav.userAgent || "";
      const isMac = /(Mac|iPhone|iPod|iPad)/i.test(platformString);

      if (isMac) {
        setSymbol("⌘K");
        setLabel("Command K");
      } else {
        setSymbol("Ctrl K");
        setLabel("Control K");
      }
    }
  }, []);

  return { symbol, label };
}

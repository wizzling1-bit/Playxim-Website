"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

function getThemeSnapshot(): Theme {
  try {
    const val = localStorage.getItem("playxim-theme");
    if (val === "light" || val === "dark" || val === "system") {
      return val;
    }
  } catch {
    // ignore
  }
  return "light";
}

function getSystemDarkSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    media.removeEventListener("change", callback);
  };
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const theme = React.useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    () => defaultTheme
  );

  const isSystemDark = React.useSyncExternalStore(
    subscribe,
    getSystemDarkSnapshot,
    () => false
  );

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (isSystemDark ? "dark" : "light") : theme;

  React.useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
  }, [resolvedTheme]);

  const setTheme = React.useCallback((newTheme: Theme) => {
    try {
      localStorage.setItem("playxim-theme", newTheme);
      window.dispatchEvent(new Event("storage"));
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

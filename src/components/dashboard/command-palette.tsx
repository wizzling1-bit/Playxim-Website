"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  UploadCloud,
  FolderPlus,
  ListPlus,
  DollarSign,
  HardDrive,
  FileText,
  BarChart3,
  Palette,
  Settings,
  Sun,
  Moon,
  Command,
  ArrowRight,
  X,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface CommandItem {
  id: string;
  title: string;
  category: "Actions" | "Navigation" | "Theme";
  icon: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const commands: CommandItem[] = React.useMemo(
    () => [
      {
        id: "upload",
        title: "New Upload (Stream / R2)",
        category: "Actions",
        icon: <UploadCloud className="h-4 w-4 text-brand-primary" />,
        shortcut: "U",
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/upload");
        },
      },
      {
        id: "new-folder",
        title: "Create Folder",
        category: "Actions",
        icon: <FolderPlus className="h-4 w-4 text-brand-glow" />,
        shortcut: "F",
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/folders");
        },
      },
      {
        id: "new-playlist",
        title: "Create Video Playlist",
        category: "Actions",
        icon: <ListPlus className="h-4 w-4 text-emerald-500" />,
        shortcut: "P",
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/playlists");
        },
      },
      {
        id: "request-payout",
        title: "Request Earnings Payout",
        category: "Actions",
        icon: <DollarSign className="h-4 w-4 text-amber-500" />,
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/earnings");
        },
      },
      {
        id: "nav-content",
        title: "Content & File Manager",
        category: "Navigation",
        icon: <FileText className="h-4 w-4 text-brand-muted" />,
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/content");
        },
      },
      {
        id: "nav-analytics",
        title: "Audience & Stream Analytics",
        category: "Navigation",
        icon: <BarChart3 className="h-4 w-4 text-brand-muted" />,
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/analytics");
        },
      },
      {
        id: "nav-storage",
        title: "Storage Engine & Buckets",
        category: "Navigation",
        icon: <HardDrive className="h-4 w-4 text-brand-muted" />,
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/storage");
        },
      },
      {
        id: "nav-branding",
        title: "Creator Branding & Handle",
        category: "Navigation",
        icon: <Palette className="h-4 w-4 text-brand-muted" />,
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/branding");
        },
      },
      {
        id: "nav-settings",
        title: "Account & Workspace Settings",
        category: "Navigation",
        icon: <Settings className="h-4 w-4 text-brand-muted" />,
        onSelect: () => {
          onOpenChange(false);
          router.push("/dashboard/settings");
        },
      },
      {
        id: "theme-toggle",
        title: `Switch Theme (Current: ${theme === "dark" ? "Dark" : "Light"})`,
        category: "Theme",
        icon:
          theme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-brand-muted" />
          ),
        shortcut: "T",
        onSelect: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          onOpenChange(false);
        },
      },
    ],
    [onOpenChange, router, theme, setTheme]
  );

  const filteredCommands = React.useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Handle global keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // Key navigation inside palette
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredCommands.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCommands.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].onSelect();
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className="relative w-full max-w-xl rounded-[var(--radius-xl)] border border-brand-border bg-brand-surface shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-border/60 bg-brand-surface">
          <Search className="h-4 w-4 text-brand-muted shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a command or jump to page... (↑↓ to navigate, ↵ to run)"
            className="flex-1 bg-transparent text-sm text-brand-text placeholder:text-brand-muted/70 outline-none"
            aria-autocomplete="list"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-brand-muted hover:text-brand-text p-1"
              aria-label="Clear query"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 ml-2 text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-bg-soft border border-brand-border text-brand-muted">
            ESC
          </span>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          className="max-h-80 overflow-y-auto p-2 divide-y divide-brand-border/20"
        >
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-brand-muted">
              No matching commands or destinations found.
            </div>
          ) : (
            <div className="space-y-1">
              {filteredCommands.map((cmd, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={cmd.onSelect}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[var(--radius-md)] text-xs transition-colors cursor-pointer text-left ${
                      isSelected
                        ? "bg-brand-primary text-white"
                        : "text-brand-text hover:bg-brand-bg-soft"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={
                          isSelected
                            ? "text-white"
                            : "text-brand-muted"
                        }
                      >
                        {cmd.icon}
                      </span>
                      <span className="font-medium">{cmd.title}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] uppercase font-semibold tracking-wider ${
                          isSelected
                            ? "text-white/80"
                            : "text-brand-muted"
                        }`}
                      >
                        {cmd.category}
                      </span>
                      {cmd.shortcut && (
                        <kbd
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                            isSelected
                              ? "bg-white/20 border-white/30 text-white"
                              : "bg-brand-bg-soft border-brand-border text-brand-muted"
                          }`}
                        >
                          {cmd.shortcut}
                        </kbd>
                      )}
                      <ArrowRight
                        className={`h-3 w-3 ${
                          isSelected ? "text-white" : "text-brand-muted/40"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 py-2 border-t border-brand-border/40 bg-brand-bg-soft/40 flex items-center justify-between text-[11px] text-brand-muted">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-brand-surface border border-brand-border">
                ↑
              </kbd>
              <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-brand-surface border border-brand-border">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="font-mono text-[10px] px-1 py-0.5 rounded bg-brand-surface border border-brand-border">
                ↵
              </kbd>
              <span>to select</span>
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>+ K anywhere</span>
          </div>
        </div>
      </div>
    </div>
  );
}

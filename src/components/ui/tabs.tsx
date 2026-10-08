"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextType | undefined>(undefined);

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [currentValue, setCurrentValue] = React.useState(value || defaultValue || "");

  const handleValueChange = (newVal: string) => {
    if (value === undefined) {
      setCurrentValue(newVal);
    }
    onValueChange?.(newVal);
  };

  const activeValue = value !== undefined ? value : currentValue;

  return (
    <TabsContext.Provider value={{ value: activeValue, onValueChange: handleValueChange }}>
      <div className={cn("w-full space-y-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-bg-soft p-1 text-brand-muted border border-brand-border/60",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  disabled,
  className,
  children,
}: {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");
  const isActive = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] px-3.5 py-1.5 text-xs font-medium transition-all duration-150 outline-none select-none",
        isActive
          ? "bg-brand-surface text-brand-text shadow-sm font-semibold"
          : "text-brand-muted hover:text-brand-text hover:bg-brand-surface/50",
        disabled && "pointer-events-none opacity-40",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
}: {
  value: string;
  className?: string;
  children: React.ReactNode;
}) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");
  if (context.value !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn("mt-2 outline-none animate-in fade-in-50 duration-200", className)}
    >
      {children}
    </div>
  );
}

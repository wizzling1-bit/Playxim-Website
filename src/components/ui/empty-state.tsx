import * as React from "react";
import { FolderX } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon = <FolderX className="h-10 w-10 text-brand-muted" />,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-brand-border bg-brand-surface/50 p-12 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-bg-soft text-brand-muted border border-brand-border/60 mb-4 shadow-sm">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-brand-text">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-brand-muted leading-relaxed">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

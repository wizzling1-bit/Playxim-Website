import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  size?: "narrow" | "default" | "wide" | "full";
}) {
  const sizeClasses = {
    narrow: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1440px]",
    full: "max-w-none",
  };

  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  badge,
  action,
  className,
}: {
  title: string;
  description?: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-center md:justify-between pb-6 border-b border-brand-border/60 mb-6",
        className
      )}
    >
      <div className="space-y-1">
        {badge && <div className="mb-2">{badge}</div>}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-brand-text">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-brand-muted max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex items-center gap-3 shrink-0">{action}</div>}
    </div>
  );
}

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  className,
}: {
  badge?: React.ReactNode;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-3 mb-12",
        align === "center" ? "text-center mx-auto max-w-2xl" : "text-left max-w-2xl",
        className
      )}
    >
      {badge && <div className={cn("inline-flex", align === "center" && "justify-center")}>{badge}</div>}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-text">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-brand-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

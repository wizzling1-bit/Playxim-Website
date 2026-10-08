import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-blue-50/90 text-blue-700 border border-blue-200/80 dark:bg-brand-primary/20 dark:text-brand-glow dark:border-brand-primary/20",
        secondary:
          "bg-slate-100 text-slate-700 dark:bg-brand-bg-soft dark:text-brand-muted border border-slate-200 dark:border-brand-border",
        outline:
          "border border-slate-200 dark:border-brand-border text-slate-600 dark:text-brand-muted",
        success:
          "bg-emerald-50/90 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20",
        warning:
          "bg-amber-50/90 text-amber-700 border border-amber-200/80 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/20",
        destructive:
          "bg-red-50/90 text-red-700 border border-red-200/80 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/20",
        glow:
          "bg-blue-50/90 text-blue-700 border border-blue-200/80 dark:bg-brand-primary/20 dark:text-brand-glow dark:border-brand-primary/30 shadow-xs",
        glass:
          "glass-panel text-brand-text shadow-none backdrop-blur-md",
        premium:
          "bg-amber-50/90 text-amber-700 border border-amber-200/80 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

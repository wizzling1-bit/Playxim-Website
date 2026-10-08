import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-blue-50 text-blue-900 border-blue-200 dark:bg-brand-primary/20 dark:text-brand-glow dark:border-brand-primary/20",
        secondary:
          "bg-brand-bg-soft text-brand-muted border border-brand-border",
        outline:
          "border border-brand-border text-brand-muted",
        success:
          "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/20",
        warning:
          "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/20",
        destructive:
          "bg-red-50 text-red-800 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/20",
        glow:
          "bg-blue-50 text-blue-900 border-blue-200 dark:bg-brand-primary/20 dark:text-brand-glow dark:border-brand-primary/30 shadow-sm",
        glass:
          "glass-panel text-brand-text shadow-none backdrop-blur-md",
        premium:
          "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
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

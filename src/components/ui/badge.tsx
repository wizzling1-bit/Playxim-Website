import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-blue-500/10 text-blue-700 border border-blue-500/20 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/25",
        secondary:
          "bg-brand-bg-soft text-brand-muted border border-brand-border",
        outline:
          "border border-brand-border text-brand-muted bg-transparent",
        success:
          "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
        warning:
          "bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/25",
        destructive:
          "bg-red-500/10 text-red-700 border border-red-500/20 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/25",
        glow:
          "bg-blue-500/10 text-brand-primary border border-brand-primary/20 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30 shadow-2xs",
        glass:
          "glass-panel text-brand-text shadow-none backdrop-blur-md",
        premium:
          "bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30",
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

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-glow border border-brand-primary/20",
        secondary:
          "bg-brand-bg-soft text-brand-muted border border-brand-border",
        outline:
          "border border-brand-border text-brand-muted",
        success:
          "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
        warning:
          "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
        destructive:
          "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20",
        glow:
          "bg-brand-primary/15 text-brand-primary dark:text-brand-glow border border-brand-primary/30 shadow-[0_0_12px_rgba(30,107,255,0.25)]",
        glass:
          "glass-panel text-brand-text shadow-none backdrop-blur-md",
        premium:
          "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30",
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

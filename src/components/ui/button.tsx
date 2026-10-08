import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-white shadow-sm hover:bg-brand-primary-hover hover:shadow-brand-glow/25 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0",
        secondary:
          "bg-brand-bg-soft text-brand-text border border-brand-border hover:bg-brand-surface-2 hover:border-brand-primary/30",
        outline:
          "border border-brand-border bg-transparent text-brand-text hover:bg-brand-bg-soft hover:text-brand-text",
        ghost:
          "text-brand-muted hover:text-brand-text hover:bg-brand-bg-soft",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        glass:
          "glass-panel text-brand-text hover:bg-white/20 dark:hover:bg-white/10 hover:border-brand-primary/40 shadow-sm",
        accent:
          "bg-amber-500 text-white hover:bg-amber-600 shadow-sm hover:-translate-y-0.5 active:translate-y-0",
      },
      size: {
        xs: "relative h-7 rounded-[var(--radius-xs)] px-2.5 text-xs after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-full after:min-h-[44px] after:content-['']",
        sm: "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
        md: "h-10 rounded-[var(--radius-md)] px-4 text-sm",
        lg: "h-12 rounded-[var(--radius-lg)] px-6 text-base font-semibold",
        pill: "h-10 rounded-full px-5 text-sm font-medium",
        "pill-lg": "h-12 rounded-full px-7 text-base font-medium",
        icon: "relative h-9 w-9 rounded-[var(--radius-md)] p-0 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
        "icon-sm": "relative h-7 w-7 rounded-[var(--radius-sm)] p-0 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:min-w-[44px] after:min-h-[44px] after:content-['']",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

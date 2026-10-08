import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius-md)] bg-brand-bg-soft/80 border border-brand-border/40",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };

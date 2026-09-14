import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 tracking-wide",
  {
    variants: {
      variant: {
        default:
          "border-primary/30 bg-primary/15 text-primary shadow-sm hover:bg-primary/20",
        secondary:
          "border-border/60 bg-secondary/80 text-secondary-foreground hover:bg-secondary",
        destructive:
          "border-rose-500/30 bg-rose-500/15 text-rose-600 dark:text-rose-400 shadow-sm hover:bg-rose-500/20",
        outline:
          "border-border text-foreground hover:bg-accent hover:text-accent-foreground",
        success:
          "border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm hover:bg-emerald-500/20",
        warning:
          "border-amber-500/30 bg-amber-500/15 text-amber-600 dark:text-amber-400 shadow-sm hover:bg-amber-500/20",
        arcade:
          "border-violet-500/40 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-violet-600 dark:text-violet-300 shadow-glow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

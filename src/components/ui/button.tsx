import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/25 hover:shadow-lg hover:shadow-violet-500/35 hover:brightness-110",
        destructive:
          "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md shadow-rose-500/25 hover:shadow-lg hover:shadow-rose-500/35 hover:brightness-110",
        outline:
          "border-2 border-border/80 bg-background/60 hover:bg-accent/80 hover:border-primary/60 hover:text-foreground backdrop-blur-sm shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border border-border/40",
        ghost:
          "hover:bg-accent/70 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline font-medium",
        success:
          "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 hover:brightness-110",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base font-bold",
        icon: "h-10 w-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

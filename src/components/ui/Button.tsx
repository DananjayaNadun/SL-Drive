"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-bold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-b-4 active:border-b-0 active:translate-y-1 transition-all",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary-shadow hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary-shadow hover:bg-secondary-hover",
        danger:
          "bg-danger text-danger-foreground border-danger-shadow hover:bg-danger-hover",
        success:
          "bg-success text-success-foreground border-success-shadow hover:bg-success-hover",
        ghost: "border-transparent bg-transparent text-foreground hover:bg-secondary active:translate-y-0 active:border-b-0",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-2xl px-8 text-lg w-full",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If we use asChild we would use Slot, but for simplicity we skip it unless needed
    const Comp = "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

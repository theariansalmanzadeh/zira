"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Toggle as TogglePrimitive } from "radix-ui";

import { cn } from "@shared/libs/utils";

const toggleVariants = cva(
  "hover:text-foreground aria-pressed:bg-muted cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[state=on]:bg-muted gap-1 rounded-lg text-sm font-medium transition-all [&_svg:not([class*='size-'])]:size-4 group/toggle hover:bg-muted inline-flex items-center justify-center whitespace-nowrap outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        filled: "px-xl! py-sm! bg-surface-container-high! text-on-surface-variant! data-[state=on]:bg-surface-container-lowest! data-[state=on]:text-on-surface! data-[state=on]:shadow-sm",
        outline: "border-input border px-xl! py-sm! bg-surface-container-lowest text-on-surface-variant! aria-pressed:bg-inverse-surface aria-pressed:text-inverse-on-surface data-[state=on]:bg-inverse-surface data-[state=on]:text-on-inverse-surface!",
        "outline-variant":
          "border border-outline-variant! bg-surface-container-lowest! rounded-full text-on-surface-variant! text-label-md px-xl py-sm aria-pressed:border-on-surface aria-pressed:text-on-surface aria-pressed:bg-transparent data-[state=on]:border-on-surface! data-[state=on]:text-on-surface! data-[state=on]:bg-transparent",
      },
      size: {
        default: "h-8 min-w-8 px-2",
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-1.5 text-[0.8rem]",
        lg: "h-9 min-w-9 px-2.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };

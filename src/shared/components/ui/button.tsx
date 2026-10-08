import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@shared/libs/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary/90 disabled:bg-surface-container-high disabled:text-on-surface",
        default:
          "bg-surface-container-lowest text-on-surface-variant hover:bg-on-surface-hover",
        "default-high": "bg-surface-container-high text-on-surface-variant",
        "default-outline":
          "bg-surface-container-lowest border border-outline text-on-surface-variant",
        "primary-outline":
          "border border-primary bg-surface-container-lowest text-primary",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-surface-container-lowest text-on-surface-variant hover:bg-on-surface-hover",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        outline:
          "bg-surface-container-lowest border border-outline-variant text-on-surface-variant! hover:bg-black/8",
        glass:
          "bg-white/16 backdrop-blur-[16px] text-surface-container-lowest rounded-button-lg",
        success:
          "border-0 bg-success-container text-success hover:bg-success-container/80",
        error:
          "border-0 bg-error-container text-error hover:bg-error-container/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={isLoading || props.disabled}
      >
        {asChild ? children : (
          <>
            {isLoading && <Spinner />}
            {!isLoading && children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

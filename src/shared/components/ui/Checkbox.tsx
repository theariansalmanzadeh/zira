import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@shared/libs/utils";

const checkboxVariants = cva(
  "grid place-content-center peer h-4 w-4 shrink-0 overflow-hidden rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "border-primary data-[state=checked]:bg-primary data-[state=checked]:text-on-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-on-primary",
        default:
          "border-outline bg-surface-container-lowest data-[state=checked]:bg-surface-container-lowest data-[state=checked]:text-on-surface-variant",
        "default-outline":
          "border border-outline bg-surface-container-lowest data-[state=checked]:bg-surface-container-lowest data-[state=checked]:text-on-surface-variant",
        "primary-outline":
          "border border-primary bg-surface-container-lowest data-[state=checked]:bg-surface-container-lowest data-[state=checked]:text-primary",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface CheckboxProps
  extends
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
  VariantProps<typeof checkboxVariants> { }

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, variant, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ variant }), "group", className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "grid place-content-center text-current data-[state=checked]:bg-primary data-[state=checked]:text-white p-0.5"
      )}
    >
      <Check className="h-4 w-4 group-data-[state=indeterminate]:hidden" />
      <Minus className="hidden h-4 w-4 group-data-[state=indeterminate]:block" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };

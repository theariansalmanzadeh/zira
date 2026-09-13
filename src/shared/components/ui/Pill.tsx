import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@shared/libs/utils";
import { Icon } from "../Icons/Icon";
import { IconLabel } from "../../types/icon";

const PillVariants = cva(
  "inline-flex items-center rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 gap-1",
  {
    variants: {
      variant: {
        contained: "bg-inverse-surface [&_span]:text-on-inverse-surface [&_#dot]:bg-on-inverse-surface",
        "contained-inverse": "bg-surface [&_span]:text-on-surface [&_#dot]:bg-on-surface border-none",
        tonal: "bg-surface-container-highest [&_span]:text-on-surface [&_#dot]:bg-on-surface border-0",
        outlined: "text-on-surface-variant border border-outline-variant [&_#dot]:bg-on-surface-variant",
        success: "bg-success-container [&_span]:text-on-success-container [&_#dot]:bg-on-success-container [&_svg]:text-on-success-container",
        warning: "bg-warning-container [&_span]:text-on-warning-container [&_#dot]:bg-on-warning-container [&_svg]:text-on-warning-container",
        error: "bg-error-container [&_span]:text-on-error-container [&_#dot]:bg-on-error-container [&_svg]:text-on-error-container",
        info: "bg-info-container [&_span]:text-on-info-container [&_#dot]:bg-on-info-container [&_svg]:text-on-info-container",
      },
      size: {
        default: "px-[8px] py-[4px] text-label-md",
        sm: "px-[8px] py-[4px] text-label-sm",
        md: "px-[8px] py-[4px] text-label-md",
        lg: "px-[8px] py-[4px] text-label-lg",
      },
    },
    defaultVariants: {
      variant: "contained",
      size: "default",
    },
  }
);

export interface PillProps
  extends
  React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof PillVariants> {
  text: string;
  hasDot?: boolean;
  icon?: IconLabel
  onClose?: () => void
}

function Pill({ className, variant, text, hasDot, icon, onClose, ...props }: PillProps) {
  return (
    <div className={cn(PillVariants({ variant }), className)} {...props}>
      {hasDot && <span className="w-1.5 h-1.5 rounded-full" id="dot" />}
      {icon && <Icon label={icon} />}
      <span className="text-nowrap font-regular">{text}</span>
      {onClose && (
        <button
          type="button"
          aria-label="بستن"
          onClick={(event) => {
            event.stopPropagation()
            onClose()
          }}
          className="size-4! cursor-pointer inline-flex shrink-0 items-center justify-center rounded-full"
        >
          <Icon label="closeSm400Linear" className="size-4! text-on-surface-cotainer" />
        </button>
      )}
    </div>
  );
}

export { Pill, PillVariants };

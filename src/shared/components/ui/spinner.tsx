import type { ComponentProps } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@shared/libs/utils";

function Spinner({
  className,
  strokeWidth = 2,
  ...props
}: Omit<ComponentProps<"svg">, "strokeWidth"> & {
  strokeWidth?: number;
}) {
  return (
    <Loader2
      strokeWidth={strokeWidth}
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin text-on-surface", className)}
      {...props}
    />
  );
}

export { Spinner };

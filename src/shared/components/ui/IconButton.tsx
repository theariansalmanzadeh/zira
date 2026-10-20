import * as React from "react";
import { Button, type ButtonProps } from "./button";
import type { IconLabel } from "@shared/types/icon";
import { Icon } from "@shared/components/Icons/Icon";
import { cn } from "../../libs/utils";

type IconButtonProps = Omit<ButtonProps, "children"> & {
  icon: IconLabel;
  iconClassName?: string;
  fill?: string;
};

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, fill, className, iconClassName, variant = "default", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        type="button"
        variant={variant}
        size="icon"
        className={cn("p-lg! rounded-button-lg! w-10 h-10 flex items-center justify-center", className)}
        {...props}
      >
        <Icon label={icon} className={cn("text-on-surface-variant size-6!", iconClassName)} fill={fill} />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;

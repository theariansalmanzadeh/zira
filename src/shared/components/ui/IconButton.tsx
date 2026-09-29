import { Button, type ButtonProps } from "./button";
import type { IconLabel } from "@shared/types/icon";
import { Icon } from "@shared/components/Icons/Icon";
import { cn } from "../../libs/utils";

const IconButton = ({
  icon,
  fill,
  onClick,
  className,
  iconClassName,
  variant = "default",
  disabled,
}: {
  icon: IconLabel;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  fill?: string;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
}) => {
  return (
    <Button
      type="button"
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      size="icon"
      className={cn("p-lg! rounded-button-lg! w-10 h-10 flex items-center justify-center", className)}
    >
      <Icon label={icon} className={cn("text-on-surface-variant size-6!", iconClassName)} fill={fill} />
    </Button>
  );
};

export default IconButton;

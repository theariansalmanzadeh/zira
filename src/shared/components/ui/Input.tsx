import { cn } from "@shared/libs/utils";
import type { IconLabel } from "@shared/types/icon";
import React, { useId, type ComponentProps } from "react";
import { Icon } from "@shared/components/Icons/Icon";
import CopyButton from "./CopyButton";

export const inputFieldClassName =
  "flex w-full outline-none ring-0 ring-offset-0 focus:outline-none focus:ring-0 focus:ring-offset-0 active:outline-none active:ring-0 active:ring-offset-0 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground disabled:cursor-not-allowed disabled:opacity-50 caret-on-surface-variant placeholder:text-outline text-base md:text-sm text-on-surface leading-6";

type InputFieldProps = ComponentProps<"input">;

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(inputFieldClassName, className)}
        {...props}
      />
    );
  },
);
InputField.displayName = "InputField";

type InputProps = Omit<InputFieldProps, "onChange" | "value"> & {
  iconClassName?: string;
  wrapperClassName?: string;
  iconId?: IconLabel;
  error?: boolean;
  msg?: string;
  label?: string;
  isCopyable?: boolean;
  onClickCopy?: VoidFunction;
  value?: string;
  onChange?: (value: string) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      wrapperClassName,
      iconClassName,
      iconId,
      isCopyable,
      onClickCopy,
      type,
      error,
      msg,
      label,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-[6px] text-label-md text-on-surface-variant"
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            "bg-surface-container-high flex flex-row items-center gap-1.5 rounded-container-lg",
            "py-3 px-3",
            "focus-within:outline-none focus-within:ring-0",
            error && "border border-red-600",
            wrapperClassName
          )}
        >
          {iconId && <Icon label={iconId} className={cn("", iconClassName)} />}
          {/* ToDo: Add value check */}
          {isCopyable && <CopyButton onCopy={onClickCopy} value={value || ""} />}
          <InputField
            id={inputId}
            type={type}
            className={className}
            // aria-invalid={error}
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            {...props}
          />
        </div>
        {msg && (
          <span
            className={cn(
              "text-sm text-on-surface-variant",
              error && "text-error"
            )}
          >
            {msg}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, InputField };

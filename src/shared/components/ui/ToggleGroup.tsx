"use client";

import * as React from "react";
import { type VariantProps } from "class-variance-authority";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";

import { cn } from "@/src/shared/libs/utils";
import { toggleVariants } from "@/src/shared/components/ui/Toggle";

const ToggleGroupContext = React.createContext<
    VariantProps<typeof toggleVariants> & {
        spacing?: number;
        orientation?: "horizontal" | "vertical";
    }
>({
    size: "default",
    variant: "default",
    spacing: 0,
    orientation: "horizontal",
});

function ToggleGroup({
    className,
    variant,
    size,
    spacing = 0,
    orientation = "horizontal",
    children,
    ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
        spacing?: number;
        orientation?: "horizontal" | "vertical";
    }) {
    return (
        <ToggleGroupPrimitive.Root
            data-slot="toggle-group"
            data-variant={variant}
            data-size={size}
            data-spacing={spacing}
            data-orientation={orientation}
            style={{ "--gap": spacing } as React.CSSProperties}
            className={cn(
                "rounded-lg data-[size=sm]:rounded-[min(var(--radius-md),10px)] group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch",
                "gap-sm",
                className
            )}
            {...props}
        >
            <ToggleGroupContext.Provider
                value={{ variant, size, spacing, orientation }}
            >
                {children}
            </ToggleGroupContext.Provider>
        </ToggleGroupPrimitive.Root>
    );
}

function ToggleGroupItem({
    className,
    children,
    variant = "default",
    size = "default",
    disabled = false,
    ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>) {
    const context = React.useContext(ToggleGroupContext);

    return (
        <ToggleGroupPrimitive.Item
            data-slot="toggle-group-item"
            data-variant={context.variant || variant}
            data-size={context.size || size}
            data-spacing={context.spacing}
            className={cn(
                "py-sm! px-lg! rounded-[12px]!",
                disabled && "pointer-events-none bg-surface-container-high text-outline! border-0!",
                toggleVariants({
                    variant: context.variant || variant,
                    size: context.size || size,
                }),
                className
            )}
            {...props}
        >
            {children}
        </ToggleGroupPrimitive.Item>
    );
}

export { ToggleGroup, ToggleGroupItem };

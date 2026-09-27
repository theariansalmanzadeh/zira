"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { Circle } from "lucide-react"

import { cn } from "@shared/libs/utils"

function RadioGroup({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
    return (
        <RadioGroupPrimitive.Root
            data-slot="radio-group"
            className={cn("grid gap-3", className)}
            {...props}
        />
    )
}

function RadioGroupItem({
    className,
    ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
    return (
        <RadioGroupPrimitive.Item
            data-slot="radio-group-item"
            className={cn(
                "aspect-square size-4 shrink-0 rounded-full border border-outline text-primary shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator
                data-slot="radio-group-indicator"
                className="flex items-center justify-center"
            >
                <Circle className="size-2 fill-primary" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
}

export { RadioGroup, RadioGroupItem }

"use client"

import { useState } from "react"
import { faIR } from "@daypicker/persian"
import { Icon } from "@shared/components/Icons/Icon"
import { Button } from "@shared/components/ui/button"
import { Calendar } from "@shared/components/ui/Calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@shared/components/ui/Popover"
import { cn } from "@shared/libs/utils"
import { formatFaDate } from "@/src/shared/libs/formatter"

type CalendarButtonProps = {
    label?: string
    placeholder?: string
    value?: Date
    onChange?: (date: Date | undefined) => void
    className?: string
    disabled?: boolean
}

const CalendarButton = ({
    label,
    placeholder = "انتخاب تاریخ",
    value,
    onChange,
    className,
    disabled = false,
}: CalendarButtonProps) => {
    const [open, setOpen] = useState(false)

    const handleSelect = (date: Date | undefined) => {
        onChange?.(date)
        if (date) {
            setOpen(false)
        }
    }

    return (
        <div className={cn("flex flex-col", className)}>
            {label && (
                <span className="mb-1.5 text-label-md text-on-surface-variant">
                    {label}
                </span>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type="button"
                        variant="default-high"
                        disabled={disabled}
                        className="h-10 w-full justify-start gap-2 rounded-container-lg px-3 font-normal"
                    >
                        <span
                            className={cn(
                                "text-base md:text-sm",
                                value ? "text-on-surface" : "text-outline",
                            )}
                        >
                            {value ? formatFaDate(value) : placeholder}
                        </span>
                        <Icon
                            label="calendar300Linear"

                            className="size-6 shrink-0 text-on-surface-variant mr-auto"
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className="w-[300px] border-0 bg-surface-container-lowest p-0 shadow-lg ring-4 ring-outline-variant"
                    align="start"
                >
                    <Calendar
                        mode="single"
                        classNames={{
                            root: "w-full",
                            focused: "ring-4 ring-red-500",
                        }}
                        selected={value}
                        onSelect={handleSelect}
                        dir="rtl"
                        locale={faIR}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default CalendarButton

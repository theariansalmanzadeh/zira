'use client'

import { useRef, useState } from 'react'
import {
    JalaliDatepicker,
    formatJalaliDate,
} from 'flexible-persian-datepicker'
import { Icon } from '@shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'

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
    placeholder = 'انتخاب تاریخ',
    value,
    onChange,
    className,
    disabled = false,
}: CalendarButtonProps) => {
    const anchorRef = useRef<HTMLButtonElement | null>(null)
    const [open, setOpen] = useState(false)

    return (
        <div className={cn('flex flex-col', className)}>
            {label ? (
                <span className="mb-1.5 text-label-md text-on-surface-variant">
                    {label}
                </span>
            ) : null}
            <button
                ref={anchorRef}
                type="button"
                disabled={disabled}
                onClick={() => {
                    if (!disabled) setOpen(true)
                }}
                className={cn(
                    'flex h-auto w-full items-center justify-start gap-2 rounded-container-lg bg-surface-container-high px-3 py-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                )}
            >
                <span
                    className={cn(
                        'text-base md:text-sm',
                        value ? 'text-on-surface' : 'text-outline'
                    )}
                >
                    {value
                        ? formatJalaliDate(value, 'YYYY/MM/DD', 'fa')
                        : placeholder}
                </span>
                <Icon
                    label="calendar300Linear"
                    className="mr-auto size-6 shrink-0 text-on-surface-variant"
                />
            </button>

            <JalaliDatepicker
                open={open}
                anchorRef={anchorRef}
                value={value ?? null}
                label={null}
                locale="fa"
                onConfirm={(date) => {
                    onChange?.(date ?? undefined)
                    setOpen(false)
                }}
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default CalendarButton

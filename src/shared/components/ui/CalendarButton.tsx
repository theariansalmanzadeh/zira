'use client'

import { useState } from 'react'
import { DayPicker, faIR } from '@daypicker/persian'
import { Icon } from '@shared/components/Icons/Icon'
import { Button } from '@shared/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@shared/components/ui/Popover'
import { cn } from '@shared/libs/utils'
import { formatFaDate } from '@/src/shared/libs/formatter'

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
    const [open, setOpen] = useState(false)

    return (
        <div className={cn('flex flex-col', className)}>
            {label && (
                <span className='mb-1.5 text-label-md text-on-surface-variant'>
                    {label}
                </span>
            )}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        type='button'
                        variant='default-high'
                        disabled={disabled}
                        className='h-auto w-full justify-start gap-2 rounded-container-lg px-3 py-3 font-normal'
                    >
                        <span
                            className={cn(
                                'text-base md:text-sm',
                                value ? 'text-on-surface' : 'text-outline'
                            )}
                        >
                            {value ? formatFaDate(value) : placeholder}
                        </span>
                        <Icon
                            label='calendar300Linear'
                            className='mr-auto size-6 shrink-0 text-on-surface-variant'
                        />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className='w-auto border-0 bg-surface-container-lowest p-4 shadow-lg ring-4 ring-outline-variant'
                    align='start'
                >
                    <DayPicker
                        mode='single'
                        locale={faIR}
                        selected={value}
                        onSelect={(date) => {
                            onChange?.(date)
                            if (date) setOpen(false)
                        }}
                        classNames={{
                            root: 'w-[26rem] text-base text-on-surface',
                            months: 'relative flex flex-col',
                            month: 'flex w-full flex-col gap-3',
                            nav: 'absolute inset-x-0 top-0 flex h-12 items-center justify-between',
                            button_previous:
                                'inline-flex size-10 items-center justify-center rounded-full hover:bg-surface-container-high',
                            button_next:
                                'inline-flex size-10 items-center justify-center rounded-full hover:bg-surface-container-high',
                            month_caption:
                                'flex h-12 items-center justify-center px-12 text-lg font-semibold',
                            caption_label: 'text-lg font-semibold',
                            month_grid: 'w-full border-collapse',
                            weekdays: 'flex',
                            weekday:
                                'w-14 text-center text-sm font-medium text-on-surface-variant',
                            week: 'mt-1 flex w-full',
                            day: 'relative size-14 p-0 text-center',
                            day_button:
                                'inline-flex size-12 items-center justify-center rounded-full text-base hover:bg-surface-container-high',
                            selected:
                                '[&>button]:bg-primary [&>button]:font-semibold [&>button]:text-on-primary [&>button]:hover:bg-primary',
                            today: '[&>button]:ring-2 [&>button]:ring-outline',
                            outside: 'text-outline',
                            disabled: 'opacity-40',
                            chevron: 'size-5 fill-current',
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default CalendarButton

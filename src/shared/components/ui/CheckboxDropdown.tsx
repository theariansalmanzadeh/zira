'use client'

import { Icon } from '@shared/components/Icons/Icon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@shared/components/ui/DropdownMenu'
import { cn } from '@shared/libs/utils'
import { Checkbox } from './Checkbox'
import ColorPill from './ColorPill'
import type { FormDropdownOption } from './FormDropdown'
import { Pill } from './Pill'

export type CheckboxDropdownOption = FormDropdownOption & {
    hex?: string
}

export type CheckboxDropdownProps = {
    label: string
    placeholder?: string
    options: CheckboxDropdownOption[]
    values: string[]
    onChange: (values: string[]) => void
}

const CheckboxDropdown = ({
    label,
    placeholder = 'انتخاب',
    options,
    values,
    onChange,
}: CheckboxDropdownProps) => {
    const toggleValue = (value: string) => {
        onChange(
            values.includes(value)
                ? values.filter((item) => item !== value)
                : [...values, value]
        )
    }

    const selectedOptions = options.filter((option) =>
        values.includes(option.value)
    )

    return (
        <div className="flex flex-col">
            <span className="mb-1.5 text-label-md text-on-surface-variant">
                {label}
            </span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        className="flex w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg bg-surface-container-high px-3 py-3 text-right text-label-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                        <Icon
                            label="chevronDown300Broken"
                            className="size-6 shrink-0 text-on-surface-variant"
                        />
                        <span
                            className={cn(
                                'text-label-lg! md:text-sm',
                                selectedOptions.length
                                    ? 'text-on-surface'
                                    : 'text-outline'
                            )}
                        >
                            {selectedOptions.length
                                ? selectedOptions
                                      .map((option) => option.label)
                                      .join('، ')
                                : placeholder}
                        </span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md bg-surface-container-lowest p-sm shadow-lg ring-4 ring-outline-variant"
                >
                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option.value}
                            className="flex cursor-pointer flex-row-reverse items-center justify-between gap-2 rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high"
                            onSelect={(event) => {
                                event.preventDefault()
                                toggleValue(option.value)
                            }}
                        >
                            <span className="flex items-center gap-2">
                                {option.hex ? (
                                    <span
                                        className="size-4 shrink-0 rounded-md border border-outline-variant"
                                        style={{ backgroundColor: option.hex }}
                                    />
                                ) : null}
                                {option.label}
                            </span>
                            <Checkbox
                                checked={values.includes(option.value)}
                                className="pointer-events-none"
                            />
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {selectedOptions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {selectedOptions.map((option) =>
                        option.hex ? (
                            <ColorPill
                                key={option.value}
                                hex={option.hex}
                                label={option.label}
                                onClose={() => toggleValue(option.value)}
                            />
                        ) : (
                            <Pill
                                key={option.value}
                                variant="primary"
                                text={option.label}
                                onClose={() => toggleValue(option.value)}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default CheckboxDropdown

'use client'

import { Icon } from '@shared/components/Icons/Icon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@shared/components/ui/DropdownMenu'
import { cn } from '@shared/libs/utils'
import type { IconLabel } from '@shared/types/icon'
import { Checkbox } from './Checkbox'
import SearchInput from './SearchInput'

export type FormDropdownOption = {
    label: string
    value: string
    icon?: IconLabel
}

export interface FormDropdownProps {
    label?: string
    placeholder?: string
    value?: string
    options: FormDropdownOption[]
    onChange: (value: string) => void
    checkedValues?: string[]
    disabled?: boolean
    hasSearch?: boolean
    searchQuery?: string
    onSearch?: (query: string) => void
    className?: string
}

const FormDropdown = ({
    label,
    placeholder = 'انتخاب',
    value,
    options,
    onChange,
    checkedValues,
    disabled = false,
    hasSearch = false,
    searchQuery,
    onSearch,
    className,
}: FormDropdownProps) => {
    const isMultiple = checkedValues !== undefined
    const checkedValueSet = new Set(checkedValues ?? [])
    const selectedOption = isMultiple
        ? undefined
        : options.find((option) => option.value === value)
    const selectedLabel = isMultiple
        ? options
              .filter((option) => checkedValueSet.has(option.value))
              .map((option) => option.label)
              .join('، ')
        : selectedOption?.label

    return (
        <div className={cn("flex flex-col", className)}>
            <span className="mb-1.5 text-label-md text-on-surface-variant">{label}</span>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type="button"
                        disabled={disabled}
                        className="bg-surface-container-high flex w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg text-label-lg px-3 py-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50"
                    >
                        <Icon label="chevronDown300Broken" className="shrink-0 size-6 text-on-surface-variant" />
                        <span className="flex min-w-0 flex-1 items-center gap-2">
                            {selectedOption?.icon ? (
                                <Icon
                                    label={selectedOption.icon}
                                    className="size-5 shrink-0"
                                />
                            ) : null}
                            <span
                                className={cn(
                                    'truncate text-label-lg! md:text-sm',
                                    selectedLabel ? 'text-on-surface' : 'text-outline'
                                )}
                            >
                                {selectedLabel ?? placeholder}
                            </span>
                        </span>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align="start"
                    className="bg-surface-container-lowest max-h-72 min-w-(--radix-dropdown-menu-trigger-width) overflow-y-auto rounded-card-md p-sm shadow-lg ring-4 ring-outline-variant"
                >
                    {hasSearch && onSearch && <SearchInput searchQuery={searchQuery as string} onSearch={onSearch} placeholder={placeholder} />}
                    {options.filter((option) => !hasSearch || option.label.toLowerCase().includes(searchQuery?.toLowerCase() ?? '')).map((option) => {
                        const isChecked = checkedValueSet.has(option.value)
                        return (
                            <DropdownMenuItem
                                data-value={option.value}
                                key={option.value}
                                disabled={disabled}
                                className="cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high"
                                onSelect={(event) => {
                                    if (isMultiple) event.preventDefault()
                                    onChange(option.value)
                                }}
                            >
                                {isMultiple ? (
                                    <span className="flex w-full items-center justify-between gap-3">
                                        <span className="flex items-center gap-2">
                                            {option.icon ? (
                                                <Icon
                                                    label={option.icon}
                                                    className="size-5 shrink-0"
                                                />
                                            ) : null}
                                            <span>{option.label}</span>
                                        </span>
                                        <Checkbox
                                            checked={isChecked}
                                            disabled={disabled}
                                            className="pointer-events-none"
                                        />
                                    </span>
                                ) : (
                                    <span className="flex w-full items-center gap-2">
                                        {option.icon ? (
                                            <Icon
                                                label={option.icon}
                                                className="size-5 shrink-0"
                                            />
                                        ) : null}
                                        <span>{option.label}</span>
                                    </span>
                                )}
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default FormDropdown

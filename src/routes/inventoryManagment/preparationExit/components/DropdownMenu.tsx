'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    DropdownMenu as DropdownMenuRoot,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/shared/components/ui/DropdownMenu'
import { cn } from '@/src/shared/libs/utils'
import {
    PREPARATION_EXIT_TYPES,
    type PreparationExitType,
} from '../constants/exits'

type ExitDropdownMenuProps = {
    value: PreparationExitType
    onChange: (value: PreparationExitType) => void
}

const ExitDropdownMenu = ({ value, onChange }: ExitDropdownMenuProps) => {
    const selectedLabel = PREPARATION_EXIT_TYPES.find(
        (item) => item.value === value
    )?.label

    return (
        <DropdownMenuRoot>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="flex w-full max-w-xs flex-row-reverse items-center justify-between gap-2 rounded-container-lg bg-surface-container-lowest px-3 py-3 text-right outline-none"
                >
                    <Icon
                        label="chevronDown300Broken"
                        className="size-6 shrink-0 text-on-surface-variant"
                    />
                    <span className="text-label-lg text-on-surface">
                        {selectedLabel}
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md bg-surface-container-lowest p-sm shadow-lg ring-4 ring-outline-variant"
            >
                {PREPARATION_EXIT_TYPES.map((item) => (
                    <DropdownMenuItem
                        key={item.value}
                        className={cn(
                            'cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high',
                            item.value === value && 'text-on-surface'
                        )}
                        onSelect={() => onChange(item.value)}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenuRoot>
    )
}

export default ExitDropdownMenu

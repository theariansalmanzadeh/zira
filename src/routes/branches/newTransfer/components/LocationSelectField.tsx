'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/src/shared/components/ui/DropdownMenu'
import { cn } from '@/src/shared/libs/utils'
import { LOCATION_KIND_LABEL, type LocationKind } from '../constants'

type SelectFieldOption = {
    id: string
    code: string
    name: string
    kind?: LocationKind
}

type LocationSelectFieldProps = {
    label: string
    required?: boolean
    value: string
    options: SelectFieldOption[]
    onChange: (value: string) => void
    className?: string
}

const LocationSelectField = ({
    label,
    required = false,
    value,
    options,
    onChange,
    className,
}: LocationSelectFieldProps) => {
    const selected =
        options.find((option) => option.id === value) ?? options[0]

    return (
        <div className={cn('flex flex-col gap-1.5', className)} dir='rtl'>
            <span className='text-label-md text-outline'>
                {label}
                {required && <span className='text-error'> *</span>}
            </span>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        type='button'
                        className='flex w-full flex-row items-center justify-between gap-3 rounded-container-lg border border-outline-variant bg-surface-container-lowest px-3 py-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                    >
                        <div className='flex min-w-0 flex-row items-center gap-2'>
                            {selected?.kind && (
                                <span className='shrink-0 rounded-md bg-surface-container-high px-2 py-0.5 text-label-md text-on-surface-variant'>
                                    {LOCATION_KIND_LABEL[selected.kind]}
                                </span>
                            )}
                            <span className='truncate text-label-lg text-on-surface'>
                                {selected?.name}
                            </span>
                        </div>
                        <div className='flex shrink-0 flex-row items-center gap-2'>
                            <span
                                className='text-label-md text-outline'
                            >
                                {selected?.code}
                            </span>
                            <Icon
                                label='chevronDown300Broken'
                                className='size-5! text-on-surface-variant'
                            />
                        </div>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    align='start'
                    className='min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md bg-surface-container-lowest p-sm shadow-lg ring-4 ring-outline-variant'
                >
                    {options.map((option) => (
                        <DropdownMenuItem
                            key={option.id}
                            className={cn(
                                'cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high',
                                option.id === value &&
                                'bg-surface-container-high text-on-surface'
                            )}
                            onSelect={() => onChange(option.id)}
                        >
                            <div className='flex w-full flex-row items-center justify-between gap-3'>
                                <span
                                    className='text-label-md text-outline'
                                >
                                    {option.code}
                                </span>
                                <div className='flex flex-row items-center gap-2'>
                                    <span className='text-label-md text-on-surface'>
                                        {option.name}
                                    </span>
                                    {option.kind && (
                                        <span className='rounded-md bg-surface-container-high px-2 py-0.5 text-label-sm text-on-surface-variant'>
                                            {LOCATION_KIND_LABEL[option.kind]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default LocationSelectField

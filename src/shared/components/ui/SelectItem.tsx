'use client'

import { Icon } from '@shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import { IconLabel } from '@shared/types/icon'

export interface SelectItemProps {
    title: string
    description: string
    icon: IconLabel
    selected?: boolean
    onClick?: () => void
    className?: string
}

const SelectItem = ({
    title,
    description,
    icon,
    selected = false,
    onClick,
    className,
}: SelectItemProps) => {
    return (
        <button
            type='button'
            onClick={onClick}
            className={cn(
                'flex w-full flex-row items-center justify-between rounded-card-md border border-outline-variant bg-surface-container-lowest p-3 text-right',
                selected && 'border-primary',
                className
            )}
            dir='rtl'
        >
            <div className='flex flex-row items-center gap-3'>
                <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-card-md bg-surface-container-high', selected && 'bg-primary/20')}>
                    <Icon label={icon} className='size-6 text-primary' />
                </div>
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-lg text-on-surface'>{title}</span>
                    <span className='text-label-md text-outline'>{description}</span>
                </div>
            </div>

            <div
                className={cn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-outline',
                    selected && 'border-primary'
                )}
            >
                {selected && <div className='h-2.5 w-2.5 rounded-full bg-primary' />}
            </div>
        </button>
    )
}

export default SelectItem

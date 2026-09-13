import React from 'react'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'

function QuickAccessCard({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='quick-access-card'
            className={cn('rounded-card-lg bg-surface-container-lowest p-3', className)}
            {...props}
        >
            {children}
        </div>
    )
}

function QuickAccessCardHeader({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='quick-access-card-header'
            className={cn('mb-2 text-right text-title-md text-on-surface', className)}
            {...props}
        >
            {children}
        </div>
    )
}

function QuickAccessCardContent({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='quick-access-card-content'
            className={cn('rounded-container-md bg-surface-container-high p-2', className)}
            {...props}
        >
            {children}
        </div>
    )
}

function QuickAccessCardList({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot='quick-access-card-list'
            className={cn(
                'flex flex-row justify-between gap-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

type QuickAccessCardItemProps = React.ComponentProps<'div'> & {
    label: string
    value?: string | number
    href?: string
}

function QuickAccessCardItem({
    label,
    value,
    href,
    className,
    ...props
}: QuickAccessCardItemProps) {
    const content = (
        <>
            <div className='flex flex-col items-start gap-1 text-right'>
                <span className='text-title-md text-on-surface'>{label}</span>
                {value !== undefined && value !== '' ? (
                    <span className='text-label-sm font-normal text-outline'>{value}</span>
                ) : null}
            </div>
            <Icon label='chevronRight300Linear' className='size-6 shrink-0 rotate-180 text-on-surface-variant' />
        </>
    )

    const itemClassName = cn(
        'flex items-center justify-between grow gap-2 rounded-container-md bg-surface-container-lowest p-3 transition-colors hover:bg-surface-container-lowest/80',
        className
    )

    if (href) {
        return (
            <Link
                data-slot='quick-access-card-item'
                href={href}
                className={itemClassName}
            >
                {content}
            </Link>
        )
    }

    return (
        <div
            data-slot='quick-access-card-item'
            className={itemClassName}
            {...props}
        >
            {content}
        </div>
    )
}

QuickAccessCard.Header = QuickAccessCardHeader
QuickAccessCard.Content = QuickAccessCardContent
QuickAccessCard.List = QuickAccessCardList
QuickAccessCard.Item = QuickAccessCardItem

export default QuickAccessCard
export {
    QuickAccessCard,
    QuickAccessCardHeader,
    QuickAccessCardContent,
    QuickAccessCardList,
    QuickAccessCardItem,
}

export type { QuickAccessCardItemProps }

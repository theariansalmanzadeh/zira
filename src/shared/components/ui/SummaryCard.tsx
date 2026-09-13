import React from 'react'
import { Card } from '@shared/components/ui/Card'
import { Icon } from '@shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import type { IconLabel } from '@/src/shared/types/icon'

function SummaryCard({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <Card
            dir="ltr"
            data-slot="summary-card"
            className={cn(
                'min-w-[290px] gap-0 rounded-card-lg bg-surface-container-lowest p-6 shadow-none',
                className
            )}
            {...props}
        >
            <div className="flex w-full flex-col items-end">{children}</div>
        </Card>
    )
}

function SummaryCardHeader({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="summary-card-header"
            className={cn(
                'flex flex-row-reverse items-center gap-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function SummaryCardTitle({
    className,
    children,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="summary-card-title"
            className={cn('text-label-md text-on-surface-variant', className)}
            {...props}
        >
            {children}
        </span>
    )
}

type SummaryCardHeaderIconProps = React.ComponentProps<'div'> & {
    label: IconLabel
    iconClassName?: string
}

function SummaryCardHeaderIcon({
    label,
    className,
    iconClassName,
    ...props
}: SummaryCardHeaderIconProps) {
    return (
        <div
            data-slot="summary-card-header-icon"
            className={cn(className)}
            {...props}
        >
            <Icon label={label} className={cn('size-9!', iconClassName)} />
        </div>
    )
}

function SummaryCardBody({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="summary-card-body"
            className={cn('mt-6 flex w-full flex-col items-end', className)}
            {...props}
        >
            {children}
        </div>
    )
}

function SummaryCardBodyTitle({
    className,
    children,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="summary-card-body-title"
            className={cn('text-label-md text-on-surface-variant', className)}
            {...props}
        >
            {children}
        </span>
    )
}

function SummaryCardValueRow({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="summary-card-value-row"
            className={cn(
                'flex flex-row-reverse items-baseline gap-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function SummaryCardValue({
    className,
    children,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="summary-card-value"
            className={cn(
                'text-headline-lg font-medium text-on-surface',
                className
            )}
            {...props}
        >
            {children}
        </span>
    )
}

function SummaryCardSuffix({
    className,
    children,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="summary-card-suffix"
            className={cn('text-label-md text-on-surface-variant', className)}
            {...props}
        >
            {children}
        </span>
    )
}

function SummaryCardFooter({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="summary-card-footer"
            className={cn(
                'flex flex-row-reverse items-center gap-1',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

type SummaryCardFooterIconProps = React.ComponentProps<'div'> & {
    label: IconLabel
    iconClassName?: string
}

function SummaryCardFooterIcon({
    label,
    className,
    iconClassName,
    ...props
}: SummaryCardFooterIconProps) {
    return (
        <div
            data-slot="summary-card-footer-icon"
            className={cn(className)}
            {...props}
        >
            <Icon label={label} className={cn('size-6', iconClassName)} />
        </div>
    )
}

function SummaryCardFooterText({
    className,
    children,
    ...props
}: React.ComponentProps<'span'>) {
    return (
        <span
            data-slot="summary-card-footer-text"
            className={cn('text-label-md text-on-surface-variant flex gap-2 items-end mt-2', className)}
            {...props}
        >
            {children}
        </span>
    )
}

SummaryCard.Header = SummaryCardHeader
SummaryCard.Title = SummaryCardTitle
SummaryCard.HeaderIcon = SummaryCardHeaderIcon
SummaryCard.Body = SummaryCardBody
SummaryCard.BodyTitle = SummaryCardBodyTitle
SummaryCard.ValueRow = SummaryCardValueRow
SummaryCard.Value = SummaryCardValue
SummaryCard.Suffix = SummaryCardSuffix
SummaryCard.Footer = SummaryCardFooter
SummaryCard.FooterIcon = SummaryCardFooterIcon
SummaryCard.FooterText = SummaryCardFooterText

export default SummaryCard
export {
    SummaryCard,
    SummaryCardHeader,
    SummaryCardTitle,
    SummaryCardHeaderIcon,
    SummaryCardBody,
    SummaryCardBodyTitle,
    SummaryCardValueRow,
    SummaryCardValue,
    SummaryCardSuffix,
    SummaryCardFooter,
    SummaryCardFooterIcon,
    SummaryCardFooterText,
}

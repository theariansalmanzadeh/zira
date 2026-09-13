import React from 'react'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'

function AlertBox({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-box"
            className={cn(
                'rounded-card-lg bg-surface-container-lowest p-3',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function AlertBoxHeader({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-box-header"
            className={cn(
                'mb-2 text-right text-label-lg text-on-surface',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function AlertBoxContent({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-box-content"
            className={cn(
                'rounded-container-md bg-surface-container-high p-2',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}

function AlertBoxList({
    className,
    children,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            data-slot="alert-box-list"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        >
            {children}
        </div>
    )
}

type AlertBoxItemProps = React.ComponentProps<'div'> & {
    title: string
    description: string
}

function AlertBoxItem({
    title,
    description,
    className,
    ...props
}: AlertBoxItemProps) {
    return (
        <div
            data-slot="alert-box-item"
            className={cn(
                'flex items-center justify-between gap-2 rounded-container-md bg-surface-container-lowest p-3',
                className
            )}
            {...props}
        >
            <div className='flex flex-col items-start gap-1 text-right'>
                <span className='text-label-lg text-on-surface'>{title}</span>
                <span className='text-label-md text-outline'>{description}</span>
            </div>
            <Icon label='chevron' className='size-4 shrink-0' />
        </div>
    )
}

type AlertBoxFooterProps = React.ComponentProps<'div'> & {
    href?: string
}

function AlertBoxFooter({
    className,
    children,
    href,
    ...props
}: AlertBoxFooterProps) {
    const content = (
        <>
            <span>{children}</span>
            <Icon label='rightArrow' className='size-4 cn-rtl-flip' />
        </>
    )

    const footerClassName = cn(
        'mt-3 flex items-center justify-center gap-1 text-label-md text-on-surface-variant',
        className
    )

    if (href) {
        return (
            <Link
                data-slot="alert-box-footer"
                href={href}
                className={footerClassName}
            >
                {content}
            </Link>
        )
    }

    return (
        <div
            data-slot="alert-box-footer"
            className={footerClassName}
            {...props}
        >
            {content}
        </div>
    )
}

AlertBox.Header = AlertBoxHeader
AlertBox.Content = AlertBoxContent
AlertBox.List = AlertBoxList
AlertBox.Item = AlertBoxItem
AlertBox.Footer = AlertBoxFooter

export default AlertBox
export {
    AlertBox,
    AlertBoxHeader,
    AlertBoxContent,
    AlertBoxList,
    AlertBoxItem,
    AlertBoxFooter,
}

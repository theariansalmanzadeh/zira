'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/src/shared/components/ui/Breadcrumb'
import { cn } from '@/src/shared/libs/utils'

export type AdminBreadcrumbItem = {
    label: string
    href?: string
}

type AdminBreadcrumbProps = {
    items: AdminBreadcrumbItem[]
    onSidebarToggle?: () => void
    className?: string
}

const AdminBreadcrumb = ({
    items,
    onSidebarToggle,
    className,
}: AdminBreadcrumbProps) => {
    return (
        <div
            className={cn('flex flex-row items-center gap-2', className)}
            dir='rtl'
        >
            <button
                type='button'
                onClick={onSidebarToggle}
                className='shrink-0 text-outline'
                aria-label='تغییر وضعیت سایدبار'
            >
                <Icon label='sidebar' className='size-6!' />
            </button>

            <Breadcrumb>
                <BreadcrumbList className='gap-1.5 text-label-md sm:gap-2'>
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1

                        return (
                            <Fragment key={`${item.label}-${index}`}>
                                {index > 0 && (
                                    <BreadcrumbSeparator className='text-outline [&>svg]:size-3.5 [&>svg]:rotate-180' />
                                )}
                                <BreadcrumbItem>
                                    {isLast || !item.href ? (
                                        <BreadcrumbPage
                                            className={cn(
                                                isLast
                                                    ? 'text-on-surface'
                                                    : 'text-outline',
                                            )}
                                        >
                                            {item.label}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            asChild
                                            className='text-outline hover:text-on-surface'
                                        >
                                            <Link href={item.href}>
                                                {item.label}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default AdminBreadcrumb

'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { IconLabel } from '@/src/shared/types/icon'
import { cn } from '@shared/libs/utils'
import SubSidebarHeading from './SubSidebarHeading'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { SubSidebarSection } from '../content/types'

type SubSidebarProps = {
    icon: IconLabel
    header: string
    subheader: string
    itemsList: readonly SubSidebarSection[]
}

const getSubFromHref = (href: string) => {
    if (href.includes('?')) {
        const query = href.split('?')[1] ?? ''
        return new URLSearchParams(query).get('sub')
    }

    return null
}

const isLinkActive = (
    href: string,
    currentSub: string | null,
    pathname: string
) => {
    const hrefSub = getSubFromHref(href)
    const pathOnly = href.split('?')[0]

    if (hrefSub === 'product-turnover') {
        return (
            (pathname === pathOnly && currentSub === hrefSub) ||
            pathname.startsWith('/admin/branches/product-turnover/')
        )
    }

    if (hrefSub === 'branch-transfer') {
        return (
            (pathname === pathOnly && currentSub === hrefSub) ||
            pathname.startsWith('/admin/branches/branch-transfer/')
        )
    }

    if (hrefSub) {
        return pathname === pathOnly && currentSub === hrefSub
    }

    return pathname === pathOnly || pathname.startsWith(`${pathOnly}/`)
}

const SubSidebar = ({ icon, header, subheader, itemsList }: SubSidebarProps) => {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const currentSub = searchParams.get('sub')

    return (
        <div className='min-w-51 h-full rounded-card-lg bg-surface-container-high px-2 py-4'>
            <div className='flex h-full flex-col items-start gap-2 rounded-card-lg bg-surface-container-lowest p-2'>
                <SubSidebarHeading
                    icon={icon}
                    header={header}
                    subheader={subheader}
                />

                <div className='flex w-full flex-1 flex-col gap-4'>
                    {itemsList.map((section) => (
                        <div
                            key={section.title}
                            className='flex flex-col items-stretch gap-1'
                        >
                            <span className='px-4 py-1 text-label-sm text-outline'>
                                {section.title}
                            </span>
                            {section.links.map((link) => {
                                const isActive = isLinkActive(
                                    link.href,
                                    currentSub,
                                    pathname
                                )

                                return (
                                    <Link
                                        href={link.href}
                                        key={link.href}
                                        className={cn(
                                            'group flex w-full items-center justify-between gap-2 rounded-card-md px-4 py-2 text-label-lg transition-colors',
                                            isActive
                                                ? 'bg-primary/16 text-primary'
                                                : 'text-outline hover:bg-primary/16 hover:text-primary'
                                        )}
                                    >
                                        <span className='flex min-w-0 items-center gap-2'>
                                            {link.icon ? (
                                                <Icon
                                                    label={link.icon}
                                                    size={20}
                                                    className={cn(
                                                        'size-5 shrink-0 transition-colors',
                                                        isActive
                                                            ? 'text-primary'
                                                            : 'text-outline group-hover:text-primary'
                                                    )}
                                                />
                                            ) : null}
                                            <span className='truncate'>
                                                {link.label}
                                            </span>
                                        </span>
                                        {link.badge != null &&
                                        link.badge !== '' ? (
                                            <span
                                                className={cn(
                                                    'inline-flex min-w-5 shrink-0 items-center justify-center rounded-md px-1.5 py-0.5 text-label-sm',
                                                    isActive
                                                        ? 'bg-primary text-on-primary'
                                                        : 'bg-primary/16 text-primary'
                                                )}
                                            >
                                                {typeof link.badge === 'number'
                                                    ? formatFaNumber(link.badge)
                                                    : link.badge}
                                            </span>
                                        ) : null}
                                    </Link>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SubSidebar

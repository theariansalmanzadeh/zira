'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { IconLabel } from '@/src/shared/types/icon'
import { cn } from '@shared/libs/utils'
import SubSidebarHeading from './SubSidebarHeading'
import Link from 'next/link'
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
        <div className="bg-surface-container-high px-2 py-4 rounded-card-lg min-w-51 h-full">
            <div className="bg-surface-container-lowest rounded-card-lg p-2 flex flex-col items-start gap-2 h-full">
                <SubSidebarHeading
                    icon={icon}
                    header={header}
                    subheader={subheader}
                />

                <div className="flex flex-col gap-4 flex-1 w-full">
                    {itemsList.map((section) => (
                        <div
                            key={section.title}
                            className="flex flex-col items-start"
                        >
                            <span className="text-label-sm text-outline px-4 py-1 ">
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
                                            'text-label-lg py-2 px-4 rounded-card-md text-right transition-colors',
                                            isActive
                                                ? 'text-primary bg-primary/16'
                                                : 'text-outline hover:text-primary hover:bg-primary/16'
                                        )}
                                    >
                                        {link.label}
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

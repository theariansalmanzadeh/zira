'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import AdminBreadcrumb from '@/src/shared/components/AdminBreadcrumb'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import { ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import {
    getSalesSectionKey,
    getSalesSectionKeyFromPath,
    SALES_PERIOD_OPTIONS,
    sectionToHeading,
} from '@/src/routes/sales/constants'

const SalesLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const [period, setPeriod] = useState('month')
    const isSalesRoot = pathname === '/admin/sales' || pathname === '/admin/sales/'
    const sectionKey = isSalesRoot
        ? getSalesSectionKey(searchParams.get('sub') || '')
        : getSalesSectionKeyFromPath(pathname)
    const heading = sectionKey ? sectionToHeading[sectionKey] : null

    useEffect(() => {
        if (!isSalesRoot) return

        const sub = searchParams.get('sub') || 'dashboard'
        if (searchParams.get('sub') !== sub) {
            push(`?sub=${sub}`)
        }
    }, [isSalesRoot, pathname, push, searchParams])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <AdminBreadcrumb
                items={[
                    { label: 'فروش', href: '/admin/sales?sub=dashboard' },
                    { label: heading?.title ?? 'مرور فروش' },
                ]}
            />

            {heading && (
                <HeadingWithActions>
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    <HeadingWithActions.SubTitle>{heading.subtitle}</HeadingWithActions.SubTitle>

                    {heading.showPeriodToggle && (
                        <HeadingWithActions.ToggleGroup
                            type='single'
                            value={period}
                            onValueChange={(value: string) => value && setPeriod(value)}
                        >
                            {SALES_PERIOD_OPTIONS.map((option) => (
                                <ToggleGroupItem className='bg-transparent!' key={option.value} value={option.value}>
                                    {option.label}
                                </ToggleGroupItem>
                            ))}
                        </HeadingWithActions.ToggleGroup>
                    )}

                    {(heading.showDateRange || (heading.buttons && heading.buttons.length > 0)) && (
                        <HeadingWithActions.ButtonWrapper>
                            {heading.showDateRange && (
                                <>
                                    <Button variant='outline'>
                                        <Icon label='calendar300Linear' className='size-4!' />
                                        <span className='text-label-sm'>انتخاب بازه</span>
                                    </Button>
                                    <span className='text-outline'>-</span>
                                </>
                            )}

                            {heading.buttons?.map((button, index) => {
                                const content = (
                                    <>
                                        {button.icon && (
                                            <Icon label={button.icon} className='size-6!' />
                                        )}
                                        <span
                                            className={
                                                button.variant === 'primary'
                                                    ? 'text-label-sm text-on-primary'
                                                    : 'text-label-sm'
                                            }
                                        >
                                            {button.label}
                                        </span>
                                    </>
                                )

                                if (button.href) {
                                    return (
                                        <Button
                                            key={index}
                                            variant={button.variant}
                                            asChild
                                        >
                                            <Link href={button.href}>{content}</Link>
                                        </Button>
                                    )
                                }

                                return (
                                    <Button
                                        key={index}
                                        variant={button.variant}
                                        onClick={button.action}
                                    >
                                        {content}
                                    </Button>
                                )
                            })}
                        </HeadingWithActions.ButtonWrapper>
                    )}
                </HeadingWithActions>
            )}
            {children}
        </div>
    )
}

const SalesLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <SalesLayoutContent>{children}</SalesLayoutContent>
    </Suspense>
)

export default SalesLayout

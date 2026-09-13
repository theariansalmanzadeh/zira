'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import { ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import {
    getOrderSectionKey,
    getOrderSectionKeyFromPath,
    ORDER_PERIOD_OPTIONS,
    sectionToHeading,
} from '@/src/routes/orderManagment/constants'

const OrderManagmentLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const [period, setPeriod] = useState('month')
    const isOrderRoot = pathname === '/admin/order-managment' || pathname === '/admin/order-managment/'
    const sectionKey = isOrderRoot
        ? getOrderSectionKey(searchParams.get('sub') || 'dashboard')
        : getOrderSectionKeyFromPath(pathname)
    const heading = sectionKey ? sectionToHeading[sectionKey] : null

    useEffect(() => {
        if (!isOrderRoot) return

        const url = new URL(window.location.href)
        const sub = url.searchParams.get('sub') || 'dashboard'
        push(`?sub=${sub}`)
    }, [isOrderRoot, pathname, push])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
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
                            {ORDER_PERIOD_OPTIONS.map((option) => (
                                <ToggleGroupItem key={option.value} value={option.value}>
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
                                        <Button key={index} variant={button.variant} asChild>
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

const OrderManagmentLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <OrderManagmentLayoutContent>{children}</OrderManagmentLayoutContent>
    </Suspense>
)

export default OrderManagmentLayout

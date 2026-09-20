'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import { ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import {
    CUSTOMERS_PERIOD_OPTIONS,
    getCustomersSectionKey,
    getCustomersSectionKeyFromPath,
    sectionToHeading,
} from '@/src/routes/customers/constants'

const CustomersLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { back, push } = useRouter()
    const [period, setPeriod] = useState('month')
    const isCustomersRoot =
        pathname === '/admin/customers' || pathname === '/admin/customers/'
    const sectionKey = isCustomersRoot
        ? getCustomersSectionKey(searchParams.get('sub') || '')
        : getCustomersSectionKeyFromPath(pathname, searchParams)
    const heading = sectionKey ? sectionToHeading[sectionKey] : null

    useEffect(() => {
        if (!isCustomersRoot) return

        const sub = searchParams.get('sub') || 'dashboard'
        if (searchParams.get('sub') !== sub) {
            push(`?sub=${sub}`)
        }
    }, [isCustomersRoot, pathname, push, searchParams])

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            {heading && (
                <HeadingWithActions>
                    {heading.hasBackButton && (
                        <HeadingWithActions.BackButton onClick={() => back()} />
                    )}
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    {heading.subtitle && (
                        <HeadingWithActions.SubTitle>
                            {heading.subtitle}
                        </HeadingWithActions.SubTitle>
                    )}

                    {heading.showPeriodToggle && (
                        <HeadingWithActions.ToggleGroup
                            type="single"
                            value={period}
                            onValueChange={(value: string) => value && setPeriod(value)}
                        >
                            {CUSTOMERS_PERIOD_OPTIONS.map((option) => (
                                <ToggleGroupItem
                                    className="bg-transparent!"
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </ToggleGroupItem>
                            ))}
                        </HeadingWithActions.ToggleGroup>
                    )}

                    {(heading.showDateRange ||
                        (heading.buttons && heading.buttons.length > 0)) && (
                            <HeadingWithActions.ButtonWrapper>
                                {heading.showDateRange && (
                                    <>
                                        <Button variant="outline">
                                            <Icon
                                                label="calendar300Linear"
                                                className="size-4!"
                                            />
                                            <span className="text-label-sm">انتخاب بازه</span>
                                        </Button>
                                        <span className="text-outline">-</span>
                                    </>
                                )}

                                {heading.buttons?.map((button, index) => {
                                    const content = (
                                        <>
                                            {button.icon && (
                                                <Icon
                                                    label={button.icon}
                                                    className="size-6!"
                                                />
                                            )}
                                            {button.label && (
                                                <span
                                                    className={
                                                        button.variant === 'primary'
                                                            ? 'text-label-sm text-on-primary'
                                                            : 'text-label-sm'
                                                    }
                                                >
                                                    {button.label}
                                                </span>
                                            )}
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

const CustomersLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <CustomersLayoutContent>{children}</CustomersLayoutContent>
    </Suspense>
)

export default CustomersLayout

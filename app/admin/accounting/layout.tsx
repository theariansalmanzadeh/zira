'use client'

import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import { ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import {
    ACCOUNTING_PERIOD_OPTIONS,
    getAccountingSectionKey,
    getAccountingSectionKeyFromPath,
    sectionToHeading,
} from '@/src/routes/Accounting/constants'

const AccountingLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const [period, setPeriod] = useState('month')
    const isAccountingRoot =
        pathname === '/admin/accounting' || pathname === '/admin/accounting/'
    const sectionKey = isAccountingRoot
        ? getAccountingSectionKey(searchParams.get('sub') || '')
        : getAccountingSectionKeyFromPath(pathname)
    const heading = sectionKey ? sectionToHeading[sectionKey] : null

    useEffect(() => {
        if (!isAccountingRoot) return

        const sub = searchParams.get('sub') || 'dashboard'
        if (searchParams.get('sub') !== sub) {
            push(`?sub=${sub}`)
        }
    }, [isAccountingRoot, pathname, push, searchParams])

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            {heading && (
                <HeadingWithActions>
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    <HeadingWithActions.SubTitle>
                        {heading.subtitle}
                    </HeadingWithActions.SubTitle>

                    {heading.showPeriodToggle && (
                        <HeadingWithActions.ToggleGroup
                            type="single"
                            value={period}
                            onValueChange={(value: string) => value && setPeriod(value)}
                        >
                            {ACCOUNTING_PERIOD_OPTIONS.map((option) => (
                                <ToggleGroupItem className='bg-transparent!' key={option.value} value={option.value}>
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
                                            {button.label && <span
                                                className={
                                                    button.variant === 'primary'
                                                        ? 'text-label-sm text-on-primary'
                                                        : 'text-label-sm'
                                                }
                                            >
                                                {button.label}
                                            </span>}
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

const AccountingLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <AccountingLayoutContent>{children}</AccountingLayoutContent>
    </Suspense>
)

export default AccountingLayout

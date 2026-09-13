'use client'

import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import {
    getInventorySectionKey,
    sectionToHeading,
} from '@/src/routes/inventoryManagment/constants'

const InventoryManagmentLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const isInventoryRoot =
        pathname === '/admin/inventory-managment' || pathname === '/admin/inventory-managment/'
    const sectionKey = getInventorySectionKey(searchParams.get('sub') || '')
    const heading = sectionToHeading[sectionKey]

    useEffect(() => {
        if (!isInventoryRoot) return
        const sub = searchParams.get('sub') || 'dashboard'
        if (searchParams.get('sub') !== sub) {
            push(`?sub=${sub}`)
        }
    }, [isInventoryRoot, pathname, push, searchParams])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {heading && (
                <HeadingWithActions>
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    <HeadingWithActions.SubTitle>{heading.subtitle}</HeadingWithActions.SubTitle>

                    {heading.buttons && heading.buttons.length > 0 && (
                        <HeadingWithActions.ButtonWrapper>
                            {heading.buttons.map((button, index) => {
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

const InventoryManagmentLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <InventoryManagmentLayoutContent>{children}</InventoryManagmentLayoutContent>
    </Suspense>
)

export default InventoryManagmentLayout

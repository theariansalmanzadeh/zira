'use client'

import Link from 'next/link'
import { Suspense, useEffect } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import {
    getSupportSectionKeyFromPath,
    sectionToHeading,
} from '@/src/routes/support/constants'

const SupportLayoutContent = ({ children }: { children: React.ReactNode }) => {
    // const pathname = usePathname()
    const pathname = usePathname()
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const isDepartmentDetail = pathname.includes('/support/department/')
    const sectionKey = isDepartmentDetail
        ? null
        : getSupportSectionKeyFromPath(searchParams)
    const heading = sectionKey ? sectionToHeading[sectionKey] : null

    useEffect(() => {
        if (isDepartmentDetail) return

        const url = new URL(window.location.href)
        const sub = url.searchParams.get('sub') || 'dashboard'
        push(`?sub=${sub}`)
    }, [isDepartmentDetail, pathname, push])

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
                                                    ? 'text-label-lg text-on-primary'
                                                    : undefined
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

const SupportLayout = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={null}>
        <SupportLayoutContent>{children}</SupportLayoutContent>
    </Suspense>
)

export default SupportLayout

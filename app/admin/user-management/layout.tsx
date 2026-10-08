'use client'

import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
import { Button } from '@/src/shared/components/ui/button'
import {
    getUserManagementSectionKey,
    sectionToHeading,
} from '@/src/routes/userManagment/constants'

const UserManagementLayoutContent = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { back, replace } = useRouter()
    const sectionKey = getUserManagementSectionKey(
        pathname,
        searchParams.get('sub')
    )
    const heading = sectionKey ? sectionToHeading[sectionKey] : null

    useEffect(() => {
        const isIndex =
            pathname === '/admin/user-management' ||
            pathname === '/admin/user-management/'
        if (!isIndex || searchParams.get('sub')) return

        const params = new URLSearchParams(searchParams.toString())
        params.set('sub', 'user')
        replace(`${pathname}?${params.toString()}`)
    }, [pathname, replace, searchParams])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {heading && (
                <HeadingWithActions>
                    {heading.hasBackButton && (
                        <HeadingWithActions.BackButton onClick={() => back()} />
                    )}
                    <HeadingWithActions.Title>{heading.title}</HeadingWithActions.Title>
                    <HeadingWithActions.SubTitle>
                        {heading.subtitle}
                    </HeadingWithActions.SubTitle>
                    {heading.buttons && heading.buttons.length > 0 && (
                        <HeadingWithActions.ButtonWrapper>
                            {heading.buttons.map((button, index) => {
                                const content = (
                                    <>
                                        {button.icon && (
                                            <Icon
                                                label={button.icon}
                                                className={
                                                    button.variant === 'primary'
                                                        ? 'size-6! text-on-primary'
                                                        : 'size-6!'
                                                }
                                            />
                                        )}
                                        <span className='text-label-sm'>
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
                                    <Button key={index} variant={button.variant}>
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

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense fallback={null}>
            <UserManagementLayoutContent>{children}</UserManagementLayoutContent>
        </Suspense>
    )
}

export default UserManagementLayout

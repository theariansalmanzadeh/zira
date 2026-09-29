'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import HeadingWithActions from '@/src/shared/components/ui/HeadingWithActions'
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
                    {heading.subtitle && (
                        <HeadingWithActions.SubTitle>
                            {heading.subtitle}
                        </HeadingWithActions.SubTitle>
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

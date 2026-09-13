"use client"

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const UserManagementLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const { push } = useRouter()
    useEffect(() => {
        if (pathname.split('/').filter(Boolean).length > 2) {
            return
        }
        const url = new URL(window.location.href)
        const sub = url.searchParams.get('sub') || 'users'
        push(`?sub=${sub}`)
    }, [pathname, push])
    return (
        <>{children}</>
    )
}

export default UserManagementLayout
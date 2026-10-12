'use client'

import { usePathname } from 'next/navigation'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    if (pathname === '/admin/login') {
        return (
            <div className='flex h-screen w-full items-center justify-center'>
                {children}
            </div>
        )
    }

    return children
}

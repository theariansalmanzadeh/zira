'use client'

import { usePathname } from 'next/navigation'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    if (pathname === '/admin/login') {
        return <div className='h-screen w-full overflow-auto'>{children}</div>
    }

    return children
}

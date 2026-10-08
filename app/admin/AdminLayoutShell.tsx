'use client'

import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import AdminHeader from '@/src/shared/components/header/AdminHeader'
import Sidebar from '@/src/shared/components/sidebar/Sidebar'
import Modal from '@/src/shared/components/modals/Modal'
import { TooltipProvider } from '@/src/shared/components/ui/Tooltip'

const AdminLayoutShell = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'

    if (isLoginPage) {
        return (
            <div className='flex h-screen w-full items-center justify-center'>
                {children}
            </div>
        )
    }

    return (
        <div className='flex min-h-screen w-full flex-row-reverse bg-surface-container-high p-lg'>
            <div className='grow bg-surface-container-high'>
                <Suspense fallback={null}>
                    <AdminHeader />
                </Suspense>
                <div className='flex flex-col gap-2'>
                    <Suspense fallback={null}>{children}</Suspense>
                </div>
            </div>
            <div>
                <Suspense fallback={null}>
                    <TooltipProvider>
                        <Sidebar />
                    </TooltipProvider>
                </Suspense>
            </div>
            <Modal />
        </div>
    )
}

export default AdminLayoutShell

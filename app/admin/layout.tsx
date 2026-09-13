import { Suspense } from 'react'
import Header from '@/src/shared/components/header/Header'
import Sidebar from '@/src/shared/components/sidebar/Sidebar'
import Modal from '@/src/shared/components/modals/Modal'
import { TooltipProvider } from '@/src/shared/components/ui/Tooltip'

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen w-full flex-row-reverse bg-surface-container-high p-lg">
            <div className="grow bg-surface-container-high">
                <Header />
                <div className="flex flex-col gap-2">
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

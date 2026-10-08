'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

import Banner from '@/src/shared/components/ui/Banner'
import Footer from '@shared/components/footer/Footer'
import Navbar from '@shared/components/navbar/Navbar'
import AuthProvider from '@/src/shared/context/AuthProvider'
import Modal from '@/src/shared/components/modals/Modal'
import { useLastPageStore } from '@/src/shared/store/last-page-store'

const PublicLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const pathname = usePathname()
    const setLastPage = useLastPageStore((state) => state.setLastPage)

    useEffect(() => {
        if (!pathname) return
        setLastPage(pathname)
    }, [pathname, setLastPage])

    return (
        <AuthProvider>
            <Banner isLoggedIn={false} />
            <div className="body-container">
                <Navbar />
                <main>{children}</main>
                <Footer />
            </div>
            <Modal />
        </AuthProvider>
    )
}

export default PublicLayout

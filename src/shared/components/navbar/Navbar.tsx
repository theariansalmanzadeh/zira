import React from 'react'
import MobileNavbar from './components/MobileNavbar'
import DesktopNavbar from './components/DesktopNavbar'

const Navbar = () => {
    // const { t } = useTranslation()
    return (
        <>
            <DesktopNavbar />
            <MobileNavbar />
        </>
    )
}

export default Navbar
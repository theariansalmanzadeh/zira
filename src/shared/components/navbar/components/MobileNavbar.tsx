"use client"

import { Icon } from '@shared/components/Icons/Icon'
import { Sheet, SheetContent, SheetTrigger } from '@shared/components/ui/Sheet'
import Link from 'next/link'
// import { useTranslation } from 'react-i18next'
import { NAVBAR_ITEMS } from '../content'
import { useState } from 'react'


const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div className='bg-surface-container-lowest sticky top-0 z-50 flex md:hidden flex-row-reverse justify-start items-center gap-md p-2xl'>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <div onClick={handleOpen} className="lg:hidden">
                        <Icon label='hamburger' />
                    </div>
                </SheetTrigger>
                <SheetContent>
                    {NAVBAR_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            href={item.link}
                            className="text-on-surface-variant font-medium hover:text-primary transition-colors font-helvetica"
                        >
                            {item.label}
                        </Link>
                    ))}

                </SheetContent>
            </Sheet>
            <Icon label='magnifier' />
            <Icon label='logoType' className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' />
        </div>)
}

export default MobileNavbar
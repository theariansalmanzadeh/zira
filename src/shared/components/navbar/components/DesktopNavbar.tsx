"use client"
import { Icon } from '../../Icons/Icon'
import Link from 'next/link'
import { Button } from '../../ui/button'
import { NAVBAR_ITEMS } from '../content'
import { useRouter } from 'next/navigation'
import { PUBLIC_ROUTES } from '@/src/shared/constants'

const DesktopNavbar = () => {
    const { push } = useRouter()
    const handleRouting = () => {
        push(PUBLIC_ROUTES.login)
    }
    return (
        <div className='hidden md:flex flex-row justify-between items-center gap-md py-5'>
            <Link href={PUBLIC_ROUTES.landing} className='flex flex-row justify-start items-center gap-md'>
                <Icon label='logo' className='h-[40px]' />
            </Link>
            <div className='flex flex-row justify-end items-center gap-5'>
                {NAVBAR_ITEMS.map((item) => (
                    <Link key={item.label} href={item.link}>
                        <span className='text-on-surface-variant hover:text-primary transition-colors'>{item.label}</span>
                    </Link>
                ))}
                <Button onClick={handleRouting} variant="primary" className='flex flex-row items-center justify-center gap-1'>
                    ورود به فروشگاه
                    <Icon label='chavaron' className='size-5 fill-white!' />
                </Button>
            </div>
        </div>
    )
}

export default DesktopNavbar
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import React from 'react'

const Header = () => {
    return (
        <div className='flex flex-row items-center justify-between mb-3'>
            <div className='flex flex-col gap-2'>
                <div className='flex flex-row items-center gap-2'>
                    <span className='text-title-md font-medium text-on-surface'>
                        انبار مرکزی تهران
                    </span>
                    <Pill text='فعال' variant='success' />
                </div>
                <span className='text-label-md text-on-surface-variant'>
                    WH-1001
                </span>
            </div>
            <div className='flex flex-row items-center gap-2'>
                <Button variant='outline' size='sm'>
                    <span>تنظیمات انبار</span>
                    <Icon label='tune400Linear' />
                </Button>
                <Button variant='primary' size='sm'>
                    <span>ورود کالا</span>
                    <Icon label='import400Linear' />
                </Button>
            </div>
        </div>
    )
}

export default Header
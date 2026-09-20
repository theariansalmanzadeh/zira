'use client'

import type { Dispatch, SetStateAction } from 'react'
import { Button } from '@/src/shared/components/ui/button'

type MapAddressFormProps = {
    setActiveStep: Dispatch<SetStateAction<number>>
}

const MapAddressForm = ({ setActiveStep }: MapAddressFormProps) => {
    return (
        <div
            className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='flex flex-col gap-4'>
                <h2 className='text-title-md font-semibold text-on-surface'>
                    نقشه انبار — ویزارد آدرس‌دهی
                </h2>
                <p className='text-label-md text-outline'>
                    ساختار آدرس‌دهی انبار را تعریف کنید و موقعیت را روی نقشه مشخص
                    نمایید.
                </p>
                <div className='min-h-64 w-full rounded-container-lg bg-surface-container-high' />
            </div>

            <div className='flex flex-col gap-3'>
                <Button
                    type='button'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                >
                    ثبت انبار
                </Button>
                <Button
                    type='button'
                    variant='outline'
                    size='lg'
                    className='w-full text-label-lg'
                    onClick={() => setActiveStep(2)}
                >
                    بازگشت
                </Button>
            </div>
        </div>
    )
}

export default MapAddressForm

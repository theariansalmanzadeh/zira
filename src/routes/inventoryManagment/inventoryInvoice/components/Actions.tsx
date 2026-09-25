'use client'

import { Button } from '@/src/shared/components/ui/button'
import type { InventoryInvoiceStatus } from '../types'

type ActionsProps = {
    status: InventoryInvoiceStatus
}

const outlineClassName =
    'h-10 rounded-full border border-outline-variant bg-surface-container-lowest px-5 text-label-md text-on-surface hover:bg-surface-container-high'

const pillClassName = 'h-10 rounded-full px-5 text-label-md'

const successClassName =
    'h-10 rounded-full border-0 bg-success-container px-5 text-label-md text-on-success-container hover:bg-success-container/80'

const Actions = ({ status }: ActionsProps) => {
    if (status === 'pending') {
        return (
            <div className='flex w-full flex-row flex-wrap items-center justify-between gap-2' dir='rtl'>
                <Button type='button' variant='outline' className={outlineClassName}>
                    ثبت تعداد
                </Button>
                <Button type='button' variant='error' className={pillClassName}>
                    تعیین آدرس کالا
                </Button>
                <Button type='button' variant='outline' className={outlineClassName}>
                    توضیحات شمارنده
                </Button>
                <Button type='button' variant='ghost' className={successClassName}>
                    تایید دریافت
                </Button>
                <Button type='button' variant='error' className={pillClassName}>
                    رد و عودت
                </Button>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-end gap-2' dir='rtl'>
            <span className='text-label-md text-outline'>تعیین وضعیت نهایی</span>
            <div className='flex flex-row flex-wrap items-center justify-end gap-2'>
                <Button type='button' variant='success' className={pillClassName}>
                    ثبت نهایی
                </Button>
                <Button type='button' variant='error' className={pillClassName}>
                    رد و عودت
                </Button>
                <Button type='button' variant='ghost' className={outlineClassName}>
                    درخواست شمارش مجدد
                </Button>
            </div>
        </div>
    )
}

export default Actions

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import AdornedInput from '@/src/shared/components/ui/AdornedInput'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Button } from '@/src/shared/components/ui/button'
import {
    CASH_PURCHASE_DISCOUNT_DEFAULTS,
    cashPurchaseDiscountSchema,
    type CashPurchaseDiscountValues,
} from '../schema'

const CashPurchaseDiscountForm = () => {
    const { control, handleSubmit } = useForm<CashPurchaseDiscountValues>({
        resolver: zodResolver(cashPurchaseDiscountSchema),
        defaultValues: CASH_PURCHASE_DISCOUNT_DEFAULTS,
    })

    const onSubmit = (data: CashPurchaseDiscountValues) => {
        console.log(data)
    }

    return (
        <form
            className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='flex items-start gap-3'>
                <span className='mt-1 h-6 w-1 shrink-0 rounded-full bg-error' />
                <div className='flex flex-col gap-1'>
                    <h2 className='text-title-md font-bold text-on-surface'>
                        ثبت تخفیف جدید — تخفیف خرید نقدی
                    </h2>
                    <p className='text-body-md text-outline'>
                        این تخفیف زمانی اعمال می‌شود که مشتری کل مبلغ سفارش را نقدی پرداخت کند.
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
                <Controller
                    name='discountAmount'
                    control={control}
                    render={({ field, fieldState }) => (
                        <AdornedInput
                            label='میزان تخفیف'
                            required
                            value={field.value}
                            onChange={field.onChange}
                            suffix='%'
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name='minPurchaseAmount'
                    control={control}
                    render={({ field, fieldState }) => (
                        <AdornedInput
                            label='حداقل مبلغ خرید'
                            required
                            value={field.value}
                            onChange={field.onChange}
                            suffix='تومان'
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name='startDate'
                    control={control}
                    render={({ field }) => (
                        <CalendarButton
                            label='تاریخ شروع اعتبار'
                            placeholder=''
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name='endDate'
                    control={control}
                    render={({ field }) => (
                        <CalendarButton
                            label='تاریخ پایان اعتبار'
                            placeholder=''
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className='flex justify-end'>
                <Button type='submit' variant='primary'>
                    ثبت تخفیف
                </Button>
            </div>
        </form>
    )
}

export default CashPurchaseDiscountForm

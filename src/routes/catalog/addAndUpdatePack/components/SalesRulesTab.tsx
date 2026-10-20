'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import type { AddAndUpdatePackFormValues } from '../schema'

const SalesRulesTab = () => {
    const { control } = useFormContext<AddAndUpdatePackFormValues>()

    return (
        <div className='flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6'>
            <div className='flex items-center gap-2'>
                <span className='h-5 w-1 shrink-0 rounded-full bg-error' />
                <span className='text-title-md font-bold text-on-surface'>
                    قوانین فروش
                </span>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <Controller
                    control={control}
                    name='min_order_qty'
                    render={({ field }) => (
                        <Input
                            label='حداقل تعداد قابل سفارش'
                            placeholder='انتخاب'
                            type='number'
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='max_order_qty'
                    render={({ field }) => (
                        <Input
                            label='حداکثر تعداد قابل سفارش'
                            placeholder='انتخاب'
                            type='number'
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='max_preorder_qty'
                    render={({ field }) => (
                        <Input
                            label='حداکثر تعداد پیش سفارش'
                            placeholder='انتخاب'
                            type='number'
                            value={field.value ?? ''}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default SalesRulesTab

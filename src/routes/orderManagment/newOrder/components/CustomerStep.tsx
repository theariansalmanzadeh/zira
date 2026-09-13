'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'
import { CUSTOMER_LEVEL_STYLES } from '../constants'
import { useCreateOrderContext } from '../provider/CreateOrderProvider'

const CustomerStep = () => {
    const [search, setSearch] = useState('')
    const {
        customers,
        selectedCustomerId,
        setSelectedCustomerId,
    } = useCreateOrderContext()

    const filteredCustomers = customers.filter((customer) => {
        if (!search.trim()) return true
        return (
            customer.name.includes(search) ||
            customer.phone.includes(search)
        )
    })

    return (
        <div className='flex flex-col gap-5 rounded-card-md bg-surface-container-lowest p-6' dir='rtl'>
            <div>
                <h2 className='text-title-md font-medium text-on-surface'>انتخاب مشتری</h2>
                <p className='mt-1 text-label-md text-outline'>
                    مشتری ثبت‌شده را جستجو کنید یا مشتری جدید بسازید.
                </p>
            </div>

            <Input
                value={search}
                onChange={setSearch}
                placeholder='جستجوی نام، کد مشتری یا شماره تماس…'
                iconId='search400Linear'
                wrapperClassName='rounded-container-md flex-row-reverse bg-surface-container-high'
                className='text-right'
            />

            <div className='flex flex-col gap-2.5'>
                {filteredCustomers.map((customer) => {
                    const selected = selectedCustomerId === customer.id
                    const level = CUSTOMER_LEVEL_STYLES[customer.level]

                    return (
                        <button
                            key={customer.id}
                            type='button'
                            onClick={() => setSelectedCustomerId(customer.id)}
                            className={cn(
                                'flex w-full items-center gap-3 rounded-card-sm border-[1.5px] p-3.5 text-right transition-colors',
                                selected
                                    ? 'border-primary bg-primary-hovered'
                                    : 'border-outline-variant bg-surface-container-lowest hover:border-primary/40'
                            )}
                        >
                            <div className='flex size-10 shrink-0 items-center justify-center rounded-card-sm bg-surface-container-highest text-label-lg font-bold text-on-surface'>
                                {customer.initial}
                            </div>
                            <div className='min-w-0 flex-1 text-right'>
                                <div className='text-label-lg font-bold text-on-surface'>
                                    {customer.name}
                                </div>
                                <div className='mt-1 text-right text-label-sm text-outline' dir='ltr'>
                                    {customer.phone}
                                </div>
                            </div>
                            <span
                                className={cn(
                                    'shrink-0 rounded-button-sm px-2 py-0.5 text-[10.5px] font-bold',
                                    level.className
                                )}
                            >
                                {level.label}
                            </span>
                            <span
                                className={cn(
                                    'flex size-5 shrink-0 items-center justify-center rounded-full border-2',
                                    selected ? 'border-primary' : 'border-outline-variant'
                                )}
                            >
                                <span
                                    className={cn(
                                        'size-2.5 rounded-full',
                                        selected ? 'bg-primary' : 'bg-transparent'
                                    )}
                                />
                            </span>
                        </button>
                    )
                })}
            </div>
            <div className='flex flex-row items-center justify-between'>
                <Button
                    type='button'
                    variant='ghost'
                    className='w-fit gap-1.5 px-0 text-label-md font-bold text-primary'
                >
                    <span className='text-title-md'>+</span>
                    ثبت مشتری جدید
                </Button>
            </div>
        </div>
    )
}

export default CustomerStep

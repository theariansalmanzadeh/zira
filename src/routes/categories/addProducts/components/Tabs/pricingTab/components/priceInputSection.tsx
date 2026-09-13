'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'

const SIZES = ['XS', 'SM', 'MD', 'LG', 'XL'] as const

const SALES_UNIT_GROUPS = [
    { id: 'pack-6', label: 'پک ۶ عددی' },
    { id: 'pack-12', label: 'پک ۱۲ عددی' },
] as const

type RowState = {
    basePrice: string
    capacity: string
    active: boolean
}

const createInitialRows = () => {
    const rows: Record<string, RowState> = {}
    for (const unit of SALES_UNIT_GROUPS) {
        for (const size of SIZES) {
            rows[`${unit.id}-${size}`] = {
                basePrice: '',
                capacity: '',
                active: true,
            }
        }
    }
    return rows
}

const PriceInputSection = () => {
    const [rows, setRows] = useState(createInitialRows)

    const updateRow = (key: string, updates: Partial<RowState>) => {
        setRows((current) => ({
            ...current,
            [key]: { ...current[key], ...updates },
        }))
    }

    return (
        <div className='grid gap-y-2 bg-surface-container-high' dir='rtl'>
            <div className='grid grid-cols-[minmax(7rem,auto)_minmax(7rem,auto)_1fr] items-center gap-x-4 px-2 text-label-md text-outline'>
                <span>واحد فروش</span>
                <div className='flex items-center gap-x-4 px-4'>
                    <span>سایز</span>
                    <span>قیمت پایه</span>
                    <span>ظرفیت پیش‌سفارش</span>
                    <span />
                </div>
            </div>

            {SALES_UNIT_GROUPS.map((unit) => (
                <div
                    key={unit.id}
                    className='grid grid-cols-[minmax(7rem,auto)_minmax(7rem,auto)_1fr] gap-x-4 gap-y-2 items-center rounded-card-lg p-2'
                >
                    <div className='flex items-start row-span-12 self-stretch text-label-lg text-on-surface-variant'>
                        {unit.label}
                    </div>

                    {SIZES.map((size) => {
                        const key = `${unit.id}-${size}`
                        const row = rows[key]

                        return (
                            <>
                                <span className='text-label-md text-on-surface-variant'>
                                    {size}
                                </span>
                                <div className='flex bg-surface-container-lowest justify-between px-3 py-3.5'>
                                    <div className='flex flex-row grow w-full'>
                                        <Input
                                            className='w-full'
                                            placeholder='-'
                                            value={row.basePrice}
                                            onChange={(value) =>
                                                updateRow(key, { basePrice: value })
                                            }
                                        />
                                        <Input
                                            className='w-full'
                                            placeholder='-'
                                            value={row.capacity}
                                            onChange={(value) =>
                                                updateRow(key, { capacity: value })
                                            }
                                        />
                                    </div>
                                    <div className='grid grid-cols-[auto_auto] items-center gap-x-2'>
                                        <Switch
                                            checked={row.active}
                                            onCheckedChange={(active) =>
                                                updateRow(key, { active })
                                            }
                                        />
                                        <span className='text-label-md text-on-surface-variant'>
                                            فعال
                                        </span>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default PriceInputSection

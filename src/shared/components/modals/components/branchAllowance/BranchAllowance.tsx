'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Switch } from '@/src/shared/components/ui/Switch'
import { cn } from '@/src/shared/libs/utils'
import type { BaseModalProps } from '../../types'

export type BranchAllowanceKey =
    | 'creditSales'
    | 'chequeSales'
    | 'consignmentSales'
    | 'wasteRegistration'
    | 'repricing'

export type BranchAllowanceModalData = {
    allowances?: Partial<Record<BranchAllowanceKey, boolean>>
    onSave?: (allowances: Record<BranchAllowanceKey, boolean>) => void
}

const ALLOWANCE_ITEMS: { key: BranchAllowanceKey; label: string }[] = [
    { key: 'creditSales', label: 'فروش اعتباری' },
    { key: 'chequeSales', label: 'فروش چکی' },
    { key: 'consignmentSales', label: 'فروش امانی' },
    { key: 'wasteRegistration', label: 'ثبت ضایعات' },
    { key: 'repricing', label: 'قیمت‌گذاری مجدد' },
]

const DEFAULT_ALLOWANCES: Record<BranchAllowanceKey, boolean> = {
    creditSales: true,
    chequeSales: false,
    consignmentSales: true,
    wasteRegistration: true,
    repricing: false,
}

const BranchAllowance = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as BranchAllowanceModalData | null | undefined
    const [allowances, setAllowances] = useState<
        Record<BranchAllowanceKey, boolean>
    >({
        ...DEFAULT_ALLOWANCES,
        ...modalData?.allowances,
    })

    const handleToggle = (key: BranchAllowanceKey, checked: boolean) => {
        setAllowances((prev) => ({ ...prev, [key]: checked }))
    }

    const handleSave = () => {
        modalData?.onSave?.(allowances)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='flex flex-col gap-3'>
                {ALLOWANCE_ITEMS.map((item) => (
                    <div
                        key={item.key}
                        className='flex flex-row items-center justify-between gap-3 rounded-card-lg border border-outline-variant px-4 py-3'
                    >
                        <span className='text-label-lg text-on-surface'>
                            {item.label}
                        </span>
                        <Switch
                            checked={allowances[item.key]}
                            onCheckedChange={(checked) =>
                                handleToggle(item.key, checked)
                            }
                            className={cn(
                                'data-[state=checked]:bg-success data-[state=unchecked]:bg-surface-container-highest'
                            )}
                        />
                    </div>
                ))}
            </div>

            <div className='flex flex-row items-center justify-between gap-3 border-t border-outline-variant pt-4'>
                <p className='text-label-md text-outline'>
                    تغییرات پس از ذخیره روی فاکتورهای جدید اعمال می‌شود.
                </p>
                <div className='flex shrink-0 flex-row items-center gap-2'>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={closeModal}
                    >
                        بستن
                    </Button>
                    <Button
                        type='button'
                        variant='primary'
                        onClick={handleSave}
                    >
                        ذخیره مجوزها
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BranchAllowance

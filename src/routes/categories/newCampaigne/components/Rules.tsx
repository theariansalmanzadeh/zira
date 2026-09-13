'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { cn } from '@/src/shared/libs/utils'

type UnitFieldProps = {
    label: string
    value: string
    onChange: (value: string) => void
    unit: string
    msg?: string
    className?: string
}

const UnitField = ({
    label,
    value,
    onChange,
    unit,
    msg,
    className,
}: UnitFieldProps) => (
    <div className={cn('flex flex-col', className)}>
        <label className='mb-1.5 text-label-md text-on-surface-variant'>
            {label}
        </label>
        <div className='flex items-center gap-2'>
            <div className='min-w-0 flex-1'>
                <Input value={value} onChange={onChange} />
            </div>
            <span className='shrink-0 text-label-md text-outline'>{unit}</span>
        </div>
        {msg && (
            <span className='mt-1 text-sm text-on-surface-variant'>{msg}</span>
        )}
    </div>
)

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className='mb-4 flex items-center gap-2'>
        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
        <h3 className='text-title-md font-bold text-on-surface'>{children}</h3>
    </div>
)

type ToggleRowProps = {
    label: string
    checked: boolean
    onCheckedChange: (checked: boolean) => void
}

const ToggleRow = ({ label, checked, onCheckedChange }: ToggleRowProps) => (
    <div className='flex items-center justify-between gap-4 rounded-container-lg border border-outline-variant px-4 py-3'>
        <span className='text-label-lg text-on-surface'>{label}</span>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
)

const Rules = () => {
    const [minPurchaseAmount, setMinPurchaseAmount] = useState('0')
    const [minPurchaseCount, setMinPurchaseCount] = useState('0')
    const [maxDiscountCap, setMaxDiscountCap] = useState('0')
    const [usageLimit, setUsageLimit] = useState('0')
    const [useWithOtherDiscounts, setUseWithOtherDiscounts] = useState(false)
    const [useWithDiscountCode, setUseWithDiscountCode] = useState(true)

    return (
        <div
            className='rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <SectionTitle>قوانین تخفیف</SectionTitle>

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                <UnitField
                    label='حداقل مبلغ خرید'
                    value={minPurchaseAmount}
                    onChange={setMinPurchaseAmount}
                    unit='تومان'
                />
                <UnitField
                    label='حداقل تعداد خرید'
                    value={minPurchaseCount}
                    onChange={setMinPurchaseCount}
                    unit='عدد'
                />
                <UnitField
                    label='حداکثر سقف تخفیف'
                    value={maxDiscountCap}
                    onChange={setMaxDiscountCap}
                    unit='تومان'
                    msg='سقف مبلغ تخفیف در هر سفارش'
                />
                <UnitField
                    label='محدودیت تعداد استفاده'
                    value={usageLimit}
                    onChange={setUsageLimit}
                    unit='بار'
                    msg='خالی = نامحدود'
                />
            </div>

            <div className='mt-6 flex flex-col gap-3'>
                <ToggleRow
                    label='قابل استفاده همزمان با سایر تخفیف‌ها'
                    checked={useWithOtherDiscounts}
                    onCheckedChange={setUseWithOtherDiscounts}
                />
                <ToggleRow
                    label='قابل استفاده همراه با کد تخفیف'
                    checked={useWithDiscountCode}
                    onCheckedChange={setUseWithDiscountCode}
                />
            </div>
        </div>
    )
}

export default Rules

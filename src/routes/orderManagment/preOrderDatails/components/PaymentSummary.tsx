'use client'

import { cn } from '@shared/libs/utils'
import { Icon } from '@/src/shared/components/Icons/Icon'

type PaymentField = {
    label: string
    type?: 'amount' | 'date'
}

const FIELDS_DATA: PaymentField[] = [
    { label: 'مبلغ کل', type: 'amount' },
    { label: 'پرداخت شده', type: 'amount' },
    { label: 'در انتظار پرداخت', type: 'amount' },
    { label: 'موعد تسویه کامل', type: 'date' },
]

const formatAmount = (value?: string) => {
    if (!value) return <Icon label='currency' size={24} />
    return <div className='flex flex-row items-end gap-2'>
        <span className='text-title-md font-medium text-on-surface'>{value}</span>
        <Icon label='currency' size={24} />
    </div>
}

const PaymentSummary = ({ fields = [{ value: '1000000' }, { value: '1000000' }, { value: '1000000' }, { value: "1404/12/10" }], className }: { fields: { value: string }[], className?: string }) => {
    return (
        <div className={cn('flex flex-col gap-2', className)} dir='rtl'>
            <span className='text-title-md font-medium text-outline'>اطلاعات پرداخت</span>

            <div className='rounded-card-lg bg-surface-container-lowest p-6'>
                <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
                    {FIELDS_DATA.map((field, index) => (
                        <div
                            key={field.label}
                            className='flex flex-col items-start justify-between gap-2 text-left'
                        >
                            <span className='text-label-md text-outline'>{field.label}</span>
                            {field.type === 'date' ? (
                                <span className='text-title-md font-medium text-on-surface'>{fields[index].value}</span>
                            ) : (
                                <span className='text-title-md font-medium text-on-surface'>
                                    {formatAmount(fields[index].value)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PaymentSummary

'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { formatPrice } from '@/src/shared/libs/formatter'
import { onlyNumber } from '@/src/shared/schema/generalSchema'
import { CASH_DISCOUNT_RATE } from '../constants'
import type { CashPaymentInfo } from '../types'

type CashPaymentCardProps = {
    value: CashPaymentInfo
    onChange: (info: Partial<CashPaymentInfo>) => void
    onRemove?: () => void
}

const CashPaymentCard = ({ value, onChange, onRemove }: CashPaymentCardProps) => {
    const amount = Number(value.amount) || 0
    const discount = Math.round(amount * CASH_DISCOUNT_RATE)

    return (
        <div
            className='relative flex flex-col gap-4 rounded-card-sm border border-outline-variant bg-success-container/30 p-5'
            dir='rtl'
        >
            {onRemove && (
                <IconButton
                    icon='delete300Linear'
                    iconClassName='size-4! text-outline'
                    className='absolute left-3 top-3'
                    onClick={onRemove}
                />
            )}

            <div className='flex items-center gap-2'>
                <Icon label='moneyBag400Linear' className='size-5! text-success' />
                <span className='text-label-lg font-semibold text-success'>پرداخت نقدی</span>
            </div>

            <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
                <Input
                    label='مبلغ پرداخت نقدی (تومان)'
                    value={value.amount}
                    onChange={(amountValue) => onChange({ amount: onlyNumber(amountValue) })}
                    placeholder='مثلاً ۵,۰۰۰,۰۰۰'
                    inputMode='numeric'
                    dir='ltr'
                    className='text-right'
                    wrapperClassName='bg-surface-container-lowest'
                />
                <div className='flex flex-col'>
                    <span className='mb-1.5 text-label-md text-on-surface-variant'>
                        تخفیف پرداخت نقدی (۳٪)
                    </span>
                    <div className='flex min-h-12 items-center rounded-container-lg border border-dashed border-outline-variant bg-surface-container-high/60 px-3 py-3 text-label-lg text-outline'>
                        {amount > 0 ? formatPrice(discount) : '—'}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashPaymentCard

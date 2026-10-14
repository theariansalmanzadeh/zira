'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaDate } from '@/src/shared/libs/formatter'
import { CODE_TYPE_TABS, SCOPE_OPTIONS } from '../constant'
import type { NewDiscountFormValues } from '../schema'

type PreviewRowProps = {
    label: string
    value: string
}

const PreviewRow = ({ label, value }: PreviewRowProps) => (
    <div className='flex flex-row items-center justify-between gap-3'>
        <span className='text-label-md text-outline'>{label}</span>
        <span className='text-label-md text-on-surface-variant'>{value}</span>
    </div>
)

const PreviewDiscount = () => {
    const { control } = useFormContext<NewDiscountFormValues>()
    const values = useWatch({ control })
    const codeType =
        CODE_TYPE_TABS.find((tab) => tab.value === values.codeType)?.label ?? '—'
    const scope =
        SCOPE_OPTIONS.find((option) => option.value === values.scope)?.title ??
        '—'
    const range =
        values.startDate && values.endDate
            ? `${formatFaDate(values.startDate)}-${formatFaDate(values.endDate)}`
            : '—'

    return (
        <div className='w-full' dir='rtl'>
            <span className='mb-3 block text-label-lg text-outline'>خلاصه</span>

            <div className='flex flex-col gap-3 rounded-card-md bg-surface-container-lowest p-6'>
                <PreviewRow label='کد' value={values.discountCode || '—'} />
                <PreviewRow label='نوع' value={codeType} />
                <PreviewRow label='روی' value={scope} />
                <PreviewRow label='برای' value={scope} />

                <hr className='border-0 border-t border-dashed border-outline-variant' />

                <PreviewRow label='بازه' value={range} />
                <PreviewRow
                    label='حداقل خرید'
                    value={values.minPurchaseQty || values.scopeMinPurchaseQty || '—'}
                />

                <hr className='border-0 border-t border-dashed border-outline-variant' />

                <div className='flex flex-row items-start gap-3 rounded-card-md bg-info-container p-3'>
                    <Icon label='receipt' className='shrink-0' fill='fill-info' />
                    <p className='text-label-md text-on-surface-variant'>
                        {values.amount
                            ? `${values.amount}${values.codeType === 'amount' ? ' تومان' : '٪'} تخفیف، ${scope}.`
                            : 'پس از تکمیل فرم، خلاصه کد تخفیف اینجا نمایش داده می‌شود.'}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreviewDiscount

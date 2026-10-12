'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { useBundle } from '../provider'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

const Pricing = () => {
    const { pricing, finalPrice, setFinalPrice, displayPrice } = useBundle()

    const rows: {
        label: string
        value: string
        valueClassName?: string
        isPrice?: boolean
    }[] = [
            {
                label: 'تعداد اقلام',
                value: formatFaNumber(pricing.itemsCount),
            },
            {
                label: 'تعداد کل کالا',
                value: `${formatFaNumber(pricing.totalUnits)} عدد`,
            },
            {
                label: 'جمع قیمت پایه',
                value: formatPrice(pricing.baseTotal),
                isPrice: true,
            },
            {
                label: `جمع تخفیف اقلام (${formatFaNumber(pricing.discountPercent)}٪)`,
                value: `−${formatPrice(pricing.discountTotal)}`,
                valueClassName: 'text-label-lg font-semibold text-success',
                isPrice: true,

            },
            {
                label: 'قیمت محاسبه‌شده',
                value: formatPrice(pricing.calculatedPrice),
                isPrice: true,

            },
        ]

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <h3 className="mb-4 text-title-md font-bold text-on-surface">
                قیمت‌گذاری باندل
            </h3>

            <div className="flex flex-col gap-3">
                {rows.map((row) => (
                    <div
                        key={row.label}
                        className="flex items-center justify-between gap-3"
                    >
                        <span className="text-label-md text-outline">
                            {row.label}
                        </span>
                        <p className="flex items-center gap-1">
                            <span
                                className={
                                    row.valueClassName ??
                                    'text-label-lg font-semibold text-on-surface'
                                }
                            >
                                {row.value}
                            </span>
                            {row.isPrice && (
                                <Icon label="currency" className="size-5 text-outline" />
                            )}
                        </p>
                    </div>
                ))}
            </div>

            <div className="my-4 border-0 border-t border-dashed border-outline-variant" />

            <div className="flex flex-col gap-1.5">
                <label className="text-label-md text-on-surface-variant">
                    قیمت نهایی پک (اختیاری)
                </label>
                <div className="flex flex-row items-center gap-1.5 rounded-container-lg bg-surface-container-high px-3 py-3">
                    <input
                        value={finalPrice}
                        onChange={(event) => setFinalPrice(event.target.value)}
                        placeholder={formatPrice(pricing.calculatedPrice)}
                        className="w-full bg-transparent text-label-lg text-on-surface outline-none placeholder:text-outline"
                    />
                    <Icon label="currency" className="size-5 text-outline" />
                </div>
                <p className="text-label-sm text-outline">
                    اگر خالی بماند، قیمت محاسبه‌شده از اقلام به‌عنوان قیمت پک
                    ثبت می‌شود.
                </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-outline-variant pt-4">
                <span className="text-title-md font-bold text-on-surface">
                    قیمت باندل
                </span>
                <p className="flex items-center gap-1">
                    <span className="text-headline-md font-bold text-primary">
                        {formatPrice(displayPrice)}
                    </span>
                    <Icon label="currency" className="size-8 text-outline" />
                </p>
            </div>
        </div>
    )
}

export default Pricing

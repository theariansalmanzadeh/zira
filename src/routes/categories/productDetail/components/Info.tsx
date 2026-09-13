'use client'

import { cn } from '@shared/libs/utils'

export type InfoRow = {
    label: string
    value: string
}

type InfoProps = {
    title?: string
    rows?: InfoRow[]
    className?: string
}

export const INFO_ROWS_DUMMY: InfoRow[] = [
    { label: 'کد کالا', value: 'ZM-1042' },
    { label: 'برند', value: 'لمیس' },
    { label: 'دسته اصلی', value: 'لباس زیر زنانه' },
    { label: 'دسته فرعی', value: '—' },
    { label: 'واحد اصلی', value: 'عدد' },
    { label: 'واحد فرعی', value: 'پک ۶ عددی' },
    { label: 'گرید', value: 'گرید ۱' },
    { label: 'آستانه خرید', value: 'حداقل ۱ عدد' },
    { label: 'سقف انباشت', value: 'حداکثر ۲۰ عدد' },
]

const Info = ({
    title = 'اطلاعات کلی',
    rows = INFO_ROWS_DUMMY,
    className,
}: InfoProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir="rtl"
        >
            <h3 className="pb-3 text-title-md font-bold text-on-surface">
                {title}
            </h3>
            <div className="border-0 border-t border-outline-variant" />
            <div className="flex flex-col">
                {rows.map((row, index) => (
                    <div
                        key={`${row.label}-${index}`}
                        className={cn(
                            'flex items-center justify-between gap-4 py-3',
                            index < rows.length - 1 &&
                                'border-0 border-b border-outline-variant'
                        )}
                    >
                        <span className="text-label-md text-outline">
                            {row.label}
                        </span>
                        <span className="text-label-lg text-on-surface">
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Info

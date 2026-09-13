'use client'

import { cn } from '@shared/libs/utils'

export type CampaigneSpecRow = {
    label: string
    value: string
}

type CampaigneSpecsProps = {
    title?: string
    rows?: CampaigneSpecRow[]
    className?: string
}

export const CAMPAIGNE_SPECS_DUMMY: CampaigneSpecRow[] = [
    { label: 'نام کمپین', value: 'حراج پایان فصل پاییز' },
    { label: 'ماهیت کمپین', value: 'تخفیفی' },
    {
        label: 'هدف کمپین',
        value: 'افزایش فروش دسته لباس خواب به میزان ۲۵ درصد در ۱۵ روز',
    },
    { label: 'تاریخ و ساعت شروع', value: '۱۴۰۴/۰۹/۰۱ — ساعت ۰۹:۰۰' },
    { label: 'تاریخ و ساعت خاتمه', value: '۱۴۰۴/۰۹/۱۵ — ساعت ۲۳:۵۹' },
]

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className='mb-3 flex items-center gap-2'>
        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
        <h3 className='text-title-md font-bold text-on-surface'>{children}</h3>
    </div>
)

const CampaigneSpecs = ({
    title = 'مشخصات کمپین',
    rows = CAMPAIGNE_SPECS_DUMMY,
    className,
}: CampaigneSpecsProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <SectionTitle>{title}</SectionTitle>
            <div className='flex flex-col'>
                {rows.map((row, index) => (
                    <div
                        key={`${row.label}-${index}`}
                        className={cn(
                            'flex items-start justify-between gap-4 py-3',
                            index < rows.length - 1 &&
                                'border-0 border-b border-outline-variant'
                        )}
                    >
                        <span className='shrink-0 text-label-md text-outline'>
                            {row.label}
                        </span>
                        <span className='text-left text-label-lg text-on-surface'>
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CampaigneSpecs

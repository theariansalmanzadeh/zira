'use client'

import { formatFaDateTime } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

export type CampaigneDeputyData = {
    createdAt: string
    publishedAt: string
    creatorName: string
    publisherName: string
}

type CampaigneDeputyProps = CampaigneDeputyData & {
    title?: string
    className?: string
}

export const CAMPAIGNE_DEPUTY_DUMMY: CampaigneDeputyData = {
    createdAt: '2025-11-15T13:12:00.000Z',
    publishedAt: '2025-11-21T06:45:00.000Z',
    creatorName: 'مریم صادقی (کارشناس بازاریابی)',
    publisherName: 'رضا مهدوی (مدیر فروش)',
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <div className='mb-3 flex items-center gap-2'>
        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
        <h3 className='text-title-md font-bold text-on-surface'>{children}</h3>
    </div>
)

const CampaigneDeputy = ({
    title = 'سابقه و مسئولین',
    createdAt,
    publishedAt,
    creatorName,
    publisherName,
    className,
}: CampaigneDeputyProps) => {
    const rows = [
        { label: 'تاریخ ایجاد', value: formatFaDateTime(createdAt) },
        { label: 'تاریخ انتشار', value: formatFaDateTime(publishedAt) },
        { label: 'نام ایجاد کننده', value: creatorName },
        { label: 'نام منتشر کننده', value: publisherName },
    ]

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
                        key={row.label}
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

export default CampaigneDeputy

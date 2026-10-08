'use client'

import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { AnnouncementDetailData } from '../constants'

type SummaryProps = {
    data: AnnouncementDetailData
}

const META_ITEMS = (data: AnnouncementDetailData) => [
    [
        { label: 'شیوه ارسال', value: data.deliveryMethod },
        { label: 'زمان ایجاد', value: data.createdAt },
    ],
    [
        { label: 'نقش‌های هدف', value: data.targetRoles },
        { label: 'زمان ارسال', value: data.sentAt },
    ],
    [
        { label: 'موضوع', value: data.subjectLabel },
        { label: 'ارسال‌کننده', value: data.sender },
    ],
    [
        { label: 'اولویت', value: data.priorityLabel },
        { label: 'موجودیت مرتبط', value: data.relatedEntity },
    ],
]

const STAT_ITEMS = (data: AnnouncementDetailData) => [
    {
        label: 'کل گیرندگان',
        value: data.totalRecipients,
        valueClassName: 'text-on-surface',
    },
    {
        label: 'تحویل‌شده',
        value: data.delivered,
        valueClassName: 'text-primary',
    },
    {
        label: 'مشاهده‌شده',
        value: data.seen,
        valueClassName: 'text-success',
    },
    {
        label: 'بسته‌شده',
        value: data.closed,
        valueClassName: 'text-on-surface',
    },
]

const Summary = ({ data }: SummaryProps) => {
    return (
        <div className='flex flex-col gap-5' dir='rtl'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
                {META_ITEMS(data).map((column, index) => (
                    <div key={index} className='flex flex-col gap-4 text-center'>
                        {column.map((item) => (
                            <div key={item.label} className='flex flex-col gap-1'>
                                <span className='text-label-md text-outline'>
                                    {item.label}
                                </span>
                                <span className='text-label-lg font-semibold text-on-surface'>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                {STAT_ITEMS(data).map((item) => (
                    <div
                        key={item.label}
                        className='flex flex-col gap-2 rounded-card-md border border-outline-variant bg-surface-container-lowest px-4 py-4'
                    >
                        <span className='text-label-md text-outline'>
                            {item.label}
                        </span>
                        <span
                            className={`text-headline-sm font-bold ${item.valueClassName}`}
                        >
                            {formatFaNumber(item.value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Summary

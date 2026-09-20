'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Card } from '@/src/shared/components/ui/Card'
import { cn } from '@shared/libs/utils'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'
import {
    TRANSFER_SUMMARY_ITEMS,
    type TransferSummaryItem,
} from '../constants'

type TransferSummaryProps = {
    items?: TransferSummaryItem[]
    href?: string
    className?: string
}

const STATUS_VARIANT: Record<
    TransferSummaryItem['status'],
    VariantProps<typeof PillVariants>['variant']
> = {
    transferred: 'success',
    pending: 'warning',
    'in-transit': 'info',
}

const STATUS_LABEL: Record<TransferSummaryItem['status'], string> = {
    transferred: 'منتقل شد',
    pending: 'در انتظار',
    'in-transit': 'در حال انتقال',
}

const TransferSummary = ({
    items = TRANSFER_SUMMARY_ITEMS,
    href = '/admin/inventory-managment?sub=transfer',
    className,
}: TransferSummaryProps) => {
    return (
        <Card
            className={cn(
                'h-full gap-4 rounded-card-lg bg-surface-container-lowest p-3 shadow-none',
                className
            )}
            dir='rtl'
        >
            <div className='mb-1 flex flex-row items-center justify-between gap-2'>
                <span className='text-title-md font-bold text-on-surface'>
                    خلاصه انتقال بین انبار
                </span>
                <Link
                    href={href}
                    className='flex flex-row items-center gap-1 text-label-md text-on-surface-variant'
                >
                    <span>مشاهده همه</span>
                    <Icon
                        label='arrowLeft300Linear'
                        className='size-4 text-on-surface-variant'
                    />
                </Link>
            </div>

            <div className='flex flex-col gap-2'>
                {items.map((item) => (
                    <div
                        key={item.id}
                        className='flex flex-row items-center justify-between gap-3 rounded-card-md bg-surface-container-high px-3 py-3'
                    >
                        <div className='flex min-w-0 flex-col gap-1'>
                            <span className='text-label-lg font-medium text-on-surface'>
                                {item.id}
                            </span>
                            <div className='flex flex-row items-center gap-1 text-label-md text-outline'>
                                <span className='truncate'>{item.origin}</span>
                                <Icon
                                    label='arrowLeft300Linear'
                                    className='size-4! shrink-0 text-outline'
                                />
                                <span className='truncate'>
                                    {item.destination}
                                </span>
                            </div>
                        </div>
                        <Pill
                            text={STATUS_LABEL[item.status]}
                            variant={STATUS_VARIANT[item.status]}
                            className='shrink-0 border-0'
                        />
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default TransferSummary

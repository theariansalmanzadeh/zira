'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    COUNT2_DISCREPANCY_REPORT_COLUMNS,
    COUNT2_DISCREPANCY_REPORT_DUMMY,
    COUNT2_DISCREPANCY_REPORT_GRID_CLASS,
    type Count2DiscrepancyReportItem,
} from '../constants'

type Count2DiscrepancyReportProps = {
    items?: Count2DiscrepancyReportItem[]
    statusText?: string
    className?: string
}

const formatDiscrepancy = (value: number) => {
    const formatted = formatFaNumber(Math.abs(value))
    if (value > 0) return `+${formatted}`
    if (value < 0) return `-${formatted}`
    return formatted
}

const Count2DiscrepancyReport = ({
    items = COUNT2_DISCREPANCY_REPORT_DUMMY,
    statusText = 'در انتظار ثبت مغایرت نهایی',
    className,
}: Count2DiscrepancyReportProps) => {
    const discrepancyCount = items.filter(
        (item) => item.discrepancy2 !== 0
    ).length

    return (
        <div
            className={cn(
                'flex flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4',
                className
            )}
            dir='rtl'
        >
            <div className='flex flex-row flex-wrap items-center justify-between gap-3'>
                <div className='flex min-w-0 flex-row flex-wrap items-center gap-3'>
                    <h3 className='text-title-md font-semibold text-on-surface'>
                        گزارش مغایرت شمارش ۲
                    </h3>
                    <Pill
                        text={statusText}
                        variant='info'
                        className='border-0'
                    />
                </div>
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    <Button type='button' variant='outline' size='sm'>
                        <Icon
                            label='export300Linear'
                            className='size-5! text-on-surface-variant'
                        />
                        <span className='text-label-sm'>خروجی اکسل</span>
                    </Button>
                    <Button type='button' variant='outline' size='sm'>
                        <Icon
                            label='print400Linear'
                            className='size-5! text-on-surface-variant'
                        />
                        <span className='text-label-sm'>چاپ گزارش</span>
                    </Button>
                </div>
            </div>

            <div className='overflow-x-auto rounded-card-md border border-outline-variant'>
                <div className='min-w-[720px]'>
                    <div
                        className={cn(
                            COUNT2_DISCREPANCY_REPORT_GRID_CLASS,
                            'bg-surface-container-high px-4 py-3 text-label-lg font-normal text-outline'
                        )}
                    >
                        {COUNT2_DISCREPANCY_REPORT_COLUMNS.map((column) => (
                            <div key={column.id}>{column.label}</div>
                        ))}
                    </div>

                    <div className='flex flex-col'>
                        {items.map((row) => (
                            <div
                                key={row.id}
                                className={cn(
                                    COUNT2_DISCREPANCY_REPORT_GRID_CLASS,
                                    'border-t border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-label-lg text-on-surface'
                                )}
                            >
                                <div>{formatFaNumber(row.row)}</div>
                                <div>{row.productName}</div>
                                <div>{row.unit}</div>
                                <div>{formatFaNumber(row.stock)}</div>
                                <div>{formatFaNumber(row.count1)}</div>
                                <div>{formatFaNumber(row.count2)}</div>
                                <div>
                                    <Pill
                                        text={formatDiscrepancy(
                                            row.discrepancy2
                                        )}
                                        variant={
                                            row.discrepancy2 === 0
                                                ? 'tonal'
                                                : row.discrepancy2 > 0
                                                  ? 'success'
                                                  : 'error'
                                        }
                                        className='border-0'
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <p className='text-label-md text-outline'>
                {formatFaNumber(discrepancyCount)} قلم دارای مغایرت در شمارش ۲ —
                گزارش قابل خروجی اکسل و چاپ است.
            </p>
        </div>
    )
}

export default Count2DiscrepancyReport

'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import SectionTitle from '@/src/shared/components/ui/SectionTitle'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { formatFaDate, formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    CAMPAIGN_SUMMARY_DUMMY,
    type CampaignSummaryRow,
} from './campaignReportData'

type CampaignSummaryTableProps = {
    items?: CampaignSummaryRow[]
    className?: string
}

const TABLE_HEADERS = [
    'کمپین',
    'ماهیت',
    'بازه اجرا',
    'سفارش',
    'فروش',
    'نرخ تبدیل',
] as const

const formatPeriod = (startAt: string | null, endAt: string | null) => {
    if (!startAt || !endAt) return 'دائمی'
    return `${formatFaDate(startAt)} - ${formatFaDate(endAt)}`
}

const CampaignSummaryTable = ({
    items = CAMPAIGN_SUMMARY_DUMMY,
    className,
}: CampaignSummaryTableProps) => {
    return (
        <div
            className={cn(
                'rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5',
                className
            )}
            dir='rtl'
        >
            <div className='mb-4 flex flex-row items-center justify-between gap-3'>
                <SectionTitle className='mb-0'>خلاصه همه کمپین‌ها</SectionTitle>
                <Button type='button' variant='outline' className='gap-1.5'>
                    <Icon label='export300Linear' className='size-5!' />
                    خروجی اکسل
                </Button>
            </div>

            <div className='overflow-hidden rounded-card-md bg-surface-container-high p-2'>
                <Table>
                    <TableHeader className='rounded-xl'>
                        <TableRow className='[&>*]:text-label-sm [&>*]:font-normal [&>*]:text-outline'>
                            {TABLE_HEADERS.map((header) => (
                                <TableHead
                                    key={header}
                                    className='bg-transparent! whitespace-nowrap'
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableEmptyState
                                colSpan={TABLE_HEADERS.length}
                                title='کمپینی یافت نشد.'
                            />
                        ) : null}
                        {items.map((item) => (
                            <>
                                <TableRow
                                    key={item.id}
                                    className='[&>*]:text-label-lg [&>*]:text-on-surface-variant'
                                >
                                    <TableCell>
                                        <span className='font-semibold text-on-surface'>
                                            {item.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.nature}</TableCell>
                                    <TableCell>
                                        <span className='text-outline'>
                                            {formatPeriod(item.startAt, item.endAt)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {formatFaNumber(item.orders)}
                                    </TableCell>
                                    <TableCell>
                                        {formatPrice(item.sales)}
                                    </TableCell>
                                    <TableCell>
                                        {formatFaNumber(item.conversionRate, {
                                            maximumFractionDigits: 1,
                                        })}
                                        ٪
                                    </TableCell>
                                </TableRow>
                                <div className='h-[2px]' />
                            </>
                        ))}

                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CampaignSummaryTable

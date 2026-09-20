'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { cn } from '@shared/libs/utils'
import {
    DISCREPANCY_FILTER_TOGGLE,
    DISCREPANCY_GRID_CLASS,
    DISCREPANCY_TABLE_COLOUMN,
    DISCREPANCY_TABLE_COLUMNS,
    DISCREPANCY_TABLE_DUMMY,
    type DiscrepancyFilter,
    type DiscrepancyTableItem,
} from '../constants'
import CountingSummary from './CountingSummary'

type SummaryProps = {
    onBack: () => void
    onContinue: () => void
    items?: DiscrepancyTableItem[]
}

const formatDiscrepancy = (value: number) => {
    const formatted = formatFaNumber(Math.abs(value))
    if (value > 0) return `+${formatted}`
    if (value < 0) return `-${formatted}`
    return formatted
}

const Summary = ({
    onBack,
    onContinue,
    items = DISCREPANCY_TABLE_DUMMY,
}: SummaryProps) => {
    const searchParams = useSearchParams()
    const filter = (searchParams.get('cat') ?? 'all') as DiscrepancyFilter

    const filteredItems = useMemo(() => {
        if (filter === 'positive') {
            return items.filter((item) => item.discrepancy > 0)
        }
        if (filter === 'negative') {
            return items.filter((item) => item.discrepancy < 0)
        }
        return items
    }, [filter, items])

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <CountingSummary />

            <TableListLayout
                TableColoumn={DISCREPANCY_TABLE_COLOUMN}
                value='all'
                toggleButtonValue={[...DISCREPANCY_FILTER_TOGGLE]}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
                hasSearch={false}
            >
                <div
                    className='overflow-hidden rounded-card-lg bg-surface-container-high/50'
                    dir='rtl'
                >
                    <div
                        className={cn(
                            DISCREPANCY_GRID_CLASS,
                            'bg-surface-container-high px-4 py-3 text-label-lg font-normal text-outline'
                        )}
                    >
                        {DISCREPANCY_TABLE_COLUMNS.map((column) => (
                            <div key={column.id}>{column.label}</div>
                        ))}
                    </div>

                    <div className='flex flex-col'>
                        {filteredItems.map((row) => (
                            <div
                                key={row.id}
                                className={cn(
                                    DISCREPANCY_GRID_CLASS,
                                    'border-t border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-label-lg text-on-surface'
                                )}
                            >
                                <div>{formatFaNumber(row.row)}</div>
                                <div>{row.productName}</div>
                                <div>{row.unit}</div>
                                <div>{formatFaNumber(row.stock)}</div>
                                <div>{formatFaNumber(row.count1)}</div>
                                <div>
                                    <Pill
                                        text={formatDiscrepancy(
                                            row.discrepancy
                                        )}
                                        variant={
                                            row.discrepancy >= 0
                                                ? 'success'
                                                : 'error'
                                        }
                                        className='border-0'
                                    />
                                </div>
                                <div>{row.warehouse}</div>
                                <div dir='ltr' className='text-right'>
                                    {row.address}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </TableListLayout>

            <div className='flex flex-row flex-wrap items-center justify-end gap-3 pt-2'>
                <Button type='button' variant='outline' onClick={onBack}>
                    <span className='text-label-sm'>بازگشت</span>
                </Button>
                <Button type='button' variant='primary' onClick={onContinue}>
                    <span className='text-label-sm text-on-primary'>ادامه</span>
                    <Icon
                        label='chevronLeft400Linear'
                        className='size-4! text-on-primary'
                    />
                </Button>
            </div>
        </div>
    )
}

export default Summary

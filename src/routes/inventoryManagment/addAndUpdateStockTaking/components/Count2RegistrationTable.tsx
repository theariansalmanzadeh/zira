'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { cn } from '@shared/libs/utils'
import {
    COUNT2_FILTER_TOGGLE,
    COUNT2_GRID_CLASS,
    COUNT2_TABLE_COLOUMN,
    COUNT2_TABLE_COLUMNS,
    COUNT2_TABLE_DUMMY,
    type Count2Filter,
    type Count2TableItem,
} from '../constants'

type Count2RegistrationTableProps = {
    onBack: () => void
    onContinue: () => void
}

const formatDiscrepancy = (value: number) => {
    const formatted = formatFaNumber(Math.abs(value))
    if (value > 0) return `+${formatted}`
    if (value < 0) return `-${formatted}`
    return formatted
}

const Count2RegistrationTable = ({
    onBack,
    onContinue,
}: Count2RegistrationTableProps) => {
    const searchParams = useSearchParams()
    const [rows, setRows] = useState<Count2TableItem[]>(COUNT2_TABLE_DUMMY)
    const rawFilter = searchParams.get('cat')
    const filter: Count2Filter =
        rawFilter === 'discrepancies' ? 'discrepancies' : 'all'

    const filteredRows = useMemo(() => {
        if (filter === 'discrepancies') {
            return rows.filter((row) => row.discrepancy !== 0)
        }
        return rows
    }, [filter, rows])

    const handleCount2Change = (id: string, value: string) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, count2: value } : row
            )
        )
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <TableListLayout
                TableColoumn={COUNT2_TABLE_COLOUMN}
                value='all'
                toggleButtonValue={[...COUNT2_FILTER_TOGGLE]}
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
                            COUNT2_GRID_CLASS,
                            'bg-surface-container-high px-4 py-3 text-label-lg font-normal text-outline'
                        )}
                    >
                        {COUNT2_TABLE_COLUMNS.map((column) => (
                            <div key={column.id}>{column.label}</div>
                        ))}
                    </div>

                    <div className='flex flex-col'>
                        {filteredRows.map((row) => (
                            <div
                                key={row.id}
                                className={cn(
                                    COUNT2_GRID_CLASS,
                                    'border-t border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-label-lg text-on-surface'
                                )}
                            >
                                <div>{formatFaNumber(row.row)}</div>
                                <div>{row.productName}</div>
                                <div dir='ltr' className='text-right'>
                                    {row.productCode}
                                </div>
                                <div>{row.unit}</div>
                                <div>{row.warehouse}</div>
                                <div dir='ltr' className='text-right'>
                                    {row.address}
                                </div>
                                <div>{formatFaNumber(row.systemStock)}</div>
                                <div>{formatFaNumber(row.count1)}</div>
                                <div>
                                    <Pill
                                        text={formatDiscrepancy(
                                            row.discrepancy
                                        )}
                                        variant={
                                            row.discrepancy === 0
                                                ? 'tonal'
                                                : row.discrepancy > 0
                                                  ? 'success'
                                                  : 'error'
                                        }
                                        className='border-0'
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={row.count2}
                                        onChange={(value) =>
                                            handleCount2Change(row.id, value)
                                        }
                                        wrapperClassName='border border-outline-variant bg-surface-container-lowest'
                                    />
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

export default Count2RegistrationTable

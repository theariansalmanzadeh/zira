'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import { useTableActionsStore } from '@/src/shared/store/table-actions-store'
import { cn } from '@shared/libs/utils'
import {
    COUNT_ENTRY_TOGGLE,
    COUNT_GRID_CLASS,
    COUNT_TABLE_COLOUMN,
    COUNT_TABLE_COLUMNS,
    COUNT_TABLE_DUMMY,
    type CountTableItem,
} from '../constants'
import ExcelCountUpload from './ExcelCountUpload'

type CountRegistrationTableProps = {
    onBack: () => void
    onContinue: () => void
}

const CountRegistrationTable = ({
    onBack,
    onContinue,
}: CountRegistrationTableProps) => {
    const searchParams = useSearchParams()
    const search = useTableActionsStore((state) => state.search)
    const [rows, setRows] = useState<CountTableItem[]>(COUNT_TABLE_DUMMY)
    const entryMode = searchParams.get('cat') ?? 'manual'
    const query = search.trim().toLowerCase()
    const filteredRows = query
        ? rows.filter(
              (row) =>
                  row.productName.toLowerCase().includes(query) ||
                  row.productCode.toLowerCase().includes(query)
          )
        : rows

    const handleCountedChange = (id: string, value: string) => {
        setRows((prev) =>
            prev.map((row) =>
                row.id === id ? { ...row, counted: value } : row
            )
        )
    }

    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <TableListLayout
                TableColoumn={COUNT_TABLE_COLOUMN}
                value='manual'
                toggleButtonValue={[...COUNT_ENTRY_TOGGLE]}
                hasFilter={false}
                hasSort={false}
                hasTableSettings={false}
                hasExpand={false}
                defaultSearchOpen
                searchPlaceholder='جستجو با کد یا نام محصول...'
            >
                {entryMode === 'excel' ? (
                    <ExcelCountUpload />
                ) : (
                    <div
                        className='overflow-hidden rounded-card-lg bg-surface-container-high/50'
                        dir='rtl'
                    >
                        <div
                            className={cn(
                                COUNT_GRID_CLASS,
                                'bg-surface-container-high px-4 py-3 text-label-lg font-normal text-outline'
                            )}
                        >
                            {COUNT_TABLE_COLUMNS.map((column) => (
                                <div key={column.id}>{column.label}</div>
                            ))}
                        </div>

                        <div className='flex flex-col'>
                            {filteredRows.map((row) => (
                                <div
                                    key={row.id}
                                    className={cn(
                                        COUNT_GRID_CLASS,
                                        'border-t border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-label-lg text-on-surface'
                                    )}
                                >
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
                                    <div>
                                        <Input
                                            value={row.counted}
                                            onChange={(value) =>
                                                handleCountedChange(
                                                    row.id,
                                                    value
                                                )
                                            }
                                            wrapperClassName='border border-outline-variant bg-surface-container-lowest'
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
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

export default CountRegistrationTable

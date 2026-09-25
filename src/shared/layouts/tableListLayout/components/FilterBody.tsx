'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { useTable } from '@/src/shared/context/TableProvider'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import { cn } from '@shared/libs/utils'
import { GripVertical } from 'lucide-react'

const COLUMNS_QUERY_KEY = 'cols'

type FilterBodyProps = {
    onBack?: () => void
    onApply?: (columns: TableFilterItem[]) => void
    onReset?: () => void
}

const FilterBody = ({ onBack, onApply, onReset }: FilterBodyProps) => {
    const { TableColoumn, setTableColoumn } = useTable()
    const { setSearchParams } = useSearchParam()
    const searchParams = useSearchParams()

    const initialColumns = useMemo(() => {
        const colsParam = searchParams.get(COLUMNS_QUERY_KEY)
        if (!colsParam) return TableColoumn

        const visibleIds = new Set(
            colsParam
                .split(',')
                .map((id) => id.trim())
                .filter(Boolean)
        )

        return TableColoumn.map((column) => ({
            ...column,
            isChecked: visibleIds.has(column.id),
        }))
    }, [TableColoumn, searchParams])

    const [columns, setColumns] = useState<TableFilterItem[]>(initialColumns)

    const toggleColumn = (id: string) => {
        setColumns((prev) =>
            prev.map((column) =>
                column.id === id
                    ? { ...column, isChecked: !column.isChecked }
                    : column
            )
        )
    }

    const handleApply = () => {
        setTableColoumn(columns)
        const visibleIds = columns
            .filter((column) => column.isChecked)
            .map((column) => column.id)
            .join(',')

        setSearchParams({
            [COLUMNS_QUERY_KEY]: visibleIds || null,
        })
        onApply?.(columns)
    }

    const handleReset = () => {
        const resetColumns = TableColoumn.map((column) => ({
            ...column,
            isChecked: true,
        }))
        setColumns(resetColumns)
        setTableColoumn(resetColumns)
        setSearchParams({ [COLUMNS_QUERY_KEY]: null })
        onReset?.()
    }

    return (
        <div className='flex w-full flex-col gap-4 p-3' dir='rtl'>
            <h3 className='text-right text-title-md font-medium text-on-surface'>
                نمایش
            </h3>

            <div className='flex flex-col gap-2 rounded-container-lg bg-surface-container-high p-3'>
                {columns.map((column) => (
                    <div
                        key={column.id}
                        className={cn(
                            'flex flex-row items-center gap-3 px-3 py-2.5',
                            column.isChecked &&
                                'rounded-container-md bg-surface-container-lowest'
                        )}
                    >
                        <button
                            type='button'
                            className='shrink-0 cursor-grab touch-none text-outline-variant'
                            aria-label='جابجایی'
                        >
                            <GripVertical className='size-5' />
                        </button>
                        <Checkbox
                            id={column.id}
                            checked={column.isChecked}
                            onCheckedChange={() => toggleColumn(column.id)}
                            variant='primary'
                            className='size-5 rounded-md'
                        />
                        <label
                            htmlFor={column.id}
                            className='flex-1 cursor-pointer select-none text-label-md text-on-surface'
                        >
                            {column.header_label}
                        </label>
                    </div>
                ))}
            </div>

            <div className='flex flex-row items-center justify-between gap-3'>
                <Button
                    type='button'
                    variant='ghost'
                    className='px-0 text-on-surface-variant hover:bg-transparent'
                    onClick={onBack}
                >
                    بازگشت
                </Button>
                <div className='flex flex-row items-center gap-2'>
                    <Button
                        type='button'
                        variant='outline'
                        className='rounded-2xl px-6'
                        onClick={handleReset}
                    >
                        بازنشانی
                    </Button>
                    <Button
                        type='button'
                        variant='primary'
                        className='rounded-2xl px-6'
                        onClick={handleApply}
                    >
                        اعمال فیلتر
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FilterBody

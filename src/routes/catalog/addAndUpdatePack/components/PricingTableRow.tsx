'use client'

import type { ReactNode } from 'react'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Input } from '@/src/shared/components/ui/Input'
import { useTable } from '@/src/shared/context/TableProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { usePricingGridStyle, type PricingItem } from './pricingTableShared'

type PricingTableRowProps = {
    item: PricingItem
    checked: boolean
    showAmount?: boolean
    amount?: string
    onAmountChange?: (value: string) => void
    onCheckedChange: (checked: boolean) => void
}

const PricingTableRow = ({
    item,
    checked,
    showAmount = false,
    amount = '',
    onAmountChange,
    onCheckedChange,
}: PricingTableRowProps) => {
    const { visibleTableColoumn } = useTable()
    const gridStyle = usePricingGridStyle(showAmount)

    const cells: Record<string, ReactNode> = {
        code: (
            <label className='flex items-center gap-2'>
                <Checkbox
                    variant='default-outline'
                    checked={checked}
                    onCheckedChange={(next) => onCheckedChange(next === true)}
                />
                <span>{item.code}</span>
            </label>
        ),
        name: <span className='truncate'>{item.name}</span>,
        category: (
            <span className='truncate'>{item.categoryName || '—'}</span>
        ),
        brand: <span className='truncate'>{item.brandName || '—'}</span>,
        material: (
            <span className='truncate'>{item.materialName || '—'}</span>
        ),
        model: (
            <span className='truncate'>{item.modelLineName || '—'}</span>
        ),
        items: formatFaNumber(item.itemCount),
    }

    return (
        <div
            className='grid items-center rounded-card-md bg-surface-container-lowest px-2 py-3 text-label-lg font-normal text-on-surface-variant'
            style={gridStyle}
        >
            {visibleTableColoumn.map((column) => (
                <div key={column.id} className='min-w-0 px-2'>
                    {cells[column.id]}
                </div>
            ))}
            {showAmount && (
                <div className='min-w-0 px-2'>
                    {checked && (
                        <Input
                            value={amount}
                            onChange={(value) => onAmountChange?.(value)}
                            placeholder='تعداد'
                            type='number'
                            wrapperClassName='py-2'
                        />
                    )}
                </div>
            )}
        </div>
    )
}

export default PricingTableRow

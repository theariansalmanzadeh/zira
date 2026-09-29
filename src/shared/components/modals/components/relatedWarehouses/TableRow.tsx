'use client'

import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    RELATED_WAREHOUSE_GRID_CLASS,
    type RelatedWarehouseItem,
} from './constants'

type TableRowProps = {
    data: RelatedWarehouseItem
    onNavigate?: () => void
}

const TableRow = ({ data, onNavigate }: TableRowProps) => {
    return (
        <div
            className={cn(
                RELATED_WAREHOUSE_GRID_CLASS,
                'border-b border-outline-variant bg-surface-container-lowest px-3 py-3 text-label-lg text-on-surface-variant last:border-b-0'
            )}
        >
            <div className='flex min-w-0 flex-row items-center gap-3'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-card-sm bg-info text-label-md font-semibold text-on-info'>
                    {data.name.trim().charAt(0)}
                </span>
                <div className='flex min-w-0 flex-col gap-0.5'>
                    <span className='truncate font-medium text-on-surface'>
                        {data.name}
                    </span>
                    <span
                        dir='ltr'
                        className='text-right text-label-md text-outline'
                    >
                        {data.code}
                    </span>
                </div>
            </div>
            <div>{data.type}</div>
            <div>
                {formatFaNumber(data.area)} م
                <sup>۲</sup>
            </div>
            <div className='font-semibold text-error'>
                {formatFaNumber(data.fillPercent)}٪
            </div>
            <div>{data.manager}</div>
            <div dir='ltr' className='text-right'>
                {formatFaNumber(data.phone, { useGrouping: false })}
            </div>
            <div>{formatFaNumber(data.itemCount)}</div>
            <div>
                {formatFaNumber(data.stock)}{' '}
                <span className='text-outline'>عدد</span>
            </div>
            <Link
                href={`/admin/inventory-managment/details/${data.id}`}
                onClick={onNavigate}
                className='flex size-8 items-center justify-center rounded-full hover:bg-surface-container-high'
                aria-label='جزئیات انبار'
            >
                <Icon
                    label='chevronLeft400Linear'
                    className='size-5! text-on-surface-variant'
                />
            </Link>
        </div>
    )
}

export default TableRow

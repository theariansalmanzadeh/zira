'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    RELATED_WAREHOUSE_GRID_CLASS,
    type RelatedWarehouseItem,
} from './constants'

type TableRowProps = {
    data: RelatedWarehouseItem
    branchId?: string
    onNavigate?: () => void
}

const TableRow = ({ data, branchId, onNavigate }: TableRowProps) => {
    const { push } = useRouter()

    return (
        <div
            className={cn(
                RELATED_WAREHOUSE_GRID_CLASS,
                'border-b border-outline-variant bg-surface-container-lowest px-3 py-3 text-label-lg text-on-surface-variant last:border-b-0'
            )}
        >
            <div className='flex min-w-0 flex-row items-center gap-3'>
                <span className='flex size-8 shrink-0 items-center justify-center rounded-card-sm bg-info text-label-md font-semibold text-on-info'>
                    {data?.name?.trim()?.charAt(0)}
                </span>
                <div className='flex min-w-0 flex-col gap-0.5'>
                    <span className='truncate font-medium text-on-surface'>
                        {data?.name}
                    </span>
                    <span
                        dir='ltr'
                        className='text-right text-label-md text-outline'
                    >
                        {data?.code}
                    </span>
                </div>
            </div>
            <div>{data?.type}</div>
            <div>
                {formatFaNumber(data?.area ?? 0)} م
                <sup>۲</sup>
            </div>
            <div className='font-semibold text-error'>
                {formatFaNumber(data?.fillPercent ?? 0)}٪
            </div>
            <div>{data?.manager}</div>
            <div dir='ltr' className='text-right'>
                {formatFaNumber(data?.phone ?? '', { useGrouping: false })}
            </div>
            <div>{formatFaNumber(data?.itemCount ?? 0)}</div>
            <div>
                {formatFaNumber(data?.stock ?? 0)}{' '}
                <span className='text-outline'>عدد</span>
            </div>
            <div className='flex items-center justify-end gap-1'>
                {branchId && (
                    <IconButton
                        icon='editSquare400Linear'
                        variant='ghost'
                        className='size-8!'
                        iconClassName='size-5! text-outline'
                        aria-label='ویرایش انبار'
                        onClick={() => {
                            push(
                                `/admin/branches/details/${branchId}/updateInventory/${data?.id ?? ''}`
                            )
                            onNavigate?.()
                        }}
                    />
                )}
                <Link
                    href={`/admin/inventory-managment/details/${data?.id ?? ''}`}
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
        </div>
    )
}

export default TableRow

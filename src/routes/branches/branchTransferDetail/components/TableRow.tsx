'use client'

import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    AVATAR_TONE_CLASS,
    TABLE_GRID_CLASS,
    type TransferDetailProduct,
} from '../constants'

type TableRowProps = {
    data: TransferDetailProduct
}

const TableRow = ({ data }: TableRowProps) => {
    return (
        <div
            className={cn(
                TABLE_GRID_CLASS,
                'border-t border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-label-lg text-on-surface'
            )}
            dir='rtl'
        >
            <div dir='ltr' className='text-right'>
                {data.productCode}
            </div>
            <div className='flex flex-row items-center gap-2'>
                <span
                    className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-card-sm text-label-md font-medium',
                        AVATAR_TONE_CLASS[data.avatarTone]
                    )}
                >
                    {data.productName.charAt(0)}
                </span>
                <span>{data.productName}</span>
            </div>
            <div>
                <span className='font-medium'>
                    {formatFaNumber(data.quantity)}
                </span>{' '}
                <span className='text-outline'>{data.unit}</span>
            </div>
            <div>
                <span
                    className='inline-block size-3 rounded-full border-2 border-warning'
                    aria-label='وضعیت دریافت'
                />
            </div>
        </div>
    )
}

export default TableRow

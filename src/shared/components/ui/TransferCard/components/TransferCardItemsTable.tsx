import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    TRANSFER_CARD_ITEMS_COLUMNS,
    TRANSFER_CARD_ITEMS_GRID_CLASS,
    TRANSFER_CARD_LINE_ITEM_TONE_CLASS,
    type TransferCardLineItem,
} from '../types'

type TransferCardItemsTableProps = {
    items: TransferCardLineItem[]
}

const TransferCardItemsTable = ({ items }: TransferCardItemsTableProps) => {
    return (
        <div
            className='mx-4 overflow-hidden rounded-card-lg border border-outline-variant'
            dir='rtl'
        >
            <div
                className={cn(
                    TRANSFER_CARD_ITEMS_GRID_CLASS,
                    'bg-surface-container-high px-4 py-3'
                )}
            >
                {TRANSFER_CARD_ITEMS_COLUMNS.map((column) => (
                    <span
                        key={column.id}
                        className='text-label-md text-outline'
                    >
                        {column.label}
                    </span>
                ))}
            </div>

            <div className='flex flex-col divide-y divide-outline-variant bg-surface-container-lowest'>
                {items.map((item) => {
                    const tone = item.tone ?? 'primary'

                    return (
                        <div
                            key={item.id}
                            className={cn(
                                TRANSFER_CARD_ITEMS_GRID_CLASS,
                                'px-4 py-3'
                            )}
                        >
                            <span
                                dir='ltr'
                                className='text-right text-label-lg text-on-surface'
                            >
                                {item.productCode}
                            </span>

                            <div className='flex min-w-0 flex-row items-center gap-2'>
                                <span
                                    className={cn(
                                        'size-2.5 shrink-0 rounded-full',
                                        TRANSFER_CARD_LINE_ITEM_TONE_CLASS[tone]
                                    )}
                                />
                                <span className='truncate text-label-lg text-on-surface'>
                                    {item.productName}
                                </span>
                            </div>

                            <div>
                                <span className='inline-flex rounded-md bg-surface-container-high px-3 py-1 text-label-md text-on-surface-variant'>
                                    {item.unit}
                                </span>
                            </div>

                            <span className='text-label-lg font-semibold text-on-surface'>
                                {formatFaNumber(item.quantity)}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default TransferCardItemsTable

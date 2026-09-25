'use client'

import { useState } from 'react'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Avatar, AvatarFallback } from '@/src/shared/components/ui/Avatar'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import {
    EXPANDED_FIELDS,
    STATUS_CONFIG,
    TABLE_GRID_CLASS,
} from '../constants'
import type { ShipmentStatusRowData } from '../types'

type TableRowProps = {
    data: ShipmentStatusRowData
}

const TableRow = ({ data }: TableRowProps) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const statusConfig = STATUS_CONFIG[data.status]

    return (
        <div className='flex flex-col gap-1' dir='rtl'>
            <div
                className={cn(
                    TABLE_GRID_CLASS,
                    'rounded-card-md bg-surface-container-lowest px-4 py-3 text-label-lg font-normal text-on-surface-variant'
                )}
            >
                <div>{formatFaNumber(data.row)}</div>
                <div>{data.invoiceDate}</div>
                <div dir='ltr' className='text-right'>
                    {data.invoiceNumber}
                </div>
                <div dir='ltr' className='text-right'>
                    {data.customerCode}
                </div>
                <div className='flex flex-row items-center gap-2'>
                    <Avatar size='sm'>
                        <AvatarFallback className='bg-info-container text-label-sm text-on-info-container'>
                            {data.customerName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <span>{data.customerName}</span>
                </div>
                <div dir='ltr' className='text-right'>
                    {data.customerPhone}
                </div>
                <div>{formatFaNumber(data.itemCount)} قلم</div>
                <div>{formatFaNumber(data.totalQuantity)}</div>
                <div className='flex justify-end'>
                    <IconButton
                        icon='chevronLeft300Linear'
                        iconClassName={cn(
                            'size-6! transition-transform',
                            isExpanded && '-rotate-90'
                        )}
                        onClick={() => setIsExpanded((prev) => !prev)}
                    />
                </div>
            </div>

            {isExpanded && (
                <div className='rounded-card-md bg-surface-container-lowest p-4'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                        {EXPANDED_FIELDS.map((field) => (
                            <div
                                key={field.id}
                                className='flex flex-col gap-1.5'
                            >
                                <span className='text-label-md text-outline'>
                                    {field.label}
                                </span>
                                {field.id === 'status' ? (
                                    <Pill
                                        text={statusConfig.text}
                                        variant={statusConfig.variant}
                                        hasDot
                                        className='w-fit border-0'
                                    />
                                ) : (
                                    <span className='text-label-lg text-on-surface'>
                                        {
                                            data[
                                                field.id as Exclude<
                                                    (typeof EXPANDED_FIELDS)[number]['id'],
                                                    'status'
                                                >
                                            ]
                                        }
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default TableRow

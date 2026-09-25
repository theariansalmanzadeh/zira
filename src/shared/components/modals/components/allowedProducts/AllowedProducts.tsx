'use client'

import { useState } from 'react'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import type { BaseModalProps } from '../../types'
import {
    ALLOWED_PRODUCT_BADGE_CLASS,
    ALLOWED_PRODUCT_COLUMNS,
    ALLOWED_PRODUCT_GRID_CLASS,
    ALLOWED_PRODUCTS_DUMMY,
    type AllowedProductItem,
} from './constants'

const AllowedProducts = ({ closeModal: _closeModal }: BaseModalProps) => {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const toggleExpand = (id: string) => {
        setExpandedId((current) => (current === id ? null : id))
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='overflow-x-auto rounded-card-lg bg-surface-container-high p-2'>
                <div
                    className={cn(
                        ALLOWED_PRODUCT_GRID_CLASS,
                        'min-w-[980px] px-3 py-3 text-label-lg font-normal text-outline'
                    )}
                >
                    {ALLOWED_PRODUCT_COLUMNS.map((column) => (
                        <div key={column.id}>{column.label}</div>
                    ))}
                </div>

                <div className='flex min-w-[980px] flex-col gap-1'>
                    {ALLOWED_PRODUCTS_DUMMY.map((item) => {
                        const isExpanded = expandedId === item.id

                        return (
                            <div
                                key={item.id}
                                className='overflow-hidden rounded-card-md bg-surface-container-lowest'
                            >
                                <div
                                    className={cn(
                                        ALLOWED_PRODUCT_GRID_CLASS,
                                        'px-3 py-3 text-label-lg text-on-surface-variant'
                                    )}
                                >
                                    <div>{formatFaNumber(item.index)}</div>
                                    <div>{item.mainCategory}</div>
                                    <div>{item.midCategory}</div>
                                    <div>{item.subCategory}</div>
                                    <div dir='ltr' className='text-right'>
                                        {item.productCode}
                                    </div>
                                    <div className='flex min-w-0 flex-row items-center gap-3'>
                                        <span
                                            className={cn(
                                                'flex size-8 shrink-0 items-center justify-center rounded-card-sm text-label-md font-semibold',
                                                ALLOWED_PRODUCT_BADGE_CLASS[
                                                    item.badgeTone
                                                ]
                                            )}
                                        >
                                            {item.badgeLetter}
                                        </span>
                                        <span className='truncate font-medium text-on-surface'>
                                            {item.productName}
                                        </span>
                                    </div>
                                    <div className='flex justify-end'>
                                        <IconButton
                                            icon='chevronDown300Linear'
                                            onClick={() =>
                                                toggleExpand(item.id)
                                            }
                                            className='size-9!'
                                            iconClassName={cn(
                                                'size-5! transition-transform duration-200',
                                                isExpanded && 'rotate-180'
                                            )}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={cn(
                                        'grid transition-[grid-template-rows] duration-200 ease-out',
                                        isExpanded
                                            ? 'grid-rows-[1fr]'
                                            : 'grid-rows-[0fr]'
                                    )}
                                >
                                    <div className='overflow-hidden'>
                                        <ProductDetailsPanel item={item} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const ProductDetailsPanel = ({ item }: { item: AllowedProductItem }) => {
    const fields = [
        { label: 'برند', value: item.brand },
        { label: 'واحد', value: item.unit },
        {
            label: 'حداقل موجودی',
            value: formatFaNumber(item.minStock),
        },
        {
            label: 'حداقل قیمت فروش',
            value: `${formatPrice(item.minSellPrice)} ت`,
        },
        {
            label: 'وضعیت',
            value: (
                <Pill
                    text={item.status}
                    variant={item.status === 'فعال' ? 'success' : 'tonal'}
                    size='sm'
                    className='border-0'
                />
            ),
        },
    ]

    return (
        <div className='border-t border-outline-variant px-3 py-4'>
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
                {fields.map((field) => (
                    <div
                        key={field.label}
                        className='flex flex-col gap-1 text-right'
                    >
                        <span className='text-label-md text-outline'>
                            {field.label}
                        </span>
                        <div className='text-label-lg text-on-surface'>
                            {field.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllowedProducts

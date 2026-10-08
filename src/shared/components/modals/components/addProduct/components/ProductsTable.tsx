'use client'

import Image from 'next/image'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import { Input } from '@/src/shared/components/ui/Input'
import ColorPill from '@/src/shared/components/ui/ColorPill'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import {
    STATUS_META,
    TABLE_HEADERS,
    type AddProductItem,
} from '../constants'

type ProductsTableProps = {
    products: AddProductItem[]
    selectedIds: Set<string>
    onToggle: (id: string) => void
    onToggleAll: (checked: boolean) => void
    hasQuantity?: boolean
    quantities?: Record<string, number>
    onQuantityChange?: (id: string, quantity: number) => void
}

const ProductsTable = ({
    products,
    selectedIds,
    onToggle,
    onToggleAll,
    hasQuantity = false,
    quantities,
    onQuantityChange,
}: ProductsTableProps) => {
    const allSelected =
        products.length > 0 &&
        products.every((product) => selectedIds.has(product.id))
    const someSelected = products.some((product) => selectedIds.has(product.id))

    return (
        <div className='overflow-hidden rounded-card-lg bg-surface-container-high p-2'>
            <Table className='min-w-[720px] border-collapse border-spacing-y-4'>
                <TableHeader className='rounded-xl'>
                    <TableRow className='hover:bg-transparent [&>*]:text-label-lg [&>*]:font-normal [&>*]:text-outline'>
                        <TableHead className='w-[48px]'>
                            <Checkbox
                                className='size-6! overflow-hidden'
                                checked={
                                    allSelected
                                        ? true
                                        : someSelected
                                          ? 'indeterminate'
                                          : false
                                }
                                onCheckedChange={(checked) =>
                                    onToggleAll(checked === true)
                                }
                            />
                        </TableHead>
                        {TABLE_HEADERS.slice(1).map((label) => {
                            if (label === 'موجودی') {
                                if (!hasQuantity) {
                                    return (
                                        <TableHead key={label}>{label}</TableHead>
                                    )
                                }
                                return (
                                    <TableHead key='quantity'>تعداد</TableHead>
                                )
                            }

                            return <TableHead key={label}>{label}</TableHead>
                        })}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {products.map((product) => {
                        const status = STATUS_META[product.status]
                        const checked = selectedIds.has(product.id)

                        return (
                            <>
                                <TableRow
                                    key={product.id}
                                    className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface-variant'
                                >
                                    <TableCell className='w-[48px]'>
                                        <Checkbox
                                            className='mr-2.5 size-6! overflow-hidden'
                                            checked={checked}
                                            onCheckedChange={() =>
                                                onToggle(product.id)
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <div className='flex flex-row items-center gap-3'>
                                            <div className='h-10 w-10 overflow-hidden rounded-card-md bg-surface-container-highest'>
                                                {product.imgUrl && (
                                                    <Image
                                                        src={product.imgUrl}
                                                        alt={product.productName}
                                                        width={40}
                                                        height={40}
                                                        className='h-full w-full object-cover'
                                                    />
                                                )}
                                            </div>
                                            <span className='flex flex-col items-start gap-1'>
                                                <span className='font-semibold text-on-surface'>
                                                    {product.productName}
                                                </span>
                                                {product.colorHex && product.colorLabel && (
                                                    <ColorPill
                                                        hex={product.colorHex}
                                                        label={product.colorLabel}
                                                    />
                                                )}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{product.sku}</TableCell>
                                    <TableCell>{product.brand}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    {!hasQuantity && (
                                        <TableCell>{product.stock}</TableCell>
                                    )}
                                    {hasQuantity && (
                                        <TableCell>
                                            <Input
                                                type='number'
                                                min={1}
                                                value={String(
                                                    quantities?.[product.id] ??
                                                        1
                                                )}
                                                onChange={(nextValue) => {
                                                    const parsed =
                                                        Number(nextValue)
                                                    if (Number.isNaN(parsed))
                                                        return
                                                    onQuantityChange?.(
                                                        product.id,
                                                        Math.max(1, parsed)
                                                    )
                                                }}
                                                wrapperClassName='w-24'
                                                className='text-center'
                                                disabled={!checked}
                                            />
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Pill
                                            className='border-0'
                                            icon={status.icon}
                                            variant={status.variant}
                                            text={status.text}
                                        />
                                    </TableCell>
                                </TableRow>
                                <div className='h-[2px]' />
                            </>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default ProductsTable

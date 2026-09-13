'use client'

import { Icon } from '@shared/components/Icons/Icon'
import { Button } from '@shared/components/ui/button'
import { Pill } from '@shared/components/ui/Pill'
import { TableCell, TableRow as UiTableRow } from '@shared/components/ui/Table'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import type { SelectProductItem } from '../types'

type TableRowProps = {
    product: SelectProductItem
    isInCart: boolean
    onAdd: (product: SelectProductItem) => void
}

const TableRow = ({ product, isInCart, onAdd }: TableRowProps) => {
    return (
        <>
            <UiTableRow className="[&>*]:px-4 [&>*]:py-3 [&>*]:text-on-surface [&>*]:text-label-lg [&>*]:font-normal">
                <TableCell>
                    <div className="flex flex-row items-center gap-3">
                        <div
                            className="size-10 shrink-0 rounded-card-md"
                            style={{ backgroundColor: product.swatch }}
                        />
                        <div className="flex min-w-0 flex-col gap-0.5 text-right">
                            <span className="text-label-lg font-semibold text-on-surface">
                                {product.name}
                            </span>
                            <span className="text-label-sm text-outline">{product.sku}</span>
                        </div>
                    </div>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                    <Pill className="border-0" variant="tonal" size="sm" text={product.productType} />
                </TableCell>
                <TableCell>{product.unit}</TableCell>
                <TableCell className="text-success">{formatFaNumber(product.stock, { useGrouping: false })}</TableCell>
                <TableCell>{formatPrice(product.unitPrice)}</TableCell>
                <TableCell className="w-[1%] whitespace-nowrap">
                    {isInCart ? (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="pointer-events-none gap-1.5 rounded-full bg-success-container px-3 text-on-success-container hover:bg-success-container"
                        >
                            <Icon
                                label="checkSm400Linear"
                                className="size-4! text-on-success-container"
                            />
                            در سبد
                        </Button>
                    ) : (
                        <Button type="button" variant="primary" size="sm" onClick={() => onAdd(product)}>
                            افزودن
                        </Button>
                    )}
                </TableCell>
            </UiTableRow>
            <tr>
                <td colSpan={8} className="py-1" />
            </tr>
        </>
    )
}

export default TableRow

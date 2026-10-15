'use client'

import { useMemo } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Pill } from '@/src/shared/components/ui/Pill'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type { AddProductItem } from '@/src/shared/components/modals/components/addProduct'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { useModalStore } from '@/src/shared/store/modal-store'
import {
    useBundle,
    type BundleProduct,
    type BundleTurnover,
} from '../provider'

const TURNOVER_META: Record<
    BundleTurnover,
    { label: string; variant: 'success' | 'info' | 'warning' }
> = {
    hot: { label: 'پرفروش', variant: 'success' },
    medium: { label: 'متوسط', variant: 'info' },
    low: { label: 'کم‌گردش', variant: 'warning' },
}

const TABLE_HEADERS = [
    'کد کالا',
    'نام کالا',
    'گردش',
    'تعداد',
    'قیمت پایه',
    'تخفیف',
    'قیمت در باندل',
] as const

const mapAddProductToBundle = (item: AddProductItem): BundleProduct => ({
    id: item.id,
    code: item.sku,
    name: item.productName,
    turnover: 'medium',
    quantity: 1,
    basePrice: 0,
    discountPercent: 0,
})

const QuantityStepper = ({
    value,
    onChange,
}: {
    value: number
    onChange: (next: number) => void
}) => (
    <div className="inline-flex items-center gap-2 rounded-card-md border border-outline-variant px-2 py-1">
        <button
            type="button"
            className="flex size-6 items-center justify-center text-outline"
            onClick={() => onChange(Math.max(1, value - 1))}
        >
            −
        </button>
        <span className="min-w-5 text-center text-label-lg font-bold text-on-surface">
            {formatFaNumber(value)}
        </span>
        <button
            type="button"
            className="flex size-6 items-center justify-center text-outline"
            onClick={() => onChange(value + 1)}
        >
            +
        </button>
    </div>
)

const ProductList = () => {
    const { openModal } = useModalStore()
    const {
        products,
        addProduct,
        removeProduct,
        updateProductQuantity,
        updateProductDiscount,
        pricing,
    } = useBundle()

    const summaryLabel = useMemo(
        () =>
            `${formatFaNumber(pricing.itemsCount)} قلم ${formatFaNumber(pricing.totalUnits)} عدد کالا`,
        [pricing.itemsCount, pricing.totalUnits]
    )

    const handleOpenAddProduct = () => {
        openModal(ModalTypes.ADD_PRODUCT, {
            selectedIds: products.map((product) => product.id),
            addProduct: (item: AddProductItem) => {
                addProduct(mapAddProductToBundle(item))
            },
            removeProduct,
        })
    }

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5"
            dir="rtl"
        >
            <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="h-4 w-1 shrink-0 rounded-full bg-primary" />
                    <h3 className="text-title-md font-bold text-on-surface">
                        اقلام و قیمت‌گذاری باندل
                    </h3>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-label-md text-outline">{summaryLabel}</span>
                    <Button
                        type="button"
                        variant="primary"
                        size="default"
                        className="shrink-0 gap-1.5"
                        onClick={handleOpenAddProduct}
                    >
                        <Icon label="addSm400Broken" className="size-5!" />
                        افزودن محصول
                    </Button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="[&>*]:text-label-sm [&>*]:font-normal [&>*]:text-outline">
                            {TABLE_HEADERS.map((header) => (
                                <TableHead
                                    key={header}
                                    className="whitespace-nowrap text-label-sm font-normal text-outline"
                                >
                                    {header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableEmptyState
                                colSpan={TABLE_HEADERS.length}
                                title='محصولی اضافه نشده است.'
                            />
                        ) : null}
                        {products.map((product) => {
                            const turnover = TURNOVER_META[product.turnover]
                            const bundlePrice = Math.round(
                                product.basePrice *
                                (1 - product.discountPercent / 100)
                            )

                            return (
                                <TableRow
                                    key={product.id}
                                    className="[&>*]:text-label-lg [&>*]:text-on-surface-variant"
                                >
                                    <TableCell>
                                        <span className="text-outline">
                                            {product.code}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-semibold text-on-surface">
                                            {product.name}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Pill
                                            text={turnover.label}
                                            variant={turnover.variant}
                                            className="border-0"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <QuantityStepper
                                            value={product.quantity}
                                            onChange={(quantity) =>
                                                updateProductQuantity(
                                                    product.id,
                                                    quantity
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <span className="text-on-surface">
                                            {formatPrice(product.basePrice)}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="inline-flex items-center gap-1 rounded-card-md border border-outline-variant bg-surface-container-high px-2 py-1">
                                            <Input
                                                type="text"
                                                min={0}
                                                max={100}
                                                value={String(product.discountPercent)}
                                                onChange={(value) =>
                                                    updateProductDiscount(
                                                        product.id,
                                                        Number(value)
                                                    )
                                                }
                                                wrapperClassName='p-0 px-2 max-w-12'
                                            />
                                            <span className="text-label-md font-semibold text-primary">
                                                ٪
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-bold text-on-surface">
                                            {formatPrice(bundlePrice)}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default ProductList

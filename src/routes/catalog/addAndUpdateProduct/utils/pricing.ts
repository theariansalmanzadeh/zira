import type { ItemListOut } from '@/src/api/types/admin/catalog'
import type { PriceBulkRowIn } from '@/src/api/types/admin/pricing'
import { onlyNumber } from '@/src/shared/schema/generalSchema'
import type { PricingMatrixRow } from '../provider/createProductsProvider'

export const parseMoney = (value: string): number | null => {
    const digits = onlyNumber(value)
    if (!digits) return null
    const amount = Number(digits)
    return Number.isFinite(amount) ? amount : null
}

export const computeSalePrice = (
    base: number,
    discountType: string,
    discountValue: string
): number => {
    const discount = parseMoney(discountValue) ?? 0

    if (discountType === 'percentage' && discount > 0) {
        return Math.max(0, Math.round(base * (1 - discount / 100)))
    }

    if (discountType === 'amount' && discount > 0) {
        return Math.max(0, Math.round(base - discount))
    }

    return Math.round(base)
}

export const buildBulkPriceRows = ({
    items,
    pricingRows,
    unitPrice,
    discountType,
    discountValue,
}: {
    items: ItemListOut[]
    pricingRows: Record<string, PricingMatrixRow>
    unitPrice: string
    discountType: string
    discountValue: string
}): PriceBulkRowIn[] => {
    const activeRows = Object.values(pricingRows).filter(
        (row) => row.active && row.sizeId && row.colorId
    )
    const fallbackUnit = parseMoney(unitPrice)
    const rows: PriceBulkRowIn[] = []

    for (const item of items) {
        const matrixRow = activeRows.find(
            (row) =>
                row.sizeId === (item.size_id ?? '') &&
                row.colorId === (item.color_id ?? '')
        )

        const base =
            (matrixRow ? parseMoney(matrixRow.basePrice) : null) ?? fallbackUnit

        if (base == null || base <= 0) continue

        rows.push({
            item_id: item.id,
            sale_price: computeSalePrice(base, discountType, discountValue),
        })
    }

    if (rows.length > 0) return rows

    if (fallbackUnit == null || fallbackUnit <= 0) return []

    return items.map((item) => ({
        item_id: item.id,
        sale_price: computeSalePrice(
            fallbackUnit,
            discountType,
            discountValue
        ),
    }))
}

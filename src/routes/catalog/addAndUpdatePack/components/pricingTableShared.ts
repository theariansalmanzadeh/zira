'use client'

import { useTable } from '@/src/shared/context/TableProvider'

export type PricingItem = {
    id: string
    code: string
    name: string
    categoryId: string
    categoryName: string
    brandId: string
    brandName: string
    materialName: string
    modelLineName: string
    sizeCount: number
    colorCount: number
    itemCount: number
}

const COLUMN_SIZES: Record<string, string> = {
    code: 'minmax(0, 1.2fr)',
    name: 'minmax(0, 2fr)',
    category: 'minmax(0, 1.2fr)',
    brand: 'minmax(0, 0.9fr)',
    material: 'minmax(0, 0.9fr)',
    model: 'minmax(0, 0.9fr)',
    items: 'minmax(0, 0.7fr)',
    size: 'minmax(0, 0.6fr)',
    color: 'minmax(0, 0.8fr)',
    grade: 'minmax(0, 0.6fr)',
    amount: 'minmax(0, 0.9fr)',
}

export const usePricingGridStyle = (includeAmount = false) => {
    const { visibleTableColoumn } = useTable()
    const columns = includeAmount
        ? [...visibleTableColoumn, { id: 'amount' }]
        : visibleTableColoumn

    return {
        gridTemplateColumns: columns
            .map((column) => COLUMN_SIZES[column.id] ?? '1fr')
            .join(' '),
    }
}

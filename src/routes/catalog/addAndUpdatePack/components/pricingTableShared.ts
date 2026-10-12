'use client'

import { useTable } from '@/src/shared/context/TableProvider'

export type PricingItem = {
    id: string
    code: string
    name: string
    size: string
    color: string
    colorHex: string
    price: number
    stock: number
    mainCategory: string
    midCategory: string
    subCategory: string
    brand: string
}

export const COLOR_LABEL: Record<string, string> = {
    red: 'قرمز',
    blue: 'آبی',
    green: 'سبز',
}

export const SIZE_LABEL: Record<string, string> = {
    xs: 'XS',
    s: 'S',
    m: 'M',
}

const COLUMN_SIZES: Record<string, string> = {
    code: 'minmax(0, 1.2fr)',
    name: 'minmax(0, 2fr)',
    size: 'minmax(0, 0.6fr)',
    color: 'minmax(0, 0.8fr)',
    price: 'minmax(0, 0.9fr)',
    stock: 'minmax(0, 0.7fr)',
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

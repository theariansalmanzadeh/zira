import type { BundlePolicy } from '@/src/api/types/admin/catalog'

export type BundleTurnover = 'hot' | 'medium' | 'low'

export type BundleProduct = {
    id: string
    code: string
    name: string
    turnover: BundleTurnover
    quantity: number
    basePrice: number
    discountPercent: number
}

export type BundlePricingSummary = {
    itemsCount: number
    totalUnits: number
    baseTotal: number
    discountTotal: number
    discountPercent: number
    calculatedPrice: number
}

export type BundleContextValue = {
    name: string
    setName: (value: string) => void
    code: string
    setCode: (value: string) => void
    policy: BundlePolicy
    setPolicy: (value: BundlePolicy) => void
    description: string
    setDescription: (value: string) => void
    products: BundleProduct[]
    setProducts: (products: BundleProduct[]) => void
    addProduct: (product: BundleProduct) => void
    removeProduct: (id: string) => void
    updateProductQuantity: (id: string, quantity: number) => void
    updateProductDiscount: (id: string, discountPercent: number) => void
    finalPrice: string
    setFinalPrice: (value: string) => void
    pricing: BundlePricingSummary
    displayPrice: number
    isEditing?: boolean
}

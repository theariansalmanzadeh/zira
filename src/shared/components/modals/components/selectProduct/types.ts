export type SelectProductItem = {
    id: string
    name: string
    sku: string
    brand: string
    category: string
    productType: string
    unit: string
    unitPrice: number
    stock: number
    swatch: string
}

export type SelectProductModalData = {
    selectedIds?: string[]
    onSelect?: (product: SelectProductItem) => void
}

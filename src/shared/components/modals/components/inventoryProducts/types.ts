export type InventoryProductItem = {
    id: string
    productCode: string
    productType: string
    productName: string
    categoryPath: string
    size: string
    colorName: string
    colorHex: string
    material: string
    model: string
    unit: string
    stock: number
    warehouseAddress: string
}

export type InventoryProductsModalData = {
    warehouseName?: string
    selectedIds?: string[]
    onConfirm?: (products: InventoryProductItem[]) => void
}

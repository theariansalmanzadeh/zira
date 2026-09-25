export type InventoryInvoiceStatus = 'final-approval' | 'pending' | 'draft'

export type InventoryInvoiceFilterTab =
    | 'all'
    | 'pending'
    | 'unassigned'
    | 'confirmed'

export type InventoryInvoiceDetailItem = {
    id: string
    size: string
    color: string
    colorHex: string
    materialHex: string
    model: string
    material: string
    labels: string
    supplier: string
    warehouseName: string
    requestDate: string
    receiveDate: string
    countedQty: string
    productAddress: string
}

export type InventoryInvoiceRowData = {
    id: string
    productCode: string
    mainCategory: string
    subCategory: string
    productName: string
    size: string
    model: string
    status: InventoryInvoiceStatus
    filterTab: Exclude<InventoryInvoiceFilterTab, 'all'>
    details: [InventoryInvoiceDetailItem]
}

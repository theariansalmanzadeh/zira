export type StockReturnStatus =
    | 'returned-to-stock'
    | 'awaiting-receipt'
    | 'quality-check'

export type StockReturnFilterTab = 'all' | 'under-review' | 'awaiting-receipt'

export type StockReturnItem = {
    id: string
    productName: string
    unit: string
    declaredQty: string
}

export type StockReturnRowData = {
    id: string
    customerName: string
    consignmentId: string
    itemCount: string
    status: StockReturnStatus
    registeredAt: string
    filterTab?: Exclude<StockReturnFilterTab, 'all'>
    items?: StockReturnItem[]
}

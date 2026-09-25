export type WarehouseReceiptTab = 'in-progress' | 'list'

export type WarehouseReceiptStatus =
    | 'awaiting-address'
    | 'awaiting-prep'
    | 'completed'

export type WarehouseReceiptRowData = {
    id: string
    row: number
    invoiceNumber: string
    customerCode: string
    customerName: string
    date: string
    itemCount: number
    senderWarehouse: string
    shippingMethod: string
    status: WarehouseReceiptStatus
    tab: WarehouseReceiptTab
}

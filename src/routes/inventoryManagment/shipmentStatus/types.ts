export type ShipmentStatus =
    | 'preparing'
    | 'internal-transfer'
    | 'sending-to-customer'
    | 'sent'
    | 'received-by-customer'

export type ShipmentStatusFilter =
    | 'all'
    | ShipmentStatus

export type ShipmentStatusRowData = {
    id: string
    row: number
    invoiceDate: string
    invoiceNumber: string
    customerCode: string
    customerName: string
    customerPhone: string
    itemCount: number
    totalQuantity: number
    status: ShipmentStatus
    supplierWarehouses: string
    senderWarehouse: string
    shippingMethod: string
    shipmentNumber: string
    lastUpdated: string
    estimatedDeliveryDate: string
    customerReceivedDate: string
    systemDescription: string
}

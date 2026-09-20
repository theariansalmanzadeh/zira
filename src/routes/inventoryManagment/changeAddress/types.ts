export type ChangeAddressFilterTab =
    | 'all'
    | 'pending'
    | 'in-transit'
    | 'completed'

export type ChangeAddressDetailItem = {
    id: string
    oldAddress: string
    newAddress: string
    date: string
    managerName: string
    description: string
}

export type ChangeAddressRowData = {
    id: string
    trackingCode: string
    warehouseCode: string
    warehouseName: string
    productCode: string
    productName: string
    unit: string
    quantity: string
    filterTab?: Exclude<ChangeAddressFilterTab, 'all'>
    details: [ChangeAddressDetailItem]
}

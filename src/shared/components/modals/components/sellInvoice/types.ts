export type SellInvoiceItem = {
    row: number
    name: string
    qty: number
    unitPrice: number
    amount: number
}

export type SellInvoiceData = {
    customerName: string
    customerCode: string
    address: string
    phone: string
    registeredAt: string
    settledAt: string
    settlementLabel: string
    items: SellInvoiceItem[]
    discount: number
}

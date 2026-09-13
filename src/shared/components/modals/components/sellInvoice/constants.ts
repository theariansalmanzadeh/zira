import type { SellInvoiceData, SellInvoiceItem } from './types'

export const SELL_INVOICE_ITEMS: SellInvoiceItem[] = [
    {
        row: 1,
        name: 'ست لباس خواب ساتن',
        qty: 12,
        unitPrice: 398000,
        amount: 4776000,
    },
    {
        row: 2,
        name: 'سوتین بدون فنر دانتل',
        qty: 8,
        unitPrice: 286000,
        amount: 2288000,
    },
    {
        row: 3,
        name: 'تاپ بندی کشی',
        qty: 6,
        unitPrice: 142000,
        amount: 852000,
    },
]

export const SELL_INVOICE_DUMMY: SellInvoiceData = {
    customerName: 'آیدا میرزایی',
    customerCode: 'CU-7362',
    address: 'تهران، ولنجک، خیابان ۱۹، پلاک ۸، واحد ۳',
    phone: '+98 912 673 2123',
    registeredAt: '2025-12-03T00:00:00.000Z',
    settledAt: '2025-12-03T00:00:00.000Z',
    settlementLabel: 'نقدی',
    items: SELL_INVOICE_ITEMS,
    discount: 200000,
}

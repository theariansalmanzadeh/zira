import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type TransactionRowData = {
    id: string
    row: number
    date: string
    debit: number
    credit: number
    description: string
    invoiceBalance: number
    totalBalance: number
}

export const TRANSACTIONS_TOGGLE_BUTTONS = [
    { label: 'عادی', value: 'normal' },
    { label: 'تجمیعی ماهانه', value: 'monthly' },
    { label: 'به تفصیل فاکتور', value: 'invoice-detail' },
] as const

export const TRANSACTIONS_TABLE_COLUMNS: TableFilterItem[] = [
    { id: 'row', header_label: 'ردیف', isChecked: true },
    { id: 'date', header_label: 'تاریخ', isChecked: true },
    { id: 'debit', header_label: 'بدهکار', isChecked: true },
    { id: 'credit', header_label: 'بستانکار', isChecked: true },
    { id: 'description', header_label: 'شرح سند', isChecked: true },
    { id: 'invoiceBalance', header_label: 'مانده فاکتور', isChecked: true },
    { id: 'totalBalance', header_label: 'مانده کل', isChecked: true },
]

export const TRANSACTIONS_DUMMY: TransactionRowData[] = [
    {
        id: 'tx-1',
        row: 1,
        date: '2025-12-03T00:00:00.000Z',
        debit: 7980000,
        credit: 0,
        description: 'فاکتور فروش PO-982032',
        invoiceBalance: 7980000,
        totalBalance: 142000000,
    },
    {
        id: 'tx-2',
        row: 2,
        date: '2025-12-01T00:00:00.000Z',
        debit: 0,
        credit: 20000000,
        description: 'واریز نقدی',
        invoiceBalance: 0,
        totalBalance: 134020000,
    },
]

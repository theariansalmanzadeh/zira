import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type { AccountingDocumentFilterTab, AccountingDocumentRowData } from '../components/TableRow'

export const SUMMARY_STATS = [
    { title: 'کل اسناد دوره', value: '482' },
    { title: 'اسناد موقت', value: '11' },
    { title: 'اسناد دائم', value: '471' },
    {
        title: 'جمع گردش دوره',
        value: '1,827',
        subtitle: 'میلیون تومان',
    },
] as const

export const ACCOUNTING_DOCUMENTS_DUMMY: AccountingDocumentRowData[] = [
    {
        id: '918273',
        date: '2025-12-09T00:00:00.000Z',
        description: 'ثبت فروش فاکتور SI-8902',
        debit: '7,980,000',
        credit: '7,980,000',
        type: 'temporary',
        status: 'temporary',
        filterTab: 'temporary',
    },
    {
        id: '918272',
        date: '2025-12-09T00:00:00.000Z',
        description: 'دریافت وجه نقد بابت فروش',
        debit: '2,450,000',
        credit: '2,450,000',
        type: 'permanent',
        status: 'permanent',
        filterTab: 'permanent',
    },
    {
        id: '918271',
        date: '2025-12-08T00:00:00.000Z',
        description: 'ثبت هزینه حمل و نقل',
        debit: '1,120,000',
        credit: '1,120,000',
        type: 'temporary',
        status: 'temporary',
        filterTab: 'temporary',
    },
    {
        id: '918270',
        date: '2025-12-08T00:00:00.000Z',
        description: 'سند افتتاحیه دوره مالی',
        debit: '15,000,000',
        credit: '15,000,000',
        type: 'openingClosing',
        status: 'permanent',
        filterTab: 'openingClosing',
    },
    {
        id: '918269',
        date: '2025-12-07T00:00:00.000Z',
        description: 'ثبت خرید کالا PI-4412',
        debit: '4,320,000',
        credit: '4,320,000',
        type: 'permanent',
        status: 'permanent',
        filterTab: 'permanent',
    },
    {
        id: '918268',
        date: '2025-12-07T00:00:00.000Z',
        description: 'سند اختتامیه موقت',
        debit: '890,000',
        credit: '890,000',
        type: 'openingClosing',
        status: 'temporary',
        filterTab: 'openingClosing',
    },
]

export const filterAccountingDocuments = (
    documents: AccountingDocumentRowData[],
    filter: AccountingDocumentFilterTab | string
) => {
    if (filter === 'all') return documents
    return documents.filter((document) => document.filterTab === filter)
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شماره سند", isChecked: true },
    { id: "col-1", header_label: "تاریخ", isChecked: true },
    { id: "col-2", header_label: "شرح", isChecked: true },
    { id: "col-3", header_label: "بدهکار", isChecked: true },
    { id: "col-4", header_label: "بستانکار", isChecked: true },
    { id: "col-5", header_label: "نوع", isChecked: true },
    { id: "col-6", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
    { id: "actions-2", header_label: "", isChecked: true },
]

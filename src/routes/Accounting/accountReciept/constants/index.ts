import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type {
    AccountReceiptFilterTab,
    AccountReceiptRowData,
} from '../components/TableRow'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شناسه رسید", isChecked: true },
    { id: "col-1", header_label: "تاریخ", isChecked: true },
    { id: "col-2", header_label: "طرف حساب", isChecked: true },
    { id: "col-3", header_label: "نوع", isChecked: true },
    { id: "col-4", header_label: "مبلغ (تومان)", isChecked: true },
    { id: "col-5", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
]

export const ACCOUNT_RECEIPTS_DUMMY: AccountReceiptRowData[] = [
    {
        id: 'RC-7363',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'پوشاک آرمان',
        type: 'cheque',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'all',
    },
    {
        id: 'RC-7362',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'فروشگاه رضایی',
        type: 'pos',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'RC-7361',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'بازرگانی نوین',
        type: 'cash',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'all',
    },
    {
        id: 'RC-7360',
        date: '2025-12-09T00:00:00.000Z',
        counterparty: 'تجارت سپهر',
        type: 'transfer',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'RC-7359',
        date: '2025-12-08T00:00:00.000Z',
        counterparty: 'پوشاک آرمان',
        type: 'cheque',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'RC-7358',
        date: '2025-12-08T00:00:00.000Z',
        counterparty: 'فروشگاه رضایی',
        type: 'pos',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'all',
    },
    {
        id: 'RC-7357',
        date: '2025-12-08T00:00:00.000Z',
        counterparty: 'بازرگانی نوین',
        type: 'cash',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'all',
    },
    {
        id: 'RC-7356',
        date: '2025-12-07T00:00:00.000Z',
        counterparty: 'تجارت سپهر',
        type: 'transfer',
        amount: '18,297,400',
        status: 'draft',
        filterTab: 'draft',
    },
    {
        id: 'RC-7355',
        date: '2025-12-07T00:00:00.000Z',
        counterparty: 'پوشاک آرمان',
        type: 'cheque',
        amount: '18,297,400',
        status: 'draft',
        filterTab: 'draft',
    },
    {
        id: 'RC-7354',
        date: '2025-12-06T00:00:00.000Z',
        counterparty: 'فروشگاه رضایی',
        type: 'cash',
        amount: '18,297,400',
        status: 'draft',
        filterTab: 'draft',
    },
]

export const filterAccountReceipts = (
    receipts: AccountReceiptRowData[],
    filter: AccountReceiptFilterTab | string
) => {
    if (filter === 'all') return receipts
    return receipts.filter((receipt) => receipt.filterTab === filter)
}

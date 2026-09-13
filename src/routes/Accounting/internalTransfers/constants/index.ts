import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type {
    InternalTransferFilterTab,
    InternalTransferRowData,
} from '../components/TableRow'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شناسه", isChecked: true },
    { id: "col-1", header_label: "تاریخ", isChecked: true },
    { id: "col-2", header_label: "نوع", isChecked: true },
    { id: "col-3", header_label: "از / به", isChecked: true },
    { id: "col-4", header_label: "مبلغ (تومان)", isChecked: true },
    { id: "col-5", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
    { id: "actions-1", header_label: "", isChecked: true },
]

export const INTERNAL_TRANSFERS_DUMMY: InternalTransferRowData[] = [
    {
        id: 'RC-7363',
        date: '2025-12-09T00:00:00.000Z',
        type: 'bankTransfer',
        fromTo: 'ملت -> صادرات',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'bankTransfer',
    },
    {
        id: 'RC-7362',
        date: '2025-12-09T00:00:00.000Z',
        type: 'barter',
        fromTo: 'از -> به',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'barter',
    },
    {
        id: 'RC-7361',
        date: '2025-12-09T00:00:00.000Z',
        type: 'bankTransfer',
        fromTo: 'ملت -> صادرات',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'bankTransfer',
    },
    {
        id: 'RC-7360',
        date: '2025-12-09T00:00:00.000Z',
        type: 'barter',
        fromTo: 'از -> به',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'barter',
    },
    {
        id: 'RC-7359',
        date: '2025-12-08T00:00:00.000Z',
        type: 'bankTransfer',
        fromTo: 'ملت -> صادرات',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'bankTransfer',
    },
    {
        id: 'RC-7358',
        date: '2025-12-08T00:00:00.000Z',
        type: 'barter',
        fromTo: 'از -> به',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'barter',
    },
    {
        id: 'RC-7357',
        date: '2025-12-08T00:00:00.000Z',
        type: 'bankTransfer',
        fromTo: 'ملت -> صادرات',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'bankTransfer',
    },
    {
        id: 'RC-7356',
        date: '2025-12-07T00:00:00.000Z',
        type: 'barter',
        fromTo: 'از -> به',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'barter',
    },
    {
        id: 'RC-7355',
        date: '2025-12-07T00:00:00.000Z',
        type: 'bankTransfer',
        fromTo: 'ملت -> صادرات',
        amount: '18,297,400',
        status: 'pendingApproval',
        filterTab: 'bankTransfer',
    },
    {
        id: 'RC-7354',
        date: '2025-12-06T00:00:00.000Z',
        type: 'barter',
        fromTo: 'از -> به',
        amount: '18,297,400',
        status: 'approved',
        filterTab: 'barter',
    },
]

export const filterInternalTransfers = (
    transfers: InternalTransferRowData[],
    filter: InternalTransferFilterTab | string
) => {
    if (filter === 'all') return transfers
    return transfers.filter((transfer) => transfer.filterTab === filter)
}

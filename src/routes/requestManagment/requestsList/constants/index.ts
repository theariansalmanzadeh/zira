import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

import type { RequestRowData } from '../components/TableRow'

export const REQUESTS_DUMMY: RequestRowData[] = [
    {
        id: 'RQST-8271',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 100,
        settlementType: 'credit',
        status: 'approved',
        filterTab: 'approved',
    },
    {
        id: 'RQST-8270',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'بادی کبریتی',
        productCode: 'PC-2216',
        quantity: 240,
        settlementType: 'cash',
        status: 'pendingPayment',
        filterTab: 'pendingPayment',
    },
    {
        id: 'RQST-8269',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 140,
        settlementType: 'cheque',
        status: 'cancelled',
        filterTab: 'cancelled',
    },
    {
        id: 'RQST-8268',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'بادی کبریتی',
        productCode: 'PC-2216',
        quantity: 600,
        settlementType: 'credit',
        status: 'rejected',
        filterTab: 'rejected',
    },
    {
        id: 'RQST-8267',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 100,
        settlementType: 'cash',
        status: 'approved',
        filterTab: 'approved',
    },
    {
        id: 'RQST-8266',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'بادی کبریتی',
        productCode: 'PC-2216',
        quantity: 240,
        settlementType: 'cheque',
        status: 'pendingPayment',
        filterTab: 'pendingPayment',
    },
    {
        id: 'RQST-8265',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'سوتین پوش‌آپ گیپور',
        productCode: 'PC-2216',
        quantity: 140,
        settlementType: 'credit',
        status: 'cancelled',
        filterTab: 'cancelled',
    },
    {
        id: 'RQST-8264',
        registeredAt: '2025-12-09T14:53:00.000Z',
        productName: 'بادی کبریتی',
        productCode: 'PC-2216',
        quantity: 600,
        settlementType: 'cash',
        status: 'rejected',
        filterTab: 'rejected',
    },
]

export const filterRequests = (
    requests: RequestRowData[],
    filter: string
) => {
    if (filter === 'all') return requests
    return requests.filter((request) => request.filterTab === filter)
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: "col-0", header_label: "شناسه درخواست", isChecked: true },
    { id: "col-1", header_label: "تاریخ ثبت", isChecked: true },
    { id: "col-2", header_label: "کالا", isChecked: true },
    { id: "col-3", header_label: "تعداد", isChecked: true },
    { id: "col-4", header_label: "نوع تسویه", isChecked: true },
    { id: "col-5", header_label: "وضعیت", isChecked: true },
    { id: "actions-0", header_label: "", isChecked: true },
]

import type { TransferCardItem } from '@/src/shared/components/ui/TransferCard'

export const WAREHOUSE_TRANSFER_TOGGLE = [
    { label: 'همه', value: 'all' },
    { label: 'در انتظار تأیید', value: 'accepting' },
    { label: 'در حال جابجایی', value: 'transferring' },
    { label: 'دریافت شده', value: 'received' },
    { label: 'قطعی شده', value: 'completed' },
    { label: 'لغو شده', value: 'cancelled' },
] as const

export type WarehouseTransferFilter =
    (typeof WAREHOUSE_TRANSFER_TOGGLE)[number]['value']

export const WAREHOUSE_TRANSFER_DUMMY: TransferCardItem[] = [
    {
        id: 'WT-2201',
        slug: 'WT-2201',
        fromBranch: 'انبار مرکزی تهران',
        fromWarehouse: 'WH-1001',
        toBranch: 'انبار غرب',
        toWarehouse: 'WH-1002',
        itemCount: 4,
        unitCount: 56,
        status: 'accepting',
        date: '2025-11-20T00:00:00.000Z',
    },
    {
        id: 'WT-2200',
        slug: 'WT-2200',
        fromBranch: 'انبار شرق',
        fromWarehouse: 'WH-1003',
        toBranch: 'انبار مرکزی تهران',
        toWarehouse: 'WH-1001',
        itemCount: 6,
        unitCount: 90,
        status: 'transferring',
        date: '2025-11-18T00:00:00.000Z',
    },
    {
        id: 'WT-2199',
        slug: 'WT-2199',
        fromBranch: 'انبار غرب',
        fromWarehouse: 'WH-1002',
        toBranch: 'انبار شرق',
        toWarehouse: 'WH-1003',
        itemCount: 2,
        unitCount: 18,
        status: 'received',
        date: '2025-11-15T00:00:00.000Z',
    },
    {
        id: 'WT-2198',
        slug: 'WT-2198',
        fromBranch: 'انبار مرکزی تهران',
        fromWarehouse: 'WH-1001',
        toBranch: 'انبار کرج',
        toWarehouse: 'WH-1010',
        itemCount: 3,
        unitCount: 30,
        status: 'completed',
        date: '2025-11-10T00:00:00.000Z',
    },
    {
        id: 'WT-2197',
        slug: 'WT-2197',
        fromBranch: 'انبار کرج',
        fromWarehouse: 'WH-1010',
        toBranch: 'انبار غرب',
        toWarehouse: 'WH-1002',
        itemCount: 1,
        unitCount: 8,
        status: 'cancelled',
        date: '2025-11-08T00:00:00.000Z',
    },
]

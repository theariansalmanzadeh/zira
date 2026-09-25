import type { TransferCardItem } from '@/src/shared/components/ui/TransferCard'

export type {
    TransferCardItem as BranchTransferItem,
    TransferCardLineItem as BranchTransferLineItem,
    TransferCardStatus as BranchTransferStatus,
} from '@/src/shared/components/ui/TransferCard'

export {
    TRANSFER_CARD_STATUS_CONFIG as STATUS_CONFIG,
    TRANSFER_CARD_STEPS as BRANCH_TRANSFER_STEPS,
    buildTransferCardStepperSteps as buildBranchTransferStepperSteps,
} from '@/src/shared/components/ui/TransferCard'

export const BRANCH_TRANSFER_DUMMY: TransferCardItem[] = [
    {
        id: 'TR-1041',
        slug: 'TR-1041',
        fromBranch: 'شعبه اصفهان',
        fromWarehouse: 'WH-2030',
        toBranch: 'شعبه مشهد',
        toWarehouse: 'WH-2020',
        itemCount: 5,
        unitCount: 88,
        status: 'transferring',
        date: '2025-11-22T00:00:00.000Z',
        items: [
            {
                id: '1',
                productCode: 'ZM-1042',
                productName: 'سوتین بدون فنر مدل لوسی',
                unit: 'عدد',
                quantity: 24,
                tone: 'primary',
            },
            {
                id: '2',
                productCode: 'ZM-1088',
                productName: 'شورت نخی پنبه‌ای دیلی',
                unit: 'عدد',
                quantity: 30,
                tone: 'info',
            },
            {
                id: '3',
                productCode: 'ZM-2210',
                productName: 'ست لباس‌خواب ساتن رز',
                unit: 'عدد',
                quantity: 10,
                tone: 'success',
            },
        ],
    },
    {
        id: 'TR-1040',
        slug: 'TR-1040',
        fromBranch: 'شعبه مرکزی تهران',
        fromWarehouse: 'WH-1001',
        toBranch: 'شعبه کرج',
        toWarehouse: 'WH-1010',
        itemCount: 3,
        unitCount: 24,
        status: 'accepting',
        date: '2025-11-19T00:00:00.000Z',
    },
    {
        id: 'TR-1039',
        slug: 'TR-1039',
        fromBranch: 'شعبه مشهد',
        fromWarehouse: 'WH-2020',
        toBranch: 'شعبه اصفهان',
        toWarehouse: 'WH-2030',
        itemCount: 8,
        unitCount: 120,
        status: 'registered',
        date: '2025-11-16T00:00:00.000Z',
    },
    {
        id: 'TR-1038',
        slug: 'TR-1038',
        fromBranch: 'شعبه کرج',
        fromWarehouse: 'WH-1010',
        toBranch: 'شعبه مرکزی تهران',
        toWarehouse: 'WH-1001',
        itemCount: 2,
        unitCount: 16,
        status: 'completed',
        date: '2025-11-11T00:00:00.000Z',
    },
]

export type LocationKind = 'store' | 'warehouse'

export type TransferLocation = {
    id: string
    code: string
    name: string
    kind: LocationKind
}

export type TransferBranch = {
    id: string
    code: string
    name: string
}

export type TransferItemRow = {
    id: string
    productCode: string
    productName: string
    unitPrice: number
    unit: string
    sourceStock: number
    quantity: number
}

export type BranchPathState = {
    fromBranchId: string
    fromWarehouseId: string
    toBranchId: string
    toWarehouseId: string
}

export type LocationPathState = {
    fromLocationId: string
    toLocationId: string
}

export type TransferItemsState = {
    items: TransferItemRow[]
    description: string
}

export type NewTransferVariant = 'branch-path' | 'location-path'

export const LOCATION_KIND_LABEL: Record<LocationKind, string> = {
    store: 'فروشگاه',
    warehouse: 'انبار',
}

export const BRANCH_OPTIONS: TransferBranch[] = [
    { id: 'br-1001', code: 'BR-1001', name: 'شعبه مرکزی تهران' },
    { id: 'br-1002', code: 'BR-1002', name: 'شعبه شیراز' },
    { id: 'br-1003', code: 'BR-1003', name: 'شعبه اصفهان' },
]

export const LOCATION_OPTIONS: TransferLocation[] = [
    {
        id: 'loc-br-1001-store',
        code: 'BR-1001',
        name: 'شعبه مرکزی تهران (فروشگاه)',
        kind: 'store',
    },
    {
        id: 'loc-wh-2001',
        code: 'WH-2001',
        name: 'انبار مرکزی تهران',
        kind: 'warehouse',
    },
    {
        id: 'loc-br-1002-store',
        code: 'BR-1002',
        name: 'شعبه شیراز (فروشگاه)',
        kind: 'store',
    },
    {
        id: 'loc-wh-2010',
        code: 'WH-2010',
        name: 'انبار غرب',
        kind: 'warehouse',
    },
]

export const BRANCH_WAREHOUSE_OPTIONS: Record<string, TransferLocation[]> = {
    'br-1001': [
        {
            id: 'wh-br-1001-store',
            code: 'BR-1001',
            name: 'شعبه مرکزی تهران (فروشگاه)',
            kind: 'store',
        },
        {
            id: 'wh-tehran-central',
            code: 'WH-1001',
            name: 'انبار مرکزی تهران',
            kind: 'warehouse',
        },
    ],
    'br-1002': [
        {
            id: 'wh-br-1002-store',
            code: 'BR-1002',
            name: 'شعبه شیراز (فروشگاه)',
            kind: 'store',
        },
        {
            id: 'wh-shiraz',
            code: 'WH-2010',
            name: 'انبار شیراز',
            kind: 'warehouse',
        },
    ],
    'br-1003': [
        {
            id: 'wh-br-1003-store',
            code: 'BR-1003',
            name: 'شعبه اصفهان (فروشگاه)',
            kind: 'store',
        },
    ],
}

export const TRANSFER_ITEMS_COLUMNS = [
    { id: 'productCode', header_label: 'کد کالا', isChecked: true },
    { id: 'productName', header_label: 'نام کالا', isChecked: true },
    { id: 'unit', header_label: 'واحد اصلی', isChecked: true },
    { id: 'sourceStock', header_label: 'موجودی مبدا', isChecked: true },
    { id: 'quantity', header_label: 'تعداد', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true },
] as const

export const SAMPLE_TRANSFER_PRODUCT: Omit<TransferItemRow, 'id' | 'quantity'> =
    {
        productCode: 'ZM-2210',
        productName: 'ست لباس‌خواب ساتن رز',
        unitPrice: 1050000,
        unit: 'ست',
        sourceStock: 19,
    }

export const BRANCH_PATH_DEFAULTS = {
    fromBranchId: 'br-1001',
    fromWarehouseId: 'wh-br-1001-store',
    toBranchId: 'br-1002',
    toWarehouseId: 'wh-br-1002-store',
}

export const LOCATION_PATH_DEFAULTS = {
    fromLocationId: 'loc-br-1001-store',
    toLocationId: 'loc-wh-2001',
}

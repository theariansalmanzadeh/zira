import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export const FILTER_QUERY_KEYS = {
    branch: 'branch',
    storage: 'storage',
} as const

export const BRANCH_OPTIONS: FormDropdownOption[] = [
    {
        label: 'شعبه مرکزی تهران',
        value: 'tehran-central',
    },
    {
        label: 'شعبه اصفهان',
        value: 'isfahan',
    },
    {
        label: 'شعبه کرج',
        value: 'karaj',
    },
]

export const STORAGE_OPTIONS: FormDropdownOption[] = [
    { label: 'کل شعبه و انبارها (۴)', value: 'all' },
    { label: 'خود شعبه', value: 'branch' },
    { label: 'انبار مرکزی تهران', value: 'tehran-central-wh' },
    { label: 'انبار فروشگاه ولیعصر', value: 'valiasr-wh' },
]

export const FILTER_DEFAULTS = {
    branch: 'tehran-central',
    storage: 'all',
} as const

export type BranchInfoData = {
    code: string
    name: string
    manager: string
    phone: string
    warehouseCountLabel: string
    address: string
}

export const BRANCH_INFO_BY_BRANCH: Record<string, BranchInfoData> = {
    'tehran-central': {
        code: 'BR-1001',
        name: 'شعبه مرکزی تهران',
        manager: 'سارا محمدی',
        phone: '+98 21 8845 1200',
        warehouseCountLabel: '۳ انبار + خود شعبه',
        address: 'تهران، خیابان ولیعصر، بالاتر از پارک‌وی، پلاک ۲۴۸۰',
    },
    isfahan: {
        code: 'BR-1002',
        name: 'شعبه اصفهان',
        manager: 'علی رضایی',
        phone: '+98 31 3620 4411',
        warehouseCountLabel: '۲ انبار + خود شعبه',
        address: 'اصفهان، خیابان چهارباغ عباسی، پلاک ۱۲۰',
    },
    karaj: {
        code: 'BR-1003',
        name: 'شعبه کرج',
        manager: 'مریم احمدی',
        phone: '+98 26 3410 2288',
        warehouseCountLabel: '۱ انبار + خود شعبه',
        address: 'کرج، بلوار شهید بهشتی، پلاک ۷۵',
    },
}

export type StorageLocationType = 'store' | 'warehouse'

export type BranchStockStatus = 'below-minimum'

export type BranchStockRow = {
    id: string
    productCode: string
    productName: string
    locationType: StorageLocationType
    locationName: string
    stock: number
    minStock: number
    stockValue: number
    status: BranchStockStatus
    branch: string
    storage: string
}

export const LOCATION_TYPE_LABEL: Record<StorageLocationType, string> = {
    store: 'فروشگاه',
    warehouse: 'انبار',
}

export const STATUS_CONFIG: Record<
    BranchStockStatus,
    {
        text: string
        variant: NonNullable<VariantProps<typeof PillVariants>['variant']>
    }
> = {
    'below-minimum': { text: 'زیر حداقل', variant: 'warning' },
}

export const TABLE_COLOUMN = [
    { id: 'productCode', header_label: 'کد کالا', isChecked: true },
    { id: 'productName', header_label: 'نام کالا', isChecked: true },
    { id: 'storageLocation', header_label: 'محل نگهداری', isChecked: true },
    { id: 'stock', header_label: 'موجودی', isChecked: true },
    { id: 'minStock', header_label: 'حداقل موجودی', isChecked: true },
    {
        id: 'stockValue',
        header_label: 'ارزش ریالی موجودی',
        isChecked: true,
    },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
]

export const BRANCH_STOCK_DUMMY: BranchStockRow[] = [
    {
        id: '1',
        productCode: 'ZM-3015',
        productName: 'جوراب شلواری ۲۰ دن',
        locationType: 'store',
        locationName: 'شعبه مرکزی تهران',
        stock: 2,
        minStock: 4,
        stockValue: 196000,
        status: 'below-minimum',
        branch: 'tehran-central',
        storage: 'branch',
    },
    {
        id: '2',
        productCode: 'ZM-3015',
        productName: 'جوراب شلواری ۲۰ دن',
        locationType: 'warehouse',
        locationName: 'انبار مرکزی تهران',
        stock: 2,
        minStock: 4,
        stockValue: 196000,
        status: 'below-minimum',
        branch: 'tehran-central',
        storage: 'tehran-central-wh',
    },
    {
        id: '3',
        productCode: 'ZM-3015',
        productName: 'جوراب شلواری ۲۰ دن',
        locationType: 'warehouse',
        locationName: 'انبار فروشگاه ولیعصر',
        stock: 1,
        minStock: 2,
        stockValue: 98000,
        status: 'below-minimum',
        branch: 'tehran-central',
        storage: 'valiasr-wh',
    },
]

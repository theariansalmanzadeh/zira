import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type BundleStatus = 'all' | 'active' | 'inactive'

export type BundleItem = {
    id: string
    code: string
    name: string
    itemsCount: number
    totalStock: number
    price: number
    createdAt: string
    status: Exclude<BundleStatus, 'all'>
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد باندل', isChecked: true },
    { id: 'col-1', header_label: 'نام باندل', isChecked: true },
    { id: 'col-2', header_label: 'اقلام', isChecked: true },
    { id: 'col-3', header_label: 'تعداد کل کالا', isChecked: true },
    { id: 'col-4', header_label: 'قیمت باندل', isChecked: true },
    { id: 'col-5', header_label: 'تاریخ ایجاد', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]

export const BUNDLE_LIST_DUMMY: BundleItem[] = [
    {
        id: '1',
        code: 'BND-1001',
        name: 'ست هدیه شب یلدا',
        itemsCount: 4,
        totalStock: 320,
        price: 1850000,
        createdAt: '2025-11-03T00:00:00.000Z',
        status: 'active',
    },
    {
        id: '2',
        code: 'BND-1002',
        name: 'پک لباس راحتی زنانه',
        itemsCount: 3,
        totalStock: 148,
        price: 980000,
        createdAt: '2025-10-12T00:00:00.000Z',
        status: 'active',
    },
    {
        id: '3',
        code: 'BND-1003',
        name: 'ست سیسمونی نوزاد',
        itemsCount: 6,
        totalStock: 75,
        price: 2450000,
        createdAt: '2025-08-27T00:00:00.000Z',
        status: 'inactive',
    },
    {
        id: '4',
        code: 'BND-1004',
        name: 'باکس مراقبت پوست',
        itemsCount: 5,
        totalStock: 210,
        price: 1320000,
        createdAt: '2025-08-09T00:00:00.000Z',
        status: 'active',
    },
]

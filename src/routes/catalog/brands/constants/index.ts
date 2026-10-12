import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type BrandStatus = 'all' | 'active' | 'inactive'

export type BrandItem = {
    id: string
    name: string
    slug: string
    initial: string
    avatarClassName: string
    field: string
    productsCount: number
    country: string
    status: Exclude<BrandStatus, 'all'>
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'برند', isChecked: true },
    { id: 'col-1', header_label: 'حوزه', isChecked: true },
    { id: 'col-2', header_label: 'کالا', isChecked: true },
    { id: 'col-3', header_label: 'کشور', isChecked: true },
    { id: 'col-4', header_label: 'وضعیت', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]

export const BRANDS_LIST_DUMMY: BrandItem[] = [
    {
        id: 'brand-1',
        name: 'لمیس',
        slug: 'لمیس/brand',
        initial: 'ل',
        avatarClassName: 'bg-[#C4A484] text-on-primary',
        field: 'لباس زیر و راحتی',
        productsCount: 186,
        country: 'ایران',
        status: 'active',
    },
    {
        id: 'brand-2',
        name: 'لورنزو',
        slug: 'لورنزو/brand',
        initial: 'ل',
        avatarClassName: 'bg-primary/70 text-on-primary',
        field: 'لباس خواب',
        productsCount: 94,
        country: 'ترکیه',
        status: 'active',
    },
    {
        id: 'brand-3',
        name: 'نیکس',
        slug: 'نیکس/brand',
        initial: 'ن',
        avatarClassName: 'bg-info/70 text-on-primary',
        field: 'ورزشی',
        productsCount: 52,
        country: 'آلمان',
        status: 'inactive',
    },
    {
        id: 'brand-4',
        name: 'ویکتوریا',
        slug: 'ویکتوریا/brand',
        initial: 'و',
        avatarClassName: 'bg-success/60 text-on-primary',
        field: 'لباس زیر زنانه',
        productsCount: 210,
        country: 'ایران',
        status: 'active',
    },
]

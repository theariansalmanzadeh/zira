import type { BundleProduct } from '../types'

export const BUNDLE_PRODUCTS_DUMMY: BundleProduct[] = [
    {
        id: '1',
        code: 'ZM-1042',
        name: 'سوتین بدون فنر مدل لوسی',
        turnover: 'hot',
        quantity: 1,
        basePrice: 485000,
        discountPercent: 10,
    },
    {
        id: '2',
        code: 'ZM-2041',
        name: 'شورت نخی کلاسیک',
        turnover: 'medium',
        quantity: 2,
        basePrice: 189000,
        discountPercent: 5,
    },
    {
        id: '3',
        code: 'ZM-3110',
        name: 'تاپ بندی راحتی',
        turnover: 'hot',
        quantity: 3,
        basePrice: 256000,
        discountPercent: 15,
    },
]

export type BundleDetail = {
    id: string
    name: string
    code: string
    policy: string
    description: string
    products: BundleProduct[]
    finalPrice: string
}

export const BUNDLE_DETAILS_DUMMY: BundleDetail[] = [
    {
        id: '1',
        name: 'ست هدیه شب یلدا',
        code: 'BND-1001',
        policy: 'low-with-hot',
        description: 'پک هدیه شب یلدا شامل اقلام منتخب لباس راحتی.',
        products: BUNDLE_PRODUCTS_DUMMY,
        finalPrice: '1850000',
    },
    {
        id: '2',
        name: 'پک لباس راحتی زنانه',
        code: 'BND-1002',
        policy: 'gift',
        description: 'ترکیب لباس راحتی زنانه برای فروش فصلی.',
        products: BUNDLE_PRODUCTS_DUMMY.slice(0, 2),
        finalPrice: '980000',
    },
    {
        id: '3',
        name: 'ست سیسمونی نوزاد',
        code: 'BND-1003',
        policy: 'low-with-hot',
        description: 'ست کامل سیسمونی با اقلام ضروری نوزاد.',
        products: BUNDLE_PRODUCTS_DUMMY,
        finalPrice: '2450000',
    },
    {
        id: '4',
        name: 'باکس مراقبت پوست',
        code: 'BND-1004',
        policy: 'basket',
        description: 'باکس مراقبت پوست با اقلام مکمل.',
        products: BUNDLE_PRODUCTS_DUMMY.slice(1),
        finalPrice: '1320000',
    },
]

export const getBundleDetailById = (id: string) =>
    BUNDLE_DETAILS_DUMMY.find((bundle) => bundle.id === id)

export const getBundleDetailHref = (id: string) =>
    `/admin/categories/bundles/${id}`

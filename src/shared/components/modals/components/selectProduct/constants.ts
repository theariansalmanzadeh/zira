import type { SelectProductItem } from './types'

export const SELECT_PRODUCT_HEADERS: {
    id: string
    label: string
    className?: string
}[] = [
    { id: 'product', label: 'کالا / کد کالا', className: 'min-w-[220px]' },
    { id: 'brand', label: 'برند' },
    { id: 'category', label: 'دسته اصلی' },
    { id: 'productType', label: 'نوع کالا' },
    { id: 'unit', label: 'واحد' },
    { id: 'stock', label: 'موجودی' },
    { id: 'unitPrice', label: 'فی واحد' },
    { id: 'actions', label: '', className: 'w-[1%]' },
]

export const SELECT_PRODUCT_DUMMY: SelectProductItem[] = [
    {
        id: 'item-1',
        name: 'ست لباس خواب ساتن',
        sku: '63-7352',
        brand: 'زرین‌پال',
        category: 'لباس خواب',
        productType: 'کالا',
        unit: 'عدد',
        unitPrice: 398000,
        stock: 120,
        swatch: '#E8C4D0',
    },
    {
        id: 'item-4',
        name: 'لباس خواب ابریشمی',
        sku: 'PR-4102',
        brand: 'زرین‌پال',
        category: 'لباس خواب',
        productType: 'کالا',
        unit: 'عدد',
        unitPrice: 452000,
        stock: 84,
        swatch: '#E4B8C8',
    },
    {
        id: 'item-5',
        name: 'سوتین دانتل فنردار',
        sku: 'PR-4108',
        brand: 'زرین‌پال',
        category: 'لباس زیر',
        productType: 'کالا',
        unit: 'عدد',
        unitPrice: 318000,
        stock: 12,
        swatch: '#9BB7D4',
    },
    {
        id: 'item-7',
        name: 'تاپ بندی نخی',
        sku: 'PR-4120',
        brand: 'زرین‌پال',
        category: 'تاپ',
        productType: 'کالا',
        unit: 'عدد',
        unitPrice: 186000,
        stock: 56,
        swatch: '#C9A9E4',
    },
]

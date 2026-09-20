import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type StockTakingItem = {
    id: string
    trackingCode: string
    warehouseCode: string
    warehouseName: string
    productType: string
    productCode: string
    productName: string
    unit: string
    quantity: number
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد پیگیری', isChecked: true },
    { id: 'col-1', header_label: 'کد انبار', isChecked: true },
    { id: 'col-2', header_label: 'نام انبار', isChecked: true },
    { id: 'col-3', header_label: 'نوع محصول', isChecked: true },
    { id: 'col-4', header_label: 'کد محصول', isChecked: true },
    { id: 'col-5', header_label: 'نام محصول', isChecked: true },
    { id: 'col-6', header_label: 'واحد', isChecked: true },
    { id: 'col-7', header_label: 'تعداد', isChecked: true },
]

export const STOCK_TAKING_DUMMY: StockTakingItem[] = [
    {
        id: '1',
        trackingCode: 'REL-219',
        warehouseCode: 'WH-1001',
        warehouseName: 'مرکزی تهران',
        productType: 'ست',
        productCode: '7352-63',
        productName: 'لباس خواب ساتن',
        unit: 'عدد',
        quantity: 420,
    },
    {
        id: '2',
        trackingCode: 'REL-218',
        warehouseCode: 'WH-1002',
        warehouseName: 'انبار کرج',
        productType: 'تک',
        productCode: '8411-20',
        productName: 'سوتین نخی لوسی',
        unit: 'عدد',
        quantity: 186,
    },
    {
        id: '3',
        trackingCode: 'REL-217',
        warehouseCode: 'WH-1001',
        warehouseName: 'مرکزی تهران',
        productType: 'پک',
        productCode: '9204-11',
        productName: 'جوراب ۶ عددی',
        unit: 'پک',
        quantity: 95,
    },
    {
        id: '4',
        trackingCode: 'REL-216',
        warehouseCode: 'WH-1003',
        warehouseName: 'انبار فروشگاه',
        productType: 'ست',
        productCode: '6108-44',
        productName: 'ست لباس خواب ساتن',
        unit: 'عدد',
        quantity: 64,
    },
]

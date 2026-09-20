import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { StockReturnItem, StockReturnRowData } from '../types'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد مرجوعی', isChecked: true },
    { id: 'col-1', header_label: 'مشتری', isChecked: true },
    { id: 'col-2', header_label: 'کد مرسوله', isChecked: true },
    { id: 'col-3', header_label: 'تعداد اقلام', isChecked: true },
    { id: 'col-4', header_label: 'وضعیت', isChecked: true },
    { id: 'col-5', header_label: 'زمان', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]

export const EXPANDED_ITEM_COLUMNS = [
    { id: 'productName', label: 'نام کالا' },
    { id: 'unit', label: 'واحد' },
    { id: 'declaredQty', label: 'تعداد اعلامی' },
    { id: 'action', label: 'اکشن' },
] as const

export const ITEM_GRID_CLASS =
    'grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-3'

const DUMMY_ITEMS: StockReturnItem[] = [
    {
        id: 'item-1',
        productName: 'شیر پرچرب ۱ لیتری',
        unit: 'عدد',
        declaredQty: '۱۲',
    },
    {
        id: 'item-2',
        productName: 'ماست چکیده ۹۰۰ گرم',
        unit: 'بسته',
        declaredQty: '۸',
    },
]

export const STOCK_RETURN_DUMMY: StockReturnRowData[] = [
    {
        id: 'RTN-770',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5530',
        itemCount: '24 قلم',
        status: 'returned-to-stock',
        registeredAt: '2025-12-09T14:53:00.000Z',
        items: DUMMY_ITEMS,
    },
    {
        id: 'RTN-769',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5529',
        itemCount: '24 قلم',
        status: 'awaiting-receipt',
        registeredAt: '2025-12-09T14:53:00.000Z',
        filterTab: 'awaiting-receipt',
        items: DUMMY_ITEMS,
    },
    {
        id: 'RTN-768',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5528',
        itemCount: '24 قلم',
        status: 'quality-check',
        registeredAt: '2025-12-09T14:53:00.000Z',
        filterTab: 'under-review',
        items: DUMMY_ITEMS,
    },
    {
        id: 'RTN-767',
        customerName: 'نام مشتری',
        consignmentId: 'PCK-5527',
        itemCount: '12 قلم',
        status: 'quality-check',
        registeredAt: '2025-12-09T14:10:00.000Z',
        filterTab: 'under-review',
        items: [
            {
                id: 'item-3',
                productName: 'دوغ سنتی ۱.۵ لیتر',
                unit: 'بطری',
                declaredQty: '۱۲',
            },
        ],
    },
]

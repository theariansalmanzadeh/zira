import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { LocationGoodsRowData } from './components/TableRow'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'title', header_label: 'عنوان کالا', isChecked: true },
    { id: 'sku', header_label: 'شناسه کالا', isChecked: true },
    { id: 'warehouseAddress', header_label: 'آدرس در انبار', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'stock', header_label: 'موجودی', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]

export const DEFAULT_LOCATION_GOODS_TITLE =
    'کالاهای ناحیه A . قفسه A-R1 . طبقه 1'

const ADDRESSES = ['A-R1-S2-B03', 'C-R3-S1-B11', 'B-R2-S4-B07'] as const
const STATUSES: LocationGoodsRowData['status'][] = [
    'in-stock',
    'in-stock',
    'out-of-stock',
    'low-stock',
    'in-stock',
    'out-of-stock',
    'low-stock',
    'in-stock',
]

export const LOCATION_GOODS_DUMMY: LocationGoodsRowData[] = STATUSES.map(
    (status, index) => ({
        id: String(index + 1),
        title: 'عنوان کالا',
        sku: '7352-63',
        warehouseAddress: ADDRESSES[index % ADDRESSES.length],
        status,
        quantity: '420',
        variantCount: '12',
    })
)

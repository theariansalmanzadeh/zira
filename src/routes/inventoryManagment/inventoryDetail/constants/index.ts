import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type { InventoryEmployeeRowData } from '../component/TableRow'
import type { GoodsListRowData } from '../component/GoodsListTableRow'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'userName', header_label: 'نام کاربر', isChecked: true },
    { id: 'userCode', header_label: 'کد کاربر', isChecked: true },
    { id: 'role', header_label: 'نقش', isChecked: true },
    { id: 'permissions', header_label: 'دسترسی‌ها', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]

export const GOODS_LIST_COLOUMN: TableFilterItem[] = [
    { id: 'title', header_label: 'عنوان کالا', isChecked: true },
    { id: 'sku', header_label: 'شناسه کالا', isChecked: true },
    { id: 'warehouseAddress', header_label: 'آدرس در انبار', isChecked: true },
    { id: 'status', header_label: 'وضعیت', isChecked: true },
    { id: 'stock', header_label: 'موجودی', isChecked: true },
    { id: 'actions', header_label: '', isChecked: true, className: 'w-[1%]' },
]

export const INVENTORY_EMPLOYEES_DUMMY: InventoryEmployeeRowData[] = [
    {
        id: '1',
        name: 'نام کاربر',
        code: 'PR0239',
        role: '-',
        permissions: '-',
        status: 'active',
    },
    {
        id: '2',
        name: 'نام کاربر',
        code: 'PR0239',
        role: '-',
        permissions: '-',
        status: 'inactive',
    },
    {
        id: '3',
        name: 'نام کاربر',
        code: 'PR0239',
        role: '-',
        permissions: '-',
        status: 'active',
    },
]

export const INVENTORY_GOODS_DUMMY: GoodsListRowData[] = [
    {
        id: '1',
        title: 'عنوان کالا',
        sku: '7352-63',
        warehouseAddress: 'A-R1-S2-B03',
        status: 'in-stock',
        quantity: '420',
        variantCount: '12',
    },
    {
        id: '2',
        title: 'عنوان کالا',
        sku: '7352-63',
        warehouseAddress: 'A-R1-S2-B03',
        status: 'in-stock',
        quantity: '420',
        variantCount: '12',
    },
]

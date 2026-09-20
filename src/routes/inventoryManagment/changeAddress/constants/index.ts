import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type {
    ChangeAddressDetailItem,
    ChangeAddressRowData,
} from '../types'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'col-0', header_label: 'کد پیگیری', isChecked: true },
    { id: 'col-1', header_label: 'کد انبار', isChecked: true },
    { id: 'col-2', header_label: 'نام انبار', isChecked: true },
    { id: 'col-3', header_label: 'کد محصول', isChecked: true },
    { id: 'col-4', header_label: 'نام محصول', isChecked: true },
    { id: 'col-5', header_label: 'واحد', isChecked: true },
    { id: 'col-6', header_label: 'تعداد', isChecked: true },
    { id: 'actions-0', header_label: '', isChecked: true },
]

export const DETAIL_COLUMNS = [
    { id: 'oldAddress', label: 'آدرس قدیم در انبار' },
    { id: 'newAddress', label: 'آدرس جدید در انبار' },
    { id: 'date', label: 'تاریخ' },
    { id: 'managerName', label: 'نام مسئول انبار' },
    { id: 'description', label: 'توضیحات' },
] as const

export const DETAIL_GRID_CLASS =
    'grid grid-cols-[repeat(5,minmax(0,1fr))] items-center gap-3'

const createDetail = (
    detail: ChangeAddressDetailItem
): [ChangeAddressDetailItem] => [detail]

export const CHANGE_ADDRESS_DUMMY: ChangeAddressRowData[] = [
    {
        id: '1',
        trackingCode: 'REL-219',
        warehouseCode: 'WH-1001',
        warehouseName: 'مرکزی تهران',
        productCode: '7352-63',
        productName: 'لباس خواب ساتن',
        unit: 'عدد',
        quantity: '۲۴',
        details: createDetail({
            id: 'd-1',
            oldAddress: 'A-R1-S2-B03',
            newAddress: 'A-R2-S1-B05',
            date: '2025-12-09T00:00:00.000Z',
            managerName: 'رضا کاظمی',
            description: 'جابه‌جایی به قفسه نزدیک‌تر به خروجی',
        }),
    },
    {
        id: '2',
        trackingCode: 'REL-218',
        warehouseCode: 'WH-1002',
        warehouseName: 'انبار غرب',
        productCode: '8120-14',
        productName: 'روتختی نخی',
        unit: 'عدد',
        quantity: '۱۲',
        filterTab: 'pending',
        details: createDetail({
            id: 'd-2',
            oldAddress: 'B-R3-S1-B12',
            newAddress: 'B-R1-S4-B02',
            date: '2025-12-08T00:00:00.000Z',
            managerName: 'مریم احمدی',
            description: 'اصلاح آدرس پس از بازچینی قفسه‌ها',
        }),
    },
    {
        id: '3',
        trackingCode: 'REL-217',
        warehouseCode: 'WH-1001',
        warehouseName: 'مرکزی تهران',
        productCode: '4410-09',
        productName: 'حوله حمام',
        unit: 'عدد',
        quantity: '۸',
        filterTab: 'in-transit',
        details: createDetail({
            id: 'd-3',
            oldAddress: 'C-R2-S3-B08',
            newAddress: 'C-R2-S2-B11',
            date: '2025-12-07T00:00:00.000Z',
            managerName: 'علی رضایی',
            description: 'انتقال به ردیف هم‌دسته',
        }),
    },
    {
        id: '4',
        trackingCode: 'REL-216',
        warehouseCode: 'WH-1003',
        warehouseName: 'شعبه اصفهان',
        productCode: '2201-55',
        productName: 'تی‌شرت نخی',
        unit: 'عدد',
        quantity: '۳۰',
        filterTab: 'completed',
        details: createDetail({
            id: 'd-4',
            oldAddress: 'A-R4-S1-B01',
            newAddress: 'A-R1-S1-B09',
            date: '2025-12-06T00:00:00.000Z',
            managerName: 'رضا کاظمی',
            description: 'تکمیل جابه‌جایی موجودی',
        }),
    },
]

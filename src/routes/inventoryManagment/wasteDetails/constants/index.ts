import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'

export const RECEIVER_OPTIONS: FormDropdownOption[] = [
    { label: 'علی رضایی', value: 'ali-rezaei' },
    { label: 'مریم کریمی', value: 'maryam-karimi' },
    { label: 'حسین محمدی', value: 'hossein-mohammadi' },
]

export const WAREHOUSE_OPTIONS: FormDropdownOption[] = [
    { label: 'انبار مرکزی تهران', value: 'tehran-central' },
    { label: 'انبار کرج', value: 'karaj' },
    { label: 'انبار اصفهان', value: 'isfahan' },
]

export const ZONE_OPTIONS: FormDropdownOption[] = [
    { label: 'C - ناحیه مرجوعی و قرنطینه', value: 'zone-c' },
    { label: 'A - ناحیه فروش', value: 'zone-a' },
    { label: 'B - ناحیه ذخیره‌سازی', value: 'zone-b' },
]

export const RACK_OPTIONS: FormDropdownOption[] = [
    { label: 'قفسه R1', value: 'rack-r1' },
    { label: 'قفسه R2', value: 'rack-r2' },
    { label: 'قفسه R3', value: 'rack-r3' },
]

export const SHELF_OPTIONS: FormDropdownOption[] = [
    { label: 'طبقه S1', value: 'shelf-s1' },
    { label: 'طبقه S2', value: 'shelf-s2' },
    { label: 'طبقه S3', value: 'shelf-s3' },
]

export const BOX_OPTIONS: FormDropdownOption[] = [
    { label: 'جعبه B1', value: 'box-b1' },
    { label: 'جعبه B2', value: 'box-b2' },
    { label: 'جعبه B3', value: 'box-b3' },
]

export const WASTE_DETAILS_DEFAULTS = {
    requestCode: 'RT-1041',
    requestDate: '۱۴۰۴/۱۲/۱۲',
    customer: 'حسین احمدی (CU-2344)',
    product: '۷۳۵۲-۶۳ · لباس خواب ساتن',
    declaredQty: '۶ عدد',
    countedQty: '۶',
    receiverId: 'ali-rezaei',
    warehouseId: 'tehran-central',
    zoneId: 'zone-c',
    rackId: 'rack-r1',
    shelfId: 'shelf-s1',
    boxId: 'box-b1',
}

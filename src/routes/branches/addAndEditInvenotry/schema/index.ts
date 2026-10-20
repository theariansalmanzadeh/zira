import * as z from 'zod'
import type { InsuranceStatus, Warehouse } from '@/src/api/types/admin/organization'

export const INSURANCE_STATUS_OPTIONS: {
    label: string
    value: InsuranceStatus
}[] = [
    { label: 'بیمه‌نشده', value: 'UNINSURED' },
    { label: 'بیمه‌شده', value: 'INSURED' },
    { label: 'منقضی', value: 'EXPIRED' },
    { label: 'در حال بررسی', value: 'UNDER_REVIEW' },
]

export const addAndEditInventorySchema = z.object({
    code: z.string().trim().min(1, 'کد انبار الزامی است'),
    name: z.string().trim().min(1, 'نام انبار الزامی است'),
    address: z.string().trim(),
    phone: z.string().trim(),
    area_sqm: z.number().min(0, 'متراژ نمی‌تواند منفی باشد'),
    keeper_id: z.string().trim().min(1, 'انباردار را انتخاب کنید'),
    insurance_status: z.enum([
        'INSURED',
        'UNINSURED',
        'EXPIRED',
        'UNDER_REVIEW',
    ]),
    is_active: z.boolean(),
})

export type AddAndEditInventoryFormValues = z.infer<
    typeof addAndEditInventorySchema
>

export const ADD_AND_EDIT_INVENTORY_DEFAULT_VALUES: AddAndEditInventoryFormValues =
    {
        code: '',
        name: '',
        address: '',
        phone: '',
        area_sqm: 0,
        keeper_id: '',
        insurance_status: 'UNINSURED',
        is_active: true,
    }

export const getAddAndEditInventoryDefaultValues = (
    warehouse?: Warehouse | null
): AddAndEditInventoryFormValues => {
    if (!warehouse) return { ...ADD_AND_EDIT_INVENTORY_DEFAULT_VALUES }

    const area = Number(warehouse.area_sqm)

    return {
        code: warehouse.code ?? '',
        name: warehouse.name ?? '',
        address: warehouse.address ?? '',
        phone: warehouse.phone ?? '',
        area_sqm: Number.isFinite(area) ? area : 0,
        keeper_id: warehouse.keeper_id ?? '',
        insurance_status: warehouse.insurance_status ?? 'UNINSURED',
        is_active: warehouse.is_active,
    }
}

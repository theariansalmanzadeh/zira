import * as z from 'zod'
import type { BrandOut } from '@/src/api/types/admin/catalog'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const BRAND_ORIGIN_OPTIONS = [
    { label: 'داخلی', value: 'DOMESTIC' },
    { label: 'وارداتی', value: 'IMPORTED' },
    { label: 'لایسنس', value: 'LICENSED' },
] as const

export const BRAND_STATUS_OPTIONS = [
    { label: 'فعال', value: 'ACTIVE' },
    { label: 'پیش‌نویس', value: 'DRAFT' },
    { label: 'غیرفعال', value: 'INACTIVE' },
] as const

export const ACTIVITY_FIELD_OPTIONS = [
    { label: 'لباس زیر و راحتی', value: 'underwear' },
    { label: 'لباس خواب', value: 'sleepwear' },
    { label: 'ورزشی', value: 'sport' },
    { label: 'لباس زیر زنانه', value: 'womens-underwear' },
]

export const COUNTRY_OPTIONS = [
    { label: 'ایران', value: 'iran' },
    { label: 'ترکیه', value: 'turkey' },
    { label: 'آلمان', value: 'germany' },
]

export const addAndEditBrandSchema = z.object({
    persianName: requiredString('نام برند (فارسی) الزامی است'),
    latinName: z.string(),
    activityField: requiredString('حوزه فعالیت الزامی است'),
    country: z.string(),
    origin: z.enum(['DOMESTIC', 'IMPORTED', 'LICENSED']),
    status: z.enum(['ACTIVE', 'DRAFT', 'INACTIVE']),
    description: z.string(),
    logo: z.custom<File | null>(() => true).nullable(),
})

export type AddAndEditBrandFormValues = z.infer<typeof addAndEditBrandSchema>

export const ADD_AND_EDIT_BRAND_DEFAULT_VALUES: AddAndEditBrandFormValues = {
    persianName: '',
    latinName: '',
    activityField: '',
    country: '',
    origin: 'DOMESTIC',
    status: 'ACTIVE',
    description: '',
    logo: null,
}

export const getAddAndEditBrandDefaultValues = (
    overrides?: Partial<AddAndEditBrandFormValues>
): AddAndEditBrandFormValues => ({
    ...ADD_AND_EDIT_BRAND_DEFAULT_VALUES,
    ...overrides,
})

export const mapBrandToFormValues = (
    brand: BrandOut
): AddAndEditBrandFormValues => ({
    persianName: brand.name ?? '',
    latinName: brand.latin_name ?? '',
    activityField: brand.scope ?? '',
    country: brand.country ?? '',
    origin: brand.origin ?? 'DOMESTIC',
    status: brand.status ?? 'ACTIVE',
    description: brand.description ?? '',
    logo: null,
})

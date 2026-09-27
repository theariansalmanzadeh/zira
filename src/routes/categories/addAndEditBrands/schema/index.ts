import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const BRAND_ORIGIN_OPTIONS = [
    { label: 'داخلی', value: 'internal' },
    { label: 'وارداتی', value: 'imported' },
    { label: 'لایسنس', value: 'license' },
] as const

export const BRAND_STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'پیش‌نویس', value: 'draft' },
    { label: 'غیرفعال', value: 'inactive' },
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
    origin: z.enum(['internal', 'imported', 'license']),
    status: z.enum(['active', 'draft', 'inactive']),
    website: z.string(),
    description: z.string(),
})

export type AddAndEditBrandFormValues = z.infer<typeof addAndEditBrandSchema>

export const ADD_AND_EDIT_BRAND_DEFAULT_VALUES: AddAndEditBrandFormValues = {
    persianName: '',
    latinName: '',
    activityField: '',
    country: '',
    origin: 'internal',
    status: 'active',
    website: '',
    description: '',
}

export const BRAND_FORM_PRESETS: Record<string, AddAndEditBrandFormValues> = {
    'brand-1': {
        persianName: 'لمیس',
        latinName: 'Lamis',
        activityField: 'underwear',
        country: 'iran',
        origin: 'internal',
        status: 'active',
        website: 'lamis.ir',
        description: '',
    },
}

export const getAddAndEditBrandDefaultValues = (
    overrides?: Partial<AddAndEditBrandFormValues>
): AddAndEditBrandFormValues => ({
    ...ADD_AND_EDIT_BRAND_DEFAULT_VALUES,
    ...overrides,
})

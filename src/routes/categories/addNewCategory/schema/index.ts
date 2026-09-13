import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

const dropdownValue = (message: string) => z.string().min(1, message)

export const addNewCategorySchema = z.object({
    id: requiredString('شناسه الزامی است'),
    title: requiredString('عنوان دسته‌بندی الزامی است'),
    status: dropdownValue('انتخاب وضعیت الزامی است'),
    level: dropdownValue('انتخاب سطح الزامی است'),
    bannerImage: z.instanceof(File).optional().nullable(),
})

export type AddNewCategoryFormValues = z.infer<typeof addNewCategorySchema>

export const ADD_NEW_CATEGORY_DEFAULT_VALUES: AddNewCategoryFormValues = {
    id: 'CAT-6353',
    title: '',
    status: 'active',
    level: '',
    bannerImage: null,
}

export const STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

export const LEVEL_OPTIONS = [
    { label: 'سطح ۱', value: 'level-1' },
    { label: 'سطح ۲', value: 'level-2' },
    { label: 'سطح ۳', value: 'level-3' },
]

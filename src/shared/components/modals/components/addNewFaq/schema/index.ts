import * as z from 'zod'
import {
    FAQ_CATEGORY_LABELS,
    type FaqCategoryKey,
} from '@/src/routes/contentManagment/faq/constants'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const categoryOptionSchema = z.object({
    id: z.string().min(1),
    label: z.string().min(1),
})

export type CategoryOption = z.infer<typeof categoryOptionSchema>

export const DEFAULT_CATEGORIES: CategoryOption[] = (
    Object.entries(FAQ_CATEGORY_LABELS) as [FaqCategoryKey, string][]
).map(([id, label]) => ({ id, label }))

export const addNewFaqFormSchema = z.object({
    categoryId: requiredString('انتخاب گروه الزامی است'),
    question: requiredString('سوال الزامی است'),
    answer: requiredString('پاسخ الزامی است'),
    categories: z.array(categoryOptionSchema).min(1),
    isAddingCategory: z.boolean(),
    newCategoryName: z.string(),
})

export type AddNewFaqFormValues = z.infer<typeof addNewFaqFormSchema>

export type AddNewFaqPayload = {
    categoryId: string
    categoryLabel: string
    question: string
    answer: string
}

export type AddNewFaqModalData = {
    isEditing?: boolean
    defaultValues?: Partial<AddNewFaqFormValues>
    onSubmit?: (payload: AddNewFaqPayload) => void
}

export const ADD_NEW_FAQ_DEFAULT_VALUES: AddNewFaqFormValues = {
    categoryId: DEFAULT_CATEGORIES[0]?.id ?? 'material',
    question: '',
    answer: '',
    categories: DEFAULT_CATEGORIES,
    isAddingCategory: false,
    newCategoryName: '',
}

export const getAddNewFaqDefaultValues = (
    overrides?: Partial<AddNewFaqFormValues>
): AddNewFaqFormValues => ({
    ...ADD_NEW_FAQ_DEFAULT_VALUES,
    ...overrides,
    categories: overrides?.categories ?? ADD_NEW_FAQ_DEFAULT_VALUES.categories,
})

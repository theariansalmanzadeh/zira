import * as z from 'zod'
import type { ProductSlideItem } from '@/src/routes/contentManagment/landing/components/sectionTypeBody/constants'

export const addProductByCategorySchema = z.object({
    step: z.number().min(0).max(3),
    mainGroupId: z.string(),
    middleGroupId: z.string(),
    subGroupId: z.string(),
    productId: z.string(),
})

export type AddProductByCategoryFormValues = z.infer<
    typeof addProductByCategorySchema
>

export type AddProductByCategoryPayload = {
    mainGroupId: string
    middleGroupId: string
    subGroupId: string
    productId: string
}

export type AddProductByCategoryModalData = {
    onSubmit?: (payload: AddProductByCategoryPayload) => void
}

export const ADD_PRODUCT_BY_CATEGORY_DEFAULT_VALUES: AddProductByCategoryFormValues =
    {
        step: 0,
        mainGroupId: '',
        middleGroupId: '',
        subGroupId: '',
        productId: '',
    }

export const createProductSlideFromSelection = (
    productId: string,
    label: string
): ProductSlideItem => ({
    id: `product-${productId}-${Date.now()}`,
    title: label,
    category: 'انتخاب‌شده',
    price: 0,
})

import * as z from 'zod'
import type { BrandSlideItem } from '@/src/routes/contentManagment/landing/components/sectionTypeBody/constants'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const addBrandFormSchema = z.object({
    fileName: z.string().optional().or(z.literal('')),
    fileSize: z.string().optional().or(z.literal('')),
    title: requiredString('نام برند الزامی است'),
    slogan: z.string(),
    description: z.string(),
    status: z.enum(['published', 'draft']),
})

export type AddBrandFormValues = z.infer<typeof addBrandFormSchema>

export type AddBrandPayload = {
    title: string
    slogan: string
    description: string
    status: 'published' | 'draft'
    fileName: string
}

export type AddBrandModalData = {
    isEditing?: boolean
    defaultValues?: Partial<AddBrandFormValues>
    onSubmit?: (payload: AddBrandPayload) => void
}

export const ADD_BRAND_DEFAULT_VALUES: AddBrandFormValues = {
    fileName: '',
    fileSize: '',
    title: '',
    slogan: '',
    description: '',
    status: 'draft',
}

export const getAddBrandDefaultValues = (
    overrides?: Partial<AddBrandFormValues>
): AddBrandFormValues => ({
    ...ADD_BRAND_DEFAULT_VALUES,
    ...overrides,
})

export const createBrandSlideFromPayload = (
    payload: AddBrandPayload,
    current?: BrandSlideItem
): BrandSlideItem => ({
    id: current?.id ?? `brand-${Date.now()}`,
    title: payload.title.trim(),
    subtitle: payload.slogan.trim() || current?.subtitle || '',
    description: payload.description.trim(),
    fileName: payload.fileName,
    status: payload.status,
    thumbnailClassName: current?.thumbnailClassName ?? 'bg-[#C4A35A]',
    isPrimary: current?.isPrimary,
})

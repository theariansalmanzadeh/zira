import * as z from 'zod'
import type { BannerSlideItem } from '@/src/routes/contentManagment/landing/components/sectionTypeBody/constants'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const addBannerFormSchema = z.object({
    fileName: requiredString('انتخاب تصویر بنر الزامی است'),
    fileSize: z.string().optional().or(z.literal('')),
    title: requiredString('نام بنر الزامی است'),
    ctaLabel: z.string(),
    link: z.string(),
    orderLabel: z.string(),
    status: z.enum(['published', 'draft']),
})

export type AddBannerFormValues = z.infer<typeof addBannerFormSchema>

export type AddBannerPayload = {
    title: string
    ctaLabel: string
    link: string
    orderLabel: string
    status: 'published' | 'draft'
    fileName: string
}

export type AddBannerModalData = {
    isEditing?: boolean
    defaultValues?: Partial<AddBannerFormValues>
    onSubmit?: (payload: AddBannerPayload) => void
}

export const ADD_BANNER_DEFAULT_VALUES: AddBannerFormValues = {
    fileName: '',
    fileSize: '',
    title: '',
    ctaLabel: '',
    link: '',
    orderLabel: '',
    status: 'published',
}

export const getAddBannerDefaultValues = (
    overrides?: Partial<AddBannerFormValues>
): AddBannerFormValues => ({
    ...ADD_BANNER_DEFAULT_VALUES,
    ...overrides,
})

export const createBannerSlideFromPayload = (
    payload: AddBannerPayload,
    id?: string
): BannerSlideItem => {
    const slideNo = payload.orderLabel.trim() || 'اسلاید جدید'
    const cta = payload.ctaLabel.trim() || '—'

    return {
        id: id ?? `slide-${Date.now()}`,
        title: payload.title.trim(),
        subtitle: `${slideNo} · CTA: ${cta}`,
        status: payload.status,
        thumbnailClassName: 'bg-primary/40',
    }
}

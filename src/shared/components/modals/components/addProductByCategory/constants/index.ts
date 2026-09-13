import type { StepperStatusStep } from '@/src/shared/components/StepperStatus/types'

export type CategoryOption = {
    id: string
    label: string
    count: number
}

export type ProductOption = {
    id: string
    label: string
    count?: number
}

export const ADD_PRODUCT_STEPS = [
    { id: 'main-group', label: 'گروه اصلی' },
    { id: 'middle-group', label: 'گروه میانی' },
    { id: 'sub-group', label: 'گروه فرعی' },
    { id: 'select-product', label: 'انتخاب کالا' },
] as const

export type AddProductStepId = (typeof ADD_PRODUCT_STEPS)[number]['id']

export const STEP_PROMPTS: Record<AddProductStepId, string> = {
    'main-group': 'گروه اصلی را انتخاب کنید',
    'middle-group': 'گروه میانی را انتخاب کنید',
    'sub-group': 'گروه فرعی را انتخاب کنید',
    'select-product': 'کالا را انتخاب کنید',
}

export const MAIN_GROUP_OPTIONS: CategoryOption[] = [
    { id: 'women', label: 'زنانه', count: 13 },
    { id: 'men', label: 'مردانه', count: 6 },
    { id: 'kids', label: 'بچگانه', count: 5 },
]

export const MIDDLE_GROUP_OPTIONS: Record<string, CategoryOption[]> = {
    women: [
        { id: 'underwear', label: 'لباس زیر', count: 8 },
        { id: 'loungewear', label: 'لباس راحتی', count: 3 },
        { id: 'sleepwear', label: 'لباس خواب', count: 2 },
    ],
    men: [
        { id: 'men-underwear', label: 'لباس زیر', count: 4 },
        { id: 'men-sport', label: 'ورزشی', count: 2 },
    ],
    kids: [
        { id: 'kids-baby', label: 'نوزاد', count: 3 },
        { id: 'kids-child', label: 'کودک', count: 2 },
    ],
}

export const SUB_GROUP_OPTIONS: Record<string, CategoryOption[]> = {
    underwear: [
        { id: 'bra', label: 'سوتین', count: 5 },
        { id: 'brief', label: 'شورت', count: 3 },
    ],
    loungewear: [
        { id: 'top', label: 'تاپ', count: 2 },
        { id: 'set', label: 'ست', count: 1 },
    ],
    sleepwear: [{ id: 'night-set', label: 'ست خواب', count: 2 }],
    'men-underwear': [
        { id: 'men-brief', label: 'شورت', count: 3 },
        { id: 'men-tank', label: 'زیرپوش', count: 1 },
    ],
    'men-sport': [{ id: 'men-sport-top', label: 'تاپ ورزشی', count: 2 }],
    'kids-baby': [{ id: 'baby-body', label: 'بادی', count: 3 }],
    'kids-child': [{ id: 'child-set', label: 'ست کودک', count: 2 }],
}

export const PRODUCT_OPTIONS: Record<string, ProductOption[]> = {
    bra: [
        { id: 'p1', label: 'سوتین اسپرت کراس', count: 1 },
        { id: 'p2', label: 'سوتین نخی کلاسیک', count: 1 },
        { id: 'p3', label: 'سوتین پوش‌آپ', count: 1 },
    ],
    brief: [
        { id: 'p4', label: 'شورت نخی کلاسیک', count: 1 },
        { id: 'p5', label: 'شورت لیزری', count: 1 },
    ],
    top: [{ id: 'p6', label: 'تاپ بندی راحتی', count: 1 }],
    set: [{ id: 'p7', label: 'ست راحتی', count: 1 }],
    'night-set': [{ id: 'p8', label: 'ست لباس خواب ساتن', count: 1 }],
    'men-brief': [{ id: 'p9', label: 'شورت مردانه', count: 1 }],
    'men-tank': [{ id: 'p10', label: 'زیرپوش مردانه', count: 1 }],
    'men-sport-top': [{ id: 'p11', label: 'تاپ ورزشی مردانه', count: 1 }],
    'baby-body': [{ id: 'p12', label: 'بادی نوزاد', count: 1 }],
    'child-set': [{ id: 'p13', label: 'ست کودک', count: 1 }],
}

export const buildStepperSteps = (
    activeStepIndex: number
): StepperStatusStep[] =>
    ADD_PRODUCT_STEPS.map((step, index) => ({
        id: step.id,
        label: step.label,
        status:
            index < activeStepIndex
                ? 'complete'
                : index === activeStepIndex
                  ? 'pending'
                  : 'not_reached',
    }))

import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const INPUT_TYPE_OPTIONS = [
    { label: 'انتخابی (سواچ)', value: 'swatch' },
    { label: 'انتخابی (متن)', value: 'select-text' },
    { label: 'متنی', value: 'text' },
    { label: 'بولین', value: 'boolean' },
]

export const PRODUCT_ROLE_OPTIONS = [
    { label: 'متغیرساز', value: 'variant' },
    { label: 'توصیفی', value: 'descriptive' },
    { label: 'فیلتر', value: 'filter' },
]

export const FORM_DISPLAY_OPTIONS = [
    { label: 'سواچ رنگ', value: 'color-swatch' },
    { label: 'دراپ‌داون', value: 'dropdown' },
    { label: 'ورودی متن', value: 'text-input' },
    { label: 'چک‌باکس', value: 'checkbox' },
]

export const addAndUpdateVariableSchema = z.object({
    name: requiredString('نام ویژگی الزامی است'),
    inputType: requiredString('نوع ورودی الزامی است'),
    productRole: requiredString('نقش در تعریف کالا الزامی است'),
    formDisplayControl: z.string(),
    shortDescription: z.string(),
    required: z.boolean(),
    showInStoreFilters: z.boolean(),
    showOnPublicProductPage: z.boolean(),
    values: z.array(z.string()),
})

export type AddAndUpdateVariableFormValues = z.infer<
    typeof addAndUpdateVariableSchema
>

export const ADD_AND_UPDATE_VARIABLE_DEFAULT_VALUES: AddAndUpdateVariableFormValues =
    {
        name: '',
        inputType: '',
        productRole: '',
        formDisplayControl: '',
        shortDescription: '',
        required: true,
        showInStoreFilters: true,
        showOnPublicProductPage: true,
        values: [],
    }

export const VARIABLE_FORM_PRESETS: Record<
    string,
    AddAndUpdateVariableFormValues
> = {
    '1': {
        name: 'رنگ',
        inputType: 'swatch',
        productRole: 'variant',
        formDisplayControl: 'color-swatch',
        shortDescription: 'رنگ‌های قابل تعریف در ماتریس کالا',
        required: true,
        showInStoreFilters: true,
        showOnPublicProductPage: true,
        values: ['مشکی', 'سفید', 'زغالی', 'سرمه‌ای', 'سرخابی'],
    },
    '2': {
        name: 'سایز',
        inputType: 'select-text',
        productRole: 'variant',
        formDisplayControl: 'dropdown',
        shortDescription: 'سایزهای قابل انتخاب برای کالا',
        required: true,
        showInStoreFilters: true,
        showOnPublicProductPage: true,
        values: ['S', 'M', 'L', 'XL'],
    },
    '3': {
        name: 'جنس',
        inputType: 'text',
        productRole: 'descriptive',
        formDisplayControl: 'text-input',
        shortDescription: 'جنس پارچه یا مواد کالا',
        required: false,
        showInStoreFilters: true,
        showOnPublicProductPage: false,
        values: ['نخی', 'ساتن', 'دانتل'],
    },
    '4': {
        name: 'فنردار بودن',
        inputType: 'boolean',
        productRole: 'filter',
        formDisplayControl: 'checkbox',
        shortDescription: 'داشتن یا نداشتن فنر',
        required: false,
        showInStoreFilters: false,
        showOnPublicProductPage: true,
        values: ['بله', 'خیر'],
    },
}

export const getAddAndUpdateVariableDefaultValues = (
    id?: string | null
): AddAndUpdateVariableFormValues => {
    if (!id) return { ...ADD_AND_UPDATE_VARIABLE_DEFAULT_VALUES, values: [] }

    const preset = VARIABLE_FORM_PRESETS[id]
    if (!preset) return { ...ADD_AND_UPDATE_VARIABLE_DEFAULT_VALUES, values: [] }

    return { ...preset, values: [...preset.values] }
}

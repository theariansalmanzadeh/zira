import * as z from 'zod'
import type { AttributeOut } from '@/src/api/types/admin/catalog'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const INPUT_TYPE_OPTIONS = [
    { label: 'انتخابی', value: 'SELECT' },
    { label: 'سواچ', value: 'SWATCH' },
    { label: 'چندانتخابی', value: 'MULTI' },
    { label: 'پیشنهاد متنی', value: 'TEXT_SUGGEST' },
    { label: 'عددی', value: 'NUMBER' },
    { label: 'بولی', value: 'BOOL' },
    { label: 'محاسباتی', value: 'COMPUTED' },
]

export const PRODUCT_ROLE_OPTIONS = [
    { label: 'مشترک', value: 'COMMON' },
    { label: 'قلم کالا', value: 'ITEM' },
    { label: 'توصیفی', value: 'DESCRIPTIVE' },
]

export const FORM_DISPLAY_OPTIONS = [
    { label: 'چیپ تکی', value: 'CHIP_SINGLE' },
    { label: 'چیپ چندتایی', value: 'CHIP_MULTI' },
    { label: 'دراپ‌داون', value: 'DROPDOWN' },
    { label: 'سواچ', value: 'SWATCH' },
    { label: 'پیشنهاد متنی', value: 'TEXT_SUGGEST' },
    { label: 'عددی', value: 'NUMBER' },
    { label: 'خودکار', value: 'AUTO' },
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
    values: z.array(
        z.object({
            value: z.string(),
            hexCode: z.string().nullable().optional(),
        })
    ),
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

export const getAddAndUpdateVariableDefaultValues = (
    attribute?: AttributeOut | null
): AddAndUpdateVariableFormValues => {
    if (!attribute) {
        return { ...ADD_AND_UPDATE_VARIABLE_DEFAULT_VALUES, values: [] }
    }

    return {
        name: attribute.name ?? '',
        inputType: attribute.kind ?? '',
        productRole: attribute.role ?? '',
        formDisplayControl: attribute.input_control ?? '',
        shortDescription: attribute.hint ?? '',
        required: Boolean(attribute.is_required),
        showInStoreFilters: Boolean(attribute.is_filterable),
        showOnPublicProductPage: Boolean(attribute.show_in_public),
        values: (attribute.values ?? []).map((item) => ({
            value: item.value,
            hexCode: item.hex_code ?? null,
        })),
    }
}

export const COLOR_CODE_PATTERN = /^[A-Z0-9-]+$/

export const colorFormSchema = z.object({
    code: requiredString('کد الزامی است').regex(
        COLOR_CODE_PATTERN,
        'کد فقط می‌تواند شامل حروف بزرگ انگلیسی، اعداد و خط تیره باشد'
    ),
    name: requiredString('نام الزامی است'),
    hex_code: requiredString('کد رنگ الزامی است').regex(
        /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        'کد رنگ باید به صورت هگز معتبر باشد (مثلاً #F4B86E)'
    ),
    is_active: z.boolean(),
})

export type ColorFormValues = z.infer<typeof colorFormSchema>

export const COLOR_FORM_DEFAULT_VALUES: ColorFormValues = {
    code: '',
    name: '',
    hex_code: '#F4B86E',
    is_active: true,
}

export const sizeFormSchema = z.object({
    code: requiredString('کد الزامی است').regex(
        COLOR_CODE_PATTERN,
        'کد فقط می‌تواند شامل حروف بزرگ انگلیسی، اعداد و خط تیره باشد'
    ),
    name: requiredString('نام الزامی است'),
    is_active: z.boolean(),
})

export type SizeFormValues = z.infer<typeof sizeFormSchema>

export const SIZE_FORM_DEFAULT_VALUES: SizeFormValues = {
    code: '',
    name: '',
    is_active: true,
}

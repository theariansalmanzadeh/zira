import * as z from 'zod'

export const DISPLAY_STATUS_OPTIONS = [
    { label: 'نمایش در فروشگاه', value: 'ACTIVE' },
    { label: 'عدم نمایش', value: 'HIDDEN' },
    { label: 'پیش‌نویس', value: 'DRAFT' },
] as const

export const VARIATION_PATTERN_OPTIONS = [
    { label: 'رنگ ثابت', value: 'FIXED_COLOR' },
    { label: 'سایز ثابت', value: 'FIXED_SIZE' },
    { label: 'آزاد', value: 'FREE' },
] as const

const componentSchema = z.object({
    item_id: z.string().uuid('شناسه کالا نامعتبر است'),
    quantity: z.number().int().min(1, 'تعداد باید حداقل ۱ باشد'),
})

const fileListSchema = z.array(z.custom<File>((value) => value instanceof File))

export const GALLERY_KIND_ORDER = [
    'DIGIKALA',
    'MANNEQUIN',
    'HUMAN',
] as const

export type GalleryImageKind = (typeof GALLERY_KIND_ORDER)[number]

export const galleryImagesSchema = z.object({
    DIGIKALA: fileListSchema,
    MANNEQUIN: fileListSchema,
    HUMAN: fileListSchema,
})

export type GalleryImagesFormValues = z.infer<typeof galleryImagesSchema>

export const addAndUpdatePackSchema = z
    .object({
        display_name: z.string().trim().optional().or(z.literal('')),
        base_code: z.string().trim().min(1, 'کد آیتم الزامی است'),
        description: z.string().optional().or(z.literal('')),
        status: z.enum(['DRAFT', 'ACTIVE', 'HIDDEN']),
        product_id: z.string().uuid('خانواده کالا را انتخاب کنید'),
        variation_pattern: z.enum(['FIXED_COLOR', 'FIXED_SIZE', 'FREE']),
        unit_id: z.string().uuid('واحد الزامی است'),
        components: z
            .array(componentSchema)
            .min(1, 'حداقل یک کالا باید انتخاب شود'),
        gallery: galleryImagesSchema,
        show_in_public: z.boolean(),
        audience: z.enum(['ALL', 'GROUPS']),
        group_ids: z.array(z.string()),
        slug: z.string().optional().or(z.literal('')),
        meta_title: z.string().optional().or(z.literal('')),
        meta_description: z.string().optional().or(z.literal('')),
        allow_preorder: z.boolean(),
        min_order_qty: z.string().optional().or(z.literal('')),
        max_order_qty: z.string().optional().or(z.literal('')),
        max_preorder_qty: z.string().optional().or(z.literal('')),
    })
    .superRefine((values, ctx) => {
        if (values.audience === 'GROUPS' && values.group_ids.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ['group_ids'],
                message: 'حداقل یک گروه مشتری را انتخاب کنید',
            })
        }
    })

export type AddAndUpdatePackFormValues = z.infer<typeof addAndUpdatePackSchema>

export const ADD_AND_UPDATE_PACK_DEFAULT_VALUES: AddAndUpdatePackFormValues = {
    display_name: '',
    base_code: '',
    description: '',
    status: 'DRAFT',
    product_id: '',
    variation_pattern: 'FIXED_COLOR',
    unit_id: '',
    components: [],
    gallery: {
        DIGIKALA: [],
        MANNEQUIN: [],
        HUMAN: [],
    },
    show_in_public: true,
    audience: 'ALL',
    group_ids: [],
    slug: '',
    meta_title: '',
    meta_description: '',
    allow_preorder: false,
    min_order_qty: '',
    max_order_qty: '',
    max_preorder_qty: '',
}

import { z } from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const campaignNatureSchema = z.enum([
    'DISCOUNT',
    'BUNDLE',
    'SALES_BOOSTER',
    'OCCASION',
    'GIFT',
    'FIRST_PURCHASE',
    'PRODUCT_LAUNCH',
])

export const campaignChannelSchema = z.enum([
    'ALL',
    'ONLINE',
    'APP',
    'IN_STORE',
])

export const campaignAudienceSchema = z.enum([
    'CUSTOMER',
    'GROUP',
    'COOPERATION_LEVEL',
])

export const cooperationLevelSchema = z.enum(['BRONZE', 'SILVER', 'GOLD'])

export const NATURE_OPTIONS = [
    { label: 'تخفیف', value: 'DISCOUNT' },
    { label: 'بسته', value: 'BUNDLE' },
    { label: 'تقویت فروش', value: 'SALES_BOOSTER' },
    { label: 'مناسبتی', value: 'OCCASION' },
    { label: 'هدیه', value: 'GIFT' },
    { label: 'اولین خرید', value: 'FIRST_PURCHASE' },
    { label: 'معرفی محصول', value: 'PRODUCT_LAUNCH' },
]

export const CHANNEL_OPTIONS = [
    { label: 'همه کانال‌ها', value: 'ALL' },
    { label: 'آنلاین', value: 'ONLINE' },
    { label: 'اپلیکیشن', value: 'APP' },
    { label: 'حضوری', value: 'IN_STORE' },
]

export const AUDIENCE_OPTIONS = [
    { label: 'همه مشتریان', value: 'CUSTOMER' },
    { label: 'بر اساس سطح', value: 'COOPERATION_LEVEL' },
    { label: 'مشتریان منتخب', value: 'GROUP' },
]

export const COOPERATION_LEVEL_OPTIONS = [
    { label: 'برنزی', value: 'BRONZE' },
    { label: 'نقره‌ای', value: 'SILVER' },
    { label: 'طلایی', value: 'GOLD' },
]

export const campaignFormSchema = z
    .object({
        name: requiredString('نام کمپین الزامی است'),
        nature: campaignNatureSchema,
        channel: campaignChannelSchema,
        status: z.string(),
        budget: z.string(),
        goal: z.string(),
        description: z.string(),
        startDate: z.date({ message: 'زمان شروع الزامی است' }).optional(),
        endDate: z.date({ message: 'زمان پایان الزامی است' }).optional(),
        scope: z.string(),
        audience: campaignAudienceSchema,
        cooperationLevel: cooperationLevelSchema,
        showInPublicPanel: z.boolean(),
    })
    .superRefine((values, ctx) => {
        if (!values.startDate) {
            ctx.addIssue({
                code: 'custom',
                path: ['startDate'],
                message: 'زمان شروع الزامی است',
            })
        }
        if (!values.endDate) {
            ctx.addIssue({
                code: 'custom',
                path: ['endDate'],
                message: 'زمان پایان الزامی است',
            })
        }
        if (
            values.startDate &&
            values.endDate &&
            values.endDate < values.startDate
        ) {
            ctx.addIssue({
                code: 'custom',
                path: ['endDate'],
                message: 'زمان پایان باید بعد از زمان شروع باشد',
            })
        }
    })

export type CampaignFormValues = z.infer<typeof campaignFormSchema>

export const CAMPAIGN_FORM_DEFAULTS: CampaignFormValues = {
    name: '',
    nature: 'DISCOUNT',
    channel: 'ALL',
    status: 'active',
    budget: '0',
    goal: '',
    description: '',
    startDate: undefined,
    endDate: undefined,
    scope: 'all-products',
    audience: 'CUSTOMER',
    cooperationLevel: 'BRONZE',
    showInPublicPanel: true,
}

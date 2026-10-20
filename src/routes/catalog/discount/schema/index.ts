import * as z from 'zod'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const cashPurchaseDiscountSchema = z.object({
    discountAmount: requiredString('میزان تخفیف الزامی است'),
    minPurchaseAmount: requiredString('حداقل مبلغ خرید الزامی است'),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
})

export type CashPurchaseDiscountValues = z.infer<
    typeof cashPurchaseDiscountSchema
>

export const CASH_PURCHASE_DISCOUNT_DEFAULTS: CashPurchaseDiscountValues = {
    discountAmount: '0',
    minPurchaseAmount: '0',
    startDate: undefined,
    endDate: undefined,
}

export const COMBINED_SCOPE_OPTIONS = [
    { label: 'همه کالاها', value: 'all-products' },
    { label: 'دسته منتخب', value: 'selected-category' },
    { label: 'کالاهای منتخب', value: 'selected-products' },
] as const

export const COMBINED_AUDIENCE_OPTIONS = [
    { label: 'همه مشتریان', value: 'all-customers' },
    { label: 'بر اساس سطح', value: 'by-level' },
    { label: 'مشتریان منتخب', value: 'selected-customers' },
] as const

export const COMBINED_DISCOUNT_TYPE_OPTIONS = [
    { label: 'درصدی', value: 'percent' },
    { label: 'مبلغی', value: 'amount' },
] as const

export const CUSTOMER_LEVEL_VALUES = ['GOLD', 'SILVER', 'BRONZE'] as const

export const combinedDiscountSchema = z.object({
    scope: z.enum(['all-products', 'selected-category', 'selected-products']),
    audience: z.enum(['all-customers', 'by-level', 'selected-customers']),
    categoryIds: z.array(z.string()),
    customerLevels: z.array(z.enum(CUSTOMER_LEVEL_VALUES)),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    discountType: z.enum(['percent', 'amount']),
    discountValue: requiredString('درصد / مبلغ تخفیف الزامی است'),
    minPurchaseCount: requiredString('حداقل تعداد خرید الزامی است'),
})

export type CombinedDiscountValues = z.infer<typeof combinedDiscountSchema>

export const COMBINED_DISCOUNT_DEFAULTS: CombinedDiscountValues = {
    scope: 'all-products',
    audience: 'all-customers',
    categoryIds: [],
    customerLevels: [],
    startDate: undefined,
    endDate: undefined,
    discountType: 'percent',
    discountValue: '0',
    minPurchaseCount: '1',
}

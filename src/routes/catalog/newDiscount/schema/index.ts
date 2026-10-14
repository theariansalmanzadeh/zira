import { z } from 'zod'
import {
    CODE_TYPE_TABS,
    CUSTOMER_LEVEL_OPTIONS,
    SCOPE_OPTIONS,
    type CodeType,
    type CustomerLevel,
    type ScopeType,
} from '../constant'

const codeTypes = CODE_TYPE_TABS.map((tab) => tab.value) as [
    CodeType,
    ...CodeType[],
]
const scopes = SCOPE_OPTIONS.map((option) => option.value) as [
    ScopeType,
    ...ScopeType[],
]
const customerLevels = CUSTOMER_LEVEL_OPTIONS.map((option) => option.value) as [
    CustomerLevel,
    ...CustomerLevel[],
]

export const newDiscountSchema = z.object({
    discountCode: z
        .string()
        .trim()
        .min(1, 'کد تخفیف الزامی است')
        .regex(/^[A-Za-z0-9]+$/, 'فقط حروف و اعداد انگلیسی'),
    codeType: z.enum(codeTypes),
    amount: z.string(),
    minCartAmount: z.string(),
    scope: z.enum(scopes),
    scopeMinPurchaseQty: z.string(),
    scopeMinCartAmount: z.string(),
    products: z.array(
        z.object({
            id: z.string(),
            code: z.string(),
            name: z.string(),
            price: z.number(),
            stock: z.number(),
        })
    ),
    customerGroup: z.string(),
    customerLevels: z.array(z.enum(customerLevels)),
    discountPercent: z.string(),
    maxDiscountCap: z.string(),
    minPurchaseQty: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    duration: z.string().optional(),
    status: z.enum(['active', 'inactive']),
    useWithOtherDiscounts: z.boolean(),
    useWithDiscountCode: z.boolean(),
})

export type NewDiscountFormValues = z.infer<typeof newDiscountSchema>

export const NEW_DISCOUNT_DEFAULT_VALUES: NewDiscountFormValues = {
    discountCode: '',
    codeType: 'percentage',
    amount: '',
    minCartAmount: '0',
    scope: 'all-products',
    scopeMinPurchaseQty: '0',
    scopeMinCartAmount: '0',
    products: [],
    customerGroup: 'loyalty-club',
    customerLevels: [],
    discountPercent: '',
    maxDiscountCap: '',
    minPurchaseQty: '',
    startDate: undefined,
    endDate: undefined,
    duration: '',
    status: 'active',
    useWithOtherDiscounts: true,
    useWithDiscountCode: false,
}

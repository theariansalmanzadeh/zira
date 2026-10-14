import type { CouponCreateIn, CouponUpdateIn } from '@/src/api/types/admin/pricing'
import type { NewDiscountFormValues } from '../schema'

const toNumber = (value?: string) => {
    const normalized = (value ?? '').replace(/[^\d.]/g, '')
    if (!normalized) return null
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : null
}

const toApiDate = (date?: Date) => {
    if (!date) return null
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}T00:00:00`
}

export const toCreateCouponRequest = (
    values: NewDiscountFormValues
): CouponCreateIn => {
    const percent =
        values.codeType === 'percentage'
            ? toNumber(values.amount) ?? toNumber(values.discountPercent)
            : toNumber(values.discountPercent)
    const fixedAmount =
        values.codeType === 'amount' ? toNumber(values.amount) : null
    const kind =
        values.scope === 'selected-products'
            ? 'ITEM'
            : values.scope === 'selected-customers' ||
                values.scope === 'customer-level'
              ? 'ITEM_CUSTOMER'
              : 'CART'

    return {
        discount: {
            title: values.discountCode.trim(),
            kind,
            trigger: 'COUPON',
            value_type:
                values.codeType === 'amount'
                    ? 'AMOUNT'
                    : values.codeType === 'free-shipping'
                      ? 'FREE_SHIPPING'
                      : 'PERCENT',
            percent,
            fixed_amount: fixedAmount,
            start_at: toApiDate(values.startDate),
            end_at: toApiDate(values.endDate),
            min_qty:
                toNumber(values.minPurchaseQty) ??
                toNumber(values.scopeMinPurchaseQty),
            min_amount:
                toNumber(values.minCartAmount) ??
                toNumber(values.scopeMinCartAmount),
            max_cap: toNumber(values.maxDiscountCap),
            stack_with_discount: values.useWithOtherDiscounts,
            stack_with_coupon: values.useWithDiscountCode,
            first_order_only: false,
            targets:
                values.scope === 'selected-products'
                    ? values.products.map((product) => ({
                          target_type: 'ITEM' as const,
                          target_id: product.id,
                      }))
                    : [],
            audiences: [
                ...(values.scope === 'selected-customers' && values.customerGroup
                    ? [
                          {
                              audience_type: 'GROUP' as const,
                              customer_group_id: values.customerGroup,
                          },
                      ]
                    : []),
                ...values.customerLevels.map((level) => ({
                    audience_type: 'COOPERATION_LEVEL' as const,
                    cooperation_level: level,
                })),
            ],
        },
        coupon: {
            code_text: values.discountCode.trim(),
            expires_at: toApiDate(values.endDate),
        },
    }
}

export const toUpdateCouponRequest = (
    values: NewDiscountFormValues
): CouponUpdateIn => ({
    expires_at: toApiDate(values.endDate),
})

import type {
    AudienceIn,
    DiscountCreateIn,
    TargetIn,
} from '@/src/api/types/admin/pricing'
import type { CombinedDiscountValues } from '@/src/routes/catalog/discount/schema'

const toIso = (value?: Date) => (value ? value.toISOString() : null)

export const toDiscountCreatePayload = (
    data: CombinedDiscountValues
): DiscountCreateIn => {
    const isAmount = data.discountType === 'amount'

    const targets: TargetIn[] | null =
        data.scope === 'selected-category'
            ? data.categoryIds.map((target_id) => ({
                  target_type: 'CATEGORY' as const,
                  target_id,
              }))
            : null

    const audiences: AudienceIn[] | null =
        data.audience === 'by-level'
            ? data.customerLevels.map((cooperation_level) => ({
                  audience_type: 'COOPERATION_LEVEL' as const,
                  cooperation_level,
              }))
            : null

    return {
        kind: 'BUNDLE',
        value_type: isAmount ? 'AMOUNT' : 'PERCENT',
        percent: isAmount ? null : data.discountValue,
        fixed_amount: isAmount ? data.discountValue : null,
        min_qty: data.minPurchaseCount,
        start_at: toIso(data.startDate),
        end_at: toIso(data.endDate),
        targets,
        audiences,
    }
}

import * as z from 'zod'
import {
    BRANCH_PATH_DEFAULTS,
    LOCATION_PATH_DEFAULTS,
    type NewTransferVariant,
} from '../constants'

const requiredDropdown = (message: string) => z.string().min(1, message)

const transferItemSchema = z.object({
    id: z.string().min(1),
    productCode: z.string().min(1),
    productName: z.string().min(1),
    unitPrice: z.number().nonnegative(),
    unit: z.string().min(1),
    sourceStock: z.number().nonnegative(),
    quantity: z.number().int().min(1, 'حداقل تعداد ۱ است'),
})

const baseTransferSchema = z.object({
    fromBranchId: z.string(),
    fromWarehouseId: z.string(),
    toBranchId: z.string(),
    toWarehouseId: z.string(),
    fromLocationId: z.string(),
    toLocationId: z.string(),
    items: z.array(transferItemSchema),
    description: z.string().trim().optional().or(z.literal('')),
})

export const createNewTransferSchema = (variant: NewTransferVariant) => {
    if (variant === 'branch-path') {
        return baseTransferSchema
            .extend({
                fromBranchId: requiredDropdown('انتخاب شعبه مبدا الزامی است'),
                fromWarehouseId: requiredDropdown(
                    'انتخاب انبار مبدا الزامی است'
                ),
                toBranchId: requiredDropdown('انتخاب شعبه مقصد الزامی است'),
                toWarehouseId: requiredDropdown(
                    'انتخاب انبار مقصد الزامی است'
                ),
            })
            .superRefine((values, ctx) => {
                if (values.fromBranchId === values.toBranchId) {
                    ctx.addIssue({
                        code: 'custom',
                        path: ['toBranchId'],
                        message: 'شعبه مقصد باید متفاوت از شعبه مبدا باشد',
                    })
                }
            })
    }

    return baseTransferSchema
        .extend({
            fromLocationId: requiredDropdown('انتخاب مبدا الزامی است'),
            toLocationId: requiredDropdown('انتخاب مقصد الزامی است'),
        })
        .superRefine((values, ctx) => {
            if (values.fromLocationId === values.toLocationId) {
                ctx.addIssue({
                    code: 'custom',
                    path: ['toLocationId'],
                    message: 'مقصد باید متفاوت از مبدا باشد',
                })
            }
        })
}

export type NewTransferFormValues = z.infer<typeof baseTransferSchema>

export const NEW_TRANSFER_DEFAULT_VALUES: NewTransferFormValues = {
    ...BRANCH_PATH_DEFAULTS,
    ...LOCATION_PATH_DEFAULTS,
    items: [],
    description: '',
}

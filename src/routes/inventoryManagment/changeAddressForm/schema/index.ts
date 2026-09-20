import * as z from 'zod'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import type { InventoryProductItem } from '@/src/shared/components/modals/components/inventoryProducts'
import { WAREHOUSE_CODE_BY_VALUE } from '../constants'

const requiredString = (message: string) => z.string().trim().min(1, message)

const transferQtySchema = z
    .string()
    .trim()
    .min(1, 'مقدار جابه‌جایی الزامی است')
    .transform(toEnglishDigits)
    .refine((value) => /^\d+$/.test(value), 'مقدار جابه‌جایی معتبر نیست')
    .refine((value) => Number(value) > 0, 'مقدار جابه‌جایی باید بیشتر از صفر باشد')

export const changeAddressSelectedItemSchema = z
    .object({
        id: z.string(),
        productCode: z.string(),
        productName: z.string(),
        categoryPath: z.string(),
        model: z.string(),
        unit: z.string(),
        stock: z.number(),
        warehouseAddress: z.string(),
        transferQty: transferQtySchema,
    })
    .superRefine((item, ctx) => {
        if (Number(item.transferQty) > item.stock) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'مقدار جابه‌جایی نمی‌تواند بیشتر از موجودی باشد',
                path: ['transferQty'],
            })
        }
    })

export const changeAddressFormSchema = z.object({
    warehouseId: requiredString('انتخاب انبار الزامی است'),
    warehouseCode: requiredString('کد انبار الزامی است'),
    items: z
        .array(changeAddressSelectedItemSchema)
        .min(1, 'حداقل یک کالا باید انتخاب شود'),
})

export type ChangeAddressSelectedItem = z.input<
    typeof changeAddressSelectedItemSchema
>
export type ChangeAddressFormValues = z.input<typeof changeAddressFormSchema>

export const CHANGE_ADDRESS_FORM_DEFAULT_VALUES: ChangeAddressFormValues = {
    warehouseId: 'wh-tehran',
    warehouseCode: WAREHOUSE_CODE_BY_VALUE['wh-tehran'] ?? 'WH-1001',
    items: [],
}

export const mapProductsToFormItems = (
    products: InventoryProductItem[],
    previousItems: ChangeAddressSelectedItem[] = []
): ChangeAddressSelectedItem[] => {
    const previousById = new Map(
        previousItems.map((item) => [item.id, item] as const)
    )

    return products.map((product) => {
        const previous = previousById.get(product.id)
        return {
            id: product.id,
            productCode: product.productCode,
            productName: product.productName,
            categoryPath: product.categoryPath,
            model: product.model,
            unit: product.unit,
            stock: product.stock,
            warehouseAddress: product.warehouseAddress,
            transferQty: previous?.transferQty ?? '',
        }
    })
}

export const SELECTED_ITEMS_COLUMNS = [
    { id: 'productCode', label: 'کد کالا' },
    { id: 'productName', label: 'نام کالا' },
    { id: 'model', label: 'مدل' },
    { id: 'unit', label: 'واحد' },
    { id: 'stock', label: 'موجودی' },
    { id: 'warehouseAddress', label: 'آدرس در انبار' },
    { id: 'transferQty', label: 'مقدار جابه‌جایی' },
] as const

export const SELECTED_ITEMS_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)_minmax(0,0.8fr)_minmax(0,0.6fr)_minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.1fr)] items-center gap-3'

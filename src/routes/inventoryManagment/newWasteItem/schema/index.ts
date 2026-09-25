import * as z from 'zod'

export const newWasteItemSchema = z.object({
    productType: z.string().min(1, 'نوع محصول الزامی است'),
    productCode: z.string().trim().min(1, 'کد محصول الزامی است'),
    productName: z.string().trim().min(1, 'نام محصول الزامی است'),
    unit: z.string().min(1, 'واحد الزامی است'),
    quantity: z.string().trim().min(1, 'تعداد الزامی است'),
    date: z.date().optional(),
    warehouseId: z.string().min(1, 'نام انبار الزامی است'),
    zoneId: z.string().min(1, 'ناحیه الزامی است'),
    rackId: z.string().min(1, 'قفسه الزامی است'),
    shelfId: z.string().min(1, 'طبقه الزامی است'),
    boxId: z.string().min(1, 'جعبه الزامی است'),
    responsibleId: z.string().min(1, 'نام مسئول انبار الزامی است'),
    image: z.custom<File | null>().optional(),
    description: z.string().optional(),
})

export type NewWasteItemFormValues = z.infer<typeof newWasteItemSchema>

export const NEW_WASTE_ITEM_DEFAULTS: NewWasteItemFormValues = {
    productType: 'set-single',
    productCode: '۷۳۵۲-۹۰',
    productName: 'نیم تنه ورزشی',
    unit: 'piece',
    quantity: '۴۰',
    date: new Date(2026, 2, 5),
    warehouseId: 'tehran-central',
    zoneId: 'zone-a',
    rackId: 'rack-r1',
    shelfId: 'shelf-s1',
    boxId: 'box-b1',
    responsibleId: 'ali-rezaei',
    image: null,
    description: '',
}

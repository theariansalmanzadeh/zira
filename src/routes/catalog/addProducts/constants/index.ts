export const ADD_PRODUCT_TABS = [
    { value: 'basic-info', label: 'اطلاعات پایه' },
    { value: 'attributes', label: 'ویژگی‌ها' },
    { value: 'pricing', label: 'قیمت‌گذاری' },
] as const

export type AddProductTabValue = (typeof ADD_PRODUCT_TABS)[number]['value']

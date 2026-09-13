export const ADD_PRODUCT_TABS = [
    { value: 'basic-info', label: 'اطلاعات پایه' },
    { value: 'attributes', label: 'ویژگی‌ها' },
    { value: 'gallery', label: 'گالری' },
    { value: 'pricing', label: 'قیمت‌گذاری' },
    { value: 'additional-settings', label: 'تنظیمات تکمیلی' },
    { value: "inventory", label: "موجودی و حذف" },
    { value: "review", label: "بررسی" }
] as const

export type AddProductTabValue = (typeof ADD_PRODUCT_TABS)[number]['value']

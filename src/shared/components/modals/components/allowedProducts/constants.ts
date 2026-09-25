export type AllowedProductBadgeTone = 'primary' | 'info'

export type AllowedProductItem = {
    id: string
    index: number
    mainCategory: string
    midCategory: string
    subCategory: string
    productCode: string
    productName: string
    badgeLetter: string
    badgeTone: AllowedProductBadgeTone
    brand: string
    unit: string
    minStock: number
    minSellPrice: number
    status: 'فعال' | 'غیرفعال'
}

export const ALLOWED_PRODUCT_COLUMNS = [
    { id: 'index', label: 'ردیف' },
    { id: 'mainCategory', label: 'دسته اصلی' },
    { id: 'midCategory', label: 'دسته میانی' },
    { id: 'subCategory', label: 'دسته فرعی' },
    { id: 'productCode', label: 'کد کالا' },
    { id: 'productName', label: 'نام کالا' },
    { id: 'expand', label: '' },
] as const

export const ALLOWED_PRODUCT_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.45fr)_minmax(0,1.1fr)_minmax(0,0.85fr)_minmax(0,0.85fr)_minmax(0,0.85fr)_minmax(0,1.6fr)_auto] items-center gap-3'

export const ALLOWED_PRODUCT_BADGE_CLASS: Record<
    AllowedProductBadgeTone,
    string
> = {
    primary: 'bg-primary text-primary-foreground',
    info: 'bg-info text-on-info',
}

export const ALLOWED_PRODUCTS_DUMMY: AllowedProductItem[] = [
    {
        id: '1',
        index: 1,
        mainCategory: 'پوشاک زیر زنانه',
        midCategory: 'سوتین',
        subCategory: 'بدون فنر',
        productCode: 'ZM-1042',
        productName: 'سوتین بدون فنر مدل لوسی',
        badgeLetter: 'س',
        badgeTone: 'primary',
        brand: 'لمیس',
        unit: 'عدد',
        minStock: 20,
        minSellPrice: 450000,
        status: 'فعال',
    },
    {
        id: '2',
        index: 2,
        mainCategory: 'پوشاک زیر زنانه',
        midCategory: 'سوتین',
        subCategory: 'فنری',
        productCode: 'ZM-1047',
        productName: 'سوتین فنری مدل رزا',
        badgeLetter: 'س',
        badgeTone: 'info',
        brand: 'لمیس',
        unit: 'عدد',
        minStock: 15,
        minSellPrice: 520000,
        status: 'فعال',
    },
]

import { IconLabel } from '@/src/shared/types/icon'

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    action?: () => void
    variant: 'primary' | 'default' | 'outline'
    type?: 'button' | 'submit'
    form?: string
}

export type SectionHeading = {
    title: string
    subtitle: string
    hasBackButton?: boolean
    buttons?: HeadingButton[]
}

const PRODUCTS_LIST_HEADING: SectionHeading = {
    title: 'لیست کالاها',
    subtitle: 'کاتالوگ کامل محصولات با ویژگی‌های ترکیبی',
    buttons: [
        {
            label: 'محصول جدید',
            icon: 'addSm400Broken',
            href: '/admin/catalog/addAndUpdateProduct',
            variant: 'primary',
        },
    ],
}

export const sectionToHeading: Record<string, SectionHeading | null> = {
    index: {
        title: 'داشبورد',
        subtitle: 'نمای کلی محصولات، قیمت، تخفیف و کمپین‌ها',
        buttons: [
            {
                label: 'دسته‌بندی جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/new',
                variant: 'primary',
            },
        ],
    },
    dashboard: {
        title: 'داشبورد',
        subtitle: 'نمای کلی محصولات، قیمت، تخفیف و کمپین‌ها',
        buttons: [
            {
                label: 'محصول جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/addAndUpdateProduct',
                variant: 'primary',
            },
            {
                label: 'محصول جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/addAndUpdateProduct',
                variant: 'default',
            },
        ],
    },
    list: PRODUCTS_LIST_HEADING,
    products: PRODUCTS_LIST_HEADING,
    'product-detail': {
        title: 'جزئیات محصول',
        subtitle: 'مشاهده مشخصات، موجودی و وضعیت محصول',
        hasBackButton: true,
    },
    'category-types': {
        title: 'دسته‌بندی‌ها',
        subtitle: 'ساختار درختی دسته‌های کالا: اصلی ← میانی ← فرعی',
        buttons: [
            {
                label: 'ثبت دسته‌بندی جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/addCategory',
                variant: 'primary',
            },
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    'add-category': {
        title: 'ثبت دسته‌بندی جدید',
        subtitle: 'ایجاد دسته‌بندی در ساختار درختی کالا',
        hasBackButton: true,
    },
    pricing: {
        title: 'قیمت‌گذاری',
        subtitle: 'لیست‌های قیمت و بازه اعتبار',
        buttons: [
            {
                label: 'لیست جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/pricing/new',
                variant: 'primary',
            },
        ],
    },
    'pricing-new': {
        title: 'لیست قیمت جدید',
        subtitle: 'کالاها را انتخاب کنید و قیمت جدید را ثبت کنید.',
        hasBackButton: true,
    },
    'pricing-detail': {
        title: 'ویرایش لیست قیمت',
        subtitle: 'کالاها و قیمت‌های این لیست را تغییر دهید.',
        hasBackButton: true,
    },
    contracts: {
        title: 'قراردادها',
        subtitle: 'مدیریت قراردادها و قوانین تعدیل قیمت',
        buttons: [
            {
                label: 'قرارداد جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/contracts/new',
                variant: 'primary',
            },
        ],
    },
    'contracts-new': {
        title: 'قرارداد قیمت‌گذاری جدید',
        subtitle: 'یک قاعده تعدیل قیمت بسازید تا روی لیست قیمت اعمال شود.',
        hasBackButton: true,
    },
    'contracts-detail': {
        title: 'قرارداد قیمت‌گذاری تغییر',
        subtitle: 'تغییر قاعده تعدیل قیمت تا روی لیست قیمت اعمال شود.',
        hasBackButton: true,
    },
    discounts: {
        title: 'مدیریت تخفیف',
        subtitle: 'تخفیف‌های خودکار بر اساس محصول، مشتری و زمان',
        buttons: [
            {
                label: 'ایجاد تخفیف جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/discounts/new',
                variant: 'primary',
            },
        ],
    },
    'discounts-new': {
        title: 'ایجاد تخفیف جدید',
        subtitle: 'تعریف تخفیف خودکار بر اساس محصول، مشتری و زمان',
        hasBackButton: true,
    },
    'discounts-detail': {
        title: 'ویرایش کد تخفیف',
        subtitle: 'تغییر کد تخفیف',
        hasBackButton: true,
    },
    'discount-codes': {
        title: 'کدهای تخفیف',
        subtitle: 'کدهای قابل استفاده توسط مشتری در زمان خرید',
        buttons: [
            {
                label: 'ایجاد کد تخفیف جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/discount-codes/new',
                variant: 'primary',
            },
        ],
    },
    'discount-codes-new': {
        title: 'ایجاد کد تخفیف جدید',
        subtitle: 'تعریف کد قابل استفاده توسط مشتری',
        hasBackButton: true,
    },
    campaigns: {
        title: 'کمپین‌ها',
        subtitle: 'مدیریت کمپین‌های فروش و تخفیف',
        buttons: [
            {
                label: 'کمپین جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/campaigns/new',
                variant: 'primary',
            },
        ],
    },
    'campaigns-new': {
        title: 'کمپین جدید',
        subtitle: 'ایجاد کمپین فروش و تخفیف',
        hasBackButton: true,
        buttons: [
            {
                label: 'ذخیره پیش‌نویس',
                variant: 'primary',
            },
            {
                label: 'ذخیره و انتشار',
                variant: 'default',
            },
        ],
    },
    'campaigns-detail': {
        title: 'جزئیات کمپین',
        subtitle: 'مشاهده مشخصات و عملکرد کمپین',
        hasBackButton: true,
    },
    bundles: {
        title: 'باندل‌ها',
        subtitle: 'مدیریت باندل‌ها و پک‌های محصول',
        buttons: [
            {
                label: 'باندل جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/bundles/new',
                variant: 'primary',
            },
        ],
    },
    'bundles-new': {
        title: 'ایجاد / ویرایش باندل',
        subtitle: 'ایجاد باندل و پک محصول',
        hasBackButton: true,
    },
    'brands-new': {
        title: 'برند جدید',
        subtitle: 'ثبت برند و اطلاعات نمایش آن',
        hasBackButton: true,
    },
    'brands-edit': {
        title: 'ویرایش برند',
        subtitle: 'ویرایش اطلاعات و وضعیت برند',
        hasBackButton: true,
        buttons: [
            {
                label: 'ثبت برند',
                icon: 'checkSm400Linear',
                variant: 'primary',
                type: 'submit',
                form: 'add-edit-brand-form',
            },
            {
                label: 'انصراف',
                variant: 'outline',
                href: '/admin/catalog/brands',
            },
        ],
    },
    packs: {
        title: 'لیست پک‌ها',
        subtitle: 'پک‌های کالا و وضعیت نمایش آن‌ها',
        buttons: [
            {
                label: 'پک جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/addPack',
                variant: 'primary',
            },
        ],
    },
    'pack-detail': {
        title: 'جزئیات پک',
        subtitle: 'مشاهده مشخصات، موجودی و وضعیت پک',
        hasBackButton: true,
        buttons: [
            {
                label: 'ویرایش',
                variant: 'default',
                href: '/admin/catalog/addPack',
            },
        ],
    },
    addPack: {
        title: 'ایجاد و ویرایش پک',
        subtitle: 'گالری، دامنه نمایش و اطلاعات پایه آیتم',
        hasBackButton: true,
    },
    brands: {
        title: 'برندها',
        subtitle: 'مدیریت برندهای محصولات',
        buttons: [
            {
                label: 'برند جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/brands/new',
                variant: 'primary',
            },
        ],
    },
    report: {
        title: 'گزارش کمپین',
        subtitle: 'گزارش عملکرد کمپین‌ها، فروش و تخفیف',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    variable: {
        title: 'ویژگی‌ها و متغیرها',
        subtitle:
            'ویژگی‌هایی که متغیرهای کالا را می‌سازند (رنگ، سایز، جنس و...).',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
            {
                label: 'ویژگی جدید',
                icon: 'addSm400Broken',
                href: '/admin/catalog/variable/new',
                variant: 'primary',
            },
        ],
    },
    'variable-new': {
        title: 'ایجاد ویژگی جدید',
        subtitle: 'تعریف ویژگی جدید برای متغیرهای کالا',
        hasBackButton: true,
    },
    'variable-edit': {
        title: 'ویرایش ویژگی',
        subtitle: 'ویرایش ویژگی و مقادیر متغیر کالا',
        hasBackButton: true,
    },
    'add-product': {
        title: 'ایجاد محصول جدید',
        subtitle: 'ثبت محصول جدید در کاتالوگ',
        hasBackButton: true,
    },
    'add-product-edit': {
        title: 'ویرایش محصول',
        subtitle: 'ویرایش اطلاعات محصول در کاتالوگ',
        hasBackButton: true,
    },
}

export const getCategoriesSectionKeyFromPath = (pathname: string): string => {
    const pathSegments = pathname
        .replace(/^\/admin\/catalog\/?/, '')
        .split('/')
        .filter(Boolean)

    if (pathSegments.length === 0) return 'dashboard'

    const [section, nested] = pathSegments

    if (section === 'products' && nested) return 'product-detail'
    if (section === 'pack' && nested) return 'pack-detail'
    if (section === 'variable' && nested === 'new') return 'variable-new'
    if (section === 'variable' && pathSegments[2] === 'edit') {
        return 'variable-edit'
    }
    if (section === 'campaigns' && nested === 'new') return 'campaigns-new'
    if (section === 'campaigns' && nested) return 'campaigns-detail'
    if (section === 'bundles' && nested === 'new') return 'bundles-new'
    if (section === 'bundles' && nested) return 'bundles-new'
    if (section === 'brands' && nested === 'new') return 'brands-new'
    if (section === 'brands' && pathSegments[2] === 'edit') return 'brands-edit'
    if (section === 'pricing' && nested === 'new') return 'pricing-new'
    if (section === 'pricing' && nested) return 'pricing-detail'
    if (section === 'contracts' && nested === 'new') return 'contracts-new'
    if (section === 'contracts' && nested) return 'contracts-detail'
    if (section === 'discounts' && nested === 'new') return 'discounts-new'
    if (section === 'discounts' && nested) return 'discounts-detail'
    if (section === 'discount-codes' && nested === 'new') {
        return 'discount-codes-new'
    }
    if (section === 'new-campaign') return 'campaigns-new'
    if (section === 'addProduct' || section === 'addAndUpdateProduct') {
        return nested ? 'add-product-edit' : 'add-product'
    }
    if (section === 'addPack') return 'addPack'
    if (section === 'addCategory') return 'add-category'

    return section
}

export const getCategoriesSectionKey = (pathnameOrSub: string) => {
    if (!pathnameOrSub.includes('/')) {
        return pathnameOrSub || 'dashboard'
    }

    return getCategoriesSectionKeyFromPath(pathnameOrSub)
}

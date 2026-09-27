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
            href: '/admin/categories/addProduct',
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
                href: '/admin/categories/new',
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
                href: '/admin/categories/addProduct',
                variant: 'primary',
            },
            {
                label: 'محصول جدید',
                icon: 'addSm400Broken',
                href: '/admin/categories/addProduct',
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
        buttons: [
            {
                label: 'ویرایش',
                variant: 'default',
                href: '/admin/categories/addProduct',
            },
        ],
    },
    'category-types': {
        title: 'دسته‌بندی‌ها',
        subtitle: 'ساختار درختی دسته‌های کالا: اصلی ← میانی ← فرعی',
        buttons: [
            {
                label: 'ثبت دسته‌بندی جدید',
                icon: 'addSm400Broken',
                href: '/admin/categories/addCategory',
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
        subtitle: 'مدیریت قراردادها و قوانین تعدیل قیمت',
        buttons: [
            {
                label: 'قرارداد جدید',
                icon: 'addSm400Broken',
                href: '/admin/categories/pricing/new',
                variant: 'primary',
            },
        ],
    },
    'pricing-new': {
        title: 'قرارداد قیمت‌گذاری جدید',
        subtitle: 'یک قاعده تعدیل قیمت بسازید تا روی لیست قیمت اعمال شود.',
        hasBackButton: true,
        buttons: [
            {
                label: 'ثبت قرارداد',
                icon: 'checkSm400Linear',
                variant: 'primary',
                type: 'submit',
                form: 'add-edit-pricing-form',
            },
            {
                label: 'انصراف',
                variant: 'outline',
                href: '/admin/categories?sub=pricing',
            },
        ],
    },
    'pricing-detail': {
        title: 'قرارداد قیمت‌گذاری تغییر',
        subtitle: 'تغییر قاعده تعدیل قیمت تا روی لیست قیمت اعمال شود.',
        hasBackButton: true,
        buttons: [
            {
                label: 'ثبت قرارداد',
                icon: 'checkSm400Linear',
                variant: 'primary',
                type: 'submit',
                form: 'add-edit-pricing-form',
            },
            {
                label: 'انصراف',
                variant: 'outline',
                href: '/admin/categories?sub=pricing',
            },
        ],
    },
    discounts: {
        title: 'مدیریت تخفیف',
        subtitle: 'تخفیف‌های خودکار بر اساس محصول، مشتری و زمان',
        buttons: [
            {
                label: 'ایجاد تخفیف جدید',
                icon: 'addSm400Broken',
                href: '/admin/categories/discounts/new',
                variant: 'primary',
            },
        ],
    },
    'discounts-new': {
        title: 'ایجاد تخفیف جدید',
        subtitle: 'تعریف تخفیف خودکار بر اساس محصول، مشتری و زمان',
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
    'discount-codes': {
        title: 'کدهای تخفیف',
        subtitle: 'کدهای قابل استفاده توسط مشتری در زمان خرید',
        buttons: [
            {
                label: 'ایجاد کد تخفیف جدید',
                icon: 'addSm400Broken',
                href: '/admin/categories/discount-codes/new',
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
                href: '/admin/categories/campaigns/new',
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
                href: '/admin/categories/bundles/new',
                variant: 'primary',
            },
        ],
    },
    'bundles-new': {
        title: 'ایجاد / ویرایش باندل',
        subtitle: 'ایجاد باندل و پک محصول',
        hasBackButton: true,
        buttons: [
            {
                label: 'انصراف',
                variant: 'outline',
                href: '/admin/categories?sub=bundles',
            },
            {
                label: 'ثبت باندل',
                variant: 'primary',
            },
        ],
    },
    'brands-new': {
        title: 'برند جدید',
        subtitle: 'ثبت برند و اطلاعات نمایش آن',
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
                href: '/admin/categories/brands',
            },
        ],
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
                href: '/admin/categories/brands',
            },
        ],
    },
    packs: {
        title: 'لیست پک‌ها',
        subtitle: 'پک‌های کالا و وضعیت نمایش آن‌ها',
    },
    brands: {
        title: 'برندها',
        subtitle: 'مدیریت برندهای محصولات',
        buttons: [
            {
                label: 'برند جدید',
                icon: 'addSm400Broken',
                href: '/admin/categories/brands/new',
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
                href: '/admin/categories/variable/new',
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
}

export const getCategoriesSectionKeyFromPath = (pathname: string): string => {
    const pathSegments = pathname
        .replace(/^\/admin\/categories\/?/, '')
        .split('/')
        .filter(Boolean)

    if (pathSegments.length === 0) return 'dashboard'

    const [section, nested] = pathSegments

    if (section === 'products' && nested) return 'product-detail'
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
    if (section === 'discounts' && nested === 'new') return 'discounts-new'
    if (section === 'discount-codes' && nested === 'new') {
        return 'discount-codes-new'
    }
    if (section === 'new-campaign') return 'campaigns-new'
    if (section === 'addProduct') return 'add-product'
    if (section === 'addCategory') return 'add-category'

    return section
}

export const getCategoriesSectionKey = (pathnameOrSub: string) => {
    if (!pathnameOrSub.includes('/')) {
        return pathnameOrSub || 'dashboard'
    }

    return getCategoriesSectionKeyFromPath(pathnameOrSub)
}

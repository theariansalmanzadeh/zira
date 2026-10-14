import type { SubSidebarContent } from './types'

export const LOCAL_SUB_SIDEBAR_CONTENT: Record<
    'branches' | 'purchase' | 'catalog' | 'support',
    SubSidebarContent
> = {
    branches: {
        headerIcon: 'storeFront',
        header: 'مدیریت شعب',
        faLabel: 'شعب',
        subheader: 'شعب، منابع و عملکرد',
        itemsList: [
            {
                title: 'نمای کلی',
                links: [
                    { label: 'داشبورد شعب', href: '/admin/branches?sub=dashboard' },
                    { label: 'لیست شعب', href: '/admin/branches?sub=list' },
                ],
            },
            {
                title: 'مدیریت موجودی',
                links: [
                    {
                        label: 'موجودی شعب و انبارها',
                        href: '/admin/branches?sub=branch-stock',
                    },
                    {
                        label: 'پیگیری انتقال بین انبار',
                        href: '/admin/branches?sub=warehouse-transfer-tracking',
                    },
                    {
                        label: 'گردش کالا',
                        href: '/admin/branches?sub=product-turnover',
                    },
                    {
                        label: 'انتقال بین شعب',
                        href: '/admin/branches?sub=branch-transfer',
                    },
                    {
                        label: 'قیمت‌گذاری مجدد',
                        href: '/admin/branches?sub=repricing',
                    },
                ],
            },
            {
                title: 'گزارش‌ها',
                links: [
                    { label: 'گزارش کارکرد شعب', href: '/admin/branches?sub=report' },
                ],
            },
        ],
    },
    purchase: {
        headerIcon: 'box',
        header: 'خرید و تامین',
        faLabel: 'خرید و تامین',
        subheader: 'چرخه تامین تا فاکتور',
        itemsList: [
            {
                title: 'نمای کلی',
                links: [
                    { label: 'مرور خرید', href: '/admin/purchase?sub=dashboard' },
                ],
            },
            {
                title: 'چرخه تامین',
                links: [
                    { label: 'پیش‌سفارش تامین', href: '/admin/purchase?sub=prePurchase' },
                    { label: 'اعلامیه تامین و انبار', href: '/admin/purchase?sub=procurement-notice' },
                ],
            },
            {
                title: 'فاکتور و برگشت',
                links: [
                    { label: 'فاکتورهای خرید', href: '/admin/purchase?sub=factors' },
                    { label: 'برگشت از خرید', href: '/admin/purchase?sub=backFromBuying' },
                    { label: 'خرید امانی', href: '/admin/purchase?sub=consignment' },
                ],
            },
            {
                title: 'طرف حساب و گزارش',
                links: [
                    { label: 'مرور جامع طرف حساب', href: '/admin/purchase?sub=accounts' },
                    { label: 'گزارش خرید', href: '/admin/purchase?sub=report' },
                ],
            },
        ],
    },
    catalog: {
        headerIcon: 'package2',
        header: 'مدیریت کالا',
        faLabel: 'مدیریت کالا',
        subheader: 'دسته‌بندی، قیمت و تخفیف',
        itemsList: [
            {
                title: 'نمای کلی',
                links: [
                    { label: 'داشبورد', href: '/admin/catalog?sub=dashboard' },
                    { label: 'لیست کالاها', href: '/admin/catalog?sub=list' },
                    { label: 'لیست پک‌ها', href: '/admin/catalog?sub=packs' },
                    { label: 'برندها', href: '/admin/catalog?sub=brands' },
                    { label: 'گزارش کمپین', href: '/admin/catalog?sub=report' },
                ],
            },
            {
                title: 'دسته‌بندی و قیمت',
                links: [
                    { label: 'دسته‌بندی‌ها', href: '/admin/catalog?sub=category-types' },
                    { label: 'ویژگی‌ها و متغیرها', href: '/admin/catalog?sub=variable' },
                    { label: 'قراردادها', href: '/admin/catalog?sub=contracts' },
                    { label: 'قیمت‌گذاری', href: '/admin/catalog/pricing' },
                ],
            },
            {
                title: 'تخفیف',
                links: [
                    { label: 'مدیریت تخفیف', href: '/admin/catalog?sub=discounts' },
                    { label: 'کدهای تخفیف', href: '/admin/catalog?sub=discount-codes' },
                ],
            },
            {
                title: 'کمپین',
                links: [
                    { label: 'کمپین‌ها', href: '/admin/catalog?sub=campaigns' },
                    { label: 'باندل‌ها', href: '/admin/catalog?sub=bundles' },
                ],
            },
        ],
    },
    support: {
        headerIcon: 'conversation',
        header: 'پشتیبانی و ارتباطات',
        faLabel: 'پشتیبانی',
        subheader: 'تیکت و پیام‌رسانی',
        itemsList: [
            {
                title: 'نمای کلی',
                links: [
                    { label: 'داشبورد پشتیبانی', href: '/admin/support?sub=dashboard' },
                    { label: 'صندوق تیکت‌ها', href: '/admin/support?sub=ticket' },
                    { label: 'دپارتمان‌ها', href: '/admin/support?sub=department' },
                ],
            },
        ],
    },
}

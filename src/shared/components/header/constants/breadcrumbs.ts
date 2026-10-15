export const ROUTE_BREADCRUMBS: Record<string, string[]> = {
    // Dashboard
    '': ['داشبورد'],

    // Order management
    'order-managment': ['مدیریت سفارشات'],
    'order-managment?sub=dashboard': ['مدیریت سفارشات'],
    'order-managment?sub=order-list': ['مدیریت سفارشات'],
    'order-managment?sub=factor': ['مدیریت سفارشات'],
    'order-managment?sub=requests': ['مدیریت سفارشات'],
    'order-managment?sub=list': ['مدیریت سفارشات'],
    'order-managment?sub=pre-orders': ['مدیریت سفارشات'],
    'order-managment/new-order': ['مدیریت سفارشات', 'سفارش جدید'],
    'order-managment/order-details/[id]': ['مدیریت سفارشات', 'جزئیات سفارش'],
    'order-managment/pre-order-details/[id]': ['مدیریت سفارشات', 'جزئیات پیش‌سفارش'],

    // Branches
    branches: ['شعب'],
    'branches?sub=dashboard': ['شعب'],
    'branches?sub=list': ['شعب'],
    'branches?sub=branch-stock': ['شعب'],
    'branches?sub=warehouse-transfer-tracking': ['شعب'],
    'branches?sub=product-turnover': ['شعب'],
    'branches?sub=branch-transfer': ['شعب'],
    'branches?sub=repricing': ['شعب'],
    'branches?sub=report': ['شعب'],
    'branches/new': ['شعب', 'شعبه جدید'],
    'branches/details/[id]': ['شعب', 'جزئیات شعبه'],
    'branches/branch-stock/new': ['شعب', 'ثبت انتقال جدید'],
    'branches/warehouse-transfer-tracking/new': ['شعب', 'ثبت انتقال بین انبار'],
    'branches/product-turnover/[id]': ['شعب', 'جزئیات سند گردش کالا'],
    'branches/branch-transfer/new': ['شعب', 'ثبت انتقال بین شعب'],
    'branches/branch-transfer/[id]': ['شعب', 'جزئیات انتقال بین شعب'],
    'branches/branch-transfer/[slug]': ['شعب', 'جزئیات انتقال بین شعب'],
    'branches/pos-device/new': ['شعب', 'دستگاه پوز جدید'],
    'branches/pos-device/[id]/edit': ['شعب', 'ویرایش دستگاه پوز'],

    // Purchase
    purchase: ['خرید و تامین'],
    'purchase?sub=dashboard': ['خرید و تامین'],
    'purchase?sub=prePurchase': ['خرید و تامین'],
    'purchase?sub=procurement-notice': ['خرید و تامین'],
    'purchase?sub=factors': ['خرید و تامین'],
    'purchase?sub=backFromBuying': ['خرید و تامین'],
    'purchase?sub=consignment': ['خرید و تامین'],
    'purchase?sub=accounts': ['خرید و تامین'],
    'purchase?sub=report': ['خرید و تامین'],
    'purchase/prePurchase': ['خرید و تامین', 'پیش‌سفارش تامین'],
    'purchase/factors': ['خرید و تامین', 'فاکتورهای خرید'],
    'purchase/backFromBuying': ['خرید و تامین', 'برگشت از خرید'],

    // Catalog / products
    catalog: ['مدیریت کالا'],
    'catalog?sub=dashboard': ['مدیریت کالا'],
    'catalog?sub=list': ['مدیریت کالا'],
    'catalog?sub=packs': ['مدیریت کالا'],
    'catalog?sub=brands': ['مدیریت کالا'],
    'catalog?sub=report': ['مدیریت کالا'],
    'catalog?sub=category-types': ['مدیریت کالا'],
    'catalog?sub=variable': ['مدیریت کالا'],
    'catalog?sub=contracts': ['مدیریت کالا'],
    'catalog?sub=discounts': ['مدیریت کالا'],
    'catalog?sub=discount-codes': ['مدیریت کالا'],
    'catalog?sub=campaigns': ['مدیریت کالا'],
    'catalog?sub=bundles': ['مدیریت کالا'],
    'catalog/addProduct': ['مدیریت کالا', 'محصول جدید'],
    'catalog/addPack': ['مدیریت کالا', 'پک جدید'],
    'catalog/addCategory': ['مدیریت کالا', 'دسته‌بندی جدید'],
    'catalog/brands': ['مدیریت کالا', 'برندها'],
    'catalog/brands/new': ['مدیریت کالا', 'برند جدید'],
    'catalog/brands/[id]/edit': ['مدیریت کالا', 'ویرایش برند'],
    'catalog/variable': ['مدیریت کالا', 'ویژگی‌ها و متغیرها'],
    'catalog/variable/new': ['مدیریت کالا', 'ویژگی جدید'],
    'catalog/variable/[id]/edit': ['مدیریت کالا', 'ویرایش ویژگی'],
    'catalog/contracts': ['مدیریت کالا', 'قراردادها'],
    'catalog/contracts/new': ['مدیریت کالا', 'قرارداد جدید'],
    'catalog/contracts/[id]': ['مدیریت کالا', 'جزئیات قرارداد'],
    'catalog/pricing': ['مدیریت کالا', 'قیمت‌گذاری'],
    'catalog/pricing/new': ['مدیریت کالا', 'لیست قیمت جدید'],
    'catalog/pricing/[id]': ['مدیریت کالا', 'ویرایش لیست قیمت'],
    'catalog/discounts': ['مدیریت کالا', 'مدیریت تخفیف'],
    'catalog/discounts/new': ['مدیریت کالا', 'تخفیف جدید'],
    'catalog/discounts/[id]': ['مدیریت کالا', 'ویرایش کد تخفیف'],
    'catalog/discount-codes/new': ['مدیریت کالا', 'کد تخفیف جدید'],
    'catalog/campaigns': ['مدیریت کالا', 'کمپین‌ها'],
    'catalog/campaigns/new': ['مدیریت کالا', 'کمپین جدید'],
    'catalog/campaigns/detail': ['مدیریت کالا', 'جزئیات کمپین'],
    'catalog/campaigns/[id]': ['مدیریت کالا', 'جزئیات کمپین'],
    'catalog/new-campaign': ['مدیریت کالا', 'کمپین جدید'],
    'catalog/bundles': ['مدیریت کالا', 'باندل‌ها'],
    'catalog/bundles/new': ['مدیریت کالا', 'باندل جدید'],
    'catalog/bundles/[id]': ['مدیریت کالا', 'جزئیات باندل'],
    'catalog/products/[id]': ['مدیریت کالا', 'جزئیات محصول'],
    'catalog/products/detail': ['مدیریت کالا', 'جزئیات محصول'],
    'catalog/pack/[id]': ['مدیریت کالا', 'جزئیات پک'],
    'catalog/report': ['مدیریت کالا', 'گزارش کمپین'],

    // Support
    support: ['پشتیبانی'],
    'support?sub=dashboard': ['پشتیبانی'],
    'support?sub=ticket': ['پشتیبانی'],
    'support/ticket': ['پشتیبانی', 'صندوق تیکت‌ها'],
    'support/ticket/new': ['پشتیبانی', 'پیام جدید'],
    'support/ticket/[id]': ['پشتیبانی', 'جزئیات تیکت'],

    // Sales
    sales: ['فروش'],
    'sales?sub=dashboard': ['فروش'],
    'sales?sub=pre-factor': ['فروش'],
    'sales?sub=invoices': ['فروش'],
    'sales?sub=returns': ['فروش'],
    'sales?sub=consignment': ['فروش'],
    'sales?sub=pre-sale': ['فروش'],
    'sales?sub=requests': ['فروش'],
    'sales?sub=accounts': ['فروش'],
    'sales?sub=report': ['فروش'],
    'sales/new-factor': ['فروش', 'فاکتور فروش جدید'],
    'sales/pre-factor/new': ['فروش', 'پیش‌فاکتور جدید'],
    'sales/returns/new': ['فروش', 'ثبت برگشتی جدید'],
    'sales/consignment/new': ['فروش', 'فروش امانی جدید'],
    'sales/requests/new': ['فروش', 'درخواست جدید'],

    // Accounting
    accounting: ['حسابداری'],
    'accounting?sub=dashboard': ['حسابداری'],
    'accounting?sub=chart-of-accounts': ['حسابداری'],
    'accounting?sub=documents': ['حسابداری'],
    'accounting?sub=ledger-review': ['حسابداری'],
    'accounting?sub=trial-balance': ['حسابداری'],
    'accounting?sub=receipts': ['حسابداری'],
    'accounting?sub=payment-notices': ['حسابداری'],
    'accounting?sub=check-management': ['حسابداری'],
    'accounting?sub=banks-and-cash': ['حسابداری'],
    'accounting?sub=internal-transfer': ['حسابداری'],
    'accounting?sub=vat': ['حسابداری'],
    'accounting?sub=taxpayer-system': ['حسابداری'],
    'accounting?sub=payroll': ['حسابداری'],
    'accounting?sub=customer-analysis': ['حسابداری'],
    'accounting/new-document': ['حسابداری', 'صدور سند جدید'],

    // Inventory
    'inventory-managment': ['انبارداری'],
    'inventory-managment?sub=dashboard': ['انبارداری'],
    'inventory-managment?sub=list': ['انبارداری'],
    'inventory-managment?sub=goods-entry': ['انبارداری'],
    'inventory-managment?sub=warehouse-receipt': ['انبارداری'],
    'inventory-managment?sub=preparation-exit': ['انبارداری'],
    'inventory-managment?sub=shipment-status': ['انبارداری'],
    'inventory-managment?sub=transfer': ['انبارداری'],
    'inventory-managment?sub=change-address': ['انبارداری'],
    'inventory-managment?sub=stocktaking': ['انبارداری'],
    'inventory-managment?sub=stock-returns': ['انبارداری'],
    'inventory-managment?sub=waste': ['انبارداری'],
    'inventory-managment?sub=financial-review': ['انبارداری'],
    'inventory-managment?sub=quantity-review': ['انبارداری'],
    'inventory-managment/new': ['انبارداری', 'انبار جدید'],
    'inventory-managment/details/[id]': ['انبارداری', 'جزئیات انبار'],
    'inventory-managment/goods-entry/[id]': ['انبارداری', 'جزئیات فاکتور'],
    'inventory-managment/change-address/new': ['انبارداری', 'تغییر آدرس جدید'],
    'inventory-managment/stocktaking/new': ['انبارداری', 'انبارگردانی جدید'],
    'inventory-managment/stock-returns/[id]': ['انبارداری', 'جزئیات مرجوعی'],
    'inventory-managment/waste/new': ['انبارداری', 'ثبت ضایعات جدید'],
    'inventory-managment/waste/[id]': ['انبارداری', 'جزئیات ضایعات'],
    'inventory-managment/preparation-exit/online/[id]': ['انبارداری', 'جزئیات خروج کالا'],
    'inventory-managment/preparation-exit/in-person/[id]': ['انبارداری', 'جزئیات خروج کالا'],
    'inventory-managment/preparation-exit/rejected/[id]': ['انبارداری', 'جزئیات خروج کالا'],
    'inventory-managment/preparation-exit/archived/[id]': ['انبارداری', 'جزئیات خروج کالا'],

    // Customers
    customers: ['مدیریت مشتریان'],
    'customers?sub=dashboard': ['مدیریت مشتریان'],
    'customers?sub=list': ['مدیریت مشتریان'],
    'customers?sub=requests': ['مدیریت مشتریان'],
    'customers/new': ['مدیریت مشتریان', 'ثبت مشتری جدید'],
    'customers/newGroup': ['مدیریت مشتریان', 'ایجاد گروه جدید'],
    'customers/[id]': ['مدیریت مشتریان', 'جزئیات مشتری'],
    'customers/customerGroupDetails/[id]': ['مدیریت مشتریان', 'جزئیات گروه'],
    'customers/groupDetails/[id]': ['مدیریت مشتریان', 'جزئیات گروه'],

    // Content management
    'content-managment': ['مدیریت محتوا'],
    'content-managment?sub=dashboard': ['مدیریت محتوا'],
    'content-managment?sub=home': ['مدیریت محتوا'],
    'content-managment?sub=about': ['مدیریت محتوا'],
    'content-managment?sub=work-with-us': ['مدیریت محتوا'],
    'content-managment?sub=faq': ['مدیریت محتوا'],
    'content-managment?sub=blog': ['مدیریت محتوا'],
    'content-managment?sub=contact': ['مدیریت محتوا'],
    'content-managment/liecense': ['مدیریت محتوا', 'گواهی‌ها'],
    'content-managment/liecense/new': ['مدیریت محتوا', 'گواهی جدید'],
    'content-managment/liecense/[id]': ['مدیریت محتوا', 'جزئیات گواهی'],
    'content-managment/blog': ['مدیریت محتوا', 'وبلاگ'],
    'content-managment/blog/add': ['مدیریت محتوا', 'افزودن مطلب'],
    'content-managment/blog/edit': ['مدیریت محتوا', 'ویرایش مطلب'],

    // Events
    events: ['رخدادها'],
    'events?sub=list': ['رخدادها'],
    'events?sub=sessions': ['رخدادها'],
    'events?sub=maintenance': ['رخدادها'],
    'events?sub=exports': ['رخدادها'],
    'events/[id]': ['رخدادها', 'جزئیات رخداد'],
    'events/session/[id]': ['رخدادها', 'جزئیات نشست'],

    // User management
    'user-management': ['مدیریت کاربران'],
    'user-management?sub=user': ['مدیریت کاربران'],
    'user-management?sub=group': ['مدیریت کاربران'],
    'user-management?sub=role': ['مدیریت کاربران'],
    'user-management?sub=department': ['مدیریت کاربران'],
    'user-management?sub=announcements': ['مدیریت کاربران'],
    'user-management?sub=branch-assignment': ['مدیریت کاربران', 'انتصاب به شعبه'],
    'user-management/create-new-user': ['مدیریت کاربران', 'ایجاد کاربر'],
    'user-management/edit/[id]': ['مدیریت کاربران', 'ویرایش کاربر'],
    'user-management/create-new-group': ['مدیریت کاربران', 'ایجاد گروه'],
    'user-management/create-new-role': ['مدیریت کاربران', 'ایجاد نقش'],
    'user-management/department/new': ['مدیریت کاربران', 'ایجاد دپارتمان'],
    'user-management/department/edit/[id]': ['مدیریت کاربران', 'ویرایش دپارتمان'],
    'user-management/user-details/[id]': ['مدیریت کاربران', 'جزئیات کاربر'],
    'user-management/group-details/[id]': ['مدیریت کاربران', 'جزئیات گروه'],
    'user-management/role-details/[id]': ['مدیریت کاربران', 'جزئیات نقش'],
    'user-management/department/[id]': ['مدیریت کاربران', 'جزئیات دپارتمان'],
    'user-management/preferences': ['مدیریت کاربران', 'ترجیحات'],
    'user-management/notification': ['مدیریت کاربران', 'اعلان‌ها'],

    // Settings
    settings: ['تنظیمات'],
}

function normalizeRouteKey(
    pathname: string,
    searchParams?: URLSearchParams | { get: (key: string) => string | null }
) {
    const path = pathname.replace(/^\/admin\/?/, '').replace(/\/$/, '')
    const sub = searchParams?.get('sub')

    if (sub && !path.includes('/')) {
        return `${path}?sub=${sub}`
    }

    return path
}

function isLikelyDynamicSegment(segment: string) {
    return (
        /^\[.+\]$/.test(segment) ||
        /^\d+$/.test(segment) ||
        /^[A-Z]{1,5}-\d+/i.test(segment) ||
        /^[a-z]-\d+/i.test(segment) ||
        (segment.includes('-') && /[0-9]/.test(segment) && segment.length > 4)
    )
}

function toLookupCandidates(path: string) {
    const segments = path.split('/').filter(Boolean)
    const candidates = [path]

    // brands/abc/edit → brands/[id]/edit
    if (segments.length >= 3 && segments[segments.length - 1] === 'edit') {
        candidates.push([...segments.slice(0, -2), '[id]', 'edit'].join('/'))
    }

    // order-details/123 → order-details/[id] (+ [slug] fallback)
    if (segments.length >= 2) {
        const parent = segments.slice(0, -1).join('/')
        candidates.push(`${parent}/[id]`)
        candidates.push(`${parent}/[slug]`)
        if (isLikelyDynamicSegment(segments[segments.length - 1])) {
            candidates.push(parent)
        }
    }

    for (let i = segments.length - 1; i > 0; i -= 1) {
        candidates.push(segments.slice(0, i).join('/'))
    }

    return [...new Set(candidates)]
}

export function getBreadcrumbsForRoute(
    pathname: string,
    searchParams?: URLSearchParams | { get: (key: string) => string | null }
): string[] {
    const key = normalizeRouteKey(pathname, searchParams)

    for (const candidate of toLookupCandidates(key)) {
        if (ROUTE_BREADCRUMBS[candidate]) {
            return ROUTE_BREADCRUMBS[candidate]
        }
    }

    return ['داشبورد']
}

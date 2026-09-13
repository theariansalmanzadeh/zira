import type { TableFilterItem } from '@/src/shared/store/table-actions-store'

export type BlogCategoryId = 'all' | 'fabrics' | 'health' | 'pregnancy'

export type BlogCategoryKey = Exclude<BlogCategoryId, 'all'>

export type BlogRowData = {
    id: string
    code: string
    title: string
    subject: string
    author: string
    source: string
    createdAt: string
    category: BlogCategoryKey
    categories: BlogCategoryKey[]
    summary: string
    content: string
    views: number
}

export const BLOG_CATEGORY_LABELS: Record<BlogCategoryKey, string> = {
    fabrics: 'پارچه‌ها',
    health: 'بهداشت و سلامت',
    pregnancy: 'نکات بارداری',
}

export const BLOG_TOGGLE_BUTTON_VALUE = [
    { label: 'همه', value: 'all' },
    { label: 'پارچه‌ها', value: 'fabrics' },
    { label: 'بهداشت و سلامت', value: 'health' },
    { label: 'نکات بارداری', value: 'pregnancy' },
] as const

export const BLOG_DUMMY: BlogRowData[] = [
    {
        id: '1',
        code: 'BL-1042',
        title: 'راهنمای انتخاب سایز سوتین',
        subject: 'آموزش خرید',
        author: 'تیم محتوا',
        source: 'واحد فروش',
        createdAt: '2025-12-03T00:00:00.000Z',
        category: 'fabrics',
        categories: ['fabrics'],
        summary:
            'راهنمای گام‌به‌گام انتخاب سایز مناسب سوتین بر اساس اندازه‌گیری دقیق.',
        content:
            'در این مقاله نحوه اندازه‌گیری دور سینه و زیر سینه، تبدیل اعداد به سایز استاندارد و نکات مهم هنگام خرید آنلاین توضیح داده شده است.',
        views: 1840,
    },
    {
        id: '2',
        code: 'BL-1038',
        title: 'تفاوت پارچه مودال و ویسکوز',
        subject: 'شناخت پارچه',
        author: 'تیم محتوا',
        source: 'واحد کیفیت',
        createdAt: '2025-11-26T00:00:00.000Z',
        category: 'fabrics',
        categories: ['fabrics'],
        summary:
            'مقایسه دوام، جذب رطوبت و لمس دو پارچه پرکاربرد در پوشاک راحتی.',
        content:
            'مودال نرمی و دوام بیشتری دارد و ویسکوز برای تنفس‌پذیری و قیمت مناسب‌تر شناخته می‌شود. انتخاب هرکدام به نوع استفاده بستگی دارد.',
        views: 1320,
    },
    {
        id: '3',
        code: 'BL-1031',
        title: 'نکات بهداشتی نگهداری لباس زیر',
        subject: 'سلامت',
        author: 'نگار سلیمی',
        source: 'واحد کیفیت',
        createdAt: '2025-11-19T00:00:00.000Z',
        category: 'health',
        categories: ['health'],
        summary: 'روش‌های صحیح شست‌وشو و نگهداری لباس زیر برای حفظ بهداشت.',
        content:
            'شست‌وشو با آب سرد، جدا کردن رنگ‌ها، پرهیز از خشک‌کن داغ و تعویض منظم از مهم‌ترین نکات بهداشتی نگهداری لباس زیر است.',
        views: 2670,
    },
    {
        id: '4',
        code: 'BL-1025',
        title: 'پوشاک مناسب دوران بارداری',
        subject: 'بارداری',
        author: 'تیم محتوا',
        source: 'مشاوره تخصصی',
        createdAt: '2025-11-11T00:00:00.000Z',
        category: 'pregnancy',
        categories: ['pregnancy', 'fabrics'],
        summary: 'پیشنهاد پوشاک راحت و ایمن برای دوران بارداری.',
        content:
            'پارچه‌های نرم و کشسان، پشتیبانی مناسب شکم و انتخاب سایز آزاد از نکات کلیدی انتخاب لباس بارداری هستند.',
        views: 980,
    },
    {
        id: '5',
        code: 'BL-1019',
        title: 'چگونه لباس راحتی باکیفیت بخریم',
        subject: 'آموزش خرید',
        author: 'نگار سلیمی',
        source: 'واحد فروش',
        createdAt: '2025-11-03T00:00:00.000Z',
        category: 'fabrics',
        categories: ['fabrics'],
        summary: 'معیارهای انتخاب لباس راحتی با دوام و کیفیت بالا.',
        content:
            'به جنس پارچه، دوخت، کشسانی و استاندارد سایزبندی توجه کنید تا خرید رضایت‌بخش‌تری داشته باشید.',
        views: 1510,
    },
    {
        id: '6',
        code: 'BL-1007',
        title: 'مراقبت از پوست در فصل سرد',
        subject: 'سلامت',
        author: 'تیم محتوا',
        source: 'واحد کیفیت',
        createdAt: '2025-10-23T00:00:00.000Z',
        category: 'health',
        categories: ['health'],
        summary: 'نکات ساده مراقبت پوست هنگام پوشیدن لباس‌های زمستانی.',
        content:
            'انتخاب پارچه‌های ضدحساسیت، تعویض به‌موقع لباس‌های نم‌دار و مرطوب‌کننده‌های ملایم به سلامت پوست در فصل سرد کمک می‌کند.',
        views: 740,
    },
]

export const filterBlogs = (
    items: BlogRowData[],
    category: BlogCategoryId | string
) => {
    if (!category || category === 'all') return items
    return items.filter((item) => item.category === category)
}

export const TABLE_COLOUMN: TableFilterItem[] = [
    {
        id: 'code',
        header_label: 'کد مقاله',
        isChecked: true,
        className: 'w-[110px]',
    },
    { id: 'title', header_label: 'نام مقاله', isChecked: true },
    {
        id: 'subject',
        header_label: 'موضوع',
        isChecked: true,
        className: 'w-[140px]',
    },
    {
        id: 'author',
        header_label: 'نام نویسنده',
        isChecked: true,
        className: 'w-[120px]',
    },
    {
        id: 'source',
        header_label: 'منبع',
        isChecked: true,
        className: 'w-[120px]',
    },
    {
        id: 'createdAt',
        header_label: 'تاریخ ایجاد',
        isChecked: true,
        className: 'w-[120px]',
    },
    {
        id: 'views',
        header_label: 'بازدید',
        isChecked: true,
        className: 'w-[90px] text-center',
    },
    {
        id: 'actions',
        header_label: 'عملیات',
        isChecked: true,
        className: 'w-[1%] text-center',
    },
]

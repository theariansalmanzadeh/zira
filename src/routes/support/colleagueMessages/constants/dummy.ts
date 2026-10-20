export type ColleagueMessage = {
    id: string
    sender: string
    content: string
    createdAt: string
    mine?: boolean
}

export type ColleagueConversation = {
    id: string
    name: string
    meta: string
    preview: string
    time: string
    unread: boolean
    messages: ColleagueMessage[]
}

export const COLLEAGUE_CONVERSATIONS: ColleagueConversation[] = [
    {
        id: '1',
        name: 'سارا محمدی',
        meta: 'دپارتمان فروش · شعبه ونک',
        preview: 'مشتری برای پیگیری سفارش طلا منتظر پاسخ است.',
        time: '۰۹:۴۲',
        unread: true,
        messages: [
            {
                id: '1-1',
                sender: 'سارا محمدی',
                content: 'سلام، مشتری سفارش طلا را پیگیری کرده و می‌گوید فاکتور هنوز تایید نشده.',
                createdAt: '۰۹:۱۸',
            },
            {
                id: '1-2',
                sender: 'شما',
                content: 'فاکتور را در صندوق تیکت‌ها دیدم. تا ظهر وضعیت انبار را می‌پرسم.',
                createdAt: '۰۹:۳۱',
                mine: true,
            },
            {
                id: '1-3',
                sender: 'سارا محمدی',
                content: 'مشتری برای پیگیری سفارش طلا منتظر پاسخ است.',
                createdAt: '۰۹:۴۲',
            },
        ],
    },
    {
        id: '2',
        name: 'امیر حسینی',
        meta: 'انبار مرکزی · شیفت صبح',
        preview: 'موجودی کد ۱۲۴۳ با سیستم یکی نیست.',
        time: '۰۸:۱۵',
        unread: true,
        messages: [
            {
                id: '2-1',
                sender: 'امیر حسینی',
                content: 'سلام، موجودی کد ۱۲۴۳ با سیستم یکی نیست. سه عدد اختلاف دارد.',
                createdAt: '۰۸:۰۲',
            },
            {
                id: '2-2',
                sender: 'امیر حسینی',
                content: 'موجودی کد ۱۲۴۳ با سیستم یکی نیست.',
                createdAt: '۰۸:۱۵',
            },
        ],
    },
    {
        id: '3',
        name: 'نگار کاظمی',
        meta: 'مالی · تسویه همکاران',
        preview: 'رسید واریز دیروز در پرونده مشتری ثبت شد.',
        time: 'دیروز',
        unread: false,
        messages: [
            {
                id: '3-1',
                sender: 'نگار کاظمی',
                content: 'رسید واریز دیروز را به پرونده مشتری اضافه کردم.',
                createdAt: '۱۶:۴۰',
            },
            {
                id: '3-2',
                sender: 'شما',
                content: 'ممنون، تیکت را می‌بندم.',
                createdAt: '۱۶:۵۵',
                mine: true,
            },
        ],
    },
    {
        id: '4',
        name: 'رضا اکبری',
        meta: 'پشتیبانی · شیفت عصر',
        preview: 'تیکت ضمانت نامه به دپارتمان حقوقی ارجاع شد.',
        time: 'دیروز',
        unread: false,
        messages: [
            {
                id: '4-1',
                sender: 'رضا اکبری',
                content: 'تیکت ضمانت‌نامه را به دپارتمان حقوقی ارجاع دادم.',
                createdAt: '۱۸:۱۲',
            },
        ],
    },
]

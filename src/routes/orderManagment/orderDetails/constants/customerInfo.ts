export type InfoField = {
    label: string
    value: string
    dir?: 'rtl' | 'ltr'
    isNumeric?: boolean
}

export const CUSTOMER_VERIFICATION_FIELDS: InfoField[] = [
    { label: 'نام و نام خانوادگی', value: 'پارسا آرامی' },
    { label: 'جنسیت', value: 'مرد' },
    { label: 'نام کاربری درخواستی', value: 'parsa.arami', dir: 'ltr' },
    { label: 'کد ملی', value: '0072345689', isNumeric: true, dir: 'ltr' },
    {
        label: 'شماره پروانه کسب',
        value: '0228451',
        isNumeric: true,
        dir: 'ltr',
    },
    {
        label: 'موبایل ۱',
        value: '+98 912 673 2123',
        isNumeric: true,
        dir: 'ltr',
    },
    {
        label: 'موبایل ۲',
        value: '+98 935 120 8845',
        isNumeric: true,
        dir: 'ltr',
    },
    {
        label: 'تلفن ثابت',
        value: '021 2284 5510',
        isNumeric: true,
        dir: 'ltr',
    },
    { label: 'نام معرف', value: 'بهرام اکبری' },
    {
        label: 'آدرس',
        value: 'تهران، ولنجک، خیابان ۱۹، پلاک ۸، واحد ۳',
    },
]

export type GuaranteeStatus = 'active' | 'pending'
export type GuaranteeType = 'personal-cheque' | 'promissory-note'

export type GuaranteeField = {
    label: string
    value: string
    isDate?: boolean
    isNumeric?: boolean
    dir?: 'rtl' | 'ltr'
}

export type GuaranteeCardItem = {
    id: string
    index: number
    type: GuaranteeType
    typeLabel: string
    creditLabel: string
    amount: number
    status: GuaranteeStatus
    fields: GuaranteeField[]
}

export const GUARANTEE_STATUS_CONFIG: Record<
    GuaranteeStatus,
    { text: string; variant: 'success' | 'warning' }
> = {
    active: { text: 'فعال', variant: 'success' },
    pending: { text: 'در انتظار تایید', variant: 'warning' },
}

export const GUARANTEE_TYPE_CLASSNAME: Record<GuaranteeType, string> = {
    'personal-cheque':
        'bg-primary-container text-on-primary-container border-0',
    'promissory-note': 'bg-warning-container text-on-warning-container border-0',
}

export const GUARANTEE_CARDS: GuaranteeCardItem[] = [
    {
        id: 'guarantee-1',
        index: 1,
        type: 'personal-cheque',
        typeLabel: 'چک شخصی',
        creditLabel: 'اعتبار چکی',
        amount: 200000000,
        status: 'active',
        fields: [
            {
                label: 'شماره چک (صیادی)',
                value: '1234567890123456',
                isNumeric: true,
                dir: 'ltr',
            },
            { label: 'نام بانک', value: 'بانک ملت' },
            { label: 'شعبه', value: 'ولنجک' },
            { label: 'صاحب حساب', value: 'پارسا آرامی' },
            {
                label: 'تاریخ سررسید',
                value: '2026-06-05T00:00:00.000Z',
                isDate: true,
            },
        ],
    },
    {
        id: 'guarantee-2',
        index: 2,
        type: 'promissory-note',
        typeLabel: 'سفته',
        creditLabel: 'اعتبار طلایی',
        amount: 150000000,
        status: 'pending',
        fields: [
            {
                label: 'شماره سفته',
                value: '2284590',
                isNumeric: true,
                dir: 'ltr',
            },
            { label: 'نام ضامن', value: 'بهرام اکبری' },
            {
                label: 'کد ملی ضامن',
                value: '0065432109',
                isNumeric: true,
                dir: 'ltr',
            },
            {
                label: 'تاریخ سررسید',
                value: '2026-09-01T00:00:00.000Z',
                isDate: true,
            },
        ],
    },
]

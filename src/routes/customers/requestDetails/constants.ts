export type DocumentVerificationData = {
    fullName: string
    gender: string
    username: string
    nationalId: string
    licenseNumber: string
    mobile1: string
    mobile2: string
    phone: string
    referrerName: string
    address: string
}

export type CreditDocumentField = {
    label: string
    value: string
}

export type CreditDocumentData = {
    id: string
    index: number
    typeLabel: string
    typeTone: 'primary' | 'warning'
    amount: number
    creditLabel: string
    status: 'active' | 'pending' | 'released'
    fields: CreditDocumentField[]
}

export type MarketerOption = {
    id: string
    name: string
}

export const DOCUMENT_VERIFICATION_DUMMY: DocumentVerificationData = {
    fullName: 'آرام کشاورز',
    gender: 'مرد',
    username: 'aram.keshavarz',
    nationalId: '0092345678',
    licenseNumber: '0228453',
    mobile1: '+98 912 673 2123',
    mobile2: '+98 935 120 8845',
    phone: '021 2284 5510',
    referrerName: 'بهرام اکبری',
    address: 'تهران، ولنجک، خیابان ۱۹، پلاک ۸، واحد ۳',
}

export const CREDIT_DOCUMENTS_DUMMY: CreditDocumentData[] = [
    {
        id: 'credit-1',
        index: 1,
        typeLabel: 'چک شخصی',
        typeTone: 'primary',
        amount: 200000000,
        creditLabel: 'اعتبار چکی',
        status: 'active',
        fields: [
            { label: 'شماره چک (صیادی)', value: '1234567890123456' },
            { label: 'نام بانک', value: 'بانک ملت' },
            { label: 'شعبه', value: 'ولنجک' },
            { label: 'صاحب حساب', value: 'پارسا آرامی' },
            { label: 'تاریخ سررسید', value: '۱۴۰۵/۰۳/۱۵' },
        ],
    },
    {
        id: 'credit-2',
        index: 2,
        typeLabel: 'سفته',
        typeTone: 'warning',
        amount: 150000000,
        creditLabel: 'اعتبار طلایی',
        status: 'pending',
        fields: [
            { label: 'شماره سفته', value: '2284590' },
            { label: 'نام ضامن', value: 'بهرام اکبری' },
            { label: 'کد ملی ضامن', value: '0065432109' },
            { label: 'تاریخ سررسید', value: '۱۴۰۵/۰۶/۱۰' },
            { label: 'محل تنظیم', value: 'تهران' },
        ],
    },
]

export const MARKETER_OPTIONS_DUMMY: MarketerOption[] = [
    { id: 'm-1', name: 'رضا کریمی' },
    { id: 'm-2', name: 'سحر نوری' },
    { id: 'm-3', name: 'مهدی رشیدی' },
]

export const MARKETER_PERCENT_OPTIONS = [2, 2.5, 3, 4] as const

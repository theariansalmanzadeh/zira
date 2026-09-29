export type PosDeviceItem = {
    id: string
    index: number
    name: string
    code: string
    model: string
    bank: string
    bankAccount: string
    terminalNumber: string
    terminalPassword: string
    cashRegister: string
    /** Today's transaction volume in million Tomans */
    todayTransactionsMillion: number
}

export const POS_DEVICE_COLUMNS = [
    { id: 'index', label: 'ردیف' },
    { id: 'name', label: 'نام دستگاه' },
    { id: 'model', label: 'مدل دستگاه' },
    { id: 'bank', label: 'بانک متصل' },
    { id: 'bankAccount', label: 'حساب بانکی متصل' },
    { id: 'terminalNumber', label: 'شماره پایانه' },
    { id: 'terminalPassword', label: 'رمز پایانه' },
    { id: 'expand', label: '' },
] as const

export const POS_DEVICE_GRID_CLASS =
    'grid grid-cols-[minmax(0,0.4fr)_minmax(0,1.4fr)_minmax(0,1.2fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,0.95fr)_minmax(0,0.75fr)_2.5rem] items-center gap-3'

export const POS_DEVICES_DUMMY: PosDeviceItem[] = [
    {
        id: '1',
        index: 1,
        name: 'کارت‌خوان ۱',
        code: 'POS-8845-100',
        model: 'سامان کیش SP-930',
        bank: 'بانک ملت',
        bankAccount: '1234567890',
        terminalNumber: '88451001',
        terminalPassword: '4821',
        cashRegister: 'صندوق فروش ۱',
        todayTransactionsMillion: 12,
    },
    {
        id: '2',
        index: 2,
        name: 'کارت‌خوان ۲',
        code: 'POS-8845-101',
        model: 'ایران کیش IK-550',
        bank: 'بانک سامان',
        bankAccount: '9876543210',
        terminalNumber: '88451002',
        terminalPassword: '3390',
        cashRegister: 'صندوق فروش ۲',
        todayTransactionsMillion: 9.5,
    },
    {
        id: '3',
        index: 3,
        name: 'کارت‌خوان ۳',
        code: 'POS-8845-102',
        model: 'به‌پرداخت BP-720',
        bank: 'بانک ملی',
        bankAccount: '1122334455',
        terminalNumber: '88451003',
        terminalPassword: '7744',
        cashRegister: 'صندوق فروش ۳',
        todayTransactionsMillion: 7.2,
    },
]

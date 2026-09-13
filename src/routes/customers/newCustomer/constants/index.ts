export const NEW_CUSTOMER_STEPS = {
    identity: 'identity',
    addressAndContact: 'addressAndContact',
    credit: 'credit',
    customerAccount: 'customerAccount',
} as const

export type NewCustomerStep =
    (typeof NEW_CUSTOMER_STEPS)[keyof typeof NEW_CUSTOMER_STEPS]

export const CREATE_CUSTOMER_STEPS = [
    { id: NEW_CUSTOMER_STEPS.identity, label: 'اطلاعات هویتی' },
    { id: NEW_CUSTOMER_STEPS.addressAndContact, label: 'تماس و آدرس' },
    { id: NEW_CUSTOMER_STEPS.credit, label: 'بازاریاب و اعتبار' },
    { id: NEW_CUSTOMER_STEPS.customerAccount, label: 'حساب کاربری' },
] as const

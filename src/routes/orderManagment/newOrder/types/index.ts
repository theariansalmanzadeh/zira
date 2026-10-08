export type CustomerLevel = 'gold' | 'silver' | 'bronze'

export type CreateOrderCustomer = {
    id: string
    name: string
    phone: string
    level: CustomerLevel
    initial: string
    swatch: string
}

export type CartItem = {
    id: string
    name: string
    unitPrice: number
    qty: number
    swatch: string
}

export type PaymentType = 'cash' | 'cheque' | 'credit'

export type ChequeInfo = {
    id: string
    bank: string
    branch: string
    sayyadId: string
    amount: string
    serialNumber: string
    iban: string
    nationalId: string
    issuerName: string
    payee: string
    dueDate: Date | undefined
    frontFileName?: string
    backFileName?: string
}

export type CashPaymentInfo = {
    id: string
    amount: string
}


export type PaymentOption = {
    type: PaymentType
    label: string
    sub: string
    icon: string
    iconBgClassName: string
    iconFgClassName: string
}

export type CreateOrderContextValue = {
    activeStep: number
    setActiveStep: (step: number) => void
    goNext: () => void
    goPrev: () => void
    customers: CreateOrderCustomer[]
    selectedCustomerId: string
    setSelectedCustomerId: (id: string) => void
    cartItems: CartItem[]
    addCartItem: (item: CartItem) => void
    updateCartQty: (id: string, qty: number) => void
    removeCartItem: (id: string) => void
    paymentType: PaymentType[]
    setPaymentType: (types: PaymentType[]) => void
    cheques: ChequeInfo[]
    addCheque: () => void
    removeCheque: (id: string) => void
    updateCheque: (id: string, info: Partial<ChequeInfo>) => void
    cashPayments: CashPaymentInfo[]
    addCashPayment: () => void
    removeCashPayment: (id: string) => void
    updateCashPayment: (id: string, info: Partial<CashPaymentInfo>) => void
    cacheInfo: number
    setCacheInfo: (value: number) => void
    otpDigits: string[]
    setOtpDigit: (index: number, value: string) => void
    cartCount: number
    cartTotal: number
    finalTotal: number
    selectedCustomer: CreateOrderCustomer | undefined
}
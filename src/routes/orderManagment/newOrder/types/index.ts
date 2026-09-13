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
    chequeNumber: string
    dueDate: string
    bank: string
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
    chequeInfo: ChequeInfo
    setChequeInfo: (info: Partial<ChequeInfo>) => void
    cacheInfo: number
    setCacheInfo: (value: number) => void
    otpDigits: string[]
    setOtpDigit: (index: number, value: string) => void
    cartCount: number
    cartTotal: number
    finalTotal: number
    selectedCustomer: CreateOrderCustomer | undefined
}
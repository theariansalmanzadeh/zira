export type CustomerLevel = 'gold' | 'silver' | 'bronze'

export type FactorCustomer = {
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

export type NewFactorContextValue = {
    activeStep: number
    setActiveStep: (step: number) => void
    goNext: () => void
    goPrev: () => void
    customers: FactorCustomer[]
    selectedCustomerId: string
    setSelectedCustomerId: (id: string) => void
    cartItems: CartItem[]
    addCartItem: (item: CartItem) => void
    updateCartQty: (id: string, qty: number) => void
    removeCartItem: (id: string) => void
    warehouseId: string
    setWarehouseId: (id: string) => void
    settlementType: string
    setSettlementType: (type: string) => void
    cartCount: number
    cartTotal: number
    taxAmount: number
    finalTotal: number
    selectedCustomer: FactorCustomer | undefined
}

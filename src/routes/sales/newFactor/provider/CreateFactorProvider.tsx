'use client'

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'
import type { CartItem, NewFactorContextValue } from '../types'
import {
    FACTOR_CUSTOMERS,
    INITIAL_CART_ITEMS,
    SETTLEMENT_TYPE_OPTIONS,
    TAX_RATE,
    WAREHOUSE_OPTIONS,
} from '../constants'

const CreateFactorContext = createContext<NewFactorContextValue | null>(null)

export function useCreateFactorContext() {
    const context = useContext(CreateFactorContext)

    if (!context) {
        throw new Error(
            'useCreateFactorContext must be used within CreateFactorProvider'
        )
    }

    return context
}

type CreateFactorProviderProps = {
    children: React.ReactNode
}

const CreateFactorProvider = ({ children }: CreateFactorProviderProps) => {
    const [activeStep, setActiveStep] = useState(1)
    const [selectedCustomerId, setSelectedCustomerId] = useState(
        FACTOR_CUSTOMERS[0]?.id ?? ''
    )
    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS)
    const [warehouseId, setWarehouseId] = useState(
        WAREHOUSE_OPTIONS[0]?.value ?? ''
    )
    const [settlementType, setSettlementType] = useState(
        SETTLEMENT_TYPE_OPTIONS[0]?.value ?? ''
    )

    const goNext = useCallback(() => {
        setActiveStep((step) => Math.min(3, step + 1))
    }, [])

    const goPrev = useCallback(() => {
        setActiveStep((step) => Math.max(1, step - 1))
    }, [])

    const updateCartQty = useCallback((id: string, qty: number) => {
        setCartItems((items) =>
            items.map((item) =>
                item.id === id ? { ...item, qty: Math.max(1, qty) } : item
            )
        )
    }, [])

    const removeCartItem = useCallback((id: string) => {
        setCartItems((items) => items.filter((item) => item.id !== id))
    }, [])

    const addCartItem = useCallback((item: CartItem) => {
        setCartItems((items) => {
            const existing = items.find((cartItem) => cartItem.id === item.id)
            if (existing) {
                return items.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, qty: cartItem.qty + item.qty }
                        : cartItem
                )
            }

            return [...items, item]
        })
    }, [])

    const cartCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.qty, 0),
        [cartItems]
    )

    const cartTotal = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.qty * item.unitPrice, 0),
        [cartItems]
    )

    const taxAmount = useMemo(
        () => Math.round(cartTotal * TAX_RATE),
        [cartTotal]
    )

    const finalTotal = useMemo(
        () => cartTotal + taxAmount,
        [cartTotal, taxAmount]
    )

    const selectedCustomer = useMemo(
        () => FACTOR_CUSTOMERS.find((customer) => customer.id === selectedCustomerId),
        [selectedCustomerId]
    )

    const value = useMemo(
        () => ({
            activeStep,
            setActiveStep,
            goNext,
            goPrev,
            customers: FACTOR_CUSTOMERS,
            selectedCustomerId,
            setSelectedCustomerId,
            cartItems,
            addCartItem,
            updateCartQty,
            removeCartItem,
            warehouseId,
            setWarehouseId,
            settlementType,
            setSettlementType,
            cartCount,
            cartTotal,
            taxAmount,
            finalTotal,
            selectedCustomer,
        }),
        [
            activeStep,
            goNext,
            goPrev,
            selectedCustomerId,
            cartItems,
            addCartItem,
            updateCartQty,
            removeCartItem,
            warehouseId,
            settlementType,
            cartCount,
            cartTotal,
            taxAmount,
            finalTotal,
            selectedCustomer,
        ]
    )

    return (
        <CreateFactorContext.Provider value={value}>
            {children}
        </CreateFactorContext.Provider>
    )
}

export default CreateFactorProvider

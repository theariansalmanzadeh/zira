'use client'

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react'
import type {
    CartItem,
    CashPaymentInfo,
    ChequeInfo,
    PaymentType,
    CreateOrderContextValue,
} from '../types'
import {
    INITIAL_CART_ITEMS,
    ORDER_CUSTOMERS,
    createEmptyCashPayment,
    createEmptyCheque,
} from '../constants'

const CreateOrderContext = createContext<CreateOrderContextValue | null>(null)

export function useCreateOrderContext() {
    const context = useContext(CreateOrderContext)

    if (!context) {
        throw new Error(
            'useCreateOrderContext must be used within CreateOrderProvider'
        )
    }

    return context
}

type CreateOrderProviderProps = {
    children: React.ReactNode
}

const CreateOrderProvider = ({ children }: CreateOrderProviderProps) => {
    const [activeStep, setActiveStep] = useState(1)
    const [selectedCustomerId, setSelectedCustomerId] = useState(
        ORDER_CUSTOMERS[0]?.id ?? ''
    )
    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS)
    const [paymentType, setPaymentType] = useState<PaymentType[]>([])
    const [cheques, setCheques] = useState<ChequeInfo[]>([createEmptyCheque()])
    const [cashPayments, setCashPayments] = useState<CashPaymentInfo[]>([
        createEmptyCashPayment(),
    ])
    const [cacheInfo, setCacheInfo] = useState(0)
    const [otpDigits, setOtpDigits] = useState(['۸', '۳', '', ''])

    const goNext = useCallback(() => {
        setActiveStep((step) => Math.min(4, step + 1))
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

    const addCheque = useCallback(() => {
        setCheques((prev) => [...prev, createEmptyCheque()])
    }, [])

    const removeCheque = useCallback((id: string) => {
        setCheques((prev) => prev.filter((cheque) => cheque.id !== id))
    }, [])

    const updateCheque = useCallback((id: string, info: Partial<ChequeInfo>) => {
        setCheques((prev) =>
            prev.map((cheque) =>
                cheque.id === id ? { ...cheque, ...info } : cheque
            )
        )
    }, [])

    const addCashPayment = useCallback(() => {
        setCashPayments((prev) => [...prev, createEmptyCashPayment()])
    }, [])

    const removeCashPayment = useCallback((id: string) => {
        setCashPayments((prev) => prev.filter((payment) => payment.id !== id))
    }, [])

    const updateCashPayment = useCallback(
        (id: string, info: Partial<CashPaymentInfo>) => {
            setCashPayments((prev) =>
                prev.map((payment) =>
                    payment.id === id ? { ...payment, ...info } : payment
                )
            )
        },
        []
    )

    const setOtpDigit = useCallback((index: number, value: string) => {
        setOtpDigits((prev) => {
            const next = [...prev]
            next[index] = value.slice(-1)
            return next
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

    const finalTotal = useMemo(() => Math.round(cartTotal * 1.09), [cartTotal])

    const selectedCustomer = useMemo(
        () => ORDER_CUSTOMERS.find((customer) => customer.id === selectedCustomerId),
        [selectedCustomerId]
    )

    const value = useMemo(
        () => ({
            activeStep,
            setActiveStep,
            goNext,
            goPrev,
            customers: ORDER_CUSTOMERS,
            selectedCustomerId,
            setSelectedCustomerId,
            cartItems,
            addCartItem,
            updateCartQty,
            removeCartItem,
            paymentType,
            setPaymentType,
            cheques,
            addCheque,
            removeCheque,
            updateCheque,
            cashPayments,
            addCashPayment,
            removeCashPayment,
            updateCashPayment,
            cacheInfo,
            setCacheInfo,
            otpDigits,
            setOtpDigit,
            cartCount,
            cartTotal,
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
            paymentType,
            cheques,
            addCheque,
            removeCheque,
            updateCheque,
            cashPayments,
            addCashPayment,
            removeCashPayment,
            updateCashPayment,
            cacheInfo,
            otpDigits,
            setOtpDigit,
            cartCount,
            cartTotal,
            finalTotal,
            selectedCustomer,
        ]
    )

    return (
        <CreateOrderContext.Provider value={value}>
            {children}
        </CreateOrderContext.Provider>
    )
}

export default CreateOrderProvider

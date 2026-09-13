'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

type NewPaymentContextValue = {
    sourceAccount: string
    paymentType: string
    paymentAmount: string
    setSourceAccount: (value: string) => void
    setPaymentType: (value: string) => void
    setPaymentAmount: (value: string) => void
}

const NewPaymentContext = createContext<NewPaymentContextValue | null>(null)

export function useNewPayment() {
    const context = useContext(NewPaymentContext)

    if (!context) {
        throw new Error('useNewPayment must be used within NewPaymentProvider')
    }

    return context
}

type NewPaymentProviderProps = {
    children: ReactNode
}

const NewPaymentProvider = ({ children }: NewPaymentProviderProps) => {
    const [sourceAccount, setSourceAccount] = useState('')
    const [paymentType, setPaymentType] = useState('')
    const [paymentAmount, setPaymentAmount] = useState('')

    const value = useMemo(
        () => ({
            sourceAccount,
            paymentType,
            paymentAmount,
            setSourceAccount,
            setPaymentType,
            setPaymentAmount,
        }),
        [sourceAccount, paymentType, paymentAmount]
    )

    return (
        <NewPaymentContext.Provider value={value}>
            {children}
        </NewPaymentContext.Provider>
    )
}

export default NewPaymentProvider

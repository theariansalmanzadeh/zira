'use client'

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import type {
    BundleContextValue,
    BundlePricingSummary,
    BundleProduct,
} from '../types'
import { BUNDLE_PRODUCTS_DUMMY } from '../constants'

export type { BundleProduct, BundleTurnover } from '../types'
export { BUNDLE_PRODUCTS_DUMMY } from '../constants'


const BundleContext = createContext<BundleContextValue | null>(null)

export function useBundle() {
    const context = useContext(BundleContext)
    if (!context) {
        throw new Error('useBundle must be used within BundleProvider')
    }
    return context
}

type BundleProviderProps = {
    children: ReactNode
}

const getLineBase = (product: BundleProduct) =>
    product.basePrice * product.quantity

const getLineDiscount = (product: BundleProduct) =>
    getLineBase(product) * (product.discountPercent / 100)

export default function BundleProvider({ children }: BundleProviderProps) {
    const [name, setName] = useState('')
    const [code, setCode] = useState('BND-1006')
    const [policy, setPolicy] = useState('low-with-hot')
    const [description, setDescription] = useState('')
    const [products, setProducts] = useState<BundleProduct[]>(
        BUNDLE_PRODUCTS_DUMMY
    )
    const [finalPrice, setFinalPrice] = useState('')

    const updateProductQuantity = useCallback((id: string, quantity: number) => {
        setProducts((prev) =>
            prev.map((product) =>
                product.id === id
                    ? { ...product, quantity: Math.max(1, quantity) }
                    : product
            )
        )
    }, [])

    const addProduct = useCallback((product: BundleProduct) => {
        setProducts((prev) => {
            if (prev.some((item) => item.id === product.id)) return prev
            return [...prev, product]
        })
    }, [])

    const removeProduct = useCallback((id: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== id))
    }, [])

    const updateProductDiscount = useCallback(
        (id: string, discountPercent: number) => {
            const nextDiscount = Number.isFinite(discountPercent)
                ? Math.min(100, Math.max(0, discountPercent))
                : 0

            setProducts((prev) =>
                prev.map((product) =>
                    product.id === id
                        ? { ...product, discountPercent: nextDiscount }
                        : product
                )
            )
        },
        []
    )

    const pricing = useMemo<BundlePricingSummary>(() => {
        const itemsCount = products.length
        const totalUnits = products.reduce(
            (sum, product) => sum + product.quantity,
            0
        )
        const baseTotal = products.reduce(
            (sum, product) => sum + getLineBase(product),
            0
        )
        const discountTotal = products.reduce(
            (sum, product) => sum + getLineDiscount(product),
            0
        )
        const discountPercent =
            baseTotal > 0 ? Math.round((discountTotal / baseTotal) * 100) : 0
        const calculatedPrice = Math.round(baseTotal - discountTotal)

        return {
            itemsCount,
            totalUnits,
            baseTotal,
            discountTotal: Math.round(discountTotal),
            discountPercent,
            calculatedPrice,
        }
    }, [products])

    const displayPrice = useMemo(() => {
        const normalized = finalPrice
            .replace(/[۰-۹]/g, (digit) =>
                String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
            )
            .replace(/[^\d]/g, '')
        const parsed = Number(normalized)
        if (finalPrice.trim() && Number.isFinite(parsed) && parsed > 0) {
            return parsed
        }
        return pricing.calculatedPrice
    }, [finalPrice, pricing.calculatedPrice])

    const value = useMemo(
        () => ({
            name,
            setName,
            code,
            setCode,
            policy,
            setPolicy,
            description,
            setDescription,
            products,
            setProducts,
            addProduct,
            removeProduct,
            updateProductQuantity,
            updateProductDiscount,
            finalPrice,
            setFinalPrice,
            pricing,
            displayPrice,
        }),
        [
            name,
            code,
            policy,
            description,
            products,
            addProduct,
            removeProduct,
            updateProductQuantity,
            updateProductDiscount,
            finalPrice,
            pricing,
            displayPrice,
        ]
    )

    return (
        <BundleContext.Provider value={value}>{children}</BundleContext.Provider>
    )
}

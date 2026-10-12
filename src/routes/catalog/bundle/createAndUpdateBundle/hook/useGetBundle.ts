'use client'

import { useEffect } from 'react'
import { useGetBundle as useGetBundleDetail } from '@/src/routes/catalog/hooks/catalog'
import { useBundle } from '../provider'
import type { BundleProduct } from '../types'

export const useGetBundle = (bundleId?: string) => {
    const {
        setName,
        setCode,
        setPolicy,
        setDescription,
        setProducts,
    } = useBundle()

    const { data: bundle, isPending, isError } = useGetBundleDetail(
        bundleId ?? '',
        Boolean(bundleId)
    )

    useEffect(() => {
        if (!bundle) return

        setName(bundle.name ?? '')
        setCode(bundle.code ?? '')
        if (bundle.policy) {
            setPolicy(bundle.policy)
        }
        setDescription(bundle.description ?? '')

        if (Array.isArray(bundle.lines)) {
            const mappedProducts: BundleProduct[] = bundle.lines.map((line) => ({
                id: line.item_id || line.id,
                code: line.item_code || '',
                name: line.item_name || '',
                turnover: 'medium',
                quantity: Math.max(1, Number(line.quantity) || 1),
                basePrice: 0,
                discountPercent: 0,
            }))
            setProducts(mappedProducts)
        }
    }, [bundle, setName, setCode, setPolicy, setDescription, setProducts])

    return {
        bundle,
        isPending,
        isError,
    }
}

'use client'

import { useEffect } from 'react'
import type { BundleLineOut } from '@/src/api/types/admin/catalog'
import { useGetBundle as useGetBundleDetail } from '@/src/routes/catalog/hooks/catalog'
import { useBundle } from '../provider'
import type { BundleProduct } from '../types'

const mapLineToProduct = (line: BundleLineOut): BundleProduct => ({
    id: line.item_id || line.id,
    code: line.item_code || '',
    name: line.item_name || '',
    turnover: 'medium',
    quantity: Math.max(1, Number(line.quantity) || 1),
    basePrice: 0,
    discountPercent: 0,
})

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
        setProducts((bundle.lines ?? []).map(mapLineToProduct))
    }, [bundle, setName, setCode, setPolicy, setDescription, setProducts])

    return {
        bundle,
        isPending: Boolean(bundleId) && isPending,
        isError,
    }
}

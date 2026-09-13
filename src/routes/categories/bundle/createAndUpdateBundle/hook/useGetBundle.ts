'use client'

import { useEffect } from 'react'
import { getBundleDetailById } from '../constants'
import { useBundle } from '../provider'

export const useGetBundle = (bundleId?: string) => {
    const {
        setName,
        setCode,
        setPolicy,
        setDescription,
        setProducts,
        setFinalPrice,
    } = useBundle()

    useEffect(() => {
        if (!bundleId) return

        const bundle = getBundleDetailById(bundleId)
        if (!bundle) return

        setName(bundle.name)
        setCode(bundle.code)
        setPolicy(bundle.policy)
        setDescription(bundle.description)
        setProducts(bundle.products)
        setFinalPrice(bundle.finalPrice)
    }, [
        bundleId,
        setName,
        setCode,
        setPolicy,
        setDescription,
        setProducts,
        setFinalPrice,
    ])
}

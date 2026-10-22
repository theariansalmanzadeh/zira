import type { BundleProduct } from '../types'
import type {
    BundleCreateIn,
    BundleLineIn,
    BundleUpdateIn,
} from '@/src/api/types/admin/catalog'

export const mapProductsToBundleLines = (
    products: BundleProduct[]
): BundleLineIn[] => {
    return products.map((product) => ({
        item_id: product.id,
        quantity: product.quantity,
    }))
}

export const mapBundleFormToCreatePayload = ({
    name,
    description,
    policy,
    products,
}: {
    name: string
    description?: string
    policy: BundleCreateIn['policy']
    products: BundleProduct[]
}): BundleCreateIn => {
    return {
        name,
        description: description?.trim() ? description.trim() : undefined,
        policy,
        lines: mapProductsToBundleLines(products),
    }
}

export const mapBundleFormToUpdatePayload = ({
    name,
    description,
    policy,
    products,
}: {
    name: string
    description?: string
    policy: BundleUpdateIn['policy']
    products: BundleProduct[]
}): BundleUpdateIn => {
    return {
        name,
        description: description?.trim() ? description.trim() : null,
        policy,
        lines: mapProductsToBundleLines(products),
    }
}

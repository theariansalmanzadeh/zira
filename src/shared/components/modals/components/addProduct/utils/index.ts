import { ADD_PRODUCT_DUMMY } from '../constants'
import type { AddProductItem, AddProductModalData } from '../constants'

export const toggleProductSelection = (
    prev: Set<string>,
    id: string
): { nextSelectedIds: Set<string>; didSelect: boolean } => {
    const nextSelectedIds = new Set(prev)
    const didSelect = !nextSelectedIds.has(id)

    if (didSelect) nextSelectedIds.add(id)
    else nextSelectedIds.delete(id)

    return { nextSelectedIds, didSelect }
}

export const ensureProductQuantity = (
    quantities: Record<string, number>,
    id: string
): Record<string, number> => ({
    ...quantities,
    [id]: quantities[id] ?? 1,
})

export const toggleAllProductSelections = (
    prev: Set<string>,
    products: AddProductItem[],
    checked: boolean
): Set<string> => {
    const next = new Set(prev)
    products.forEach((product) => {
        if (checked) next.add(product.id)
        else next.delete(product.id)
    })
    return next
}

export const ensureQuantitiesForProducts = (
    quantities: Record<string, number>,
    products: AddProductItem[]
): Record<string, number> => {
    const next = { ...quantities }
    products.forEach((product) => {
        next[product.id] = next[product.id] ?? 1
    })
    return next
}

export const updateProductQuantity = (
    quantities: Record<string, number>,
    id: string,
    quantity: number
): Record<string, number> => ({
    ...quantities,
    [id]: quantity,
})

type ConfirmAddProductParams = {
    selectedIds: Set<string>
    quantities: Record<string, number>
    hasQuantity: boolean
    modalData: AddProductModalData | null | undefined
    closeModal: () => void
    products?: AddProductItem[]
}

export const confirmAddProductSelection = ({
    selectedIds,
    quantities,
    hasQuantity,
    modalData,
    closeModal,
    products = ADD_PRODUCT_DUMMY,
}: ConfirmAddProductParams) => {
    const selected = products
        .filter((product) => selectedIds.has(product.id))
        .map((product) =>
            hasQuantity
                ? { ...product, quantity: quantities[product.id] ?? 1 }
                : product
        )
    const initialIds = new Set(modalData?.selectedIds ?? [])

    if (modalData?.addProduct || modalData?.removeProduct) {
        initialIds.forEach((id) => {
            if (!selectedIds.has(id)) {
                modalData.removeProduct?.(id)
            }
        })
        selected.forEach((item) => {
            if (!initialIds.has(item.id)) {
                modalData.addProduct?.(item)
            }
        })
    }

    modalData?.onConfirm?.(selected)
    closeModal()
}

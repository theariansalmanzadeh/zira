'use client'

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react'
import type { ProductDetailOut } from '@/src/api/types/admin/catalog'
import { useGetProduct } from '@/src/routes/catalog/hooks/catalog'
import { COLOR_BASIS_ID, SIZE_BASIS_ID } from '../utils/attributes'

export type PricingMatrixRow = {
    sizeId: string
    colorId: string
    code: string
    displayName: string
    basePrice: string
    capacity: string
    active: boolean
}

type CreateProductsContextValue = {
    productId?: string
    isEditing: boolean
    isLoadingProduct: boolean
    productTitle: string
    setProductTitle: (value: string) => void
    productCode: string
    setProductCode: (value: string) => void
    brand: string
    setBrand: (value: string) => void
    mainCategory: string
    setMainCategory: (value: string) => void
    midCategory: string
    setMidCategory: (value: string) => void
    subCategory: string
    setSubCategory: (value: string) => void
    salesUnit: string
    setSalesUnit: (value: string) => void
    sizes: string[]
    setSizes: (values: string[]) => void
    colors: string[]
    setColors: (values: string[]) => void
    packs: string[]
    setPacks: (values: string[]) => void
    attributeSelections: Record<
        string,
        {
            name: string
            code: string
            values: string[]
        }
    >
    setAttributeSelection: (
        attributeId: string,
        selection: { name: string; code: string; values: string[] }
    ) => void
    basePriceBasis: string[]
    setBasePriceBasis: (values: string[]) => void
    unitPrice: string
    setUnitPrice: (value: string) => void
    discountType: string
    setDiscountType: (value: string) => void
    discountValue: string
    setDiscountValue: (value: string) => void
    pricingRows: Record<string, PricingMatrixRow>
    updatePricingRow: (
        key: string,
        updates: Partial<PricingMatrixRow> &
            Pick<PricingMatrixRow, 'sizeId' | 'colorId' | 'displayName'>
    ) => void
}

const CreateProductsContext = createContext<CreateProductsContextValue | null>(
    null
)

export function useCreateProducts() {
    const context = useContext(CreateProductsContext)

    if (!context) {
        throw new Error(
            'useCreateProducts must be used within CreateProductsProvider'
        )
    }

    return context
}

type CreateProductsProviderProps = {
    children: ReactNode
    productId?: string
}

const emptyPricingRow = (
    sizeId: string,
    colorId: string,
    displayName: string
): PricingMatrixRow => ({
    sizeId,
    colorId,
    code: '',
    displayName,
    basePrice: '',
    capacity: '',
    active: true,
})

const hydrateFromProduct = (product: ProductDetailOut) => {
    const sizeIds = (product.sizes ?? []).map((size) => size.id)
    const colorIds = (product.colors ?? []).map((color) => color.id)

    const attributeSelections: Record<
        string,
        { name: string; code: string; values: string[] }
    > = {}

    for (const row of product.attribute_values ?? []) {
        if (!row.value_id) continue
        const current = attributeSelections[row.attribute_id]
        if (current) {
            current.values.push(row.value_id)
            continue
        }
        attributeSelections[row.attribute_id] = {
            name: row.attribute_name,
            code: row.attribute_code,
            values: [row.value_id],
        }
    }

    const pricingRows: Record<string, PricingMatrixRow> = {}
    for (const size of product.sizes ?? []) {
        for (const color of product.colors ?? []) {
            const key = `${size.id}-${color.id}`
            pricingRows[key] = {
                sizeId: size.id,
                colorId: color.id,
                code: product.base_code || '',
                displayName: `${size.name} / ${color.name}`,
                basePrice: '',
                capacity: '',
                active: true,
            }
        }
    }

    const basePriceBasis: string[] = []
    if (sizeIds.length > 0) basePriceBasis.push(SIZE_BASIS_ID)
    if (colorIds.length > 0) basePriceBasis.push(COLOR_BASIS_ID)

    return {
        productTitle: product.name ?? '',
        productCode: product.base_code || product.code || '',
        brand: product.brand_id ?? '',
        mainCategory: '',
        midCategory: '',
        subCategory: product.category_id ?? '',
        salesUnit: '',
        sizes: sizeIds,
        colors: colorIds,
        packs: [] as string[],
        attributeSelections,
        basePriceBasis,
        pricingRows,
    }
}

const CreateProductsProvider = ({
    children,
    productId,
}: CreateProductsProviderProps) => {
    const isEditing = Boolean(productId)
    const { data: product, isPending: isLoadingProduct } = useGetProduct(
        productId ?? '',
        isEditing
    )
    const hydratedRef = useRef(false)

    const [productTitle, setProductTitle] = useState('')
    const [productCode, setProductCode] = useState('')
    const [brand, setBrand] = useState('')
    const [mainCategory, setMainCategory] = useState('')
    const [midCategory, setMidCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [salesUnit, setSalesUnit] = useState('')
    const [sizes, setSizes] = useState<string[]>([])
    const [colors, setColors] = useState<string[]>([])
    const [packs, setPacks] = useState<string[]>([])
    const [attributeSelections, setAttributeSelections] = useState<
        Record<string, { name: string; code: string; values: string[] }>
    >({})
    const [basePriceBasis, setBasePriceBasis] = useState<string[]>([])
    const [unitPrice, setUnitPrice] = useState('')
    const [discountType, setDiscountType] = useState('percentage')
    const [discountValue, setDiscountValue] = useState('')
    const [pricingRows, setPricingRows] = useState<
        Record<string, PricingMatrixRow>
    >({})

    useEffect(() => {
        hydratedRef.current = false
    }, [productId])

    useEffect(() => {
        if (!product || hydratedRef.current) return
        const next = hydrateFromProduct(product)
        setProductTitle(next.productTitle)
        setProductCode(next.productCode)
        setBrand(next.brand)
        setMainCategory(next.mainCategory)
        setMidCategory(next.midCategory)
        setSubCategory(next.subCategory)
        setSalesUnit(next.salesUnit)
        setSizes(next.sizes)
        setColors(next.colors)
        setPacks(next.packs)
        setAttributeSelections(next.attributeSelections)
        setBasePriceBasis(next.basePriceBasis)
        setPricingRows(next.pricingRows)
        hydratedRef.current = true
    }, [product])

    const setAttributeSelection = useCallback(
        (
            attributeId: string,
            selection: { name: string; code: string; values: string[] }
        ) => {
            setAttributeSelections((current) => ({
                ...current,
                [attributeId]: selection,
            }))
        },
        []
    )

    const updatePricingRow = useCallback(
        (
            key: string,
            updates: Partial<PricingMatrixRow> &
                Pick<PricingMatrixRow, 'sizeId' | 'colorId' | 'displayName'>
        ) => {
            setPricingRows((current) => {
                const previous =
                    current[key] ??
                    emptyPricingRow(
                        updates.sizeId,
                        updates.colorId,
                        updates.displayName
                    )
                return {
                    ...current,
                    [key]: {
                        ...previous,
                        ...updates,
                    },
                }
            })
        },
        []
    )

    const value = useMemo(
        () => ({
            productId,
            isEditing,
            isLoadingProduct: isEditing && isLoadingProduct,
            productTitle,
            setProductTitle,
            productCode,
            setProductCode,
            brand,
            setBrand,
            mainCategory,
            setMainCategory,
            midCategory,
            setMidCategory,
            subCategory,
            setSubCategory,
            salesUnit,
            setSalesUnit,
            sizes,
            setSizes,
            colors,
            setColors,
            packs,
            setPacks,
            attributeSelections,
            setAttributeSelection,
            basePriceBasis,
            setBasePriceBasis,
            unitPrice,
            setUnitPrice,
            discountType,
            setDiscountType,
            discountValue,
            setDiscountValue,
            pricingRows,
            updatePricingRow,
        }),
        [
            productId,
            isEditing,
            isLoadingProduct,
            productTitle,
            productCode,
            brand,
            mainCategory,
            midCategory,
            subCategory,
            salesUnit,
            sizes,
            colors,
            packs,
            attributeSelections,
            setAttributeSelection,
            basePriceBasis,
            unitPrice,
            discountType,
            discountValue,
            pricingRows,
            updatePricingRow,
        ]
    )

    return (
        <CreateProductsContext.Provider value={value}>
            {children}
        </CreateProductsContext.Provider>
    )
}

export default CreateProductsProvider

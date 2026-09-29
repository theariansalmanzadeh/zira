'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'

type CreateProductsContextValue = {
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
}

const CreateProductsProvider = ({ children }: CreateProductsProviderProps) => {
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

    const value = useMemo(
        () => ({
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
        }),
        [
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
        ]
    )

    return (
        <CreateProductsContext.Provider value={value}>
            {children}
        </CreateProductsContext.Provider>
    )
}

export default CreateProductsProvider

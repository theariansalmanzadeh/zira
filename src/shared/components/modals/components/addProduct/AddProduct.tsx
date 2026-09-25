'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import type { BaseModalProps } from '@/src/shared/components/modals/types'
import AdvancedSearchFields from './components/AdvancedSearchFields'
import ProductsTable from './components/ProductsTable'
import {
    ADD_PRODUCT_DUMMY,
    ADVANCED_SEARCH_DEFAULTS,
    type AddProductModalData,
} from './constants'
import {
    confirmAddProductSelection,
    ensureProductQuantity,
    ensureQuantitiesForProducts,
    toggleAllProductSelections,
    toggleProductSelection,
    updateProductQuantity,
} from './utils'

export type { AddProductItem, AddProductModalData } from './constants'

const AddProduct = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as AddProductModalData | null | undefined
    const hasQuantity = modalData?.hasQuantity ?? false
    const [selectedIds, setSelectedIds] = useState(
        () => new Set(modalData?.selectedIds ?? [])
    )
    const [quantities, setQuantities] = useState<Record<string, number>>(
        () => modalData?.quantities ?? {}
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState(ADVANCED_SEARCH_DEFAULTS)

    const filteredBySearch = useMemo(() => {
        const query = searchQuery.trim()
        if (!query) return ADD_PRODUCT_DUMMY
        return ADD_PRODUCT_DUMMY.filter(
            (product) =>
                product.productName.includes(query) ||
                product.sku.includes(query) ||
                product.brand.includes(query) ||
                product.category.includes(query)
        )
    }, [searchQuery])

    const filteredByAdvanced = useMemo(() => {
        const query = filters.query.trim()
        if (!query) return ADD_PRODUCT_DUMMY
        return ADD_PRODUCT_DUMMY.filter(
            (product) =>
                product.productName.includes(query) ||
                product.sku.includes(query)
        )
    }, [filters.query])

    const toggleProduct = (id: string) => {
        setSelectedIds((prev) => {
            const { nextSelectedIds, didSelect } = toggleProductSelection(
                prev,
                id
            )
            if (didSelect && hasQuantity) {
                setQuantities((current) => ensureProductQuantity(current, id))
            }
            return nextSelectedIds
        })
    }

    const toggleAll = (
        products: Parameters<typeof toggleAllProductSelections>[1],
        checked: boolean
    ) => {
        setSelectedIds((prev) =>
            toggleAllProductSelections(prev, products, checked)
        )
        if (hasQuantity && checked) {
            setQuantities((current) =>
                ensureQuantitiesForProducts(current, products)
            )
        }
    }

    const handleQuantityChange = (id: string, quantity: number) => {
        setQuantities((prev) => updateProductQuantity(prev, id, quantity))
    }

    const handleConfirm = () => {
        confirmAddProductSelection({
            selectedIds,
            quantities,
            hasQuantity,
            modalData,
            closeModal,
        })
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <Tabs defaultValue='all-products' dir='rtl' className='w-full'>
                <TabsList className='w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!'>
                    <TabsTrigger value='all-products' className='border-b-0!'>
                        کل کالا ها
                    </TabsTrigger>
                    <TabsTrigger value='advanced-search' className='border-b-0!'>
                        جست و جو پیشرفته
                    </TabsTrigger>
                </TabsList>

                <TabsContent value='all-products' className='flex flex-col gap-4 pt-xl'>
                    <Input
                        dir='rtl'
                        value={searchQuery}
                        onChange={setSearchQuery}
                        iconId='search400Linear'
                        label='جستجو'
                        placeholder='جستجو با نام یا شناسه کالا...'
                        wrapperClassName='w-full flex-row-reverse'
                        className='text-right'
                    />
                    <ProductsTable
                        products={filteredBySearch}
                        selectedIds={selectedIds}
                        onToggle={toggleProduct}
                        onToggleAll={(checked) =>
                            toggleAll(filteredBySearch, checked)
                        }
                        hasQuantity={hasQuantity}
                        quantities={quantities}
                        onQuantityChange={handleQuantityChange}
                    />
                </TabsContent>

                <TabsContent
                    value='advanced-search'
                    className='flex flex-col gap-4 pt-xl'
                >
                    <AdvancedSearchFields
                        values={filters}
                        onChange={(key, value) =>
                            setFilters((prev) => ({ ...prev, [key]: value }))
                        }
                    />
                    <ProductsTable
                        products={filteredByAdvanced}
                        selectedIds={selectedIds}
                        onToggle={toggleProduct}
                        onToggleAll={(checked) =>
                            toggleAll(filteredByAdvanced, checked)
                        }
                        hasQuantity={hasQuantity}
                        quantities={quantities}
                        onQuantityChange={handleQuantityChange}
                    />
                </TabsContent>
            </Tabs>

            <div className='flex flex-row items-center justify-between gap-3 pt-2'>
                <Button type='button' variant='ghost' onClick={closeModal}>
                    انصراف
                </Button>
                <Button
                    type='button'
                    variant='primary'
                    onClick={handleConfirm}
                    className={cn(selectedIds.size === 0 && 'opacity-60')}
                    disabled={selectedIds.size === 0}
                >
                    افزودن انتخاب‌شده‌ها
                </Button>
            </div>
        </div>
    )
}

export default AddProduct

'use client'

import { useMemo, useState } from 'react'
import type { ItemListOut, ItemStatus } from '@/src/api/types/admin/catalog'
import { useListItems } from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { cn } from '@/src/shared/libs/utils'
import type { BaseModalProps } from '@/src/shared/components/modals/types'
import AdvancedSearchFields from './components/AdvancedSearchFields'
import ProductsTable from './components/ProductsTable'
import {
    ADVANCED_SEARCH_DEFAULTS,
    type AddProductItem,
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

const mapItemStatus = (status: ItemStatus): AddProductItem['status'] => {
    if (status === 'ACTIVE') return 'active'
    if (status === 'ARCHIVED' || status === 'HIDDEN') return 'diactive'
    return 'pending'
}

const mapItemToAddProduct = (item: ItemListOut): AddProductItem => ({
    id: item.id,
    productName: item.display_name || '—',
    sku: item.code || item.sku || item.base_code || '—',
    brand: item.brand_name || '—',
    category: item.category_name || '—',
    colorLabel: item.color_code ?? undefined,
    colorHex: item.color_hex ?? undefined,
    stock: [item.size_code, item.color_code].filter(Boolean).join(' / ') || '—',
    status: mapItemStatus(item.status),
})

const AddProduct = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as AddProductModalData | null | undefined
    const hasQuantity = modalData?.hasQuantity ?? false
    const [selectedIds, setSelectedIds] = useState(
        () => new Set(modalData?.selectedIds ?? [])
    )
    const [quantities, setQuantities] = useState<Record<string, number>>(
        () => modalData?.quantities ?? {}
    )
    const [activeTab, setActiveTab] = useState('all-products')
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState(ADVANCED_SEARCH_DEFAULTS)

    const listQuery =
        activeTab === 'all-products'
            ? searchQuery.trim()
            : filters.query.trim()

    const { data: itemsPage, isPending, isError } = useListItems({
        q: listQuery || undefined,
        page: 1,
        page_size: 50,
    })

    const products = useMemo(
        () => (itemsPage?.results ?? []).map(mapItemToAddProduct),
        [itemsPage]
    )

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
        rows: Parameters<typeof toggleAllProductSelections>[1],
        checked: boolean
    ) => {
        setSelectedIds((prev) =>
            toggleAllProductSelections(prev, rows, checked)
        )
        if (hasQuantity && checked) {
            setQuantities((current) =>
                ensureQuantitiesForProducts(current, rows)
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
            products,
        })
    }

    const tableContent = isPending ? (
        <div className='flex justify-center py-10'>
            <Spinner className='size-6 text-on-surface' />
        </div>
    ) : isError ? (
        <div className='rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline'>
            دریافت لیست کالاها با خطا مواجه شد.
        </div>
    ) : (
        <ProductsTable
            products={products}
            selectedIds={selectedIds}
            onToggle={toggleProduct}
            onToggleAll={(checked) => toggleAll(products, checked)}
            hasQuantity={hasQuantity}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
        />
    )

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                dir='rtl'
                className='w-full'
            >
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
                    {tableContent}
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
                    {tableContent}
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

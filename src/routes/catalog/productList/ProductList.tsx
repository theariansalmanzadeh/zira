'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import TablePagination from '@/src/shared/components/adminTable/components/TablePagination'
import { Table, TableBody } from '@/src/shared/components/ui/Table'
import TableEmptyState from '@/src/shared/components/ui/TableEmptyState'
import Tablerow, { TablerowData, TablerowProps } from './components/Tablerow'
import Filter from './components/Filter'
import TableHeader from './components/TableHeader'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import { PRODUCT_LIST_TOGGLE_BUTTONS, TABLE_COLOUMN } from './constants'
import { useListProductDrafts, useListProducts } from '@/src/routes/catalog/hooks/catalog'
import type { DraftListOut, ProductListOut, ProductStatus } from '@/src/api/types/admin/catalog'
import { formatFaNumber } from '@/src/shared/libs/formatter'

export const PRODUCT_LIST_DUMMY: TablerowProps[] = [
    {
        data: {
            id: '1',
            productName: 'بادی گیپور',
            imgUrl: '/images/product1.jpg',
            sku: '۷۶۲۳-۷۳۵۲',
            brand: 'Lorenzo',
            category: 'لباس زیر زنانه',
            mainCategory: 'underwear',
            subCategory: 'women',
            finalCategory: 'body',
            size: 'M',
            color: 'guipure',
            stock: '۴۲۰ آیتم در ۲ متغیر',
            colorCount: 4,
            sizeCount: 3,
            status: 'ACTIVE',
        },
    },
    {
        data: {
            id: '2',
            productName: 'ست لباس خواب ساتن',
            imgUrl: '/images/product1.jpg',
            sku: '۸۴۱۲-۹۰۳۱',
            brand: 'Victoria',
            category: 'لباس خواب',
            mainCategory: 'sleepwear',
            subCategory: 'women',
            finalCategory: 'set',
            size: 'L',
            color: 'satin',
            stock: '۱۵۶ آیتم در ۳ متغیر',
            colorCount: 7,
            sizeCount: 4,
            status: 'ACTIVE',
        },
    },
    {
        data: {
            id: '3',
            productName: 'شورت کشی مشکی',
            imgUrl: '/images/product1.jpg',
            sku: '۵۵۰۱-۲۲۸۷',
            brand: 'Lorenzo',
            category: 'لباس زیر زنانه',
            mainCategory: 'underwear',
            subCategory: 'women',
            finalCategory: 'brief',
            size: 'S',
            color: 'black',
            stock: '۸۹۰ آیتم در ۱ متغیر',
            colorCount: 2,
            sizeCount: 8,
            status: 'DRAFT',
        },
    },
    {
        data: {
            id: '4',
            productName: 'سوتین پوش دار',
            imgUrl: '/images/product1.jpg',
            sku: '۳۳۰۹-۶۱۴۴',
            brand: 'Calvin Klein',
            category: 'لباس زیر زنانه',
            mainCategory: 'underwear',
            subCategory: 'women',
            finalCategory: 'bra',
            size: 'XL',
            color: 'white',
            stock: '۲۴۵ آیتم در ۴ متغیر',
            colorCount: 1,
            sizeCount: 2,
            status: 'ARCHIVED',
        },
    },
    {
        data: {
            id: '5',
            productName: 'تاپ ورزشی زنانه',
            imgUrl: '/images/product1.jpg',
            sku: '۹۹۲۰-۴۵۶۳',
            brand: 'Nike',
            category: 'لباس ورزشی',
            mainCategory: 'sport',
            subCategory: 'comfort',
            finalCategory: 'top',
            size: 'M',
            color: 'black',
            stock: '۳۱۲ آیتم در ۲ متغیر',
            colorCount: 9,
            sizeCount: 5,
            status: 'DRAFT',
        },
    },
]

const matchesFilter = (value: string | undefined, selected: string | null) => {
    if (!selected || selected === 'all') return true
    return value === selected
}

const mapProductOutToRow = (product: ProductListOut): TablerowData => ({
    id: product.id,
    productName: product.name,
    sku: product.code || product.base_code || '—',
    brand: product.brand_name || '—',
    category: product.category_name || '—',
    stock:
        product.item_count != null
            ? `${formatFaNumber(product.item_count)} آیتم`
            : '—',
    colorCount: product.color_count ?? 0,
    sizeCount: product.size_count ?? 0,
    status: product.status,
})

const mapDraftToRow = (draft: DraftListOut): TablerowData => ({
    id: draft.id,
    productName: draft.label,
    sku: '—',
    brand: '—',
    category: '—',
    stock: '—',
    colorCount: 0,
    sizeCount: 0,
    status: 'DRAFT',
})

type ProductListProps = {
    data?: TablerowProps[]
}

const ProductList = ({ data: propData }: ProductListProps) => {
    const searchParams = useSearchParams()
    const statusParam = (searchParams.get('cat') as ProductStatus | 'all' | null) ?? 'all'
    const searchQuery = (searchParams.get('q') || searchParams.get('search') || '').trim() || undefined

    const queryStatus: ProductStatus | undefined =
        statusParam === 'DRAFT' || statusParam === 'ACTIVE' || statusParam === 'ARCHIVED'
            ? statusParam
            : undefined

    const showDrafts = !propData && queryStatus !== 'ACTIVE' && queryStatus !== 'ARCHIVED'

    const {
        data: apiData,
        isPending,
        isError,
    } = useListProducts(
        {
            status: queryStatus,
            q: searchQuery,
        },
        !propData
    )
    const {
        data: draftData,
        isPending: isDraftsPending,
        isError: isDraftsError,
    } = useListProductDrafts(
        {
            q: searchQuery,
            page: 1,
            page_size: 100,
        },
        showDrafts
    )

    const products = useMemo(() => {
        if (propData) {
            return propData
                .map((item) => item.data)
                .filter((product) => {
                    if (queryStatus && product.status !== queryStatus) {
                        return false
                    }
                    const matchesQuery =
                        !searchQuery ||
                        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        product.sku.toLowerCase().includes(searchQuery.toLowerCase())

                    return (
                        matchesQuery &&
                        matchesFilter(product.mainCategory, searchParams.get('main')) &&
                        matchesFilter(
                            product.subCategory,
                            searchParams.get('subCategory')
                        ) &&
                        matchesFilter(product.finalCategory, searchParams.get('final')) &&
                        matchesFilter(product.brand, searchParams.get('brand')) &&
                        matchesFilter(product.size, searchParams.get('size')) &&
                        matchesFilter(product.color, searchParams.get('color'))
                    )
                })
        }

        const rows = (apiData?.results ?? []).map(mapProductOutToRow)
        if (queryStatus === 'ACTIVE' || queryStatus === 'ARCHIVED') return rows

        const query = searchQuery?.toLowerCase()
        const draftRows = (draftData?.results ?? [])
            .filter((draft) => draft.status === 'OPEN')
            .filter(
                (draft) =>
                    !query || draft.label.toLowerCase().includes(query)
            )
            .map(mapDraftToRow)

        return [...rows, ...draftRows]
    }, [propData, apiData, draftData, queryStatus, searchQuery, searchParams])

    const listPending = !propData && (isPending || (showDrafts && isDraftsPending))
    const listError = !propData && isError && (!showDrafts || isDraftsError)

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            <Filter />
            <div className='bg-surface-container-high rounded-card-lg p-2'>
                <TableListLayout
                    value="all"
                    TableColoumn={TABLE_COLOUMN}
                    toggleButtonValue={PRODUCT_LIST_TOGGLE_BUTTONS}
                >
                    <div className='rounded-card-lg bg-surface-container-high p-2'>
                        {listPending ? (
                            <TableLoadingSkeleton isPending rows={5} />
                        ) : listError ? (
                            <div className="rounded-card-md bg-surface-container-lowest px-4 py-8 text-center text-label-md text-outline">
                                دریافت لیست محصولات با خطا مواجه شد.
                            </div>
                        ) : (
                            <Table className='border-collapse border-spacing-y-4'>
                                <TableHeader />
                                <TableBody>
                                    {products.map((item) => (
                                        <Tablerow key={item.id} data={item} />
                                    ))}
                                    {products.length === 0 && (
                                        <TableEmptyState
                                            colSpan={TABLE_COLOUMN.length}
                                            title='محصولی یافت نشد.'
                                        />
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </div>
                    <TablePagination
                        className="mt-2"
                        page={apiData?.page ?? draftData?.page ?? 1}
                        totalAmount={
                            propData
                                ? products.length
                                : (apiData?.total ?? 0) +
                                  (showDrafts ? (draftData?.total ?? 0) : 0)
                        }
                    />
                </TableListLayout>
            </div>
        </div>
    )
}

export default ProductList

'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { CardOut } from '@/src/api/types/public/catalog'
import { useListPublicProducts } from '@/src/api/hooks/catalog'
import ActionButtons from './components/ActionButtons'
import ProductCard from '@/src/shared/components/ui/ProductCard'
import ProductsLayout from '@/src/shared/layouts/ProductsLayout'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/src/shared/components/ui/Pagination'
import Faq from '@/src/shared/components/faq/Faq'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { useAuth } from '@/src/shared/context/AuthProvider'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import {
    pageHref,
    toListPublicProductsParams,
} from './utils/toListPublicProductsParams'

const toProductStatus = (product: CardOut) => {
    if (product.sale_mode === 'PREORDER') return 'preorder' as const
    if (product.sale_mode === 'PRESALE') return 'soon' as const
    return 'available' as const
}

const toPrice = (product: CardOut) => {
    const amount =
        product.price_summary?.final_price?.amount ??
        product.price_summary?.original_price?.amount
    const parsed = Number(amount)
    return Number.isFinite(parsed) ? parsed : 0
}

const pageItems = (current: number, total: number) => {
    if (total <= 5) {
        return Array.from({ length: total }, (_, index) => index + 1)
    }

    const items: Array<number | 'ellipsis'> = [1]
    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    if (start > 2) items.push('ellipsis')
    for (let page = start; page <= end; page += 1) items.push(page)
    if (end < total - 1) items.push('ellipsis')
    items.push(total)

    return items
}

const ProductsList = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { isLoggedIn } = useAuth()
    const query = toListPublicProductsParams(searchParams)
    const { data, isPending } = useListPublicProducts(query)
    const products = data?.results ?? []
    const pageSize = data?.page_size ?? query.page_size ?? 20
    const currentPage = data?.page ?? query.page ?? 1
    const totalPages = Math.max(1, Math.ceil((data?.total ?? 0) / pageSize))

    const openPage = (page: number) => {
        router.push(pageHref(pathname, searchParams, page))
    }

    return (
        <div className='flex flex-col items-start justify-center gap-sm w-full bg-surface-container-lowest'>
            <ActionButtons />
            <ProductsLayout>
                {isPending ? (
                    <div className='col-span-full flex justify-center py-10'>
                        <Spinner className='size-6' />
                    </div>
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            href={product.slug}
                            title={product.name}
                            brand={product.brand?.name ?? ''}
                            price={toPrice(product)}
                            discount={
                                product.price_summary?.discount_percent || undefined
                            }
                            isLoggedIn={isLoggedIn}
                            image={product.cover_url}
                            colors={product.colors?.map((color) => color.hex_code)}
                            status={toProductStatus(product)}
                            isOutOfStock={
                                product.supply?.can_order === false ||
                                product.supply?.status === 'UNAVAILABLE'
                            }
                        />
                    ))
                )}
            </ProductsLayout>
            {!isPending && products.length > 0 && (
                <div className='px-3xl w-full overflow-hidden'>
                    <Pagination dir='rtl' className='rounded-container-md'>
                        <PaginationContent className='justify-between'>
                            <PaginationItem>
                                <PaginationPrevious
                                    href={pageHref(
                                        pathname,
                                        searchParams,
                                        Math.max(1, currentPage - 1)
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        if (currentPage > 1) {
                                            openPage(currentPage - 1)
                                        }
                                    }}
                                />
                            </PaginationItem>
                            {pageItems(currentPage, totalPages).map((item, index) => (
                                <PaginationItem key={`${item}-${index}`}>
                                    {item === 'ellipsis' ? (
                                        <PaginationEllipsis />
                                    ) : (
                                        <PaginationLink
                                            href={pageHref(pathname, searchParams, item)}
                                            isActive={item === currentPage}
                                            onClick={(event) => {
                                                event.preventDefault()
                                                openPage(item)
                                            }}
                                        >
                                            {formatFaNumber(item)}
                                        </PaginationLink>
                                    )}
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    href={pageHref(
                                        pathname,
                                        searchParams,
                                        Math.min(totalPages, currentPage + 1)
                                    )}
                                    onClick={(event) => {
                                        event.preventDefault()
                                        if (currentPage < totalPages) {
                                            openPage(currentPage + 1)
                                        }
                                    }}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
            <Faq />
        </div>
    )
}

export default ProductsList

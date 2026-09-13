"use client"

import ActionButtons from './components/ActionButtons'
import ProductCard from '@/src/shared/components/ui/ProductCard'
import ProductsLayout from '@/src/shared/layouts/ProductsLayout'
import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/src/shared/components/ui/Pagination'
import Faq from '@/src/shared/components/faq/Faq'
import { PLP_PRODUCTS } from './constants'

const ProductsList = () => {
    return (
        <div className='flex flex-col items-start justify-center gap-sm w-full bg-surface-container-lowest'>
            <ActionButtons />
            <ProductsLayout>
                {PLP_PRODUCTS.map((product) => (
                    <ProductCard
                        key={product.href}
                        href={product.href}
                        title={product.title}
                        brand={product.brand}
                        price={product.price}
                        discount={product.discount}
                        isLoggedIn={product.isLoggedIn || false}
                        image={product.image}
                    />
                ))}
            </ProductsLayout>
            <div className='px-3xl w-full overflow-hidden'>
                <Pagination dir='rtl' className='rounded-container-md'>
                    <PaginationContent className='justify-between'>
                        <PaginationItem>
                            <PaginationPrevious href='#' />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#' isActive>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href='#'>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href='#' />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
            <Faq />
        </div>
    )
}

export default ProductsList
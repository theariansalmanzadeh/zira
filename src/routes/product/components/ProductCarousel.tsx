'use client'

import type { CardOut } from '@/src/api/types/public/catalog'
import ProductCard from '@/src/shared/components/ui/ProductCard'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/src/shared/components/ui/Carousel'
import Link from 'next/link'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useAuth } from '@/src/shared/context/AuthProvider'

export type ProductCarouselProps = {
    title: string
    products: CardOut[]
    href?: string
}

const toPrice = (product: CardOut) => {
    const amount =
        product.price_summary?.final_price?.amount ??
        product.price_summary?.original_price?.amount
    const parsed = Number(amount)
    return Number.isFinite(parsed) ? parsed : 0
}

const toStatus = (product: CardOut) => {
    if (product.sale_mode === 'PREORDER') return 'preorder' as const
    if (product.sale_mode === 'PRESALE') return 'soon' as const
    return 'available' as const
}

const ProductCarousel = ({
    title,
    products,
    href = '/plp',
}: ProductCarouselProps) => {
    const { isLoggedIn } = useAuth()

    if (!products.length) return null

    return (
        <div className="flex flex-col gap-xl w-full bg-surface-container-lowest" >
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-title-lg font-bold text-on-surface">
                    {title}
                </h2>
                <Link href={href} className="flex flex-row items-center gap-1">
                    <p className="text-body-lg text-on-surface-variant">
                        مشاهده همه
                    </p>
                    <Icon label="chavaron" />
                </Link>
            </div>
            <Carousel className="w-full" dir="rtl" opts={{ direction: "rtl" }}>
                <CarouselContent className="-ml-1 gap-lg">
                    {products.map((product) => (
                        <CarouselItem key={product.id} className="basis-3/5 md:basis-1/4!">
                            <ProductCard
                                href={product.slug}
                                title={product.name}
                                brand={product.brand?.name ?? ''}
                                price={toPrice(product)}
                                discount={product.price_summary?.discount_percent || undefined}
                                isLoggedIn={isLoggedIn}
                                image={product.cover_url}
                                colors={product.colors?.map((color) => color.hex_code)}
                                status={toStatus(product)}
                                isOutOfStock={
                                    product.supply?.can_order === false ||
                                    product.supply?.status === 'UNAVAILABLE'
                                }
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="hidden md:flex p-lg! rounded-button-lg!" />
                <CarouselPrevious className="hidden md:flex p-lg! rounded-button-lg!" />
            </Carousel>
        </div>
    )
}

export default ProductCarousel

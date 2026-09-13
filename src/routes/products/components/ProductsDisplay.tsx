"use client"

import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import { useState } from 'react'
import { DISPLAY_PRODUCTS, TOGGLE_ITEMS } from '../content'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/src/shared/components/ui/Carousel'
import ProductCard from '@/src/shared/components/ui/ProductCard'

const handleToggleChange =
    (setter: (value: string) => void) => (value: string) => {
        if (value) setter(value)
    }

const ProductsDisplay = ({ title }: { title: string }) => {
    const [topic, setTopic] = useState(TOGGLE_ITEMS[0].value)

    const filteredProducts = DISPLAY_PRODUCTS.filter(
        (product) => topic === 'all' || product.tags.includes(topic)
    )

    return (
        <div className='w-full'>
            <div className="mt-6xl">
                <span className="text-on-surface text-title-lg font-bold">{title}</span>
                <ToggleGroup
                    dir='rtl'
                    variant="outline"
                    type="single"
                    value={topic}
                    className="mt-lg"
                    onValueChange={handleToggleChange(setTopic)}
                >
                    {TOGGLE_ITEMS.map((item) => (
                        <ToggleGroupItem
                            className='text-title-lg'
                            key={item.value}
                            value={item.value}
                            aria-label={`Toggle ${item.label}`}
                        >
                            {item.label}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
            <Carousel className="w-full mt-2xl" dir="rtl" opts={{ direction: "rtl" }}>
                <CarouselContent className="-ml-1 gap-3 md:gap-10 w-full">
                    {filteredProducts.map((product) => (
                        <CarouselItem key={product.id} className="basis-3/5 md:basis-1/4! aspect-square">
                            <ProductCard
                                brand={product.brand}
                                isLoggedIn={false}
                                price={1343930000}
                                isImgSquare
                                discount="10"
                                title={product.title}
                                href={`/product/${product.id || "1"}`}
                                image="/images/product1.jpg"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="hidden md:flex p-lg! rounded-button-lg!" />
                <CarouselPrevious className="hidden md:flex" />
            </Carousel>
        </div>
    )
}

export default ProductsDisplay

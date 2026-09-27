import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/src/shared/components/ui/Carousel'
import React, { useState } from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import { useProduct } from '../context/Provider'
import { formatFaNumber } from '@/src/shared/libs/formatter'

type ImagesProps = {
    images: string[]
}

const Images = ({ images }: ImagesProps) => {
    const { setOpenProductModal } = useProduct();
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const thumbnails = images.slice(1, 5)
    const hasMore = images.length > 4

    const openImage = (index: number) => {
        setSelectedImageIndex(index)
        setOpenProductModal(true)
    }
    return (
        <div className='w-full md:w-1/2!'>
            <Carousel className="md:hidden flex h-[60vh]! relative">
                <CarouselContent className="h-full">
                    <CarouselItem className="h-full overflow-hidden bg-surface-container-high">
                        <Image src="/images/item-1.jpg" alt="product-1" width={1000} height={1000} />
                    </CarouselItem>
                </CarouselContent>
                <CarouselDots className="mt-xl absolute bottom-5 left-1/2 translate-x-1/2" />
            </Carousel>
            <div className="md:flex flex-col gap-lg hidden min-h-[821px] self-stretch">
                <div className='w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg cursor-pointer' onClick={() => openImage(0)}>
                    <Image src={images[0]} alt="product-1" width={500} height={1000} className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-row items-center justify-between gap-1'>
                    {thumbnails.map((src, index) => {
                        const isLast = hasMore && index === thumbnails.length - 1
                        return (
                            <div
                                key={`${src}-${index}`}
                                className='relative w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg self-stretch cursor-pointer'
                                onClick={() => openImage(index + 1)}
                            >
                                <Image src={src} alt='product-1' width={500} height={1000} className='h-full w-full object-cover' />
                                {isLast && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
                                        <span className='text-title-lg font-bold text-white'>
                                            +{formatFaNumber(images.length - 4)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <ProductModal images={images} imageIndex={selectedImageIndex} />
        </div>
    )
}

export default Images
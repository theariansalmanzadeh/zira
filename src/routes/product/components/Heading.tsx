import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/src/shared/components/ui/Carousel'
import React from 'react'
import Image from 'next/image'
import ProductModal from './ProductModal'
import { useProduct } from '../context/Provider'

const Heading = () => {
    const { setOpenProductModal } = useProduct();
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
                <div className='w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg' onClick={() => setOpenProductModal(true)}>
                    <Image src="/images/item-1.jpg" alt="product-1" width={500} height={1000} className='w-full h-full object-cover' />
                </div>
                <div className='flex flex-row items-center justify-between gap-1'>
                    <div className='w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg self-stretch'>
                        <Image src="/images/item-2.jpg" alt="product-1" width={500} height={1000} />
                    </div>
                    <div className='w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg self-stretch'>
                        <Image src="/images/item-3.jpg" alt="product-1" width={500} height={1000} />
                    </div>
                    <div className='w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg self-stretch'>
                        <Image src="/images/item-1.jpg" alt="product-1" width={500} height={1000} />
                    </div>
                    <div className='w-full h-full aspect-3/4 bg-surface-container-high overflow-hidden rounded-card-lg self-stretch'>
                        <Image src="/images/item-1.jpg" alt="product-1" width={500} height={1000} />
                    </div>
                </div>
            </div>
            <ProductModal />
        </div>
    )
}

export default Heading
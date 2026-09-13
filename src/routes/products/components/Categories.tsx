import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/src/shared/components/ui/Carousel'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/src/shared/components/ui/button'

interface CategoriesProps {
    images: string[]
    categories: {
        name: string
        image: string
        link: string
    }[]
}

const Categories = ({ images, categories }: CategoriesProps) => {
    return (
        <div className='bg-surface-container-lowest flex flex-col items-start justify-center gap-10 w-full pb-xl'>
            <Carousel
                dir='rtl'
                opts={{
                    align: 'start',
                    direction: 'rtl',
                }}
                className='w-full h-[80vh]!'
            >
                <CarouselContent className='h-full'>
                    {images.map((image, index) => (
                        <CarouselItem key={`${image}-${index}`} className='h-full'>
                            <div className='bg-surface-container-highest rounded-card-lg w-full overflow-hidden relative min-h-[226px] h-full'>
                                {image && <Image src={image} alt='category-1' width={226} height={226} className='w-full h-full object-cover absolute top-0 left-0' />}
                                <div className='absolute bottom-5 right-5 w-full bg-transparent flex flex-col items-start justify-start'>
                                    <p className='text-headline-lg font-base text-on-surface-variant'>مجموعه‌ای کامل برای نیازهای فروشگاه شما</p>
                                    <p className='text-title-lg font-base text-on-surface-variant mt-lg'>مجموعه‌ای کامل برای نیازهای فروشگاه شما</p>
                                    <Button variant='glass' className='rounded-card-md p-lg shadow-xl border-0! touch-manipulation mt-3xl'>
                                        <span className='text-body-sm font-base text-on-surface-variant'>مشاهده همه</span>
                                    </Button>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselDots className="mt-xl md:flex!" />
            </Carousel>
            <div className='grid grid-cols-3 lg:grid-cols-6 items-center justify-center gap-10 md:mt-6xl w-full'>
                {categories.map((category) => (
                    <Link key={category.name} href={category.link} className='flex flex-col items-center justify-between flex-wrap gap-1'>
                        <div className='w-[112px] h-[112px] md:w-[178px] md:h-[178px] bg-surface-container-highest rounded-full relative overflow-hidden'>
                            {category.image && <Image src={category.image} alt={category.name} width={226} height={226} className='object-cover absolute top-0 left-0' />}
                        </div>
                        <p className='text-body-sm font-base text-on-surface-variant'>{category.name}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Categories
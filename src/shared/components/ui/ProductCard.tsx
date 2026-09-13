import React from 'react'
import { Card, CardHeader } from './Card'
import Image from 'next/image'
import { Badge } from './Badge'
import Link from 'next/link'
import { cn } from '../../libs/utils'
import { formatFaNumber } from '../../libs/formatter'
import { Icon } from '../Icons/Icon'

interface ProductCardProps {
    discount?: string
    title: string
    href: string
    price: number
    isLoggedIn: boolean,
    isImgSquare?: boolean
    image?: string | undefined | null
    brand: string
}

const ProductCard = ({ discount, title, href, image, brand, isImgSquare, price = 13243434300, isLoggedIn = false }: ProductCardProps) => {
    const currentPrice = discount ? price - (price * +discount / 100) : price
    return (
        <Link href={`/product/${href}`} className='flex flex-col items-start justify-start gap-sm self-stretch'>
            <div className={cn('bg-surface-container-highest rounded-card-lg w-full overflow-hidden relative ', isImgSquare ? 'aspect-square min-h-[384px]' : 'max-h-[213px] md:min-h-[384px] aspect-[3/4]')}>
                <div className='absolute top-sm left-sm z-10'>
                    {discount && <Badge variant='warning'>{discount} %</Badge>}
                </div>
                {image && <Image src={image} alt={title} width={100} height={100} className='w-full h-full object-cover absolute top-0 left-0' />}
            </div>
            <div className='flex flex-col items-start justify-center gap-sm'>
                <span className='text-outline text-label-md '>{brand}</span>
                <p className='text-title-lg font-base text-on-surface'>{title}</p>
            </div>
            {isLoggedIn && <div className='flex flex-row justify-between items-center mt-sm w-full'>
                <div className="flex flex-row justify-between items-center gap-1">
                    <span className='text-on-surface text-label-lg font-bold'>{formatFaNumber(currentPrice)}</span>
                    <Icon label='currency' />
                </div>
                {discount && <div className='relative'>
                    <span className='text-outline text-label-lg font-bold block'>{formatFaNumber(price)}</span>
                    <div className='absolute w-full h-px top-1/2 -translate-y-full left-0 bg-outline' />
                </div>}
            </div>}
        </Link>
    )
}

export default ProductCard
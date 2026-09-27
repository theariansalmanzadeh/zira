import React from 'react'
import Image from 'next/image'
import { Badge } from './Badge'
import Link from 'next/link'
import { cn } from '../../libs/utils'
import { formatFaNumber } from '../../libs/formatter'
import { Icon } from '../Icons/Icon'
import { Pill } from './Pill'
import { Button } from './button'

const DUMMY_COLORS = ['#6B7280', '#FFFFFF', '#7C3AED', '#EAB308', '#22C55E', '#3B82F6', '#EC4899', '#F97316', '#111827', '#EF4444']

const PRODUCT_STATUS = {
    available: { text: 'موجود', variant: 'success' as const, border: 'border-success text-success! hover:bg-success-container' },
    soon: { text: 'به زودی', variant: 'info' as const, border: 'border-info text-info! hover:bg-info-container' },
    preorder: { text: 'قابلیت پیش‌سفارش', variant: 'warning' as const, border: 'border-warning text-warning! hover:bg-warning-container' },
}

type ProductStatus = keyof typeof PRODUCT_STATUS

interface ProductCardProps {
    discount?: string
    title: string
    href: string
    price: number
    isLoggedIn: boolean
    isImgSquare?: boolean
    isOutOfStock?: boolean
    image?: string | undefined | null
    brand: string
    packaging?: string
    colors?: string[]
    status?: ProductStatus
}

const ProductCard = ({
    discount,
    title,
    href,
    image,
    brand,
    price = 13243434300,
    isLoggedIn = false,
    isOutOfStock = false,
    packaging = 'جین',
    colors = DUMMY_COLORS,
    status = 'available',
}: ProductCardProps) => {
    const currentPrice = discount ? price - (price * +discount / 100) : price
    const visibleColors = colors.slice(0, 4)
    const extraColorCount = colors.length - visibleColors.length
    const productStatus = PRODUCT_STATUS[status]

    return (
        <Link
            href={`/product/${href}`}
            className='flex flex-col items-start justify-start gap-3 self-stretch rounded-card-lg shadow-sm hover:shadow-sm active:shadow-sm sm:h-[563px]'
        >
            <div
                className={cn(
                    'relative flex h-[230px] w-full flex-col gap-3 overflow-hidden rounded-card-lg bg-surface-container-highest sm:h-[354px]'
                )}
            >
                <div className='absolute top-sm left-sm z-10'>
                    {discount && <Badge variant='warning'>{discount} %</Badge>}
                </div>
                {image && (
                    <Image
                        src={image}
                        alt={title}
                        width={100}
                        height={100}
                        className='absolute top-0 left-0 h-full w-full object-cover'
                    />
                )}
                <Pill
                    variant={productStatus.variant}
                    text={productStatus.text}
                    className='absolute bottom-sm right-sm z-10 border-0'
                />
            </div>
            <div className='flex w-full flex-1 flex-col gap-2 px-1'>
                <div className='flex w-full flex-col items-start justify-center gap-1'>
                    <span className='text-label-sm text-outline'>{brand}</span>
                    <p className='text-title-md font-base text-on-surface'>{title}</p>
                </div>
                {packaging && (
                    <Pill variant='tonal' text={`بسته‌بندی: ${packaging}`} className='border-0 w-fit' />
                )}
                {colors.length > 0 && (
                    <div className='flex flex-row items-center gap-2' dir='rtl'>
                        {visibleColors.map((color) => (
                            <span
                                key={color}
                                className='size-5 rounded-full border border-outline-variant'
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        {extraColorCount > 0 && (
                            <span className='text-label-md text-outline'>
                                +{formatFaNumber(extraColorCount)} رنگ
                            </span>
                        )}
                    </div>
                )}
                {isOutOfStock ? (
                    <span className='text-label-lg font-bold text-error'>تمام شد!</span>
                ) : (
                    isLoggedIn && (
                        <div className='mt-sm flex w-full flex-row items-center justify-end gap-2'>
                            {discount && (
                                <div className='relative'>
                                    <span className='block text-label-lg font-bold text-outline'>
                                        {formatFaNumber(price)}
                                    </span>
                                    <div className='absolute top-1/2 left-0 h-px w-full -translate-y-full bg-outline' />
                                </div>
                            )}
                            <div className='flex flex-row items-center justify-end gap-1'>
                                <span className='text-label-lg font-bold text-primary'>
                                    {formatFaNumber(currentPrice)}
                                </span>
                                <Icon label='currency' className='text-primary' />
                            </div>
                        </div>
                    )
                )}
                <Button
                    type='button'
                    variant='outline'
                    className={cn('mt-auto w-full bg-transparent', productStatus.border)}
                    onClick={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                    }}
                >
                    سفارش دهی
                </Button>
            </div>
        </Link>
    )
}

export default ProductCard

'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'

type GallerySectionProps = {
    title: string
    images?: string[]
    onAddImage?: VoidFunction
}

const VISIBLE_IMAGE_SLOTS = 6

const GallerySection = ({
    title,
    images = [],
    onAddImage,
}: GallerySectionProps) => {
    const hasImages = images.length > 0
    const visibleImages = images.slice(0, VISIBLE_IMAGE_SLOTS)

    return (
        <div className='rounded-card-lg bg-surface-container-high p-3'>
            <div className='mb-3 flex flex-row items-center justify-between gap-3'>
                <span className='text-label-lg text-on-surface'>{title}</span>
                <Button
                    type='button'
                    variant='default'
                    className='shadow-sm'
                    onClick={onAddImage}
                >
                    <Icon label='addSm300Linear' className='size-6' />
                    افزودن تصویر
                </Button>
            </div>

            {hasImages && (
                <div className='flex flex-row flex-wrap gap-2 rounded-card-md bg-surface-container-lowest p-3'>
                    <div className='mt-3 rounded-card-md p-3'>
                        <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
                            {visibleImages.map((src, index) => (
                                <div
                                    key={`${src}-${index}`}
                                    className='flex min-h-[140px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-card-md bg-surface-container-high'
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={src}
                                        alt=''
                                        className='size-full object-cover'
                                    />
                                </div>
                            ))}
                            {images.length > VISIBLE_IMAGE_SLOTS && (
                                <span className='text-label-md text-on-surface-variant'>
                                    +{formatFaNumber(images.length)} تصویر
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export type GalleryProps = {
    publicImages?: string[]
    levelOneImages?: string[]
    levelTwoImages?: string[]
    className?: string
}

const Gallery = ({
    publicImages = [],
    levelOneImages = [],
    levelTwoImages = [],
    className,
}: GalleryProps) => {
    return (
        <div className={cn('flex flex-col gap-3', className)} dir='rtl'>
            <GallerySection title='تصاویر عمومی' images={publicImages} />
            <GallerySection title='تصاویر سطح ۱' images={levelOneImages} />
            <GallerySection title='تصاویر سطح ۲' images={levelTwoImages} />
        </div>
    )
}

export default Gallery

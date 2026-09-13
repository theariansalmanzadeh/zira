"use client"

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'

type GallerySectionProps = {
    title: string
    imageCount?: number
    onAddImage?: () => void
}

const VISIBLE_IMAGE_SLOTS = 8

const GallerySection = ({
    title,
    imageCount = 0,
    onAddImage,
}: GallerySectionProps) => {
    const hasImages = imageCount > 0

    return (
        <div className="rounded-card-lg bg-surface-container-high p-3">
            <div className="flex flex-row items-center justify-between gap-3 mb-3">
                <span className="text-label-lg text-on-surface">{title}</span>
                <Button
                    type="button"
                    variant="default"
                    className="shadow-sm"
                    onClick={onAddImage}
                >
                    <Icon label="addSm300Linear" className="size-6" />
                    افزودن تصویر
                </Button>
            </div>

            {hasImages && (<div className="flex flex-row flex-wrap gap-2 bg-surface-container-lowest p-3 rounded-card-md">

                <div className="mt-3 rounded-card-md p-3">
                    <div className="flex flex-row flex-wrap gap-2 items-center justify-center">
                        {Array.from({ length: VISIBLE_IMAGE_SLOTS }).map((_, index) => {
                            const isCountTile = index === 0

                            return (
                                <div
                                    key={index}
                                    className={cn(
                                        'flex size-20 shrink-0 items-center justify-center rounded-card-md bg-surface-container-high',
                                        isCountTile && 'text-label-sm text-on-surface-variant',
                                    )}
                                >
                                </div>
                            )
                        })}
                        <span className="text-label-md text-on-surface-variant">
                            {imageCount > VISIBLE_IMAGE_SLOTS && `+${imageCount} تصویر`}
                        </span>
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

const GALLERY_SECTIONS = [
    { title: 'تصاویر عمومی', imageCount: 14 },
    { title: 'تصاویر سطح ۱', imageCount: 0 },
    { title: 'تصاویر سطح ۲', imageCount: 0 },
] as const

const GalleryTab = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            {GALLERY_SECTIONS.map((section) => (
                <GallerySection
                    key={section.title}
                    title={section.title}
                    imageCount={section.imageCount}
                />
            ))}
        </div>
    )
}

export default GalleryTab

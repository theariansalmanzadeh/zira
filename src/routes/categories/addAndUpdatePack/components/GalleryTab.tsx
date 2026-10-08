'use client'

import { useRef, useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'

type GallerySectionProps = {
    title: string
}

const VISIBLE_IMAGE_SLOTS = 8

const GallerySection = ({ title }: GallerySectionProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<string[]>([])
    const visibleImages = images.slice(0, VISIBLE_IMAGE_SLOTS)
    const hiddenCount = images.length - visibleImages.length

    const onAddImage = () => {
        inputRef.current?.click()
    }

    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? [])
        if (files.length === 0) return

        const urls = files.map((file) => URL.createObjectURL(file))
        setImages((prev) => [...prev, ...urls])
        event.target.value = ''
    }

    return (
        <div className="rounded-card-lg bg-surface-container-high p-3 overflow-x-auto">
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFiles}
            />
            <div className="mb-3 flex flex-row items-center justify-between gap-3">
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

            {images.length > 0 && (
                <div className="flex flex-row flex-wrap gap-2 rounded-card-md bg-surface-container-lowest p-3">
                    <div className="mt-3 rounded-card-md p-3">
                        <div className="flex flex-row flex-wrap items-center justify-center gap-2">
                            {visibleImages.map((src) => (
                                <div
                                    key={src}
                                    className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-card-md bg-surface-container-high"
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={src}
                                        alt=""
                                        className="size-full object-cover"
                                    />
                                </div>
                            ))}
                            {hiddenCount > 0 && (
                                <span className="text-label-md text-on-surface-variant">
                                    +{formatFaNumber(hiddenCount)} تصویر
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const GALLERY_SECTIONS = [
    { title: 'تصاویر عمومی' },
    { title: 'تصاویر سطح ۱' },
    { title: 'تصاویر سطح ۲' },
] as const

const GalleryTab = () => {
    return (
        <div className="flex flex-col gap-3" dir="rtl">
            {GALLERY_SECTIONS.map((section) => (
                <GallerySection key={section.title} title={section.title} />
            ))}
        </div>
    )
}

export default GalleryTab

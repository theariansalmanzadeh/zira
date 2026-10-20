'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { AddAndUpdatePackFormValues, GalleryImageKind } from '../schema'

type GallerySectionProps = {
    title: string
    kind: GalleryImageKind
    files: File[]
    onChange: (files: File[]) => void
}

const VISIBLE_IMAGE_SLOTS = 8

const GallerySection = ({ title, kind, files, onChange }: GallerySectionProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [previews, setPreviews] = useState<string[]>([])

    useEffect(() => {
        const urls = files.map((file) => URL.createObjectURL(file))
        setPreviews(urls)
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [files])

    const visibleImages = previews.slice(0, VISIBLE_IMAGE_SLOTS)
    const hiddenCount = previews.length - visibleImages.length

    const onAddImage = () => {
        inputRef.current?.click()
    }

    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const nextFiles = Array.from(event.target.files ?? [])
        if (nextFiles.length === 0) return
        onChange([...files, ...nextFiles])
        event.target.value = ''
    }

    return (
        <div className='overflow-x-auto rounded-card-lg bg-surface-container-high p-3'>
            <input
                ref={inputRef}
                type='file'
                accept='image/*'
                multiple
                className='hidden'
                onChange={handleFiles}
                data-kind={kind}
            />
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

            {previews.length > 0 && (
                <div className='flex flex-row flex-wrap gap-2 rounded-card-md bg-surface-container-lowest p-3'>
                    <div className='mt-3 rounded-card-md p-3'>
                        <div className='flex flex-row flex-wrap items-center justify-center gap-2'>
                            {visibleImages.map((src) => (
                                <div
                                    key={src}
                                    className='flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-card-md bg-surface-container-high'
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={src}
                                        alt=''
                                        className='size-full object-cover'
                                    />
                                </div>
                            ))}
                            {hiddenCount > 0 && (
                                <span className='text-label-md text-on-surface-variant'>
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

const GALLERY_SECTIONS: { title: string; kind: GalleryImageKind }[] = [
    { title: 'تصاویر عمومی', kind: 'DIGIKALA' },
    { title: 'تصاویر سطح ۱', kind: 'MANNEQUIN' },
    { title: 'تصاویر سطح ۲', kind: 'HUMAN' },
]

const GalleryTab = () => {
    const { control } = useFormContext<AddAndUpdatePackFormValues>()

    const sections = useMemo(() => GALLERY_SECTIONS, [])

    return (
        <div className='flex flex-col gap-3' dir='rtl'>
            {sections.map((section) => (
                <Controller
                    key={section.kind}
                    control={control}
                    name={`gallery.${section.kind}`}
                    render={({ field }) => (
                        <GallerySection
                            title={section.title}
                            kind={section.kind}
                            files={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            ))}
        </div>
    )
}

export default GalleryTab

'use client'

import { useState } from 'react'
import { cn } from '@shared/libs/utils'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    createBannerSlideFromPayload,
    type AddBannerModalData,
    type AddBannerPayload,
} from '@/src/shared/components/modals/components/addBanner'
import type { BannerSlideItem } from '../constants'
import BannerSlideCard from './BannerSlideCard'

type BannerSlideBodyProps = {
    data: BannerSlideItem[]
    className?: string
}

const BannerSlideBody = ({ data, className }: BannerSlideBodyProps) => {
    const { openModal } = useModalStore()
    const [slides, setSlides] = useState<BannerSlideItem[]>(data)

    const removeSlide = (id: string) => {
        setSlides((prev) => prev.filter((slide) => slide.id !== id))
    }

    const updateSlide = (id: string, payload: AddBannerPayload) => {
        setSlides((prev) =>
            prev.map((slide) =>
                slide.id === id
                    ? createBannerSlideFromPayload(payload, id)
                    : slide
            )
        )
    }

    const openAddBannerModal = () => {
        openModal(ModalTypes.ADD_BANNER, {
            onSubmit: (payload) => {
                setSlides((prev) => [
                    createBannerSlideFromPayload(payload),
                    ...prev,
                ])
            },
        } satisfies AddBannerModalData)
    }

    return (
        <div className="flex flex-row justify-between gap-4" dir="rtl">
            <div className={cn('flex w-4/5 flex-col gap-2.5', className)}>
                {slides.map((slide) => (
                    <BannerSlideCard
                        key={slide.id}
                        data={slide}
                        onEdit={(payload) => updateSlide(slide.id, payload)}
                        onDelete={() => removeSlide(slide.id)}
                    />
                ))}
            </div>
            <Button
                variant="primary"
                className="h-10 shrink-0 gap-1.5 self-start"
                onClick={openAddBannerModal}
            >
                <Icon
                    label="addSm400Linear"
                    className="size-4! text-on-primary"
                />
                <span>افزودن اسلاید</span>
            </Button>
        </div>
    )
}

export default BannerSlideBody

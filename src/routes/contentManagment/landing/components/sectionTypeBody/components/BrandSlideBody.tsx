'use client'

import { useState } from 'react'
import { cn } from '@shared/libs/utils'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    createBrandSlideFromPayload,
    type AddBrandModalData,
    type AddBrandPayload,
} from '@/src/shared/components/modals/components/addBrand'
import type { BrandSlideItem } from '../constants'
import BrandSlideCard from './BrandSlideCard'

type BrandSlideBodyProps = {
    data: BrandSlideItem[]
    className?: string
}

const BrandSlideBody = ({ data, className }: BrandSlideBodyProps) => {
    const { openModal } = useModalStore()
    const [brands, setBrands] = useState<BrandSlideItem[]>(data)

    const removeBrand = (id: string) => {
        setBrands((prev) => prev.filter((brand) => brand.id !== id))
    }

    const updateBrand = (id: string, payload: AddBrandPayload) => {
        setBrands((prev) =>
            prev.map((brand) =>
                brand.id === id
                    ? createBrandSlideFromPayload(payload, brand)
                    : brand
            )
        )
    }

    const openAddBrandModal = () => {
        openModal(ModalTypes.ADD_BRAND, {
            onSubmit: (payload) => {
                setBrands((prev) => [
                    createBrandSlideFromPayload(payload),
                    ...prev,
                ])
            },
        } satisfies AddBrandModalData)
    }

    return (
        <div className={cn('flex w-full gap-3', className)} dir="rtl">
            <div className="flex w-4/5 flex-col gap-2.5">
                {brands.map((brand) => (
                    <BrandSlideCard
                        key={brand.id}
                        data={brand}
                        onEdit={(payload) => updateBrand(brand.id, payload)}
                        onDelete={() => removeBrand(brand.id)}
                    />
                ))}
            </div>
            <Button
                variant="primary"
                className="h-10 shrink-0 gap-1.5 self-start"
                onClick={openAddBrandModal}
            >
                <Icon
                    label="addSm400Linear"
                    className="size-4! text-on-primary"
                />
                <span>افزودن برند</span>
            </Button>
        </div>
    )
}

export default BrandSlideBody

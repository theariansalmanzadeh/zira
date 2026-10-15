'use client'

import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { cn } from '@shared/libs/utils'
import type { BrandOut } from '@/src/api/types/admin/cms/homePage'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import {
    createBrandSlideFromPayload,
    type AddBrandModalData,
    type AddBrandPayload,
} from '@/src/shared/components/modals/components/addBrand'
import {
    cmsHomePageKeys,
    useArchiveBrand,
    useCreateBrand,
    useListBrands,
} from '@/src/routes/contentManagment/hooks/homePage'
import type { BrandSlideItem } from '../constants'
import BrandSlideCard from './BrandSlideCard'

const toBrandSlide = (brand: BrandOut): BrandSlideItem => ({
    id: brand.id,
    title: brand.name,
    subtitle: brand.tagline,
    description: brand.intro,
    status: brand.status === 'PUBLISHED' ? 'published' : 'draft',
    thumbnailClassName: 'bg-[#C4A35A]',
    isPrimary: brand.is_main,
})

type BrandSlideBodyProps = {
    data: BrandSlideItem[]
    className?: string
}

const BrandSlideBody = ({ data, className }: BrandSlideBodyProps) => {
    const { openModal } = useModalStore()
    const queryClient = useQueryClient()
    const { data: brandPage } = useListBrands({ page: 1, page_size: 100 })
    const { mutate: createBrand } = useCreateBrand()
    const { mutate: archiveBrand } = useArchiveBrand()
    const [brands, setBrands] = useState<BrandSlideItem[]>(data)
    const [loadedBrandsKey, setLoadedBrandsKey] = useState('')
    const brandsKey = (brandPage?.results ?? [])
        .map((brand) => `${brand.id}:${brand.updated_at}`)
        .join('|')

    if (brandPage && loadedBrandsKey !== brandsKey) {
        setLoadedBrandsKey(brandsKey)
        setBrands(brandPage.results.map(toBrandSlide))
    }

    const invalidateBrands = () => {
        queryClient.invalidateQueries({
            queryKey: [...cmsHomePageKeys.all, 'listBrands'],
        })
    }

    const removeBrand = (id: string) => {
        archiveBrand(
            { brandId: id },
            {
                onSuccess: () => {
                    invalidateBrands()
                    setBrands((prev) => prev.filter((brand) => brand.id !== id))
                },
            }
        )
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
                createBrand(
                    {
                        body: {
                            name: payload.title.trim(),
                            tagline: payload.slogan.trim(),
                            intro: payload.description.trim(),
                        },
                    },
                    { onSuccess: invalidateBrands }
                )
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

'use client'

import { useState } from 'react'
import { cn } from '@shared/libs/utils'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { ProductSlideItem } from '../constants'
import ProductSlideCard from './ProductSlideCard'
import { Button } from '@/src/shared/components/ui/button'
import { useModalStore } from '@/src/shared/store/modal-store'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { Icon } from '@/src/shared/components/Icons/Icon'

type ProductSlideBodyProps = {
    data: ProductSlideItem[]
    className?: string
}

const ProductSlideBody = ({ data, className }: ProductSlideBodyProps) => {
    const [products, setProducts] = useState<ProductSlideItem[]>(data)
    const { openModal } = useModalStore()
    const removeProduct = (id: string) => {
        setProducts((prev) => prev.filter((product) => product.id !== id))
    }
    const openAddProductModal = () => {
        openModal(ModalTypes.ADD_PRODUCT_BY_CATEGORY)
    }

    return (
        <div className={cn('flex gap-3 w-full', className)} dir="rtl">
            <div className="flex flex-col w-4/5 items-start justify-between gap-3">
                <div className="flex items-start justify-between min-w-0">
                    <div>
                        <h3 className="text-title-md font-bold text-on-surface">
                            انتخاب توسط کاربر
                        </h3>
                        <p className="mt-1 text-label-md text-outline">
                            کالاهایی که اکنون در این بخش نمایش داده می‌شوند
                        </p>
                    </div>
                    <span className="shrink-0 rounded-card-sm bg-primary/12 px-2.5 py-1 text-label-md font-semibold text-primary">
                        {formatFaNumber(products.length)} کالا
                    </span>
                </div>
                <div className="flex flex-col w-4/5 gap-2.5">
                    {products.map((product, index) => (
                        <ProductSlideCard
                            key={product.id}
                            data={product}
                            index={index + 1}
                            onDelete={() => removeProduct(product.id)}
                        />
                    ))}
                </div>
            </div>
            <Button
                variant="primary"
                className="h-10 shrink-0 gap-1.5 self-start"
                onClick={openAddProductModal}
            >
                <Icon label="addSm400Linear" className="size-4! text-on-primary" />
                <span>افزودن کالا</span>
            </Button>
        </div>
    )
}

export default ProductSlideBody

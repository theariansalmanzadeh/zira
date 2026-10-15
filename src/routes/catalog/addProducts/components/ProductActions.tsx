'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { DraftIn, ProductCreateIn } from '@/src/api/types/admin/catalog'
import {
    useCreateProduct,
    useCreateProductDraft,
} from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useCreateProducts } from '../provider/createProductsProvider'

const CATALOG_LIST_PATH = '/admin/catalog?sub=list'

const ProductActions = () => {
    const { back, push } = useRouter()
    const {
        productTitle,
        productCode,
        brand,
        mainCategory,
        midCategory,
        subCategory,
        salesUnit,
        sizes,
        colors,
        packs,
        attributeSelections,
    } = useCreateProducts()
    const { mutate: saveDraft, isPending: isSavingDraft } =
        useCreateProductDraft()
    const { mutate: publishProduct, isPending: isPublishing } =
        useCreateProduct()

    const isPending = isSavingDraft || isPublishing

    const hasTitleAndCode = () => {
        if (productTitle.trim() && productCode.trim()) return true
        toast.error('عنوان محصول و کد محصول را وارد کنید')
        return false
    }

    const draftBody = (): DraftIn => ({
        label: productTitle.trim(),
        data: {
            productTitle: productTitle.trim(),
            productCode: productCode.trim(),
            brand,
            mainCategory,
            midCategory,
            subCategory,
            salesUnit,
            sizes,
            colors,
            packs,
            attributeSelections,
        },
    })

    const productBody = (): ProductCreateIn => ({
        category_id: subCategory || midCategory || mainCategory,
        brand_id: brand,
        material_id: '',
        model_line: productTitle.trim(),
        unit_id: salesUnit,
        size_ids: sizes,
        color_ids: colors,
        cells: sizes.flatMap((sizeId) =>
            colors.map((colorId) => ({
                size_id: sizeId,
                color_id: colorId,
                base_code: productCode.trim(),
            }))
        ),
        base_code: productCode.trim(),
    })

    const handleSaveDraft = () => {
        if (!hasTitleAndCode()) return

        saveDraft(draftBody(), {
            onSuccess: () => {
                toast.success('پیش‌نویس با موفقیت ذخیره شد')
                push(CATALOG_LIST_PATH)
            },
        })
    }

    const handlePublish = () => {
        if (!hasTitleAndCode()) return

        publishProduct(productBody(), {
            onSuccess: () => {
                toast.success('محصول با موفقیت ایجاد شد')
                push(CATALOG_LIST_PATH)
            },
        })
    }

    return (
        <div className='flex flex-row justify-end items-center mt-6'>
            {/* <div className='flex flex-row items-center gap-2'>
                <IconButton
                    icon='rightArrow'
                    onClick={() => back()}
                    iconClassName='size-6'
                    variant='ghost'
                />
                <span className='text-on-surface text-title-lg font-bold'>
                    ایجاد محصول جدید
                </span>
            </div> */}
            <div className='flex flex-row items-center gap-2'>
                <Button
                    type='button'
                    variant='primary'
                    size='default'
                    isLoading={isSavingDraft}
                    disabled={isPending}
                    onClick={handleSaveDraft}
                >
                    ذخیره پیش‌نویس
                </Button>
                <Button
                    type='button'
                    variant='default'
                    size='default'
                    isLoading={isPublishing}
                    disabled={isPending}
                    onClick={handlePublish}
                >
                    ذخیره و انتشار
                </Button>
            </div>
        </div>
    )
}

export default ProductActions

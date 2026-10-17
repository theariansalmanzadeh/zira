'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { DraftIn, ProductCreateIn } from '@/src/api/types/admin/catalog'
import {
    useCreateProduct,
    useCreateProductDraft,
    useListAttributes,
} from '@/src/routes/catalog/hooks/catalog'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { useCreateProducts } from '../provider/createProductsProvider'
import {
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    isColorAttribute,
} from '../utils/attributes'

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
        attributeSelections,
    } = useCreateProducts()
    const { data: attributes } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)
    const selectedByCode = useMemo(() => {
        const grouped = {
            material: [] as string[],
            unit: [] as string[],
            pack: [] as string[],
            color: [] as string[],
        }

        for (const selection of Object.values(attributeSelections)) {
            if (
                selection.code === 'material' ||
                selection.code === 'unit' ||
                selection.code === 'pack' ||
                selection.code === 'color'
            ) {
                grouped[selection.code].push(...selection.values)
            }
        }

        return grouped
    }, [attributeSelections])
    const { colorIds, sizeIds } = useMemo(() => {
        const colorIds = [...selectedByCode.color]
        const sizeIds: string[] = []

        for (const attribute of attributes?.results ?? []) {
            const selected = attributeSelections[attribute.id]?.values ?? []
            if (selected.length === 0) continue
            if (
                attribute.code === 'material' ||
                attribute.code === 'unit' ||
                attribute.code === 'pack' ||
                attribute.code === 'color'
            ) {
                continue
            }
            if (isColorAttribute(attribute)) colorIds.push(...selected)
            else if (attribute.kind === 'MULTI' || attribute.code === 'size') {
                sizeIds.push(...selected)
            }
        }

        return { colorIds, sizeIds }
    }, [attributeSelections, attributes, selectedByCode.color])
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
            salesUnit: selectedByCode.unit[0] ?? salesUnit,
            sizes: sizeIds,
            colors: colorIds,
            packs: selectedByCode.pack,
            material: selectedByCode.material,
            unit: selectedByCode.unit,
            pack: selectedByCode.pack,
            color: colorIds,
            attributeSelections,
        },
    })

    const productBody = (): ProductCreateIn => ({
        category_id: subCategory || midCategory || mainCategory,
        brand_id: brand,
        material_id: selectedByCode.material[0] ?? '',
        model_line: productTitle.trim(),
        unit_id: selectedByCode.unit[0] ?? salesUnit,
        size_ids: sizeIds,
        color_ids: colorIds,
        cells: sizeIds.flatMap((sizeId) =>
            colorIds.map((colorId) => ({
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
                    variant='default'
                    size='default'
                    isLoading={isSavingDraft}
                    disabled={isPending}
                    onClick={handleSaveDraft}
                >
                    ذخیره پیش‌نویس
                </Button>
                <Button
                    type='button'
                    variant='primary'
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

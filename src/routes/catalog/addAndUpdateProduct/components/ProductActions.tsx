'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { listItems } from '@/src/api/admin/catalog'
import type {
    AttributeRowIn,
    CellIn,
    DraftIn,
    ProductCreateIn,
    ProductUpdateIn,
} from '@/src/api/types/admin/catalog'
import {
    useActivateProduct,
    useCreateProduct,
    useCreateProductDraft,
    useUpdateProduct,
} from '@/src/routes/catalog/hooks/catalog'
import { useBulkSetPrices } from '@/src/routes/catalog/hooks/pricing'
import { Button } from '@/src/shared/components/ui/button'
import { useCreateProducts } from '../provider/createProductsProvider'
import { buildBulkPriceRows } from '../utils/pricing'

const CATALOG_LIST_PATH = '/admin/catalog?sub=list'

const ProductActions = () => {
    const { push } = useRouter()
    const {
        productId,
        isEditing,
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
        pricingRows,
        unitPrice,
        discountType,
        discountValue,
    } = useCreateProducts()
    const { mutate: saveDraft, isPending: isSavingDraft } =
        useCreateProductDraft()
    const { mutateAsync: publishProduct, isPending: isPublishing } =
        useCreateProduct()
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct()
    const { mutate: activateProduct, isPending: isActivating } =
        useActivateProduct()
    const { mutateAsync: bulkSetPrices, isPending: isSettingPrices } =
        useBulkSetPrices()
    const [isPublishingFlow, setIsPublishingFlow] = useState(false)

    const isPending =
        isSavingDraft ||
        isPublishing ||
        isUpdating ||
        isActivating ||
        isSettingPrices ||
        isPublishingFlow

    const sizeIds = sizes
    const colorIds = colors

    const attributesPayload = useMemo((): AttributeRowIn[] => {
        const rows: AttributeRowIn[] = []

        for (const [attributeId, selection] of Object.entries(
            attributeSelections
        )) {
            if (
                selection.code === 'size' ||
                selection.code === 'color' ||
                selection.code === 'unit'
            ) {
                continue
            }

            for (const valueId of selection.values) {
                rows.push({
                    attribute_id: attributeId,
                    value_id: valueId,
                })
            }
        }

        return rows
    }, [attributeSelections])

    const cellsPayload = useMemo((): CellIn[] => {
        const fromMatrix = Object.values(pricingRows)
            .filter((row) => row.sizeId && row.colorId && row.active)
            .map((row) => ({
                size_id: row.sizeId,
                color_id: row.colorId,
                base_code: row.code.trim() || productCode.trim() || undefined,
                display_name:
                    row.displayName.trim() || productTitle.trim() || undefined,
            }))

        if (fromMatrix.length > 0) return fromMatrix

        return sizeIds.flatMap((sizeId) =>
            colorIds.map((colorId) => ({
                size_id: sizeId,
                color_id: colorId,
                base_code: productCode.trim() || undefined,
                display_name: productTitle.trim() || undefined,
            }))
        )
    }, [colorIds, pricingRows, productCode, productTitle, sizeIds])

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
            sizes: sizeIds,
            colors: colorIds,
            packs,
            attributeSelections,
            pricingRows,
            unitPrice,
            discountType,
            discountValue,
        },
    })

    const createBody = (): ProductCreateIn => ({
        category_id: subCategory || midCategory || mainCategory,
        brand_id: brand,
        unit_id: salesUnit,
        size_ids: sizeIds,
        color_ids: colorIds,
        cells: cellsPayload,
        attributes: attributesPayload,
        name_parts: ['MAIN_CATEGORY'],
        name: productTitle.trim(),
        base_code: productCode.trim(),
    })

    const updateBody = (): ProductUpdateIn => ({
        category_id: subCategory || midCategory || mainCategory || null,
        brand_id: brand || null,
        base_code: productCode.trim() || null,
    })

    const applyPricesForProduct = async (createdProductId: string) => {
        const itemsResult = await listItems({
            product_id: createdProductId,
            page: 1,
            page_size: 200,
        })
        if (!itemsResult.success) throw itemsResult.error

        const priceRows = buildBulkPriceRows({
            items: itemsResult.data.results ?? [],
            pricingRows,
            unitPrice,
            discountType,
            discountValue,
        })

        if (priceRows.length === 0) return

        await bulkSetPrices({ rows: priceRows })
    }

    const handleSaveDraft = () => {
        if (!hasTitleAndCode()) return

        saveDraft(draftBody(), {
            onSuccess: () => {
                toast.success('پیش‌نویس با موفقیت ذخیره شد')
                push(CATALOG_LIST_PATH)
            },
        })
    }

    const handlePublish = async () => {
        if (!hasTitleAndCode()) return

        if (isEditing && productId) {
            const body = updateBody()
            if (!body.category_id) {
                toast.error('دسته‌بندی محصول را انتخاب کنید')
                return
            }
            if (!body.brand_id) {
                toast.error('برند محصول را انتخاب کنید')
                return
            }

            updateProduct(
                { productId, body },
                {
                    onSuccess: () => {
                        activateProduct(productId, {
                            onSuccess: () => {
                                toast.success('محصول با موفقیت به‌روزرسانی شد')
                                push(`/admin/catalog/products/${productId}`)
                            },
                        })
                    },
                }
            )
            return
        }

        const body = createBody()
        if (!body.category_id) {
            toast.error('دسته‌بندی محصول را انتخاب کنید')
            return
        }
        if (!body.brand_id) {
            toast.error('برند محصول را انتخاب کنید')
            return
        }
        if (!body.unit_id) {
            toast.error('واحد فروش را انتخاب کنید')
            return
        }
        if (body.size_ids.length === 0 || body.color_ids.length === 0) {
            toast.error('سایز و رنگ را انتخاب کنید')
            return
        }
        if (body.cells.length === 0) {
            toast.error('حداقل یک سلول قیمت‌گذاری فعال وارد کنید')
            return
        }

        setIsPublishingFlow(true)
        try {
            const product = await publishProduct(body)
            await applyPricesForProduct(product.id)
            toast.success('محصول با موفقیت ایجاد شد')
            push(CATALOG_LIST_PATH)
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : typeof error === 'object' &&
                        error &&
                        'message' in error &&
                        typeof (error as { message: unknown }).message ===
                            'string'
                      ? (error as { message: string }).message
                      : null
            if (message) toast.error(message)
        } finally {
            setIsPublishingFlow(false)
        }
    }

    return (
        <div className="mt-6 flex flex-row items-center justify-end">
            <div className="flex flex-row items-center gap-2">
                {!isEditing ? (
                    <Button
                        type="button"
                        variant="default"
                        size="default"
                        isLoading={isSavingDraft}
                        disabled={isPending}
                        onClick={handleSaveDraft}
                    >
                        ذخیره پیش‌نویس
                    </Button>
                ) : null}
                <Button
                    type="button"
                    variant="primary"
                    size="default"
                    isLoading={
                        isPublishing ||
                        isUpdating ||
                        isActivating ||
                        isSettingPrices ||
                        isPublishingFlow
                    }
                    disabled={isPending}
                    onClick={handlePublish}
                >
                    {isEditing ? 'ذخیره تغییرات' : 'ذخیره و انتشار'}
                </Button>
            </div>
        </div>
    )
}

export default ProductActions

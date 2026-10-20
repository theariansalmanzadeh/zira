'use client'

import { useMemo } from 'react'
import ProductInfoCard from '@/src/shared/components/ui/ProductInfoCard'
import {
    useListAttributes,
    useListBrands,
    useListCategories,
    useListColors,
    useListSizes,
} from '@/src/routes/catalog/hooks/catalog'
import { useCreateProducts } from '../provider/createProductsProvider'
import { attributeValueMap } from '../utils/attributes'
import { categoryName, flattenCategories } from '../utils/categories'

const Preview = () => {
    const {
        productTitle,
        productCode,
        brand,
        mainCategory,
        midCategory,
        subCategory,
        attributeSelections,
        sizes,
        colors,
        packs,
    } = useCreateProducts()
    const { data: brands } = useListBrands({ page: 1, page_size: 100 })
    const { data: categoryTree } = useListCategories()
    // Full list so every selected attribute value can resolve to a name (not only COMMON)
    const { data: attributesPage } = useListAttributes({
        page: 1,
        page_size: 100,
        is_active: true,
    })
    const { data: sizesPage } = useListSizes({ page: 1, page_size: 100 })
    const { data: colorsPage } = useListColors({ page: 1, page_size: 100 })

    const categories = useMemo(
        () => flattenCategories(categoryTree ?? []),
        [categoryTree]
    )
    const values = useMemo(
        () => attributeValueMap(attributesPage?.results ?? []),
        [attributesPage?.results]
    )
    const attributeById = useMemo(
        () =>
            new Map(
                (attributesPage?.results ?? []).map((attribute) => [
                    attribute.id,
                    attribute,
                ])
            ),
        [attributesPage?.results]
    )
    const sizeById = useMemo(
        () =>
            new Map(
                (sizesPage?.results ?? []).map((size) => [size.id, size.name])
            ),
        [sizesPage]
    )
    const colorById = useMemo(
        () =>
            new Map(
                (colorsPage?.results ?? []).map((color) => [
                    color.id,
                    { label: color.name, hex: color.hex_code || '#BFBFBF' },
                ])
            ),
        [colorsPage]
    )

    const brandLabel =
        (brands?.results ?? []).find((item) => item.id === brand)?.name ||
        'برند'

    const previewSizes = sizes.map((sizeId) => ({
        value: sizeId,
        label: sizeById.get(sizeId) ?? sizeId,
    }))

    const previewColors = colors.map((colorId) => {
        const color = colorById.get(colorId)
        return {
            value: colorId,
            label: color?.label ?? values.get(colorId)?.label ?? colorId,
            hex: color?.hex ?? values.get(colorId)?.hex ?? '#BFBFBF',
        }
    })

    const previewPacks = packs.map((pack) => ({
        value: pack,
        label: values.get(pack)?.label ?? pack,
    }))

    // Show every selected attribute (not only those returned by a role filter)
    const previewAttributes = Object.entries(attributeSelections)
        .filter(([, selection]) => (selection.values ?? []).length > 0)
        .filter(([, selection]) => {
            const code = selection.code
            // size / color / unit / pack already have dedicated preview sections
            return (
                code !== 'size' &&
                code !== 'color' &&
                code !== 'unit' &&
                code !== 'pack'
            )
        })
        .map(([attributeId, selection]) => {
            const attribute = attributeById.get(attributeId)
            const selectedIds = selection.values ?? []
            const isSwatch =
                attribute?.kind === 'SWATCH' ||
                selectedIds.some((id) => Boolean(values.get(id)?.hex))

            return {
                id: attributeId,
                title: selection.name || attribute?.name || attributeId,
                values: selectedIds.map((valueId) => {
                    const lookup = values.get(valueId)
                    return {
                        value: valueId,
                        label: lookup?.label ?? valueId,
                        hex: isSwatch
                            ? lookup?.hex || '#BFBFBF'
                            : undefined,
                    }
                }),
            }
        })

    return (
        <div className='w-full'>
            <span className='text-outline text-label-lg mb-3'>
                پیش‌نمایش محصول
            </span>
            <ProductInfoCard
                title={productTitle || 'عنوان محصول'}
                productCode={productCode || 'کد محصول'}
                sizes={previewSizes}
                colors={previewColors}
                packs={previewPacks}
                brand={brandLabel}
                attributes={previewAttributes}
                breadcrumbs={[
                    categoryName(categories, subCategory, 'دسته‌ فرعی'),
                    categoryName(categories, midCategory, 'دسته میانی'),
                    categoryName(categories, mainCategory, 'دسته‌ اصلی'),
                ]}
            />
        </div>
    )
}

export default Preview

'use client'

import { useMemo } from 'react'
import ProductInfoCard from '@/src/shared/components/ui/ProductInfoCard'
import {
    useListAttributes,
    useListBrands,
    useListCategories,
} from '@/src/routes/catalog/hooks/catalog'
import { useCreateProducts } from '../provider/createProductsProvider'
import {
    PRODUCT_ATTRIBUTE_LIST_PARAMS,
    attributeValueMap,
    isColorAttribute,
} from '../utils/attributes'
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
    } = useCreateProducts()
    const { data: brands } = useListBrands({ page: 1, page_size: 100 })
    const { data: categoryTree } = useListCategories()
    const { data: attributes } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)

    const categories = useMemo(
        () => flattenCategories(categoryTree ?? []),
        [categoryTree]
    )
    const values = useMemo(
        () => attributeValueMap(attributes?.results ?? []),
        [attributes]
    )
    const brandLabel =
        (brands?.results ?? []).find((item) => item.id === brand)?.name || 'برند'
    const selectedAttributes = (attributes?.results ?? []).filter(
        (attribute) =>
            (attributeSelections[attribute.id]?.values ?? []).length > 0
    )
    const previewAttributes = selectedAttributes.map((attribute) => {
        const selection = attributeSelections[attribute.id]
        const selectedIds = selection?.values ?? []
        const isColor = isColorAttribute(attribute)

        return {
            id: attribute.id,
            title: selection?.name || attribute.name,
            values: selectedIds.map((value) => ({
                value,
                label: values.get(value)?.label ?? value,
                hex: isColor ? values.get(value)?.hex || '#BFBFBF' : undefined,
            })),
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

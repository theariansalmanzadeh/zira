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
        sizes,
        colors,
        packs,
    } = useCreateProducts()
    const { data: brands } = useListBrands({ page: 1, page_size: 100 })
    const { data: categoryTree } = useListCategories()
    const { data: attributes } = useListAttributes(PRODUCT_ATTRIBUTE_LIST_PARAMS)

    const categories = useMemo(
        () => flattenCategories(categoryTree ?? []),
        [categoryTree]
    )
    const values = useMemo(
        () => attributeValueMap(attributes?.items ?? []),
        [attributes]
    )
    const brandLabel =
        brands?.items.find((item) => item.id === brand)?.name || 'برند'

    return (
        <div className='w-full'>
            <span className='text-outline text-label-lg mb-3'>
                پیش‌نمایش محصول
            </span>
            <ProductInfoCard
                title={productTitle || 'عنوان محصول'}
                productCode={productCode || 'کد محصول'}
                brand={brandLabel}
                sizes={sizes.map((value) => values.get(value)?.label ?? value)}
                colors={colors.map((value) => ({
                    value,
                    label: values.get(value)?.label ?? value,
                    hex: values.get(value)?.hex ?? '#BFBFBF',
                }))}
                packs={packs.map((value) => ({
                    value,
                    label: values.get(value)?.label ?? value,
                }))}
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

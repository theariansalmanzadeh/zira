'use client'

import ProductInfoCard from '@/src/shared/components/ui/ProductInfoCard'
import { BRAND_OPTIONS } from './Tabs/basicInfoTab/constats'
import {
    COLOR_HEX,
    COLOR_OPTIONS,
    SIZING_OPTIONS,
    packColumnLabel,
} from './Tabs/AttributesTab'
import { useCreateProducts } from '../provider/createProductsProvider'

const optionLabel = (
    options: { label: string; value: string }[],
    value: string,
    fallback: string
) => options.find((option) => option.value === value)?.label || fallback

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

    const sizeLabels = sizes.map(
        (value) =>
            SIZING_OPTIONS.find((option) => option.value === value)?.label ??
            value
    )
    const colorItems = colors.map((value) => {
        const option = COLOR_OPTIONS.find((item) => item.value === value)
        return {
            value,
            label: option?.label ?? value,
            hex: COLOR_HEX[value] ?? '#BFBFBF',
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
                brand={optionLabel(BRAND_OPTIONS, brand, 'برند')}
                sizes={sizeLabels}
                colors={colorItems}
                packs={packs.map((value) => ({
                    value,
                    label: packColumnLabel(value),
                }))}
                breadcrumbs={[
                    subCategory || 'دسته‌ فرعی',
                    midCategory || 'دسته میانی',
                    mainCategory || 'دسته‌ اصلی',
                ]}
            />
        </div>
    )
}

export default Preview

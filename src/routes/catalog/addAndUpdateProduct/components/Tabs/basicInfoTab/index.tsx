'use client'

import { useMemo, useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    useListBrands,
    useListCategories,
} from '@/src/routes/catalog/hooks/catalog'
import { useCreateProducts } from '../../../provider/createProductsProvider'
import { DISPLAY_STATUS_OPTIONS } from './constats'
import NewRow from './components/NewRow'
import {
    flattenCategories,
    toCategoryOptions,
} from '../../../utils/categories'

const BasicInfoTab = () => {
    const {
        productTitle,
        setProductTitle,
        productCode,
        setProductCode,
        brand,
        setBrand,
        mainCategory,
        setMainCategory,
        midCategory,
        setMidCategory,
        subCategory,
        setSubCategory,
    } = useCreateProducts()
    const [displayStatus, setDisplayStatus] = useState<string>()
    const { data: brands } = useListBrands({ page: 1, page_size: 100 })
    const { data: categoryTree } = useListCategories()

    const categories = useMemo(
        () => flattenCategories(categoryTree ?? []),
        [categoryTree]
    )
    const brandOptions = useMemo(
        () =>
            (brands?.results ?? []).map((item) => ({
                label: item.name,
                value: item.id,
            })),
        [brands]
    )
    const mainCategoryOptions = useMemo(
        () => toCategoryOptions(categories, 1),
        [categories]
    )
    const midCategoryOptions = useMemo(
        () => toCategoryOptions(categories, 2),
        [categories]
    )
    const subCategoryOptions = useMemo(
        () => toCategoryOptions(categories, 3),
        [categories]
    )

    return (
        <div className='grid grid-cols-2 gap-6'>
            <Input
                label='عنوان محصول'
                placeholder='عنوان محصول'
                value={productTitle}
                onChange={setProductTitle}
            />

            <Input
                label='کد محصول'
                placeholder='کد محصول'
                value={productCode}
                onChange={setProductCode}
                iconId='copy'
                iconClassName='cursor-pointer'
                wrapperClassName='flex-row-reverse'
            />
            <FormDropdown
                label='دسته‌بندی اصلی'
                value={mainCategory}
                options={mainCategoryOptions}
                onChange={setMainCategory}
            />
            <FormDropdown
                label='دسته‌بندی فرعی'
                value={subCategory}
                options={subCategoryOptions}
                onChange={setSubCategory}
            />
            <FormDropdown
                label='برند'
                value={brand}
                options={brandOptions}
                onChange={setBrand}
            />

            <FormDropdown
                label='دسته میانی *'
                value={midCategory}
                options={midCategoryOptions}
                onChange={setMidCategory}
            />

            <FormDropdown
                className='col-span-2'
                label='وضعیت نمایش'
                placeholder='به زودی/فعال/غیرفعال'
                value={displayStatus}
                options={DISPLAY_STATUS_OPTIONS}
                onChange={setDisplayStatus}
            />

            <div className='col-span-2 flex flex-col'>
                <label className='mb-1.5 text-label-md text-on-surface-variant'>توضیحات</label>
                <Textarea
                    className='bg-surface-container-high min-h-32 rounded-container-lg border-0 resize-none px-3 py-2 text-on-surface placeholder:text-outline'
                    placeholder=''
                />
            </div>

            <NewRow />
        </div>
    )
}

export default BasicInfoTab

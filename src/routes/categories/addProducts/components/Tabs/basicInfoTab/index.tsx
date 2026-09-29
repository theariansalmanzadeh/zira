"use client"

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { useCreateProducts } from '../../../provider/createProductsProvider'
import {
    BRAND_OPTIONS,
    DISPLAY_STATUS_OPTIONS,
    MAIN_CATEGORY_OPTIONS,
    SUB_CATEGORY_OPTIONS,
    SUPPLIER_OPTIONS,
} from './constats'
import NewRow from './components/NewRow'

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
                options={MAIN_CATEGORY_OPTIONS}
                onChange={setMainCategory}
            />
            <FormDropdown
                label='دسته‌بندی فرعی'
                value={subCategory}
                options={SUB_CATEGORY_OPTIONS}
                onChange={setSubCategory}
            />
            <FormDropdown
                label='برند'
                value={brand}
                options={BRAND_OPTIONS}
                onChange={setBrand}
            />

            <FormDropdown
                label='دسته میانی *'
                value={midCategory}
                options={SUPPLIER_OPTIONS}
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

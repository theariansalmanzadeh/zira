"use client"

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import {
    BRAND_OPTIONS,
    DISPLAY_STATUS_OPTIONS,
    MAIN_CATEGORY_OPTIONS,
    SUB_CATEGORY_OPTIONS,
    SUPPLIER_OPTIONS,
} from './constats'
import NewRow from './components/NewRow'

const BasicInfoTab = () => {
    const [mainCategory, setMainCategory] = useState<string>()
    const [subCategory, setSubCategory] = useState<string>()
    const [brand, setBrand] = useState<string>()
    const [supplier, setSupplier] = useState<string>()
    const [displayStatus, setDisplayStatus] = useState<string>()

    return (
        <div className='grid grid-cols-2 gap-6'>
            <Input label='عنوان محصول' placeholder='عنوان محصول' />

            <Input
                label='کد محصول'
                placeholder='کد محصول'
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
                label='تأمین‌کننده'
                value={supplier}
                options={SUPPLIER_OPTIONS}
                onChange={setSupplier}
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

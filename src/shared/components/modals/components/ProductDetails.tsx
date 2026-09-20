'use client'

import type { BaseModalProps } from '../types'

export type ProductDetailField = {
    label: string
    value: string
}

export type ProductDetailsModalData = {
    fields?: ProductDetailField[]
}

export const PRODUCT_DETAILS_DUMMY: ProductDetailField[] = [
    { label: 'کد کالا', value: '۷۳۵۲-۶۳' },
    { label: 'نام کالا', value: 'لباس خواب ساتن' },
    { label: 'دسته اصلی', value: 'پوشاک زنانه' },
    { label: 'دسته فرعی', value: 'لباس خواب' },
    { label: 'نوع محصول', value: 'ست' },
    { label: 'سایز', value: 'L' },
    { label: 'رنگ', value: 'زغالی' },
    { label: 'مدل', value: 'ZM-210' },
    { label: 'جنس', value: 'ساتن' },
    { label: 'واحد', value: 'عدد' },
    { label: 'لیبل‌ها', value: 'نو · اورجینال' },
    {
        label: 'توضیحات',
        value: 'بسته‌بندی سلفونی، دارای لیبل سایز فارسی',
    },
]

const ProductDetails = ({ data }: BaseModalProps) => {
    const modalData = (data as ProductDetailsModalData | null | undefined) ?? {}
    const fields = modalData.fields ?? PRODUCT_DETAILS_DUMMY

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='overflow-hidden rounded-card-md border border-outline-variant'>
                <div className='grid grid-cols-3 border-b border-outline-variant bg-surface-container-high px-4 py-3 text-label-lg text-outline'>
                    <span>ویژگی</span>
                    <span className='col-span-2'>مقدار</span>
                </div>
                <div className='divide-y divide-outline-variant'>
                    {fields.map((field) => (
                        <div
                            key={field.label}
                            className='grid grid-cols-3 items-start gap-3 px-4 py-3 text-label-lg'
                        >
                            <span className='text-on-surface-variant'>
                                {field.label}
                            </span>
                            <span className='col-span-2 text-on-surface'>
                                {field.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductDetails

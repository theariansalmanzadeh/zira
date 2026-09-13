"use client"

import { useState, type ChangeEvent } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'

const handleInputChange =
    (setter: (value: string) => void) =>
        (value: string | ChangeEvent<HTMLInputElement>) => {
            setter(typeof value === 'string' ? value : value.target.value)
        }

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h3 className='mb-4 text-title-sm font-bold text-on-surface'>{children}</h3>
)

const SectionDivider = () => <hr className='border-outline-variant border-dashed' />

const AdditionalSettingsTab = () => {
    const [slug, setSlug] = useState('')
    const [metaTitle, setMetaTitle] = useState('')
    const [relatedProducts, setRelatedProducts] = useState('')
    const [similarProducts, setSimilarProducts] = useState('')
    const [minOrderQuantity, setMinOrderQuantity] = useState('')
    const [maxOrderQuantity, setMaxOrderQuantity] = useState('')
    const [minPreOrderQuantity, setMinPreOrderQuantity] = useState('')
    const [maxPreOrderQuantity, setMaxPreOrderQuantity] = useState('')

    return (
        <div className='flex flex-col gap-6'>
            <section>
                <SectionTitle>سئو</SectionTitle>
                <div className='grid grid-cols-2 gap-6'>
                    <Input label='Slug' placeholder='Slug' value={slug} onChange={handleInputChange(setSlug)} />
                    <Input label='Meta Title' placeholder='Meta Title' value={metaTitle} onChange={handleInputChange(setMetaTitle)} />
                    <div className='col-span-2 flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            Meta Description
                        </label>
                        <Textarea
                            className='bg-surface-container-high min-h-32 rounded-container-lg border-0 resize-none px-3 py-2 text-on-surface placeholder:text-outline'
                            placeholder=''
                        />
                    </div>
                </div>
            </section>

            <SectionDivider />

            <section>
                <SectionTitle>فروش مکمل</SectionTitle>
                <div className='grid grid-cols-2 gap-6'>
                    <Input
                        label='محصولات مرتبط'
                        placeholder='انتخاب'
                        value={relatedProducts}
                        onChange={handleInputChange(setRelatedProducts)}
                    />
                    <Input
                        label='محصولات مشابه'
                        placeholder='انتخاب'
                        value={similarProducts}
                        onChange={handleInputChange(setSimilarProducts)}
                    />
                </div>
            </section>

            <SectionDivider />

            <section>
                <SectionTitle>قوانین فروش</SectionTitle>
                <div className='grid grid-cols-2 gap-6'>
                    <Input
                        label='حداقل تعداد قابل سفارش'
                        placeholder='انتخاب'
                        type='number'
                        value={minOrderQuantity}
                        onChange={handleInputChange(setMinOrderQuantity)}
                    />
                    <Input
                        label='حداکثر تعداد قابل سفارش'
                        placeholder='انتخاب'
                        type='number'
                        value={maxOrderQuantity}
                        onChange={handleInputChange(setMaxOrderQuantity)}
                    />
                    <Input
                        label='حداقل تعداد پیش سفارش'
                        placeholder='انتخاب'
                        type='number'
                        value={minPreOrderQuantity}
                        onChange={handleInputChange(setMinPreOrderQuantity)}
                    />
                    <Input
                        label='حداکثر تعداد پیش سفارش'
                        placeholder='انتخاب'
                        type='number'
                        value={maxPreOrderQuantity}
                        onChange={handleInputChange(setMaxPreOrderQuantity)}
                    />
                </div>
            </section>
        </div>
    )
}

export default AdditionalSettingsTab

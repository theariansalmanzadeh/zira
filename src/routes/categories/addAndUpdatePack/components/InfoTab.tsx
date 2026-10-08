'use client'

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'

const DISPLAY_STATUS_OPTIONS = [
    { label: 'نمایش در فروشگاه', value: 'store' },
    { label: 'مخفی', value: 'hidden' },
    { label: 'پیش‌نویس', value: 'draft' },
]

const INHERITED_SPECS = [
    {
        label: 'مسیر دسته‌بندی',
        value: 'لباس زیر زنانه › شورت و تانگا › شورت زنانه',
    },
    { label: 'برند', value: 'لمسی' },
    { label: 'طرح و مدل', value: 'رز' },
    { label: 'جنس', value: 'نخ پنبه' },
]

const InfoTab = () => {
    const [title, setTitle] = useState('پک ۶ عددی شورت زنانه رز — قرمز')
    const [code, setCode] = useState('IT-2001')
    const [displayStatus, setDisplayStatus] = useState('store')
    const [description, setDescription] = useState('')

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'>
                <div className='flex items-center gap-2'>
                    <span className='h-5 w-1 shrink-0 rounded-full bg-error' />
                    <span className='text-title-md font-bold text-on-surface'>
                        اطلاعات پایه آیتم
                    </span>
                </div>

                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div className='flex flex-col gap-1'>
                        <Input
                            label='عنوان آیتم *'
                            value={title}
                            onChange={setTitle}
                            placeholder='پک ۶ عددی شورت زنانه رز — قرمز'
                        />
                        <span className='text-label-sm text-outline'>
                            در صورت خالی بودن، نام پیشنهادی آیتم استفاده می‌شود
                        </span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <Input
                            label='کد آیتم *'
                            value={code}
                            onChange={setCode}
                        />
                        <span className='text-label-sm text-outline'>
                            کد یکتای آیتم
                        </span>
                    </div>
                </div>

                <FormDropdown
                    label='وضعیت نمایش'
                    value={displayStatus}
                    options={DISPLAY_STATUS_OPTIONS}
                    onChange={setDisplayStatus}
                />

                <div className='flex flex-col gap-1.5'>
                    <label className='text-label-md text-on-surface-variant'>
                        توضیحات آیتم
                    </label>
                    <Textarea
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder='توضیح آیتم برای صفحه فروشگاه'
                        className='min-h-28 resize-none rounded-container-lg border border-outline-variant bg-surface-container-lowest px-3 py-2'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6'>
                <div className='flex items-center gap-2'>
                    <span className='h-5 w-1 shrink-0 rounded-full bg-error' />
                    <span className='text-title-md font-bold text-on-surface'>
                        مشخصات به ارث رسیده از خانواده
                    </span>
                </div>
                <div className='grid grid-cols-2 gap-3 md:grid-cols-4'>
                    {INHERITED_SPECS.map((spec) => (
                        <div
                            key={spec.label}
                            className='flex flex-col items-center gap-2 rounded-card-md border border-outline-variant px-3 py-4 text-center'
                        >
                            <span className='text-label-sm text-outline'>
                                {spec.label}
                            </span>
                            <span className='text-label-lg text-on-surface'>
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
                <span className='text-label-sm text-outline'>
                    این مقادیر از خانواده انتخاب‌شده در مرحله ۱ خوانده می‌شوند و در
                    آیتم قابل ویرایش نیستند.
                </span>
            </div>
        </div>
    )
}

export default InfoTab

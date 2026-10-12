"use client"

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'

const CATEGORY_ID = 'CAT-6353'

const STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

const LEVEL_OPTIONS = [
    { label: 'سطح ۱', value: 'level-1' },
    { label: 'سطح ۲', value: 'level-2' },
    { label: 'سطح ۳', value: 'level-3' },
]

const NewCategory = () => {
    const { back } = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [categoryTitle, setCategoryTitle] = useState('')
    const [status, setStatus] = useState('active')
    const [level, setLevel] = useState<string>()

    return (
        <div className='mx-auto flex w-full max-w-[700px] flex-col gap-6' dir='rtl'>
            <div className='flex flex-row items-center gap-2'>
                <IconButton
                    icon='arrorwRight400Broken'
                    variant='ghost'
                    iconClassName='size-6! text-on-surface-variant'
                    onClick={() => back()}
                />
                <span className='text-title-lg font-bold text-on-surface'>
                    ثبت دسته‌بندی جدید
                </span>
            </div>

            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <div className='grid grid-cols-2 gap-6'>
                    <Input
                        label='عنوان دسته‌بندی'
                        placeholder='عنوان دسته‌بندی'
                        value={categoryTitle}
                        onChange={setCategoryTitle}
                    />
                    <CopyableInput
                        value={CATEGORY_ID}
                        label='شناسه'
                        onCopy={() => navigator.clipboard.writeText(CATEGORY_ID)}
                        readOnly={false}
                    />
                    <FormDropdown
                        label='وضعیت'
                        value={status}
                        options={STATUS_OPTIONS}
                        onChange={setStatus}
                    />
                    <FormDropdown
                        label='سطح'
                        placeholder='انتخاب'
                        value={level}
                        options={LEVEL_OPTIONS}
                        onChange={setLevel}
                    />

                    <hr className='col-span-2 border-0 border-t border-dashed border-outline-variant' />

                    <div className='col-span-2 flex flex-row items-center justify-between gap-4'>
                        <span className='text-label-md text-on-surface-variant text-nowrap'>
                            آپلود تصویر بنر (نسبت 1:1 پیشنهاد می‌شود)
                        </span>
                        <Button
                            className='flex items-center gap-2 w-full'
                            variant='outline'
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Icon label='upload300Broken' className='size-6!' />
                            <span className='text-label-md'>بارگذاری</span>
                        </Button>
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={() => { }}
                        />
                    </div>

                    <Button
                        type='button'
                        variant='primary'
                        size='lg'
                        className='col-span-2 w-full text-label-lg'
                    >
                        ثبت دسته‌بندی
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default NewCategory

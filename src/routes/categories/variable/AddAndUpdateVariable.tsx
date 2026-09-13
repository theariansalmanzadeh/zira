'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'

const TYPE_OPTIONS = [
    { label: 'انتخابی (سواچ)', value: 'swatch' },
    { label: 'انتخابی (متن)', value: 'select-text' },
    { label: 'متنی', value: 'text' },
    { label: 'بولین', value: 'boolean' },
]

const AddAndUpdateVariable = () => {
    const { push } = useRouter()
    const searchParams = useSearchParams()
    const isEditing = Boolean(searchParams.get('id'))

    const [name, setName] = useState(isEditing ? 'رنگ' : '')
    const [type, setType] = useState(isEditing ? 'swatch' : undefined)
    const [description, setDescription] = useState('')

    return (
        <div className='flex w-full flex-col gap-6' dir='rtl'>
            <div className='flex flex-row items-center justify-end gap-2'>
                <Button
                    type='button'
                    variant='outline'
                    onClick={() => push('/admin/categories?sub=variable')}
                >
                    انصراف
                </Button>
                <Button type='button' variant='primary'>
                    {isEditing ? 'ذخیره تغییرات' : 'ثبت ویژگی'}
                </Button>
            </div>

            <div className='grid grid-cols-1 gap-6 rounded-card-lg bg-surface-container-lowest p-6 sm:grid-cols-2'>
                <Input label='نام ویژگی' value={name} onChange={setName} />
                <FormDropdown
                    label='نوع'
                    placeholder='انتخاب'
                    value={type}
                    options={TYPE_OPTIONS}
                    onChange={setType}
                />
                <div className='flex flex-col sm:col-span-2'>
                    <label className='mb-1.5 text-label-md text-on-surface-variant'>
                        توضیحات
                    </label>
                    <Textarea
                        rows={4}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        className='min-h-24 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                    />
                </div>
            </div>
        </div>
    )
}

export default AddAndUpdateVariable

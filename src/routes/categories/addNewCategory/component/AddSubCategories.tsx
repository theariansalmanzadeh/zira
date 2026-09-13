'use client'

import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import Seperator from '@/src/shared/components/ui/Seperator'
import { cn } from '@/src/shared/libs/utils'
import {
    ADD_NEW_CATEGORY_DEFAULT_VALUES,
    addNewCategorySchema,
    LEVEL_OPTIONS,
    STATUS_OPTIONS,
    type AddNewCategoryFormValues,
} from '../schema'

type AddSubCategoriesProps = {
    nextId?: string
    onAdd?: (data: AddNewCategoryFormValues) => void
    className?: string
}

const AddSubCategories = ({
    nextId = 'CAT-SUB-1001',
    onAdd,
    className,
}: AddSubCategoriesProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<AddNewCategoryFormValues>({
        resolver: zodResolver(addNewCategorySchema),
        defaultValues: {
            ...ADD_NEW_CATEGORY_DEFAULT_VALUES,
            id: nextId,
            title: '',
            level: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    useEffect(() => {
        setValue('id', nextId)
    }, [nextId, setValue])

    const onSubmit = (data: AddNewCategoryFormValues) => {
        onAdd?.({ ...data, id: nextId })
        reset({
            ...ADD_NEW_CATEGORY_DEFAULT_VALUES,
            id: nextId,
            title: '',
            level: '',
        })
        setIsOpen(false)
    }

    return (
        <div className={cn('col-span-2 flex flex-col gap-4', className)}>
            <Button
                type='button'
                variant='outline'
                size='default'
                className='w-full text-label-lg'
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? 'بستن فرم زیرمجموعه' : 'اضافه کردن زیرمجموعه'}
            </Button>

            {isOpen && (
                <div className='rounded-card-md border border-outline-variant bg-surface-container-lowest p-6'>
                    <div className='grid grid-cols-2 gap-6'>
                        <Controller
                            name='title'
                            control={control}
                            render={({ field }) => (
                                <Input
                                    label='عنوان دسته‌بندی'
                                    placeholder='عنوان دسته‌بندی'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!errors.title}
                                    msg={errors.title?.message}
                                />
                            )}
                        />
                        <Controller
                            name='id'
                            control={control}
                            render={({ field }) => (
                                <CopyableInput
                                    label='شناسه'
                                    value={field.value}
                                    readOnly
                                />
                            )}
                        />
                        <Controller
                            name='status'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='وضعیت'
                                    value={field.value}
                                    options={STATUS_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name='level'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='سطح'
                                    placeholder='انتخاب'
                                    value={field.value || undefined}
                                    options={LEVEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />

                        <Seperator className='col-span-2' />

                        <div className='col-span-2 flex flex-row items-center justify-between gap-4'>
                            <span className='shrink-0 text-nowrap text-label-md text-on-surface-variant'>
                                آپلود تصویر بنر (نسبت 1:1 پیشنهاد می‌شود)
                            </span>
                            <Button
                                type='button'
                                className='flex w-full max-w-[313px] items-center gap-2'
                                variant='outline'
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Icon
                                    label='upload300Broken'
                                    className='size-6!'
                                />
                                <span className='text-label-md'>بارگذاری</span>
                            </Button>
                            <input
                                ref={fileInputRef}
                                type='file'
                                accept='image/*'
                                className='hidden'
                                onChange={(event) => {
                                    const file = event.target.files?.[0] ?? null
                                    setValue('bannerImage', file, {
                                        shouldValidate: true,
                                    })
                                }}
                            />
                        </div>

                        <Button
                            type='button'
                            variant='primary'
                            size='default'
                            className='col-span-2 w-full text-label-lg'
                            onClick={handleSubmit(onSubmit)}
                        >
                            افزودن زیرمجموعه
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddSubCategories

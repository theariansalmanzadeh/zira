'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import Seperator from '@/src/shared/components/ui/Seperator'
import {
    ADD_NEW_CATEGORY_DEFAULT_VALUES,
    addNewCategorySchema,
    LEVEL_OPTIONS,
    STATUS_OPTIONS,
    type AddNewCategoryFormValues,
} from './schema'
import AddSubCategories from './component/AddSubCategories'
import SubCategoriesTable, {
    type SubCategoryRow,
} from './component/SubCategoriesTable'

const resolveOptionLabel = (
    options: { label: string; value: string }[],
    value: string
) => options.find((option) => option.value === value)?.label ?? value

const AddNewCategory = () => {
    const { back } = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [subCategories, setSubCategories] = useState<SubCategoryRow[]>([])

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AddNewCategoryFormValues>({
        resolver: zodResolver(addNewCategorySchema),
        defaultValues: ADD_NEW_CATEGORY_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const nextSubCategoryId = `CAT-SUB-${String(subCategories.length + 1001).padStart(4, '0')}`

    const onSubmit = (data: AddNewCategoryFormValues) => {
        console.log(data, subCategories)
    }

    const handleAddSubCategory = (data: AddNewCategoryFormValues) => {
        setSubCategories((prev) => [
            ...prev,
            {
                id: data.id || nextSubCategoryId,
                name: data.title,
                level: resolveOptionLabel(LEVEL_OPTIONS, data.level),
                status: data.status === 'inactive' ? 'inactive' : 'active',
            },
        ])
    }

    const handleRemoveSubCategory = (id: string) => {
        setSubCategories((prev) => prev.filter((item) => item.id !== id))
    }

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

            <form
                className='rounded-card-md bg-surface-container-lowest p-6'
                onSubmit={handleSubmit(onSubmit)}
            >
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
                            <Icon label='upload300Broken' className='size-6!' />
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

                    <AddSubCategories
                        nextId={nextSubCategoryId}
                        onAdd={handleAddSubCategory}
                    />
                    <SubCategoriesTable
                        data={subCategories}
                        onRemove={handleRemoveSubCategory}
                    />

                    <Button
                        type='submit'
                        variant='primary'
                        size='lg'
                        className='col-span-2 w-full text-label-lg'
                    >
                        ثبت دسته‌بندی
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AddNewCategory

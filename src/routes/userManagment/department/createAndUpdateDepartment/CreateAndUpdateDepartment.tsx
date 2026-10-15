'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import {
    useCreateDepartment,
    useGetDepartment,
    useUpdateDepartment,
} from '../../hooks/departments'
import {
    createAndUpdateDepartmentSchema,
    DEPARTMENT_FORM_DEFAULTS,
    mapDepartmentToFormValues,
    type CreateAndUpdateDepartmentValues,
} from './schema'

type CreateAndUpdateDepartmentProps = {
    id?: string
}

const CreateAndUpdateDepartment = ({ id }: CreateAndUpdateDepartmentProps) => {
    const { push } = useRouter()
    const isEdit = Boolean(id)
    const openModal = useModalStore((state) => state.openModal)

    const { data, isPending: isLoadingDepartment } = useGetDepartment(
        id ?? '',
        isEdit
    )
    const { mutateAsync: createDepartment, isPending: isCreating } =
        useCreateDepartment()
    const { mutateAsync: updateDepartment, isPending: isUpdating } =
        useUpdateDepartment()

    const { control, handleSubmit, reset } =
        useForm<CreateAndUpdateDepartmentValues>({
            resolver: zodResolver(createAndUpdateDepartmentSchema),
            defaultValues: DEPARTMENT_FORM_DEFAULTS,
            mode: 'onSubmit',
        })

    useEffect(() => {
        if (!data) return
        reset(mapDepartmentToFormValues(data))
    }, [data, reset])

    const onSubmit = async (values: CreateAndUpdateDepartmentValues) => {
        try {
            if (isEdit && id) {
                await updateDepartment({
                    departmentId: id,
                    body: {
                        name: values.name.trim(),
                        description: values.description.trim(),
                        is_active: values.isActive,
                    },
                })
            } else {
                await createDepartment({
                    code: values.code.trim(),
                    name: values.name.trim(),
                    description: values.description.trim() || undefined,
                })
            }

            push('/admin/user-management?sub=department')
        } catch {
            // Keep the form open so the user can retry after a failed request.
        }
    }

    if (isEdit && isLoadingDepartment) {
        return <TableLoadingSkeleton isPending rows={6} />
    }

    return (
        <form
            className='mx-auto flex w-full max-w-[700px] flex-col gap-6'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='rounded-card-md bg-surface-container-lowest p-6'>
                <div className='grid grid-cols-2 gap-6'>
                    <Controller
                        name='name'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                label='نام دپارتمان *'
                                placeholder='مثلاً پشتیبانی مالی'
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                msg={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name='code'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col'>
                                <span className='mb-1.5 text-label-md text-on-surface-variant'>
                                    شناسه دپارتمان
                                </span>
                                <CopyableInput
                                    value={field.value}
                                    onCopy={() => {}}
                                    readOnly
                                    groupClassName='bg-surface-container-high h-10 rounded-container-lg border-0'
                                />
                            </div>
                        )}
                    />
                    <div className='col-span-2 flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            توضیحات
                        </label>
                        <Controller
                            name='description'
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    className='min-h-32 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                                    placeholder='این بخش به چه تیکت‌هایی رسیدگی می‌کند؟'
                                    value={field.value}
                                    onChange={(event) =>
                                        field.onChange(event.target.value)
                                    }
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-3'>
                <div className='flex w-full items-center justify-between'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>
                            کارشناسان
                        </span>
                        <span className='text-label-md text-outline'>
                            کارشناسان این دپارتمان را از لیست انتخاب کنید
                        </span>
                    </div>
                    <Button
                        type='button'
                        variant='ghost'
                        onClick={() =>
                            openModal(ModalTypes.SELECT_USER_AND_GROUPS)
                        }
                    >
                        <span className='text-label-md text-on-surface-variant'>
                            انتخاب
                        </span>
                        <Icon
                            label='chevronDown300Linear'
                            className='size-4 rotate-90 text-on-surface-variant'
                        />
                    </Button>
                </div>
                <Button
                    type='submit'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                    isLoading={isCreating || isUpdating}
                >
                    {isEdit ? 'ویرایش دپارتمان' : 'ثبت دپارتمان'}
                </Button>
            </div>
        </form>
    )
}

export default CreateAndUpdateDepartment

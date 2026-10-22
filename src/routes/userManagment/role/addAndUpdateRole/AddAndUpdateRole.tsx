'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { useListDepartments } from '@/src/routes/userManagment/hooks/departments'
import {
    useCreateRole,
    useGetRole,
    useUpdateRole,
} from '@/src/routes/userManagment/hooks/role'
import {
    ADD_AND_UPDATE_ROLE_DEFAULTS,
    ROLE_LEVEL_OPTIONS,
    addAndUpdateRoleSchema,
    mapRoleToFormValues,
    type AddAndUpdateRoleFormValues,
} from './schema'

type AddAndUpdateRoleProps = {
    id?: string
}

const AddAndUpdateRole = ({ id }: AddAndUpdateRoleProps) => {
    const { push } = useRouter()
    const isEdit = Boolean(id)
    const { data: departments } = useListDepartments()
    const { data: role, isPending: isLoadingRole } = useGetRole(
        id ?? '',
        isEdit
    )
    const { mutateAsync: createRole, isPending: isCreating } = useCreateRole()
    const { mutateAsync: updateRole, isPending: isUpdating } = useUpdateRole()
    const isPending = isCreating || isUpdating

    const departmentOptions = useMemo(
        () =>
            (departments?.results ?? []).map((department) => ({
                label: department.name,
                value: department.id,
            })),
        [departments?.results]
    )

    const { control, handleSubmit, reset } = useForm<AddAndUpdateRoleFormValues>(
        {
            resolver: zodResolver(addAndUpdateRoleSchema),
            defaultValues: ADD_AND_UPDATE_ROLE_DEFAULTS,
            mode: 'onSubmit',
        }
    )

    useEffect(() => {
        if (!role) return
        reset(mapRoleToFormValues(role))
    }, [role, reset])

    const onSubmit = async (values: AddAndUpdateRoleFormValues) => {
        try {
            if (isEdit && id) {
                await updateRole({
                    roleId: id,
                    body: {
                        name: values.name.trim(),
                        description: values.description.trim(),
                        level: Number(values.level),
                        department: values.department || null,
                    },
                })
            } else {
                await createRole({
                    code: values.code.trim(),
                    name: values.name.trim(),
                    description: values.description.trim(),
                    level: Number(values.level),
                    department: values.department,
                })
            }
            push('/admin/user-management?sub=role')
        } catch {
            // Keep the form open so the user can retry after a failed request.
        }
    }

    if (isEdit && isLoadingRole) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner className='size-6' />
            </div>
        )
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
                        name='code'
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className='flex flex-col'>
                                <CopyableInput
                                    label='کد نقش *'
                                    placeholder='کد نقش'
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={isEdit}
                                    groupClassName='bg-surface-container-high! h-10 rounded-container-lg border-0'
                                />
                                {fieldState.error?.message ? (
                                    <span className='mt-1 text-label-sm text-error'>
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />
                    <Controller
                        name='name'
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                label='نام نقش *'
                                placeholder='نام نقش'
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                msg={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name='level'
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className='flex flex-col'>
                                <FormDropdown
                                    label='سطح'
                                    placeholder='انتخاب سطح'
                                    value={field.value}
                                    options={[...ROLE_LEVEL_OPTIONS]}
                                    onChange={field.onChange}
                                />
                                {fieldState.error?.message ? (
                                    <span className='mt-1 text-label-sm text-error'>
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />
                    <Controller
                        name='department'
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className='flex flex-col'>
                                <FormDropdown
                                    label='دپارتمان'
                                    placeholder='انتخاب دپارتمان'
                                    value={field.value}
                                    options={departmentOptions}
                                    onChange={field.onChange}
                                />
                                {fieldState.error?.message ? (
                                    <span className='mt-1 text-label-sm text-error'>
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
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
                                    placeholder=''
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
            <Button
                type='submit'
                variant='primary'
                size='lg'
                className='w-full text-label-lg'
                isLoading={isPending}
            >
                {isEdit ? 'ذخیره تغییرات' : 'ثبت نقش'}
            </Button>
        </form>
    )
}

export default AddAndUpdateRole

'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useListDepartments } from '@/src/routes/userManagment/hooks/departments'
import { useCreateRole } from '@/src/routes/userManagment/hooks/role'
import {
    CREATE_ROLE_DEFAULTS,
    ROLE_LEVEL_OPTIONS,
    createRoleSchema,
    type CreateRoleFormValues,
} from './schema'

const CreateNewRole = () => {
    const { push } = useRouter()
    const { data: departments } = useListDepartments()
    const { mutateAsync: createRole, isPending } = useCreateRole()

    const departmentOptions = useMemo(
        () =>
            (departments?.results ?? []).map((department) => ({
                label: department.name,
                value: department.id,
            })),
        [departments?.results]
    )

    const { control, handleSubmit } = useForm<CreateRoleFormValues>({
        resolver: zodResolver(createRoleSchema),
        defaultValues: CREATE_ROLE_DEFAULTS,
        mode: 'onSubmit',
    })

    const onSubmit = async (values: CreateRoleFormValues) => {
        try {
            await createRole({
                code: values.code.trim(),
                name: values.name.trim(),
                description: values.description.trim(),
                level: Number(values.level),
                department: values.department,
            })
            push('/admin/user-management?sub=role')
        } catch {
            // Keep the form open so the user can retry after a failed request.
        }
    }

    return (
        <form
            className="mx-auto flex w-full max-w-[700px] flex-col gap-6"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="rounded-card-md bg-surface-container-lowest p-6">
                <div className="grid grid-cols-2 gap-6">
                    <Controller
                        name="code"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col">
                                <CopyableInput
                                    label="کد نقش *"
                                    placeholder="کد نقش"
                                    value={field.value}
                                    onChange={field.onChange}
                                    groupClassName="bg-surface-container-high! h-10 rounded-container-lg border-0"
                                />
                                {fieldState.error?.message ? (
                                    <span className="mt-1 text-label-sm text-error">
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Input
                                label="نام نقش *"
                                placeholder="نام نقش"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!fieldState.error}
                                msg={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="level"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col">
                                <FormDropdown
                                    label="سطح"
                                    placeholder="انتخاب سطح"
                                    value={field.value}
                                    options={[...ROLE_LEVEL_OPTIONS]}
                                    onChange={field.onChange}
                                />
                                {fieldState.error?.message ? (
                                    <span className="mt-1 text-label-sm text-error">
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />
                    <Controller
                        name="department"
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className="flex flex-col">
                                <FormDropdown
                                    label="دپارتمان"
                                    placeholder="انتخاب دپارتمان"
                                    value={field.value}
                                    options={departmentOptions}
                                    onChange={field.onChange}
                                />
                                {fieldState.error?.message ? (
                                    <span className="mt-1 text-label-sm text-error">
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />
                    <div className="col-span-2 flex flex-col">
                        <label className="mb-1.5 text-label-md text-on-surface-variant">
                            توضیحات
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    className="min-h-32 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline"
                                    placeholder=""
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
                type="submit"
                variant="primary"
                size="lg"
                className="w-full text-label-lg"
                isLoading={isPending}
            >
                ثبت نقش
            </Button>
        </form>
    )
}

export default CreateNewRole

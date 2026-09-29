'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import SelectUsers from './compoenents/SelectUsers'
import {
    CREATE_NEW_GROUP_DEFAULTS,
    GROUP_MANAGER_OPTIONS,
    GROUP_ROLE_OPTIONS,
    createNewGroupSchema,
    type CreateNewGroupValues,
} from './schema'

const CreateNewGroup = () => {
    const methods = useForm<CreateNewGroupValues>({
        resolver: zodResolver(createNewGroupSchema),
        defaultValues: CREATE_NEW_GROUP_DEFAULTS,
    })
    const { control, handleSubmit } = methods

    const onSubmit = (data: CreateNewGroupValues) => {
        console.log(data)
    }

    return (
        <FormProvider {...methods}>
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
                                    label='نام گروه *'
                                    placeholder='نام گروه'
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={!!fieldState.error}
                                    msg={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name='groupId'
                            control={control}
                            render={({ field }) => (
                                <CopyableInput
                                    label='شناسه گروه'
                                    value={field.value}
                                    readOnly
                                />
                            )}
                        />
                        <Controller
                            name='groupRole'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='نقش گروه *'
                                    value={field.value || undefined}
                                    options={GROUP_ROLE_OPTIONS}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Controller
                            name='groupManager'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='مدیر گروه *'
                                    value={field.value || undefined}
                                    options={GROUP_MANAGER_OPTIONS}
                                    onChange={field.onChange}
                                />
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

                <SelectUsers />
            </form>
        </FormProvider>
    )
}

export default CreateNewGroup

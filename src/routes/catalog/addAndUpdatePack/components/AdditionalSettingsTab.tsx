'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import type { AddAndUpdatePackFormValues } from '../schema'

const AdditionalSettingsTab = () => {
    const { control } = useFormContext<AddAndUpdatePackFormValues>()

    return (
        <div className='flex flex-col gap-6'>
            <section>
                <h3 className='mb-4 text-title-sm font-bold text-on-surface'>
                    سئو
                </h3>
                <div className='grid grid-cols-2 gap-6'>
                    <Controller
                        control={control}
                        name='slug'
                        render={({ field }) => (
                            <Input
                                label='Slug'
                                placeholder='Slug'
                                value={field.value ?? ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name='meta_title'
                        render={({ field }) => (
                            <Input
                                label='Meta Title'
                                placeholder='Meta Title'
                                value={field.value ?? ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <div className='col-span-2 flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            Meta Description
                        </label>
                        <Controller
                            control={control}
                            name='meta_description'
                            render={({ field }) => (
                                <Textarea
                                    className='bg-surface-container-high min-h-32 rounded-container-lg border-0 resize-none px-3 py-2 text-on-surface placeholder:text-outline'
                                    placeholder=''
                                    value={field.value ?? ''}
                                    onChange={(event) =>
                                        field.onChange(event.target.value)
                                    }
                                />
                            )}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdditionalSettingsTab

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'
import { useCreateUnit, useListUnits } from '@/src/routes/settings/hooks/settings'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import type { BaseModalProps } from '../../types'

const addUnitSchema = z.object({
    code: z.string().trim().min(1, 'کد واحد الزامی است'),
    name: z.string().trim().min(1, 'نام واحد الزامی است'),
    factor: z.string().optional().or(z.literal('')),
    base_unit_id: z.string().optional().or(z.literal('')),
})

type AddUnitFormValues = z.infer<typeof addUnitSchema>

const AddUnit = ({ closeModal }: BaseModalProps) => {
    const { mutate: createUnit, isPending } = useCreateUnit()
    const { data: unitsPage } = useListUnits({
        page: 1,
        page_size: 100,
        is_base: true,
        is_active: true,
    })

    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm<AddUnitFormValues>({
        resolver: zodResolver(addUnitSchema),
        defaultValues: {
            code: '',
            name: '',
            factor: '',
            base_unit_id: '',
        },
        mode: 'onChange',
    })

    const baseUnitOptions = (unitsPage?.results ?? []).map((unit) => ({
        label: unit.name,
        value: unit.id,
    }))

    const onSubmit = (values: AddUnitFormValues) => {
        const factor =
            values.factor?.trim() !== ''
                ? Number(values.factor)
                : undefined

        createUnit(
            {
                code: values.code.trim(),
                name: values.name.trim(),
                factor:
                    factor !== undefined && Number.isFinite(factor)
                        ? factor
                        : undefined,
                base_unit_id: values.base_unit_id?.trim() || null,
            },
            {
                onSuccess: () => {
                    toast.success('واحد با موفقیت ثبت شد')
                    closeModal()
                },
                onError: () => {
                    toast.error('ثبت واحد انجام نشد')
                },
            }
        )
    }

    return (
        <form
            className='flex flex-col gap-4'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <Controller
                control={control}
                name='code'
                render={({ field, fieldState }) => (
                    <Input
                        label='کد واحد'
                        value={field.value}
                        onChange={field.onChange}
                        error={Boolean(fieldState.error)}
                        msg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='name'
                render={({ field, fieldState }) => (
                    <Input
                        label='نام واحد'
                        value={field.value}
                        onChange={field.onChange}
                        error={Boolean(fieldState.error)}
                        msg={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                control={control}
                name='factor'
                render={({ field }) => (
                    <Input
                        label='ضریب تبدیل'
                        type='number'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name='base_unit_id'
                render={({ field }) => (
                    <FormDropdown
                        label='واحد پایه'
                        options={baseUnitOptions}
                        value={field.value || undefined}
                        onChange={field.onChange}
                        placeholder='انتخاب واحد پایه'
                    />
                )}
            />

            <div className='flex justify-end gap-2 pt-2'>
                <Button
                    type='button'
                    variant='outline'
                    onClick={closeModal}
                    disabled={isPending}
                >
                    انصراف
                </Button>
                <Button
                    type='submit'
                    variant='primary'
                    disabled={!isValid || isPending}
                    isLoading={isPending}
                >
                    <Icon label='addSm400Broken' className='size-5!' />
                    ثبت واحد
                </Button>
            </div>
        </form>
    )
}

export default AddUnit

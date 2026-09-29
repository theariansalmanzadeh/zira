'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import {
    addAndEditPosDeviceSchema,
    getAddAndEditPosDeviceDefaultValues,
    type AddAndEditPosDeviceFormValues,
} from './schema'

const PosDeviceForm = ({ editId }: { editId: string | null }) => {
    const { back } = useRouter()
    const isEditing = Boolean(editId)

    const defaultValues = useMemo(
        () => getAddAndEditPosDeviceDefaultValues(editId),
        [editId]
    )

    const { control, handleSubmit } = useForm<AddAndEditPosDeviceFormValues>({
        resolver: zodResolver(addAndEditPosDeviceSchema),
        defaultValues,
        mode: 'onChange',
    })

    const onSubmit = () => {
        back()
    }

    return (
        <form
            id="add-edit-pos-device-form"
            className="flex w-full flex-col gap-4"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-row items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => back()}>
                    انصراف
                </Button>
                <Button type="submit" variant="primary">
                    {isEditing ? 'ذخیره تغییرات' : 'ثبت دستگاه'}
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-card-lg bg-surface-container-lowest p-6">
                <Controller
                    control={control}
                    name="index"
                    render={({ field, fieldState }) => (
                        <Input
                            label="ردیف *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="name"
                    render={({ field, fieldState }) => (
                        <Input
                            label="نام دستگاه *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="model"
                    render={({ field, fieldState }) => (
                        <Input
                            label="مدل دستگاه *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bank"
                    render={({ field, fieldState }) => (
                        <Input
                            label="بانک متصل *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bankAccount"
                    render={({ field, fieldState }) => (
                        <Input
                            label="حساب بانکی متصل *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terminalNumber"
                    render={({ field, fieldState }) => (
                        <Input
                            label="شماره پایانه *"
                            value={field.value}
                            onChange={field.onChange}
                            dir="ltr"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terminalPassword"
                    render={({ field, fieldState }) => (
                        <Input
                            label="رمز پایانه *"
                            value={field.value}
                            onChange={field.onChange}
                            dir="ltr"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="cashRegister"
                    render={({ field, fieldState }) => (
                        <Input
                            label="صندوق متصل *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
            </div>
        </form>
    )
}

const AddAndEditPosDevice = () => {
    const params = useParams<{ id?: string }>()
    const editId = params?.id ?? null

    return <PosDeviceForm key={editId ?? 'new'} editId={editId} />
}

export default AddAndEditPosDevice

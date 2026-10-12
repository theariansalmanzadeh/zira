'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useCreatePosDevice,
    useGetPosDevice,
    useUpdatePosDevice,
} from '@/src/routes/branches/hooks/organization'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    addAndEditPosDeviceSchema,
    ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES,
    getAddAndEditPosDeviceDefaultValues,
    type AddAndEditPosDeviceFormValues,
} from './schema'

const PosDeviceForm = ({ editId }: { editId: string | null }) => {
    const { back } = useRouter()
    const searchParams = useSearchParams()
    const branchId = searchParams.get('branchId') ?? ''
    const isEditing = Boolean(editId)
    const { data: device } = useGetPosDevice(editId ?? '', isEditing)
    const { mutate: updatePosDevice, isPending: isUpdating } = useUpdatePosDevice()
    const { mutate: createPosDevice, isPending: isCreating } = useCreatePosDevice()
    const isPending = isUpdating || isCreating
    const defaultValues = isEditing
        ? getAddAndEditPosDeviceDefaultValues(device)
        : ADD_AND_EDIT_POS_DEVICE_DEFAULT_VALUES

    const { control, handleSubmit } = useForm<AddAndEditPosDeviceFormValues>({
        resolver: zodResolver(addAndEditPosDeviceSchema),
        defaultValues,
        values: isEditing && device ? defaultValues : undefined,
        mode: 'onChange',
    })

    const onSubmit = (values: AddAndEditPosDeviceFormValues) => {
        if (editId) {
            updatePosDevice(
                {
                    posDeviceId: editId,
                    body: {
                        title: values.title,
                        bank_account_id: values.bank_account_id || null,
                        is_active: values.is_active,
                    },
                },
                {
                    onSuccess: () => {
                        toast.success('دستگاه کارت‌خوان به‌روز شد')
                        back()
                    },
                    onError: () => {
                        toast.error('به‌روزرسانی دستگاه انجام نشد')
                    },
                }
            )
            return
        }

        if (!branchId || !values.terminal_no.trim()) {
            toast.error('شعبه و شماره پایانه الزامی است')
            return
        }

        createPosDevice(
            {
                branch_id: branchId,
                terminal_no: values.terminal_no.trim(),
                title: values.title,
                bank_account_id: values.bank_account_id || null,
                is_active: values.is_active,
            },
            {
                onSuccess: () => {
                    toast.success('دستگاه کارت‌خوان ثبت شد')
                    back()
                },
                onError: () => {
                    toast.error('ثبت دستگاه انجام نشد')
                },
            }
        )
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
                <Button type="submit" variant="primary" disabled={isPending}>
                    {isEditing ? 'ذخیره تغییرات' : 'ثبت دستگاه'}
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-card-lg bg-surface-container-lowest p-6">
                <Controller
                    control={control}
                    name="title"
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
                {!isEditing && (
                    <Controller
                        control={control}
                        name="terminal_no"
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
                )}
                <Controller
                    control={control}
                    name="bank_account_id"
                    render={({ field, fieldState }) => (
                        <Input
                            label="شناسه حساب بانکی"
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
                    name="is_active"
                    render={({ field }) => (
                        <label className="flex items-center justify-between gap-3 rounded-card-md border border-outline-variant px-4 py-3">
                            <span className="text-label-md text-on-surface">فعال</span>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </label>
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

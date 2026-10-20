'use client'

import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
    useCreateWarehouse,
    useGetWarehouse,
    useListBranchEmployees,
    useUpdateWarehouse,
} from '@/src/routes/branches/hooks/organization'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import {
    addAndEditInventorySchema,
    ADD_AND_EDIT_INVENTORY_DEFAULT_VALUES,
    getAddAndEditInventoryDefaultValues,
    INSURANCE_STATUS_OPTIONS,
    type AddAndEditInventoryFormValues,
} from './schema'

const InventoryForm = ({
    id,
    branchId,
}: {
    id: string | null
    branchId: string
}) => {
    const { back } = useRouter()
    const isEditing = Boolean(id)
    const { data: warehouse } = useGetWarehouse(id ?? '', isEditing)
    const { data: employeesPage } = useListBranchEmployees(branchId)
    const employees = employeesPage?.results ?? []
    const { mutate: updateWarehouse, isPending: isUpdating } =
        useUpdateWarehouse()
    const { mutate: createWarehouse, isPending: isCreating } =
        useCreateWarehouse()
    const isPending = isUpdating || isCreating
    const defaultValues = isEditing
        ? getAddAndEditInventoryDefaultValues(warehouse)
        : ADD_AND_EDIT_INVENTORY_DEFAULT_VALUES
    const keeperOptions = employees.map((employee) => ({
        label:
            employee.full_name?.trim() ||
            employee.position?.trim() ||
            employee.user_id,
        value: employee.user_id,
    }))

    const { control, handleSubmit } = useForm<AddAndEditInventoryFormValues>({
        resolver: zodResolver(addAndEditInventorySchema),
        defaultValues,
        values: isEditing && warehouse ? defaultValues : undefined,
        mode: 'onChange',
    })

    const onSubmit = (values: AddAndEditInventoryFormValues) => {
        const body = {
            name: values.name.trim(),
            address: values.address.trim(),
            phone: values.phone.trim(),
            area_sqm: values.area_sqm,
            keeper_id: values.keeper_id,
            insurance_status: values.insurance_status,
            is_active: values.is_active,
        }

        if (id) {
            updateWarehouse(
                { warehouseId: id, body },
                {
                    onSuccess: () => {
                        toast.success('انبار به‌روز شد')
                        back()
                    },
                    onError: () => {
                        toast.error('به‌روزرسانی انبار انجام نشد')
                    },
                }
            )
            return
        }

        createWarehouse(
            {
                code: values.code.trim(),
                ...body,
            },
            {
                onSuccess: () => {
                    toast.success('انبار ثبت شد')
                    back()
                },
                onError: () => {
                    toast.error('ثبت انبار انجام نشد')
                },
            }
        )
    }

    return (
        <form
            id="add-edit-inventory-form"
            className="flex w-full flex-col gap-4"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="flex flex-row items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => back()}>
                    انصراف
                </Button>
                <Button type="submit" variant="primary" disabled={isPending}>
                    {isEditing ? 'ذخیره تغییرات' : 'ثبت انبار'}
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-card-lg bg-surface-container-lowest p-6">
                <Controller
                    control={control}
                    name="code"
                    render={({ field, fieldState }) => (
                        <Input
                            label="کد انبار *"
                            value={field.value}
                            onChange={field.onChange}
                            disabled={isEditing}
                            dir="ltr"
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
                            label="نام انبار *"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="address"
                    render={({ field, fieldState }) => (
                        <Input
                            label="آدرس"
                            value={field.value}
                            onChange={field.onChange}
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="phone"
                    render={({ field, fieldState }) => (
                        <Input
                            label="تلفن"
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
                    name="area_sqm"
                    render={({ field, fieldState }) => (
                        <Input
                            label="متراژ (متر مربع)"
                            value={String(field.value ?? '')}
                            onChange={(value) => {
                                const next = Number(value)
                                field.onChange(Number.isFinite(next) ? next : 0)
                            }}
                            type="number"
                            dir="ltr"
                            error={Boolean(fieldState.error)}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="keeper_id"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <FormDropdown
                                label="انباردار *"
                                value={field.value}
                                onChange={field.onChange}
                                options={keeperOptions}
                            />
                            {fieldState.error?.message && (
                                <span className="text-label-sm text-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="insurance_status"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-col gap-1">
                            <FormDropdown
                                label="وضعیت بیمه *"
                                value={field.value}
                                onChange={field.onChange}
                                options={INSURANCE_STATUS_OPTIONS}
                            />
                            {fieldState.error?.message && (
                                <span className="text-label-sm text-error">
                                    {fieldState.error.message}
                                </span>
                            )}
                        </div>
                    )}
                />
                <Controller
                    control={control}
                    name="is_active"
                    render={({ field }) => (
                        <label className="flex items-center justify-between gap-3 rounded-card-md border border-outline-variant px-4 py-3">
                            <span className="text-label-md text-on-surface">
                                فعال
                            </span>
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

type AddAndEditInvenotryProps = {
    id?: string
}

const AddAndEditInvenotry = ({ id }: AddAndEditInvenotryProps) => {
    const params = useParams<{ id: string; warehouseId?: string }>()
    const warehouseId = id ?? params.warehouseId ?? null
    const branchId = params.id ?? ''

    return (
        <InventoryForm
            key={warehouseId ?? 'new'}
            id={warehouseId}
            branchId={branchId}
        />
    )
}

export default AddAndEditInvenotry

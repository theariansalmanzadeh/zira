'use client'

import type { ReactNode } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import { Switch } from '@/src/shared/components/ui/Switch'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Button } from '@/src/shared/components/ui/button'
import {
    CITY_OPTIONS,
    DEFINE_INVENTORY_FIELDS,
    INSURANCE_STATUS_OPTIONS,
    INVENTORY_MANAGER_OPTIONS,
    PHONE_PLACEHOLDER,
    PROVINCE_OPTIONS,
    type DefineInventoryFormValues,
} from '../schema'

type DefineInventoryProps = {
    onContinue: VoidFunction
}

type FormSectionProps = {
    title: string
    children: ReactNode
}

const FormSection = ({ title, children }: FormSectionProps) => (
    <div className="flex flex-col gap-3">
        <span className="text-label-lg text-outline">{title}</span>
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="grid grid-cols-2 gap-6">{children}</div>
        </div>
    </div>
)

const DefineInventory = ({ onContinue }: DefineInventoryProps) => {
    const {
        control,
        trigger,
        handleSubmit,
        formState: { errors },
    } = useForm<DefineInventoryFormValues>()

    const handleContinue = async () => {
        const isValid = await trigger([...DEFINE_INVENTORY_FIELDS])
        if (isValid) {
            onContinue()
        }
    }

    return (
        <form onSubmit={handleSubmit(onContinue)} className="flex flex-col gap-6">
            <FormSection title="عمومی">
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نام انبار *"
                            placeholder="مثلا: انبار مرکزی"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.name}
                            msg={errors.name?.message}
                        />
                    )}
                />
                <Controller
                    name="code"
                    control={control}
                    render={({ field }) => (
                        <CopyableInput
                            label="کد انبار"
                            value={field.value}
                            placeholder="WR-1005"
                            readOnly={false}
                            onChange={(event) => field.onChange(event.target.value)}
                            groupClassName="bg-surface-container-high h-12 rounded-container-lg border-0"
                        />
                    )}
                />
                <Controller
                    name="managerId"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="مسئول انبار *"
                            placeholder="انتخاب"
                            value={field.value || undefined}
                            options={INVENTORY_MANAGER_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                        <CalendarButton
                            label="تاریخ شروع فعالیت"
                            placeholder=""
                            value={field.value ? new Date(field.value) : undefined}
                            onChange={(date) =>
                                field.onChange(date ? date.toISOString() : '')
                            }
                        />
                    )}
                />
                <Controller
                    name="area"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="متراژ (متر مربع)"
                            placeholder="مثلا: 450"
                            inputMode="numeric"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.area}
                            msg={errors.area?.message}
                        />
                    )}
                />
                <Controller
                    name="insuranceStatus"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="وضعیت بیمه *"
                            placeholder="انتخاب"
                            value={field.value || undefined}
                            options={INSURANCE_STATUS_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                        <div className="col-span-2 flex items-center gap-2">
                            <span className="text-label-lg text-on-surface">فعال</span>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </div>
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <div className="col-span-2 flex flex-col">
                            <label className="mb-1.5 text-label-md text-on-surface-variant">
                                توضیحات
                            </label>
                            <Textarea
                                className="min-h-32 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </div>
                    )}
                />
            </FormSection>

            <FormSection title="نشانی">
                <Controller
                    name="province"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="استان *"
                            placeholder="انتخاب"
                            value={field.value || undefined}
                            options={PROVINCE_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="شهر *"
                            placeholder="انتخاب"
                            value={field.value || undefined}
                            options={CITY_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <div className="col-span-2">
                    <Controller
                        name="fullAddress"
                        control={control}
                        render={({ field }) => (
                            <Input
                                label="آدرس کامل *"
                                placeholder="آدرس دقیق انبار"
                                value={field.value}
                                onChange={field.onChange}
                                error={!!errors.fullAddress}
                                msg={errors.fullAddress?.message}
                            />
                        )}
                    />
                </div>
                <Controller
                    name="plaque"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="پلاک"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.plaque}
                            msg={errors.plaque?.message}
                        />
                    )}
                />
                <Controller
                    name="unit"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="واحد"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.unit}
                            msg={errors.unit?.message}
                        />
                    )}
                />
                <Controller
                    name="postalCode"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="کد پستی *"
                            inputMode="numeric"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.postalCode}
                            msg={errors.postalCode?.message}
                        />
                    )}
                />
                <Controller
                    name="landlinePhone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="تلفن ثابت"
                            placeholder={PHONE_PLACEHOLDER}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.landlinePhone}
                            msg={errors.landlinePhone?.message}
                        />
                    )}
                />
            </FormSection>

            <Button
                type="button"
                variant="primary"
                size="lg"
                className="w-full text-label-lg"
                onClick={handleContinue}
            >
                ادامه
            </Button>
        </form>
    )
}

export default DefineInventory

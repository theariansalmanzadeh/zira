'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Controller, useFormContext } from 'react-hook-form'
import {
    CITY_OPTIONS,
    PHONE_PLACEHOLDER,
    PROVINCE_OPTIONS,
} from '../constants'
import { ADDRESS_FIELDS, type NewUserFormValues } from '../schema'

type FormSectionProps = {
    title: string
    children: React.ReactNode
}

const FormSection = ({ title, children }: FormSectionProps) => (
    <div className="flex flex-col gap-3">
        <span className="text-label-lg text-on-surface">{title}</span>
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="grid grid-cols-2 gap-6">{children}</div>
        </div>
    </div>
)

type AddressFormProps = {
    onContinue?: () => void
    onBack?: () => void
}

const AddressForm = ({ onContinue, onBack }: AddressFormProps) => {
    const {
        control,
        trigger,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()

    const handleContinue = async () => {
        const isValid = await trigger([...ADDRESS_FIELDS])
        if (isValid) {
            onContinue?.()
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <FormSection title="نشانی">
                <Controller
                    name="province"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="استان *"
                            value={field.value}
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
                            value={field.value}
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
                            value={field.value}
                            onChange={field.onChange}
                            inputMode="numeric"
                            error={!!errors.postalCode}
                            msg={errors.postalCode?.message}
                        />
                    )}
                />
                <Controller
                    name="addressEmail"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="ایمیل"
                            type="email"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.addressEmail}
                            msg={errors.addressEmail?.message}
                        />
                    )}
                />
                <Controller
                    name="mobilePhone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="تلفن همراه"
                            placeholder={PHONE_PLACEHOLDER}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.mobilePhone}
                            msg={errors.mobilePhone?.message}
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

            {onContinue ? (
                <div className="flex flex-row-reverse gap-3">
                    <Button
                        type="button"
                        variant="primary"
                        size="lg"
                        className="w-full text-label-lg"
                        onClick={handleContinue}
                    >
                        ادامه
                    </Button>
                    {onBack ? (
                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="text-label-lg"
                            onClick={onBack}
                        >
                            بازگشت
                        </Button>
                    ) : null}
                </div>
            ) : null}
        </div>
    )
}

export default AddressForm

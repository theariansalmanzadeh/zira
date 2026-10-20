'use client'

import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import { Controller, useFormContext } from 'react-hook-form'
import { PHONE_PLACEHOLDER } from '../constants'
import { EMERGENCY_FIELDS, type NewUserFormValues } from '../schema'

type ContactSectionProps = {
    title: string
    children: React.ReactNode
}

const ContactSection = ({ title, children }: ContactSectionProps) => (
    <div className="flex flex-col gap-3">
        <span className="text-label-lg text-on-surface">{title}</span>
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            <div className="grid grid-cols-2 gap-6">{children}</div>
        </div>
    </div>
)

type EmergencyFormProps = {
    onContinue?: () => void
    onBack?: () => void
}

const EmergencyForm = ({ onContinue, onBack }: EmergencyFormProps) => {
    const {
        control,
        trigger,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()

    const handleContinue = async () => {
        const isValid = await trigger([...EMERGENCY_FIELDS])
        if (isValid) {
            onContinue?.()
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <span className="text-label-lg text-on-surface">مخاطبان ضروری</span>

            <ContactSection title="مخاطب ضروری ۱">
                <Controller
                    name="contact1FirstName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نام *"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact1FirstName}
                            msg={errors.contact1FirstName?.message}
                        />
                    )}
                />
                <Controller
                    name="contact1LastName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نام خانوادگی *"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact1LastName}
                            msg={errors.contact1LastName?.message}
                        />
                    )}
                />
                <Controller
                    name="contact1Landline"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="تلفن ثابت"
                            placeholder={PHONE_PLACEHOLDER}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.contact1Landline}
                            msg={errors.contact1Landline?.message}
                        />
                    )}
                />
                <Controller
                    name="contact1Mobile"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="تلفن همراه *"
                            placeholder={PHONE_PLACEHOLDER}
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact1Mobile}
                            msg={errors.contact1Mobile?.message}
                        />
                    )}
                />
                <Controller
                    name="contact1Relation"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نسبت *"
                            placeholder="مثلاً همسر"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact1Relation}
                            msg={errors.contact1Relation?.message}
                        />
                    )}
                />
            </ContactSection>

            <ContactSection title="مخاطب ضروری ۲">
                <Controller
                    name="contact2FirstName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نام *"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact2FirstName}
                            msg={errors.contact2FirstName?.message}
                        />
                    )}
                />
                <Controller
                    name="contact2LastName"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نام خانوادگی *"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact2LastName}
                            msg={errors.contact2LastName?.message}
                        />
                    )}
                />
                <Controller
                    name="contact2Landline"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="تلفن ثابت"
                            placeholder={PHONE_PLACEHOLDER}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={!!errors.contact2Landline}
                            msg={errors.contact2Landline?.message}
                        />
                    )}
                />
                <Controller
                    name="contact2Mobile"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="تلفن همراه *"
                            placeholder={PHONE_PLACEHOLDER}
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact2Mobile}
                            msg={errors.contact2Mobile?.message}
                        />
                    )}
                />
                <Controller
                    name="contact2Relation"
                    control={control}
                    render={({ field }) => (
                        <Input
                            label="نسبت *"
                            placeholder="مثلاً برادر"
                            value={field.value}
                            onChange={field.onChange}
                            error={!!errors.contact2Relation}
                            msg={errors.contact2Relation?.message}
                        />
                    )}
                />
            </ContactSection>

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

export default EmergencyForm

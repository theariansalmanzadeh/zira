'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Button } from '@/src/shared/components/ui/button'
import { Spinner } from '@/src/shared/components/ui/spinner'
import {
    useGetSecurityPolicy,
    useUpdateSecurityPolicy,
} from '@/src/routes/events/hooks/security'
import {
    IP_RESTRICTION_MODE_OPTIONS,
    SECURITY_POLICY_DEFAULT_VALUES,
    securityPolicySchema,
    toSecurityPolicyFormValues,
    toSecurityPolicyUpdate,
    type SecurityPolicyFormValues,
} from './schema'

type NumericFieldName = Exclude<
    keyof SecurityPolicyFormValues,
    | 'require_digit'
    | 'require_symbol'
    | 'require_uppercase'
    | 'min_browser_versions'
    | 'ip_restriction_mode'
>

const NUMERIC_FIELDS: {
    name: NumericFieldName
    label: string
}[] = [
    { name: 'password_min_length', label: 'حداقل طول رمز عبور' },
    { name: 'password_expiry_days', label: 'مهلت انقضای رمز عبور (روز)' },
    { name: 'password_history_depth', label: 'عمق تاریخچه رمز عبور' },
    { name: 'max_login_attempts', label: 'حداکثر تلاش ورود' },
    { name: 'auto_lock_after_attempts', label: 'قفل خودکار پس از تلاش' },
    { name: 'auto_lock_minutes', label: 'مدت قفل خودکار (دقیقه)' },
    { name: 'default_max_sessions', label: 'حداکثر نشست‌های پیش‌فرض' },
    {
        name: 'default_idle_timeout_minutes',
        label: 'مهلت بی‌فعالیتی (دقیقه)',
    },
]

const BOOLEAN_FIELDS: {
    name: 'require_digit' | 'require_symbol' | 'require_uppercase'
    label: string
    description: string
}[] = [
    {
        name: 'require_digit',
        label: 'نیاز به رقم',
        description: 'رمز عبور باید حداقل یک رقم داشته باشد.',
    },
    {
        name: 'require_symbol',
        label: 'نیاز به نماد',
        description: 'رمز عبور باید حداقل یک نماد داشته باشد.',
    },
    {
        name: 'require_uppercase',
        label: 'نیاز به حرف بزرگ',
        description: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد.',
    },
]

const Security = () => {
    const { data: policy, isPending: isLoadingPolicy } = useGetSecurityPolicy()
    const { mutate: updatePolicy, isPending: isUpdating } =
        useUpdateSecurityPolicy()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<SecurityPolicyFormValues>({
        resolver: zodResolver(securityPolicySchema),
        defaultValues: SECURITY_POLICY_DEFAULT_VALUES,
        mode: 'onSubmit',
    })

    useEffect(() => {
        if (!policy) return
        reset(toSecurityPolicyFormValues(policy))
    }, [policy, reset])

    const onSubmit = (values: SecurityPolicyFormValues) => {
        updatePolicy(toSecurityPolicyUpdate(values), {
            onSuccess: (data) => {
                reset(toSecurityPolicyFormValues(data))
            },
        })
    }

    if (isLoadingPolicy) {
        return (
            <div className="flex justify-center py-16">
                <Spinner className="size-6" />
            </div>
        )
    }

    return (
        <form
            className="flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-6"
            dir="rtl"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="grid grid-cols-2 gap-4">
                {NUMERIC_FIELDS.map((field) => (
                    <Controller
                        key={field.name}
                        name={field.name}
                        control={control}
                        render={({ field: formField }) => (
                            <Input
                                label={field.label}
                                type="text"
                                inputMode="numeric"
                                value={String(formField.value ?? '')}
                                onChange={formField.onChange}
                                error={!!errors[field.name]}
                                msg={errors[field.name]?.message as string | undefined}
                            />
                        )}
                    />
                ))}

                <Controller
                    name="ip_restriction_mode"
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label="حالت محدودیت IP"
                            value={field.value}
                            options={[...IP_RESTRICTION_MODE_OPTIONS]}
                            onChange={field.onChange}
                        />
                    )}
                />

                <div className="col-span-2 flex flex-col gap-3">
                    {BOOLEAN_FIELDS.map((field) => (
                        <div
                            key={field.name}
                            className="flex items-center justify-between gap-4 rounded-card-md border border-outline-variant px-4 py-3"
                        >
                            <div className="flex flex-col gap-1">
                                <span className="text-label-lg font-semibold text-on-surface">
                                    {field.label}
                                </span>
                                <span className="text-label-md text-outline">
                                    {field.description}
                                </span>
                            </div>
                            <Controller
                                name={field.name}
                                control={control}
                                render={({ field: formField }) => (
                                    <Switch
                                        checked={formField.value}
                                        onCheckedChange={formField.onChange}
                                    />
                                )}
                            />
                        </div>
                    ))}
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                    <span className="text-label-md text-on-surface-variant">
                        حداقل نسخه مرورگرها (JSON)
                    </span>
                    <Controller
                        name="min_browser_versions"
                        control={control}
                        render={({ field }) => (
                            <Textarea
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                rows={5}
                                placeholder='{"chrome": {"min": "120"}}'
                            />
                        )}
                    />
                    {errors.min_browser_versions?.message ? (
                        <span className="text-label-sm text-error">
                            {errors.min_browser_versions.message}
                        </span>
                    ) : null}
                </div>
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    variant="primary"
                    disabled={!isDirty || isUpdating}
                    isLoading={isUpdating}
                >
                    ذخیره تغییرات
                </Button>
            </div>
        </form>
    )
}

export default Security

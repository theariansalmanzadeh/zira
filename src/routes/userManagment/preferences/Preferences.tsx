'use client'

import { useState } from 'react'
import { User } from 'lucide-react'
import { toast } from 'sonner'

import { Spinner } from '@/src/shared/components/ui/spinner'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import { cn } from '@/src/shared/libs/utils'
import {
    useChangeMyPassword,
    useGetStaffNotificationPreferences,
    useGetStaffProfile,
    useUpdateStaffNotificationPreferences,
} from '@/src/routes/userManagment/hooks/me'

type PreferencesTab = 'account' | 'notifications'

const Preferences = () => {
    const [tab, setTab] = useState<PreferencesTab>('account')

    return (
        <div className='flex flex-col gap-6'>
            <ToggleGroup
                type='single'
                value={tab}
                onValueChange={(value) => {
                    if (value === 'account' || value === 'notifications') {
                        setTab(value)
                    }
                }}
                className='justify-start'
            >
                <ToggleGroupItem value='account' className='rounded-full px-4'>
                    حساب
                </ToggleGroupItem>
                <ToggleGroupItem
                    value='notifications'
                    className='rounded-full px-4'
                >
                    اعلان‌ها
                </ToggleGroupItem>
            </ToggleGroup>

            {tab === 'account' ? <AccountTab /> : <NotificationsTab />}
        </div>
    )
}

const AccountTab = () => {
    const { data: profile, isLoading } = useGetStaffProfile()
    const { mutate, isPending } = useChangeMyPassword()
    const [isEditingPassword, setIsEditingPassword] = useState(false)
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const submitPassword = () => {
        mutate(
            {
                old_password: oldPassword,
                new_password: newPassword,
            },
            {
                onSuccess: () => {
                    toast.success('رمز عبور تغییر کرد')
                    setOldPassword('')
                    setNewPassword('')
                    setIsEditingPassword(false)
                },
                onError: () => {
                    toast.error('تغییر رمز عبور انجام نشد')
                },
            }
        )
    }

    if (isLoading) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6 text-on-surface' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3 w-full sm:max-w-[600px] mx-auto'>
            <p className='text-body-sm text-on-surface-variant'>اطلاعات حساب</p>
            <div className='flex flex-col gap-6 rounded-2xl bg-surface-container-lowest p-6'>
                <div className='flex flex-col items-center gap-3'>
                    <span className='flex size-16 items-center justify-center rounded-full bg-surface-container'>
                        <User className='size-8 text-outline' />
                    </span>
                </div>

                <InfoRow label='نام کامل' value={profile?.username || '-'} />
                <InfoRow label='ایمیل' value={profile?.email || '-'} />
                <InfoRow
                    label='شماره تلفن'
                    value={profile?.phone_number || '-'}
                    actionLabel={profile?.phone_number ? 'ویرایش' : '+ افزودن'}
                />

                <div className='flex items-center justify-between gap-4'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-body-sm text-on-surface-variant'>
                            رمز عبور
                        </span>
                        {isEditingPassword ? (
                            <div className='flex flex-col gap-2'>
                                <Input
                                    type='password'
                                    label='رمز فعلی'
                                    value={oldPassword}
                                    onChange={setOldPassword}
                                />
                                <Input
                                    type='password'
                                    label='رمز جدید'
                                    value={newPassword}
                                    onChange={setNewPassword}
                                />
                            </div>
                        ) : (
                            <button
                                type='button'
                                onClick={() => setIsEditingPassword(true)}
                                className='w-fit'
                            >
                                <span className='text-title-md tracking-[0.3em] text-on-surface'>
                                    ••••••••
                                </span>
                            </button>
                        )}
                    </div>
                    {isEditingPassword ? (
                        <Button
                            type='button'
                            variant='outline'
                            className='rounded-full'
                            disabled={isPending || !oldPassword || !newPassword}
                            onClick={submitPassword}
                        >
                            {isPending ? <Spinner className='size-4' /> : 'ذخیره'}
                        </Button>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

const InfoRow = ({
    label,
    value,
    canEdit = false,
    actionLabel = 'ویرایش',
}: {
    label: string
    value: string
    canEdit?: boolean
    actionLabel?: string
}) => {
    return (
        <div className='flex items-center justify-between gap-4'>
            <div className='flex flex-col gap-1'>
                <span className='text-body-sm text-on-surface-variant'>{label}</span>
                <span className='text-title-sm text-on-surface'>{value}</span>
            </div>
            {canEdit ? (<Button type='button' variant='outline' className='rounded-full'>
                {actionLabel}
            </Button>) : null}
        </div>
    )
}

const NotificationsTab = () => {
    const { data, isLoading } = useGetStaffNotificationPreferences()
    const { mutate, isPending } = useUpdateStaffNotificationPreferences()

    const updatePreference = (
        topic: string,
        patch: { sms_enabled?: boolean; in_app_enabled?: boolean }
    ) => {
        const next = (data ?? []).map((item) =>
            item.topic === topic ? { ...item, ...patch } : item
        )
        mutate(
            next.map((item) => ({
                topic: item.topic,
                sms_enabled: item.sms_enabled,
                in_app_enabled: item.in_app_enabled,
            }))
        )
    }

    if (isLoading) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-3 rounded-2xl bg-surface-container-lowest p-6'>
            {(data ?? []).map((item) => (
                <div
                    key={item.topic}
                    className='flex items-center justify-between gap-4 border-b border-outline-variant py-3 last:border-b-0'
                >
                    <span className='text-title-sm text-on-surface'>{item.topic}</span>
                    <div className='flex items-center gap-6'>
                        <label className='flex items-center gap-2 text-body-sm text-on-surface-variant'>
                            پیامک
                            <Switch
                                checked={item.sms_enabled}
                                disabled={isPending}
                                onCheckedChange={(checked) =>
                                    updatePreference(item.topic, {
                                        sms_enabled: checked,
                                    })
                                }
                            />
                        </label>
                        <label
                            className={cn(
                                'flex items-center gap-2 text-body-sm text-on-surface-variant'
                            )}
                        >
                            درون‌برنامه
                            <Switch
                                checked={item.in_app_enabled}
                                disabled={isPending}
                                onCheckedChange={(checked) =>
                                    updatePreference(item.topic, {
                                        in_app_enabled: checked,
                                    })
                                }
                            />
                        </label>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Preferences

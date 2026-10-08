'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    BRANCH_OPTIONS,
    DEPARTMENT_OPTIONS,
    MANAGER_OPTIONS,
} from '../constants'
import { OCCUPATION_INFO_FIELDS, type NewUserFormValues } from '../schema'

type OccupationInfoProps = {
    onContinue?: () => void
}

const OccupationInfo = ({ onContinue }: OccupationInfoProps) => {
    const {
        control,
        setValue,
        trigger,
        formState: { errors },
    } = useFormContext<NewUserFormValues>()

    const destinationBranch = useWatch({
        control,
        name: 'destinationBranch',
    })
    const assignedBranch = useWatch({
        control,
        name: 'assignedBranch',
    })

    const assignedBranchLabel =
        BRANCH_OPTIONS.find((option) => option.value === assignedBranch)
            ?.label ?? null

    const handleAssignBranch = () => {
        if (!destinationBranch) return
        setValue('assignedBranch', destinationBranch, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    const handleContinue = async () => {
        const isValid = await trigger([...OCCUPATION_INFO_FIELDS])
        if (isValid) {
            onContinue?.()
        }
    }

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='flex flex-col gap-3'>
                <span className='text-label-lg text-on-surface'>
                    اطلاعات شغلی
                </span>
                <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6'>
                    <p className='text-label-md text-outline'>
                        گزینه‌های بخش، شعبه و مدیر مستقیم از بخش «تنظیمات»
                        خوانده می‌شوند.
                    </p>

                    <div className='grid grid-cols-2 gap-6'>
                        <Controller
                            name='activityDepartment'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='بخش محل فعالیت *'
                                    value={field.value || undefined}
                                    options={DEPARTMENT_OPTIONS}
                                    onChange={field.onChange}
                                    placeholder='انتخاب بخش'
                                />
                            )}
                        />
                        <Controller
                            name='directManager'
                            control={control}
                            render={({ field }) => (
                                <FormDropdown
                                    label='مدیر مستقیم *'
                                    value={field.value || undefined}
                                    options={MANAGER_OPTIONS}
                                    onChange={field.onChange}
                                    placeholder='انتخاب مدیر'
                                />
                            )}
                        />
                        <div className='col-span-2'>
                            <Controller
                                name='jobTitle'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        label='عنوان شغلی *'
                                        placeholder='مثلاً کارشناس فروش'
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={!!errors.jobTitle}
                                        msg={errors.jobTitle?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 rounded-card-md border border-outline-variant p-4'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-label-lg font-semibold text-on-surface'>
                                تخصیص شعبه
                            </span>
                            <span className='text-label-md text-outline'>
                                هر کاربر تنها عضو یک شعبه است؛ تخصیص جدید جایگزین
                                شعبه فعلی می‌شود.
                            </span>
                        </div>

                        <div className='flex flex-row flex-wrap items-center gap-2 text-label-md text-on-surface-variant'>
                            <span>شعبه فعلی:</span>
                            <span className='rounded-full bg-surface-container-high px-2.5 py-0.5 text-label-sm text-on-surface-variant'>
                                {assignedBranchLabel || 'تخصیص داده نشده'}
                            </span>
                        </div>

                        <div className='grid grid-cols-[1fr_auto] items-end gap-3'>
                            <Controller
                                name='destinationBranch'
                                control={control}
                                render={({ field }) => (
                                    <FormDropdown
                                        label='شعبه مقصد'
                                        value={field.value || undefined}
                                        options={BRANCH_OPTIONS}
                                        onChange={field.onChange}
                                        placeholder='انتخاب شعبه'
                                    />
                                )}
                            />
                            <Button
                                type='button'
                                variant='default-high'
                                className='h-10 shrink-0'
                                onClick={handleAssignBranch}
                                disabled={!destinationBranch}
                            >
                                <Icon
                                    label='store400Linear'
                                    className='size-5!'
                                />
                                تخصیص به شعبه
                            </Button>
                        </div>
                    </div>

                    <div className='flex flex-row items-center justify-between gap-4 rounded-card-md border border-outline-variant px-4 py-3'>
                        <div className='flex flex-col gap-1'>
                            <span className='text-label-lg font-semibold text-on-surface'>
                                قرارداد فروش درصدی
                            </span>
                            <span className='text-label-md text-outline'>
                                با فعال‌سازی، امکان تعیین درصد پورسانت فروش فراهم
                                می‌شود.
                            </span>
                        </div>
                        <Controller
                            name='hasPercentageSalesContract'
                            control={control}
                            render={({ field }) => (
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {onContinue ? (
                <Button
                    type='button'
                    variant='primary'
                    size='lg'
                    className='w-full text-label-lg'
                    onClick={handleContinue}
                >
                    ادامه
                </Button>
            ) : null}
        </div>
    )
}

export default OccupationInfo

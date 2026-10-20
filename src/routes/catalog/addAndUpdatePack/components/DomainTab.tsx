'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Checkbox } from '@/src/shared/components/ui/Checkbox'
import SelectItem from '@/src/shared/components/ui/SelectItem'
import { Switch } from '@/src/shared/components/ui/Switch'
import { cn } from '@/src/shared/libs/utils'
import type { IconLabel } from '@/src/shared/types/icon'
import type { AddAndUpdatePackFormValues } from '../schema'

const CUSTOMER_GROUPS = [
    { id: 'gold', label: 'مشتریان طلایی' },
    { id: 'silver', label: 'مشتریان نقره‌ای' },
    { id: 'wholesale', label: 'همکاران عمده' },
    { id: 'new', label: 'مشتریان جدید' },
]

const AUDIENCE_OPTIONS: {
    value: 'ALL' | 'GROUPS'
    title: string
    description: string
    icon: IconLabel
}[] = [
    {
        value: 'ALL',
        title: 'نمایش به همه مشتریان',
        description: 'همه کاربران این آیتم را می‌بینند',
        icon: 'public400Linear',
    },
    {
        value: 'GROUPS',
        title: 'نمایش به گروهی از مشتریان',
        description: 'فقط گروه‌های انتخابی',
        icon: 'groups',
    },
]

const SectionTitle = ({ title }: { title: string }) => (
    <div className='flex items-center gap-2'>
        <span className='h-5 w-1 shrink-0 rounded-full bg-error' />
        <span className='text-title-md font-bold text-on-surface'>{title}</span>
    </div>
)

const DomainTab = () => {
    const { control, setValue, formState } =
        useFormContext<AddAndUpdatePackFormValues>()
    const audience = useWatch({ control, name: 'audience' })
    const groupIds = useWatch({ control, name: 'group_ids' }) ?? []
    const groupsDisabled = audience === 'ALL'

    const toggleGroup = (id: string, checked: boolean) => {
        const next = checked
            ? [...groupIds, id]
            : groupIds.filter((groupId) => groupId !== id)
        setValue('group_ids', next, { shouldDirty: true, shouldValidate: true })
    }

    return (
        <div className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'>
            <SectionTitle title='دامنه نمایش' />

            <Controller
                control={control}
                name='audience'
                render={({ field }) => (
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        {AUDIENCE_OPTIONS.map((option) => (
                            <SelectItem
                                key={option.value}
                                title={option.title}
                                description={option.description}
                                icon={option.icon}
                                selected={field.value === option.value}
                                onClick={() => {
                                    field.onChange(option.value)
                                    if (option.value === 'ALL') {
                                        setValue('group_ids', [], {
                                            shouldDirty: true,
                                        })
                                    }
                                }}
                            />
                        ))}
                    </div>
                )}
            />

            <div className='flex flex-col gap-3'>
                <span className='text-label-lg text-on-surface'>گروه مشتریان</span>
                <div className='flex flex-row flex-wrap gap-3'>
                    {CUSTOMER_GROUPS.map((group) => (
                        <label
                            key={group.id}
                            className={cn(
                                'flex items-center gap-2 rounded-full border border-outline-variant px-3 py-2',
                                groupsDisabled
                                    ? 'cursor-not-allowed opacity-50'
                                    : 'cursor-pointer'
                            )}
                        >
                            <span className='text-label-md text-on-surface-variant'>
                                {group.label}
                            </span>
                            <Checkbox
                                variant='default-outline'
                                checked={groupIds.includes(group.id)}
                                disabled={groupsDisabled}
                                onCheckedChange={(checked) =>
                                    toggleGroup(group.id, checked === true)
                                }
                            />
                        </label>
                    ))}
                </div>
                {formState.errors.group_ids ? (
                    <span className='text-label-sm text-error'>
                        {formState.errors.group_ids.message}
                    </span>
                ) : (
                    <span className='text-label-sm text-outline'>
                        در صورت انتخاب «گروهی از مشتریان» تکمیل شود
                    </span>
                )}
            </div>

            <Controller
                control={control}
                name='show_in_public'
                render={({ field }) => (
                    <div className='flex items-center justify-between gap-4 rounded-card-md bg-surface-container-high px-4 py-3'>
                        <div className='flex flex-col gap-1 text-right'>
                            <span className='text-label-lg text-on-surface'>
                                نمایش در پابلیک
                            </span>
                            <span className='text-label-md text-outline'>
                                این آیتم برای کاربران مهمان و موتورهای جستجو قابل
                                مشاهده باشد
                            </span>
                        </div>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </div>
                )}
            />
        </div>
    )
}

export default DomainTab

'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { AudienceIn, CampaignCreateIn } from '@/src/api/types/admin/pricing'
import { useCreateCampaign } from '@/src/routes/catalog/hooks/pricing'
import { Icon } from '@/src/shared/components/Icons/Icon'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'
import Rules from './Rules'
import SelectCustomers from './SelectCustomers'
import SelectProduct from './SelectProduct'
import {
    AUDIENCE_OPTIONS,
    CAMPAIGN_FORM_DEFAULTS,
    CHANNEL_OPTIONS,
    COOPERATION_LEVEL_OPTIONS,
    NATURE_OPTIONS,
    campaignFormSchema,
    type CampaignFormValues,
} from './schema'

const CAMPAIGN_ID = 'CMP-5141'

const STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

const SCOPE_OPTIONS = [
    { label: 'همه کالاها', value: 'all-products' },
    { label: 'دسته منتخب', value: 'selected-category' },
    { label: 'کالاهای منتخب', value: 'selected-products' },
]

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const toAudience = (values: CampaignFormValues): AudienceIn[] => {
    if (values.audience === 'COOPERATION_LEVEL') {
        return [
            {
                audience_type: 'COOPERATION_LEVEL',
                cooperation_level: values.cooperationLevel,
            },
        ]
    }

    return [{ audience_type: values.audience }]
}

const toCampaignCreateIn = (values: CampaignFormValues): CampaignCreateIn => ({
    name: values.name.trim(),
    nature: values.nature,
    channel: values.channel,
    starts_at: values.startDate!.toISOString(),
    ends_at: values.endDate!.toISOString(),
    budget: values.budget.trim() || null,
    goal: values.goal.trim() || null,
    description: values.description.trim() || null,
    audiences: toAudience(values),
})

const CampaigneForm = () => {
    const { push } = useRouter()
    const bannerInputRef = useRef<HTMLInputElement>(null)
    const { mutate: createCampaign, isPending } = useCreateCampaign()
    const { control, handleSubmit } = useForm<CampaignFormValues>({
        resolver: zodResolver(campaignFormSchema),
        defaultValues: CAMPAIGN_FORM_DEFAULTS,
        mode: 'onSubmit',
    })

    const onSubmit = (values: CampaignFormValues) => {
        createCampaign(toCampaignCreateIn(values), {
            onSuccess: () => {
                toast.success('کمپین ثبت شد')
                push('/admin/catalog/campaigns')
            },
        })
    }

    return (
        <form
            className='flex flex-col gap-6'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='grid grid-cols-3 gap-6 bg-surface-container-lowest p-6 rounded-card-lg'>
                <Controller
                    name='nature'
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className='flex flex-col'>
                            <FormDropdown
                                label='ماهیت کمپین'
                                placeholder='انتخاب'
                                value={field.value}
                                options={NATURE_OPTIONS}
                                onChange={field.onChange}
                            />
                            {fieldState.error?.message ? (
                                <span className='mt-1 text-sm text-error'>
                                    {fieldState.error.message}
                                </span>
                            ) : null}
                        </div>
                    )}
                />
                <Controller
                    name='name'
                    control={control}
                    render={({ field, fieldState }) => (
                        <Input
                            label='نام کمپین'
                            value={field.value}
                            onChange={field.onChange}
                            error={!!fieldState.error}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <CopyableInput label='شناسه' value={CAMPAIGN_ID} readOnly />
                <Controller
                    name='startDate'
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className='flex flex-col'>
                            <CalendarButton
                                label='زمان شروع'
                                placeholder=''
                                value={field.value}
                                onChange={field.onChange}
                            />
                            {fieldState.error?.message ? (
                                <span className='mt-1 text-sm text-error'>
                                    {fieldState.error.message}
                                </span>
                            ) : null}
                        </div>
                    )}
                />
                <Controller
                    name='endDate'
                    control={control}
                    render={({ field, fieldState }) => (
                        <div className='flex flex-col'>
                            <CalendarButton
                                label='زمان پایان'
                                placeholder=''
                                value={field.value}
                                onChange={field.onChange}
                            />
                            {fieldState.error?.message ? (
                                <span className='mt-1 text-sm text-error'>
                                    {fieldState.error.message}
                                </span>
                            ) : null}
                        </div>
                    )}
                />
                <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                        <FormDropdown
                            label='وضعیت'
                            value={field.value}
                            options={STATUS_OPTIONS}
                            onChange={field.onChange}
                        />
                    )}
                />
                <div className='col-span-3 grid grid-cols-2 gap-6'>
                    <Controller
                        name='channel'
                        control={control}
                        render={({ field, fieldState }) => (
                            <div className='flex flex-col'>
                                <FormDropdown
                                    label='کانال‌ها'
                                    value={field.value}
                                    options={CHANNEL_OPTIONS}
                                    onChange={field.onChange}
                                />
                                {fieldState.error?.message ? (
                                    <span className='mt-1 text-sm text-error'>
                                        {fieldState.error.message}
                                    </span>
                                ) : null}
                            </div>
                        )}
                    />
                    <Controller
                        name='budget'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col'>
                                <label className='mb-1.5 text-label-md text-on-surface-variant'>
                                    بودجه کمپین
                                </label>
                                <div className='flex items-center gap-2'>
                                    <div className='min-w-0 flex-1'>
                                        <Input
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </div>
                                    <span className='shrink-0 text-label-md text-outline'>
                                        تومان
                                    </span>
                                </div>
                            </div>
                        )}
                    />
                </div>
                <Controller
                    name='goal'
                    control={control}
                    render={({ field }) => (
                        <div className='col-span-3 flex flex-col'>
                            <label className='mb-1.5 text-label-md text-on-surface-variant'>
                                هدف کمپین
                            </label>
                            <Textarea
                                rows={4}
                                value={field.value}
                                onChange={(event) =>
                                    field.onChange(event.target.value)
                                }
                                className='min-h-24 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                            />
                        </div>
                    )}
                />
            </div>

            <Controller
                name='scope'
                control={control}
                render={({ field }) => (
                    <div className='flex flex-col gap-1.5 bg-surface-container-lowest p-6 rounded-card-lg'>
                        <span className='text-label-md text-on-surface-variant'>
                            دامنه اعمال
                        </span>
                        <Tabs
                            value={field.value}
                            onValueChange={field.onChange}
                            dir='rtl'
                            className='w-full gap-4'
                        >
                            <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                                {SCOPE_OPTIONS.map((option) => (
                                    <TabsTrigger
                                        key={option.value}
                                        value={option.value}
                                        className={tabTriggerClassName}
                                    >
                                        {option.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value='selected-products' className='mt-0'>
                                <SelectProduct />
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            />

            <Controller
                name='audience'
                control={control}
                render={({ field }) => (
                    <div className='flex flex-col gap-1.5 bg-surface-container-lowest p-6 rounded-card-lg'>
                        <span className='text-label-md text-on-surface-variant'>
                            مخاطب
                        </span>
                        <Tabs
                            value={field.value}
                            onValueChange={field.onChange}
                            dir='rtl'
                            className='w-full gap-4'
                        >
                            <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                                {AUDIENCE_OPTIONS.map((option) => (
                                    <TabsTrigger
                                        key={option.value}
                                        value={option.value}
                                        className={tabTriggerClassName}
                                    >
                                        {option.label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <TabsContent value='GROUP' className='mt-0'>
                                <SelectCustomers hasGroup={false} />
                            </TabsContent>
                            <TabsContent
                                value='COOPERATION_LEVEL'
                                className='mt-0'
                            >
                                <Controller
                                    name='cooperationLevel'
                                    control={control}
                                    render={({ field: levelField }) => (
                                        <div className='grid grid-cols-3 gap-3'>
                                            {COOPERATION_LEVEL_OPTIONS.map(
                                                (level) => (
                                                    <button
                                                        key={level.value}
                                                        type='button'
                                                        onClick={() =>
                                                            levelField.onChange(
                                                                level.value
                                                            )
                                                        }
                                                        className={cn(
                                                            'rounded-container-md bg-surface-container-high px-4 py-3 text-label-md text-on-surface-variant',
                                                            levelField.value ===
                                                                level.value &&
                                                                'bg-surface-container-lowest text-on-surface shadow-sm ring-1 ring-outline-variant'
                                                        )}
                                                    >
                                                        {level.label}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            />

            <Rules />

            <div className='flex flex-col gap-3'>
                <span className='text-label-lg text-outline'>بنر و انتشار</span>
                <div className='flex flex-col gap-6 rounded-card-lg bg-surface-container-lowest p-6'>
                    <div className='flex flex-row items-center justify-between gap-4'>
                        <span className='shrink-0 text-label-lg text-on-surface-variant'>
                            آپلود تصویر بنر (نسبت 3:1 پیشنهاد می‌شود)
                        </span>
                        <Button
                            type='button'
                            variant='outline'
                            className='flex max-w-[433px] w-full items-center gap-2'
                            onClick={() => bannerInputRef.current?.click()}
                        >
                            <Icon label='upload300Broken' className='size-6!' />
                            <span className='text-label-md'>بارگذاری</span>
                        </Button>
                        <input
                            ref={bannerInputRef}
                            type='file'
                            accept='image/*'
                            className='hidden'
                            onChange={() => {}}
                        />
                    </div>

                    <Controller
                        name='description'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-col'>
                                <label className='mb-1.5 text-label-md text-on-surface-variant'>
                                    توضیحات
                                </label>
                                <Textarea
                                    rows={4}
                                    value={field.value}
                                    onChange={(event) =>
                                        field.onChange(event.target.value)
                                    }
                                    className='min-h-24 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                                />
                            </div>
                        )}
                    />

                    <Controller
                        name='showInPublicPanel'
                        control={control}
                        render={({ field }) => (
                            <div className='flex flex-row items-center justify-between gap-4'>
                                <div className='flex flex-col gap-1 text-right'>
                                    <span className='text-label-lg text-on-surface'>
                                        نمایش در پنل عمومی
                                    </span>
                                    <span className='text-label-md text-outline'>
                                        کمپین برای عموم دیده شود
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
            </div>

            <Button
                type='submit'
                variant='primary'
                size='lg'
                className='self-end'
                isLoading={isPending}
            >
                ثبت کمپین
            </Button>
        </form>
    )
}

export default CampaigneForm

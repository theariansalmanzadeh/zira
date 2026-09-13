'use client'

import { useRef, useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import Rules from './Rules'
import SelectCustomers from './SelectCustomers'
import SelectProduct from './SelectProduct'

const CAMPAIGN_ID = 'CMP-5141'

const CAMPAIGN_TYPE_OPTIONS = [
    { label: 'فروش ویژه', value: 'special-sale' },
    { label: 'فصلی', value: 'seasonal' },
    { label: 'VIP', value: 'vip' },
]

const STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

const CHANNEL_OPTIONS = [
    { label: 'همه کانال‌ها', value: 'all-channels' },
    { label: 'وبسایت', value: 'website' },
    { label: 'اپلیکیشن', value: 'app' },
    { label: 'شبکه‌های اجتماعی', value: 'social' },
]

const SCOPE_OPTIONS = [
    { label: 'همه کالاها', value: 'all-products' },
    { label: 'دسته منتخب', value: 'selected-category' },
    { label: 'کالاهای منتخب', value: 'selected-products' },
]

const AUDIENCE_OPTIONS = [
    { label: 'همه مشتریان', value: 'all-customers' },
    { label: 'بر اساس سطح', value: 'by-level' },
    { label: 'مشتریان منتخب', value: 'selected-customers' },
]

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const CampaigneForm = () => {
    const bannerInputRef = useRef<HTMLInputElement>(null)
    const [campaignType, setCampaignType] = useState<string>()
    const [campaignName, setCampaignName] = useState('')
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [status, setStatus] = useState('active')
    const [channels, setChannels] = useState('all-channels')
    const [campaignBudget, setCampaignBudget] = useState('0')
    const [scope, setScope] = useState('all-products')
    const [audience, setAudience] = useState('all-customers')
    const [description, setDescription] = useState('')
    const [campaignGoal, setCampaignGoal] = useState('')
    const [showInPublicPanel, setShowInPublicPanel] = useState(true)

    return (
        <div
            className='flex flex-col gap-6'
            dir='rtl'
        >
            <div className='grid grid-cols-3 gap-6 bg-surface-container-lowest p-6 rounded-card-lg'>
                <FormDropdown
                    label='نوع کمپین'
                    placeholder='انتخاب'
                    value={campaignType}
                    options={CAMPAIGN_TYPE_OPTIONS}
                    onChange={setCampaignType}
                />
                <Input
                    label='نام کمپین'
                    value={campaignName}
                    onChange={setCampaignName}
                />
                <CopyableInput label='شناسه' value={CAMPAIGN_ID} />
                <CalendarButton
                    label='زمان شروع'
                    placeholder=''
                    value={startDate}
                    onChange={setStartDate}
                />
                <CalendarButton
                    label='زمان پایان'
                    placeholder=''
                    value={endDate}
                    onChange={setEndDate}
                />
                <FormDropdown
                    label='وضعیت'
                    value={status}
                    options={STATUS_OPTIONS}
                    onChange={setStatus}
                />
                <div className='col-span-3 grid grid-cols-2 gap-6'>
                    <FormDropdown
                        label='کانال‌ها'
                        value={channels}
                        options={CHANNEL_OPTIONS}
                        onChange={setChannels}
                    />
                    <div className='flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            بودجه کمپین
                        </label>
                        <div className='flex items-center gap-2'>
                            <div className='min-w-0 flex-1'>
                                <Input
                                    value={campaignBudget}
                                    onChange={setCampaignBudget}
                                />
                            </div>
                            <span className='shrink-0 text-label-md text-outline'>
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
                <div className='col-span-3 flex flex-col'>
                    <label className='mb-1.5 text-label-md text-on-surface-variant'>
                        هدف کمپین
                    </label>
                    <Textarea
                        rows={4}
                        value={campaignGoal}
                        onChange={(event) => setCampaignGoal(event.target.value)}
                        className='min-h-24 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-1.5 bg-surface-container-lowest p-6 rounded-card-lg'>
                <span className='text-label-md text-on-surface-variant'>دامنه اعمال</span>
                <Tabs
                    value={scope}
                    onValueChange={setScope}
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

            <div className='flex flex-col gap-1.5 bg-surface-container-lowest p-6 rounded-card-lg'>
                <span className='text-label-md text-on-surface-variant'>مخاطب</span>
                <Tabs
                    value={audience}
                    onValueChange={setAudience}
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
                    <TabsContent value='selected-customers' className='mt-0'>
                        <SelectCustomers />
                    </TabsContent>
                </Tabs>
            </div>

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
                            onChange={() => { }}
                        />
                    </div>

                    <div className='flex flex-col'>
                        <label className='mb-1.5 text-label-md text-on-surface-variant'>
                            توضیحات
                        </label>
                        <Textarea
                            rows={4}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            className='min-h-24 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                        />
                    </div>

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
                            checked={showInPublicPanel}
                            onCheckedChange={setShowInPublicPanel}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CampaigneForm

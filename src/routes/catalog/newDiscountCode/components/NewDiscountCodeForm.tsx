'use client'

import { useState, type ChangeEvent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
    COMBINED_AUDIENCE_OPTIONS,
    COMBINED_SCOPE_OPTIONS,
} from '@/src/routes/catalog/discount/schema'
import type { CustomerLevel } from '@/src/routes/catalog/newDiscount/constant'
import ByLevelFields from '@/src/routes/catalog/newDiscount/components/ByLevelFields'
import SelectedCategoryFields from '@/src/routes/catalog/newDiscount/components/SelectedCategoryFields'
import SelectCustomers from '@/src/routes/catalog/newCampaigne/components/SelectCustomers'
import SelectProduct from '@/src/routes/catalog/newCampaigne/components/SelectProduct'
import type { AddCustomerRow } from '@/src/shared/components/modals/components/addCustomer/constants'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import SelectItem from '@/src/shared/components/ui/SelectItem'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'

const DURATION_OPTIONS = [
    { label: '۱ هفته', value: '1-week' },
    { label: '۲ هفته', value: '2-weeks' },
    { label: '۱ ماه', value: '1-month' },
]

const STATUS_OPTIONS = [
    { label: 'فعال', value: 'active' },
    { label: 'غیرفعال', value: 'inactive' },
]

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const handleInputChange =
    (setter: (value: string) => void) =>
        (value: string | ChangeEvent<HTMLInputElement>) => {
            setter(typeof value === 'string' ? value : value.target.value)
        }

const DiscountCodeFormFields = () => {
    const [discountPercent, setDiscountPercent] = useState('')
    const [maxDiscountCap, setMaxDiscountCap] = useState('')
    const [minPurchaseQty, setMinPurchaseQty] = useState('')
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [duration, setDuration] = useState<string>()
    const [status, setStatus] = useState('active')
    const [useWithOtherDiscounts, setUseWithOtherDiscounts] = useState(true)
    const [useWithDiscountCode, setUseWithDiscountCode] = useState(false)

    return (
        <div className='flex flex-col gap-6 pt-6'>
            <div className='grid grid-cols-3 gap-6'>
                <div className='flex flex-col'>
                    <label className='mb-1.5 text-label-md text-on-surface-variant'>درصد تخفیف</label>
                    <div className='bg-surface-container-high flex h-10 flex-row items-center gap-1.5 rounded-container-lg px-3'>
                        <input
                            type='text'
                            value={discountPercent}
                            onChange={(event) => setDiscountPercent(event.target.value)}
                            className='w-full bg-transparent text-base text-on-surface outline-none md:text-sm'
                        />
                        <span className='text-outline'>%</span>
                    </div>
                </div>
                <Input
                    label='حداکثر سقف تخفیف (تومان)'
                    placeholder='-'
                    value={maxDiscountCap}
                    onChange={handleInputChange(setMaxDiscountCap)}
                />
                <Input
                    label='حداقل تعداد خرید'
                    placeholder='-'
                    value={minPurchaseQty}
                    onChange={handleInputChange(setMinPurchaseQty)}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <CalendarButton
                    label='زمان شروع'
                    value={startDate}
                    onChange={setStartDate}
                />
                <CalendarButton
                    label='زمان پایان'
                    value={endDate}
                    onChange={setEndDate}
                />
                <FormDropdown
                    label='مدت اعمال'
                    placeholder='انتخاب'
                    value={duration}
                    options={DURATION_OPTIONS}
                    onChange={setDuration}
                />
            </div>

            <div className='grid grid-cols-3 gap-6'>
                <FormDropdown
                    label='وضعیت'
                    value={status}
                    options={STATUS_OPTIONS}
                    onChange={setStatus}
                />
            </div>

            <hr className='border-0 border-t border-dashed border-outline-variant' />

            <div className='flex flex-col gap-6 py-2'>
                <div className='flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>
                            قابل استفاده هم‌زمان با سایر تخفیف‌ها
                        </span>
                        <span className='text-label-md text-outline'>
                            اگر خاموش باشد، بهترین تخفیف اعمال می‌شود
                        </span>
                    </div>
                    <Switch
                        checked={useWithOtherDiscounts}
                        onCheckedChange={setUseWithOtherDiscounts}
                    />
                </div>

                <div className='flex flex-row items-center justify-between gap-4'>
                    <div className='flex flex-col gap-1 text-right'>
                        <span className='text-label-lg text-on-surface'>
                            قابل استفاده هم‌زمان با کد تخفیف
                        </span>
                        <span className='text-label-md text-outline'>ترکیب با کدهای تبلیغاتی</span>
                    </div>
                    <Switch
                        checked={useWithDiscountCode}
                        onCheckedChange={setUseWithDiscountCode}
                    />
                </div>
            </div>
        </div>
    )
}

const DiscountCodeForm = () => {
    const [selectedDiscountType, setSelectedDiscountType] = useState<'percentage' | 'fixed'>('percentage')
    const [scope, setScope] = useState<string>('all-products')
    const [audience, setAudience] = useState<string>('all-customers')
    const [categoryIds, setCategoryIds] = useState<string[]>([])
    const [customerLevels, setCustomerLevels] = useState<CustomerLevel[]>([])
    const customersForm = useForm<{ customers: AddCustomerRow[] }>({
        defaultValues: { customers: [] },
    })

    return (
        <FormProvider {...customersForm}>
        <div className='flex flex-col gap-3' dir='rtl'>
            <div className='flex flex-row gap-2 rounded-card-lg bg-surface-container-lowest p-6'>
                <SelectItem
                    title='تخفیف ترکیبی'
                    description='بر اساس ترکیب کالا, مشتری, زمان'
                    icon='product400Linear'
                    selected={selectedDiscountType === 'percentage'}
                    onClick={() => setSelectedDiscountType('percentage')}
                />
                <SelectItem
                    title='تخفیف کلی'
                    description='درصد ثابت روی کالا یا دسته'
                    icon='interaction400Linear'
                    selected={selectedDiscountType === 'fixed'}
                    onClick={() => setSelectedDiscountType('fixed')}
                />
            </div>

            <div className='flex flex-col gap-1.5 rounded-card-lg bg-surface-container-lowest p-6'>
                <span className='text-label-md text-on-surface-variant'>دامنه اعمال</span>
                <Tabs
                    value={scope}
                    onValueChange={setScope}
                    dir='rtl'
                    className='w-full gap-4'
                >
                    <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                        {COMBINED_SCOPE_OPTIONS.map((option) => (
                            <TabsTrigger
                                key={option.value}
                                value={option.value}
                                className={tabTriggerClassName}
                            >
                                {option.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value='selected-category' className='mt-0'>
                        <SelectedCategoryFields
                            value={categoryIds}
                            onChange={setCategoryIds}
                        />
                    </TabsContent>
                    <TabsContent value='selected-products' className='mt-0'>
                        <SelectProduct />
                    </TabsContent>
                </Tabs>
            </div>

            <div className='flex flex-col gap-1.5 rounded-card-lg bg-surface-container-lowest p-6'>
                <span className='text-label-md text-on-surface-variant'>مخاطب</span>
                <Tabs
                    value={audience}
                    onValueChange={setAudience}
                    dir='rtl'
                    className='w-full gap-4'
                >
                    <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                        {COMBINED_AUDIENCE_OPTIONS.map((option) => (
                            <TabsTrigger
                                key={option.value}
                                value={option.value}
                                className={tabTriggerClassName}
                            >
                                {option.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value='by-level' className='mt-0'>
                        <ByLevelFields
                            value={customerLevels}
                            onChange={setCustomerLevels}
                        />
                    </TabsContent>
                    <TabsContent value='selected-customers' className='mt-0'>
                        <SelectCustomers />
                    </TabsContent>
                </Tabs>
            </div>

            <div className='rounded-card-lg bg-surface-container-lowest p-6'>
                <Tabs defaultValue='percentage' dir='rtl' className='w-full'>
                    <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                        <TabsTrigger
                            value='percentage'
                            className={tabTriggerClassName}
                        >
                            درصدی
                        </TabsTrigger>
                        <TabsTrigger
                            value='fixed'
                            className={tabTriggerClassName}
                        >
                            مبلغ ثابت
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value='percentage'>
                        <DiscountCodeFormFields />
                    </TabsContent>
                    <TabsContent value='fixed'>
                        <DiscountCodeFormFields />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
        </FormProvider>
    )
}

export default DiscountCodeForm

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm, useWatch } from 'react-hook-form'
import AdornedInput from '@/src/shared/components/ui/AdornedInput'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import SelectCustomers from '@/src/routes/catalog/newCampaigne/components/SelectCustomers'
import SelectProduct from '@/src/routes/catalog/newCampaigne/components/SelectProduct'
import {
    COMBINED_AUDIENCE_OPTIONS,
    COMBINED_DISCOUNT_DEFAULTS,
    COMBINED_DISCOUNT_TYPE_OPTIONS,
    COMBINED_SCOPE_OPTIONS,
    combinedDiscountSchema,
    type CombinedDiscountValues,
} from '../schema'

const tabTriggerClassName =
    'rounded-container-md flex-1 border-0 px-4 py-2 data-[state=active]:-mb-0 data-[state=active]:bg-surface-container-lowest data-[state=active]:text-on-surface data-[state=active]:shadow-sm data-[state=active]:after:hidden'

const CombinedDiscountForm = () => {
    const { control, handleSubmit } = useForm<CombinedDiscountValues>({
        resolver: zodResolver(combinedDiscountSchema),
        defaultValues: COMBINED_DISCOUNT_DEFAULTS,
    })
    const discountType = useWatch({ control, name: 'discountType' })

    const onSubmit = (data: CombinedDiscountValues) => {
        console.log(data)
    }

    return (
        <form className='flex flex-col gap-4' dir='rtl' onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name='scope'
                control={control}
                render={({ field }) => (
                    <div className='flex flex-col gap-1.5 rounded-card-lg bg-surface-container-lowest p-6'>
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
                    <div className='flex flex-col gap-1.5 rounded-card-lg bg-surface-container-lowest p-6'>
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
                            <TabsContent value='selected-customers' className='mt-0'>
                                <SelectCustomers />
                            </TabsContent>
                        </Tabs>
                    </div>
                )}
            />

            <div className='grid grid-cols-1 gap-6 rounded-card-lg bg-surface-container-lowest p-6 md:grid-cols-2'>
                <Controller
                    name='startDate'
                    control={control}
                    render={({ field }) => (
                        <CalendarButton
                            label='زمان شروع'
                            placeholder=''
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    name='endDate'
                    control={control}
                    render={({ field }) => (
                        <CalendarButton
                            label='زمان پایان'
                            placeholder=''
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <div className='grid grid-cols-1 items-end gap-6 rounded-card-lg bg-surface-container-lowest p-6 md:grid-cols-3'>
                <Controller
                    name='discountType'
                    control={control}
                    render={({ field }) => (
                        <div className='flex flex-col gap-1.5'>
                            <span className='text-label-md text-on-surface-variant'>
                                نوع تخفیف
                            </span>
                            <Tabs
                                value={field.value}
                                onValueChange={field.onChange}
                                dir='rtl'
                            >
                                <TabsList className='h-auto w-full gap-1 rounded-container-md border-0 bg-surface-container-high p-1.5'>
                                    {COMBINED_DISCOUNT_TYPE_OPTIONS.map((option) => (
                                        <TabsTrigger
                                            key={option.value}
                                            value={option.value}
                                            className={tabTriggerClassName}
                                        >
                                            {option.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>
                    )}
                />
                <Controller
                    name='discountValue'
                    control={control}
                    render={({ field, fieldState }) => (
                        <AdornedInput
                            label='درصد / مبلغ تخفیف'
                            required
                            value={field.value}
                            onChange={field.onChange}
                            suffix={discountType === 'amount' ? 'تومان' : '%'}
                            msg={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    name='minPurchaseCount'
                    control={control}
                    render={({ field, fieldState }) => (
                        <AdornedInput
                            label='حداقل تعداد خرید'
                            value={field.value}
                            onChange={field.onChange}
                            suffix='عدد'
                            msg={fieldState.error?.message}
                        />
                    )}
                />
            </div>
        </form>
    )
}

export default CombinedDiscountForm

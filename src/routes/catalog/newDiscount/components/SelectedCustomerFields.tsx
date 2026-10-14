'use client'

import { Controller, useFormContext } from 'react-hook-form'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CUSTOMER_GROUP_OPTIONS } from '../constant'
import type { NewDiscountFormValues } from '../schema'

const SelectedCustomerFields = () => {
    const { control } = useFormContext<NewDiscountFormValues>()

    return (
        <Controller
            control={control}
            name='customerGroup'
            render={({ field }) => (
                <div className='flex flex-col gap-1.5'>
                    <FormDropdown
                        label='انتخاب گروه مشتریان'
                        value={field.value}
                        options={CUSTOMER_GROUP_OPTIONS}
                        onChange={field.onChange}
                    />
                </div>
            )}
        />
    )
}

export default SelectedCustomerFields

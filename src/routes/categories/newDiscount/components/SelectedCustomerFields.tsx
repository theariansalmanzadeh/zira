'use client'

import { useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { CUSTOMER_GROUP_OPTIONS } from '../constant'

const SelectedCustomerFields = () => {
    const [customerGroup, setCustomerGroup] = useState('loyalty-club')

    return (
        <div className='flex flex-col gap-1.5'>
            <FormDropdown
                label='انتخاب گروه مشتریان'
                value={customerGroup}
                options={CUSTOMER_GROUP_OPTIONS}
                onChange={setCustomerGroup}
            />
        </div>
    )
}

export default SelectedCustomerFields

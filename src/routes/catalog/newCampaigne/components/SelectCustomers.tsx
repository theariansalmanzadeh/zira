'use client'

import { useFormContext } from 'react-hook-form'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import type { AddCustomerRow } from '@/src/shared/components/modals/components/addCustomer/constants'
import { useModalStore } from '@/src/shared/store/modal-store'
import type { CampaignFormValues } from './schema'

const SelectCustomers = ({ hasGroup = true }: { hasGroup?: boolean }) => {
    const { openModal } = useModalStore()
    const { getValues, setValue, watch } = useFormContext<CampaignFormValues>()
    const customers = watch('customers')

    const handleCustomersChange = (selected: AddCustomerRow[]) => {
        const current = getValues('customers')
        const existingIds = new Set(current.map((customer) => customer.id))
        setValue(
            'customers',
            [
                ...current,
                ...selected.filter((customer) => !existingIds.has(customer.id)),
            ],
            { shouldDirty: true }
        )
    }

    return (
        <div
            className='rounded-card-lg bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='flex items-center justify-between gap-4'>
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-lg text-on-surface'>
                        مشتریان منتخب
                    </span>
                    <span className='text-label-md text-outline'>
                        مشتریان هدف این کمپین را از لیست انتخاب کنید
                    </span>
                </div>
                <Button
                    type='button'
                    variant='primary'
                    size='default'
                    className='shrink-0 gap-1.5'
                    onClick={() =>
                        openModal(ModalTypes.ADD_CUSTOMER, {
                            hasGroup,
                            selectedIds: customers.map((customer) => customer.id),
                            onChange: handleCustomersChange,
                        })
                    }
                >
                    <Icon label='addSm400Broken' className='size-5!' />
                    افزودن مشتری
                </Button>
            </div>
            {customers.length > 0 && (
                <div className='mt-4 flex flex-wrap gap-2'>
                    {customers.map((customer) => (
                        <span
                            key={customer.id}
                            className='rounded-full bg-surface-container-high px-3 py-1 text-label-md text-on-surface'
                        >
                            {customer.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SelectCustomers

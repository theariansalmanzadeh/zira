'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'

const SelectCustomers = ({ hasGroup = true }: { hasGroup?: boolean }) => {
    const { openModal } = useModalStore()

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
                        openModal(ModalTypes.ADD_CUSTOMER, { hasGroup })
                    }
                >
                    <Icon label='addSm400Broken' className='size-5!' />
                    افزودن مشتری
                </Button>
            </div>
        </div>
    )
}

export default SelectCustomers

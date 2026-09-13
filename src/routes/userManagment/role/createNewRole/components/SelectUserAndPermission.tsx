import { Icon } from '@/src/shared/components/Icons/Icon'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { Button } from '@/src/shared/components/ui/button'
import { useModalStore } from '@/src/shared/store/modal-store'
import React from 'react'

const SelectUserAndPermission = () => {
    const { openModal } = useModalStore()
    return (
        <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-3'>
            <div className='flex w-full items-center justify-between border-b border-dashed border-outline pb-3'>
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-lg text-on-surface'>دسترسی‌ها</span>
                    <span className='text-label-md text-outline'>
                        دسترسی‌های این نقش را از لیست انتخاب کنید
                    </span>
                </div>
                <div className='flFex shrink-0 items-center gap-1 text-outline'>
                    <Button variant="ghost" onClick={() => openModal(ModalTypes.CONFIRM_ACCESS)}>
                        <span className='text-label-md'>انتخاب</span>
                        <Icon label='chevronLeft400Linear' className='' />
                    </Button>
                </div>
            </div>
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-lg text-on-surface'>کاربران</span>
                    <span className='text-label-md text-outline'>
                        کاربران دارای نقش در این گروه را از لیست انتخاب کنید
                    </span>
                </div>
                <div className='flFex shrink-0 items-center gap-1 text-outline'>
                    <Button variant="ghost" onClick={() => openModal(ModalTypes.SELECT_USER_AND_GROUPS)}>
                        <span className='text-label-md'>انتخاب</span>
                        <Icon label='chevronLeft400Linear' className='' />
                    </Button>
                </div>
            </div>
            <Button variant='primary' size="lg" className='w-full text-label-lg' onClick={() => openModal(ModalTypes.SELECT_USER_AND_GROUPS)}>
                ثبت گروه
            </Button>
        </div >
    )
}

export default SelectUserAndPermission
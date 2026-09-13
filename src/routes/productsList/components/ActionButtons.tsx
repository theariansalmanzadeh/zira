"use client"

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import IconButton from '@/src/shared/components/ui/IconButton'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'

const ActionButtons = () => {
    const { openModal } = useModalStore()

    return (
        <div className='flex flex-row items-center justify-center gap-sm'>
            <IconButton variant='outline' icon='cozy' onClick={() => { }} />
            <IconButton variant='outline' icon='sort400Linear' onClick={() => { }} />
            <Button variant='outline' className='flex flex-row-reverse items-center justify-center gap-sm' onClick={() => { }} >
                جدیدترین
                <Icon label='filter400Linear' className='size-4 text-on-surface-variant' />
            </Button>
            <Button
                variant='outline'
                className='flex flex-row-reverse items-center justify-center gap-sm text-on-surface-variant'
                onClick={() => openModal(ModalTypes.FILTER_PRODUCT)}
            >
                فیلتر ها
                <Icon label='tune400Linear' className='size-4' />
            </Button>
        </div>
    )
}

export default ActionButtons

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useModalStore } from '@/src/shared/store/modal-store'

const SelectUsers = () => {
    const { openModal } = useModalStore()
    return (
        <div className='flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-3'>
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-col gap-1 text-right'>
                    <span className='text-label-lg text-on-surface'>کاربران</span>
                    <span className='text-label-md text-outline'>
                        کاربران دارای نقش در این گروه را از لیست انتخاب کنید
                    </span>
                </div>
                <div className='flFex shrink-0 items-center gap-1 text-outline'>
                    <Button variant="ghost" onClick={() => openModal(ModalTypes.SELECT_USER_AND_GROUPS, { hasOnlyUsers: true })}>
                        <span className='text-label-md'>انتخاب</span>
                        <Icon label='chevronLeft400Linear' className='size-6!' />
                    </Button>
                </div>
            </div>
            <Button variant='primary' size="lg" className='w-full text-label-lg' onClick={() => openModal(ModalTypes.SELECT_USER_AND_GROUPS)}>
                ثبت گروه
            </Button>
        </div >
    )
}

export default SelectUsers

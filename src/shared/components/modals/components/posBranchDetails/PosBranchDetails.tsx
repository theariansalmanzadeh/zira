'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import type { BaseModalProps } from '../../types'
import { POS_DEVICES_DUMMY } from './constants'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

const PosBranchDetails = ({ closeModal }: BaseModalProps) => {
    const { push } = useRouter()

    const openDeviceForm = (href: string) => {
        closeModal()
        push(href)
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='flex justify-end'>
                <Button
                    type='button'
                    variant='primary'
                    className='gap-1.5'
                    onClick={() => openDeviceForm('/admin/branches/pos-device/new')}
                >
                    <Icon
                        label='addSm400Broken'
                        className='size-4 text-on-primary'
                    />
                    افزودن دستگاه
                </Button>
            </div>
            <div className='overflow-x-auto rounded-card-lg bg-surface-container-high p-2'>
                <div className='overflow-hidden rounded-card-md bg-surface-container-lowest'>
                    <TableHeader />
                    <div className='flex flex-col'>
                        {POS_DEVICES_DUMMY.map((item) => (
                            <TableRow key={item.id} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PosBranchDetails

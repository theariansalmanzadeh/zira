import { Button } from '@/src/shared/components/ui/button'
import React from 'react'

const AddressCard = ({ isActive }: { isActive: boolean }) => {
    return (
        <div className='p-6 rounded-container-xl bg-surface-container-lowest'>
            <div className='flex flex-col items-start gap-4'>
                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2 p-2 rounded-full bg-surface-container-lowest border border-primary'>
                        {isActive && <span className='h-3 w-3 rounded-full bg-primary'></span>}
                    </div>
                    <span className='text-label-lg font-medium text-on-surface'>
                        شماره تماس
                    </span>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <span className='text-label-lg font-medium text-outline'>
                        تهران، پاسداران، اطلس مال، طبقه 11، پلاک 10
                    </span>
                    <Button variant='ghost' size='sm'>
                        ویرایش
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AddressCard
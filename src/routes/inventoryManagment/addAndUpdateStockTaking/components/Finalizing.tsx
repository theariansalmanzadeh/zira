'use client'

import { Button } from '@/src/shared/components/ui/button'
import AdminActions from './AdminActions'
import Count2DiscrepancyReport from './Count2DiscrepancyReport'

type FinalizingProps = {
    onBack: () => void
}

const Finalizing = ({ onBack }: FinalizingProps) => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 flex flex-col gap-4 lg:col-span-9'>
                    <Count2DiscrepancyReport />
                </div>
                <div className='col-span-12 lg:col-span-3'>
                    <AdminActions />
                </div>
            </div>

            <div className='flex flex-row flex-wrap items-center justify-end gap-3 pt-2'>
                <Button type='button' variant='outline' onClick={onBack}>
                    <span className='text-label-sm'>بازگشت</span>
                </Button>
            </div>
        </div>
    )
}

export default Finalizing

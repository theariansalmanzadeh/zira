'use client'

import { Button } from '@/src/shared/components/ui/button'

const successClassName =
    'h-10 rounded-2xl border-0 bg-success-container px-6 text-label-md text-on-success-container hover:bg-success-container/80'

const errorClassName =
    'h-10 rounded-2xl border-0 bg-error-container px-6 text-label-md text-error hover:bg-error-container/80'

const Actions = () => (
    <div className='flex flex-row items-center justify-end gap-2' dir='rtl'>
        <Button type='button' variant='ghost' className={successClassName}>
            تایید
        </Button>
        <Button type='button' variant='ghost' className={errorClassName}>
            رد
        </Button>
    </div>
)

export default Actions

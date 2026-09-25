'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { formatFaDate } from '@/src/shared/libs/formatter'
import type { TransferCardStatus } from '../types'

type TransferCardActionsProps = {
    status: TransferCardStatus
    date: string
}

const TransferCardActions = ({ status, date }: TransferCardActionsProps) => {
    return (
        <div className='flex flex-row flex-wrap items-center justify-between gap-3 bg-surface-container-high p-4'>
            <span className='text-label-md text-outline'>
                {formatFaDate(date)}
            </span>

            {status === 'accepting' && (
                <div className='flex flex-row items-center gap-2'>
                    <Button
                        type='button'
                        variant='ghost'
                        className='bg-error-container px-4 text-error hover:bg-error-container/80'
                    >
                        <Icon label='closeSm400Linear' className='size-5!' />
                        رد
                    </Button>
                    <Button
                        type='button'
                        variant='ghost'
                        className='bg-success-container px-4 text-on-success-container hover:bg-success-container/80'
                    >
                        <Icon label='checkSm400Linear' className='size-5!' />
                        تأیید
                    </Button>
                </div>
            )}

            {(status === 'transferring' ||
                status === 'received' ||
                status === 'completed') && (
                    <Button
                        type='button'
                        variant='ghost'
                        className='bg-success-container px-4 text-on-success-container hover:bg-success-container/80'
                        disabled={
                            status === 'completed' || status === 'received'
                        }
                    >
                        <Icon
                            label='package2'
                            className='size-5! text-on-success-container'
                        />
                        <span>ثبت دریافت</span>
                    </Button>
                )}
        </div>
    )
}

export default TransferCardActions

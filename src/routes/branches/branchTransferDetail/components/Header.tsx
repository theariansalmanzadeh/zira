'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { STATUS_CONFIG, type TransferDetailData } from '../constants'

type HeaderProps = {
    data: Pick<TransferDetailData, 'id' | 'status' | 'registeredAt'>
}

const Header = ({ data }: HeaderProps) => {
    const statusConfig = STATUS_CONFIG[data.status]

    return (
        <div className='flex flex-row items-center gap-3' dir='rtl'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-card-md bg-primary/10'>
                <Icon
                    label='arrowCompare400Linear'
                    className='size-6! text-primary'
                />
            </div>

            <div className='flex min-w-0 flex-col gap-1'>
                <div className='flex flex-row flex-wrap items-center gap-2'>
                    <h2 className='text-title-md font-semibold text-on-surface'>
                        انتقال {formatFaNumber(data.id)}
                    </h2>
                    <Pill
                        text={statusConfig.text}
                        variant={statusConfig.variant}
                        hasDot
                        className='border-0'
                    />
                </div>
                <span className='text-label-md text-outline'>
                    ثبت در تاریخ {data.registeredAt}
                </span>
            </div>
        </div>
    )
}

export default Header

'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import StepperStatus from '@/src/shared/components/StepperStatus/StepperStatus'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import TransferCardActions from './components/TransferCardActions'
import TransferCardItemsTable from './components/TransferCardItemsTable'
import {
    TRANSFER_CARD_STATUS_CONFIG,
    buildTransferCardStepperSteps,
    type TransferCardItem,
} from './types'

type TransferCardProps = {
    data: TransferCardItem
    detailHref?: string
    hasDetails?: boolean
}

const TransferCard = ({ data, detailHref, hasDetails = true }: TransferCardProps) => {
    const { push } = useRouter()
    const statusConfig = TRANSFER_CARD_STATUS_CONFIG[data.status]
    const steps = buildTransferCardStepperSteps(data.status)
    const href =
        detailHref ?? `/admin/branches/branch-transfer/${data.slug}`
    const items = data.items?.length ? data.items : null

    return (
        <div
            className='flex flex-col gap-4 overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest'
            dir='rtl'
        >
            <div className='flex flex-row flex-wrap items-center gap-3 p-4'>
                <div className='flex min-w-0 flex-1 flex-row flex-wrap items-center gap-3'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-label-md text-outline'>
                            {data.id}
                        </span>
                        <span className='text-label-lg font-medium text-on-surface'>
                            {data.fromBranch}
                        </span>
                        <span className='text-label-md text-outline'>
                            {data.fromWarehouse}
                        </span>
                    </div>

                    <div className='flex min-w-8 flex-1 items-center px-1'>
                        <div className='h-[2px] flex-1 bg-primary/40' />
                        <Icon
                            label='chevronLeft300Linear'
                            className='size-5! shrink-0 text-primary'
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <span className='text-label-lg font-medium text-on-surface'>
                            {data.toBranch}
                        </span>
                        <span className='text-label-md text-outline'>
                            {data.toWarehouse}
                        </span>
                    </div>

                    <div className='flex flex-row items-center gap-4 px-2'>
                        <div className='flex flex-row items-center gap-2'>
                            <Icon
                                label='order400Linear'
                                className='size-5! text-outline'
                            />
                            <div className='flex flex-col'>
                                <span className='text-title-lg font-semibold text-on-surface'>
                                    {formatFaNumber(data.itemCount)}
                                </span>
                                <span className='text-label-md text-outline'>
                                    قلم
                                </span>
                            </div>
                        </div>
                        <div className='flex flex-row items-center gap-2'>
                            <Icon
                                label='product400Linear'
                                className='size-5! text-outline'
                            />
                            <div className='flex flex-col'>
                                <span className='text-title-lg font-semibold text-on-surface'>
                                    {formatFaNumber(data.unitCount)}
                                </span>
                                <span className='text-label-sm text-outline'>
                                    واحد
                                </span>
                            </div>
                        </div>
                    </div>

                    <Pill
                        text={statusConfig.text}
                        variant={statusConfig.variant}
                        hasDot
                        className='border-0'
                    />
                </div>

                {hasDetails && <IconButton
                    icon='chevronLeft300Linear'
                    iconClassName='size-6!'
                    onClick={() => push(href)}
                />}
            </div>

            <div className='w-2/3'>
                <StepperStatus
                    steps={steps}
                    className='rounded-none bg-transparent p-0'
                />
            </div>

            {items ? <TransferCardItemsTable items={items} /> : null}

            <TransferCardActions status={data.status} date={data.date} />
        </div>
    )
}

export default TransferCard

'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import type { BranchPosDevice } from '@/src/api/types/admin/organization'
import type { BaseModalProps } from '../../types'
import { type PosDeviceItem } from './constants'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

type PosBranchDetailsModalData = {
    values?: string[]
    branchId?: string
    posDevices?: BranchPosDevice[]
}

const toDeviceItem = (
    device: BranchPosDevice,
    index: number
): PosDeviceItem => ({
    id: device.id,
    index: index + 1,
    name: device.title,
    code: device.terminal_no,
    model: device.device_model || '—',
    bank: device.bank_name || '—',
    bankAccount: device.bank_account_number || device.bank_account_id,
    terminalNumber: device.terminal_no,
    terminalPassword: '—',
    cashRegister: device.cash_box_title || '—',
    todayTransactionsMillion: Number(device.today_transactions_amount) || 0,
})

const toValueItem = (title: string, index: number): PosDeviceItem => ({
    id: `${index}-${title}`,
    index: index + 1,
    name: title,
    code: '—',
    model: '—',
    bank: '—',
    bankAccount: '—',
    terminalNumber: '—',
    terminalPassword: '—',
    cashRegister: '—',
    todayTransactionsMillion: 0,
})

const PosBranchDetails = ({ closeModal, data }: BaseModalProps) => {
    const { push } = useRouter()
    const modalData = data as PosBranchDetailsModalData | null | undefined
    const rows = modalData?.posDevices
        ? modalData.posDevices.map(toDeviceItem)
        : (modalData?.values ?? []).map(toValueItem)

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
                    onClick={() =>
                        openDeviceForm(
                            `/admin/branches/details/${modalData?.branchId ?? ''}/pos-device/new`
                        )
                    }
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
                        {rows.length === 0 ? (
                            <p className='px-3 py-6 text-center text-label-lg text-outline'>
                                دستگاهی ثبت نشده است.
                            </p>
                        ) : (
                            rows.map((item) => (
                                <TableRow
                                    key={item.id}
                                    data={item}
                                    branchId={modalData?.branchId ?? ''}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PosBranchDetails

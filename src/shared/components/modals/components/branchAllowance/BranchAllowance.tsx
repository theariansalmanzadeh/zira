'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import type { BranchPermit } from '@/src/api/types/admin/organization'
import { Button } from '@/src/shared/components/ui/button'
import { Switch } from '@/src/shared/components/ui/Switch'
import { cn } from '@/src/shared/libs/utils'
import { useUpdateBranchPermits } from '@/src/routes/branches/hooks/organization'
import type { BaseModalProps } from '../../types'

export type BranchAllowanceKey =
    | 'creditSales'
    | 'chequeSales'
    | 'consignmentSales'
    | 'wasteRegistration'
    | 'repricing'

export type BranchAllowanceModalData = {
    branchId?: string
    values?: string[]
    permit?: BranchPermit | null
    allowances?: Partial<Record<BranchAllowanceKey, boolean>>
    onSave?: (allowances: Record<BranchAllowanceKey, boolean>) => void
}

const ALLOWANCE_ITEMS: { key: BranchAllowanceKey; label: string }[] = [
    { key: 'creditSales', label: 'فروش اعتباری' },
    { key: 'chequeSales', label: 'فروش چکی' },
    { key: 'consignmentSales', label: 'فروش امانی' },
    { key: 'wasteRegistration', label: 'ثبت ضایعات' },
    { key: 'repricing', label: 'قیمت‌گذاری مجدد' },
]

const DEFAULT_ALLOWANCES: Record<BranchAllowanceKey, boolean> = {
    creditSales: false,
    chequeSales: false,
    consignmentSales: false,
    wasteRegistration: false,
    repricing: false,
}

const permitToAllowances = (
    permit?: BranchPermit | null
): Record<BranchAllowanceKey, boolean> => ({
    creditSales: Boolean(permit?.allow_credit_sale),
    chequeSales: Boolean(permit?.allow_cheque_sale),
    consignmentSales: Boolean(permit?.allow_consignment_sale),
    wasteRegistration: Boolean(permit?.allow_scrap_entry),
    repricing: Boolean(permit?.allow_repricing),
})

const allowancesToPermit = (
    allowances: Record<BranchAllowanceKey, boolean>
): BranchPermit => ({
    allow_credit_sale: allowances.creditSales,
    allow_cheque_sale: allowances.chequeSales,
    allow_consignment_sale: allowances.consignmentSales,
    allow_scrap_entry: allowances.wasteRegistration,
    allow_repricing: allowances.repricing,
})

const BranchAllowance = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as BranchAllowanceModalData | null | undefined
    const { mutate, isPending } = useUpdateBranchPermits()
    const [allowances, setAllowances] = useState<
        Record<BranchAllowanceKey, boolean>
    >(() => ({
        ...(modalData?.permit !== undefined
            ? permitToAllowances(modalData.permit)
            : DEFAULT_ALLOWANCES),
        ...modalData?.allowances,
    }))

    const handleToggle = (key: BranchAllowanceKey, checked: boolean) => {
        setAllowances((prev) => ({ ...prev, [key]: checked }))
    }

    const handleSave = () => {
        if (!modalData?.branchId) {
            modalData?.onSave?.(allowances)
            closeModal()
            return
        }

        mutate(
            {
                branchId: modalData.branchId,
                body: allowancesToPermit(allowances),
            },
            {
                onSuccess: () => {
                    modalData.onSave?.(allowances)
                    toast.success('مجوزهای شعبه ذخیره شد')
                    closeModal()
                },
            }
        )
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='flex flex-col gap-3'>
                {ALLOWANCE_ITEMS.map((item) => (
                    <div
                        key={item.key}
                        className='flex flex-row items-center justify-between gap-3 rounded-card-lg border border-outline-variant px-4 py-3'
                    >
                        <span className='text-label-lg text-on-surface'>
                            {item.label}
                        </span>
                        <Switch
                            checked={allowances[item.key]}
                            onCheckedChange={(checked) =>
                                handleToggle(item.key, checked)
                            }
                            className={cn(
                                'data-[state=checked]:bg-success data-[state=unchecked]:bg-surface-container-highest'
                            )}
                        />
                    </div>
                ))}
            </div>

            <div className='flex flex-row items-center justify-between gap-3 border-t border-outline-variant pt-4'>
                <p className='text-label-md text-outline'>
                    تغییرات پس از ذخیره روی فاکتورهای جدید اعمال می‌شود.
                </p>
                <div className='flex shrink-0 flex-row items-center gap-2'>
                    <Button
                        type='button'
                        variant='outline'
                        onClick={closeModal}
                    >
                        بستن
                    </Button>
                    <Button
                        type='button'
                        variant='primary'
                        onClick={handleSave}
                        isLoading={isPending}
                        disabled={!modalData?.branchId || isPending}
                    >
                        ذخیره مجوزها
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BranchAllowance

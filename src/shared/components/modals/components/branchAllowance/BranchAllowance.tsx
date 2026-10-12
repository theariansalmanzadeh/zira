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
    | 'allow_credit_sale'
    | 'allow_cheque_sale'
    | 'allow_consignment_sale'
    | 'allow_scrap_entry'

export type BranchAllowanceModalData = {
    branchId?: string
    values?: string[]
    permit?: BranchPermit | null
    allowances?: Partial<Record<BranchAllowanceKey, boolean>>
    onSave?: (allowances: Record<BranchAllowanceKey, boolean>) => void
}

const ALLOWANCE_ITEMS: { key: BranchAllowanceKey; label: string }[] = [
    { key: 'allow_credit_sale', label: 'فروش اعتباری' },
    { key: 'allow_cheque_sale', label: 'فروش چکی' },
    { key: 'allow_consignment_sale', label: 'فروش امانی' },
    { key: 'allow_scrap_entry', label: 'ثبت ضایعات' },
]

const DEFAULT_ALLOWANCES: Record<BranchAllowanceKey, boolean> = {
    allow_credit_sale: false,
    allow_cheque_sale: false,
    allow_consignment_sale: false,
    allow_scrap_entry: false,
}

const permitToAllowances = (
    permit?: BranchPermit | null
): Record<BranchAllowanceKey, boolean> => ({
    allow_credit_sale: Boolean(permit?.allow_credit_sale),
    allow_cheque_sale: Boolean(permit?.allow_cheque_sale),
    allow_consignment_sale: Boolean(permit?.allow_consignment_sale),
    allow_scrap_entry: Boolean(permit?.allow_scrap_entry),
})

const BranchAllowance = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as BranchAllowanceModalData | null | undefined
    const branchId = modalData?.branchId ?? ''
    const { mutate: updateBranchPermits, isPending } = useUpdateBranchPermits()
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
        if (!branchId) return

        updateBranchPermits(
            {
                branchId,
                body: allowances,
            },
            {
                onSuccess: () => {
                    modalData?.onSave?.(allowances)
                    toast.success('مجوزهای شعبه ذخیره شد')
                    closeModal()
                },
                onError: () => {
                    toast.error('ذخیره مجوزها انجام نشد')
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
                        disabled={!branchId || isPending}
                    >
                        ذخیره مجوزها
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BranchAllowance

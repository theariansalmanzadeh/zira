'use client'

import { useMemo } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import type { AddProductItem } from '@/src/shared/components/modals/components/addProduct'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { useListContracts } from '@/src/routes/catalog/hooks/pricing'
import { useModalStore } from '@/src/shared/store/modal-store'

type PricingFormProps = {
    contractId: string
    effectiveDate?: Date
    selectedIds: string[]
    onContractChange: (value: string) => void
    onDateChange: (date: Date | undefined) => void
    onSubmit: (products: AddProductItem[]) => void
}

const PricingForm = ({
    contractId,
    effectiveDate,
    selectedIds,
    onContractChange,
    onDateChange,
    onSubmit,
}: PricingFormProps) => {
    const openModal = useModalStore((state) => state.openModal)
    const { data } = useListContracts({ page: 1, page_size: 100 })
    const contractOptions = useMemo(
        () =>
            (data?.results ?? []).map((contract) => ({
                label: contract.name,
                value: contract.id,
            })),
        [data?.results]
    )

    const handleOpenAddProduct = () => {
        openModal(ModalTypes.ADD_PRODUCT, {
            selectedIds,
            onSubmit,
        })
    }

    return (
        <div
            className='grid grid-cols-1 items-end gap-4 rounded-card-lg bg-surface-container-lowest p-4 md:grid-cols-[1fr_1fr_auto]'
            dir='rtl'
        >
            <FormDropdown
                label='قرارداد'
                placeholder='انتخاب قرارداد'
                value={contractId || undefined}
                options={contractOptions}
                onChange={onContractChange}
            />
            <CalendarButton
                label='تاریخ اثر'
                value={effectiveDate}
                onChange={onDateChange}
            />
            <Button
                type='button'
                variant='primary'
                className='gap-1.5'
                onClick={handleOpenAddProduct}
            >
                <Icon label='addSm400Broken' className='size-5!' />
                افزودن کالا
            </Button>
        </div>
    )
}

export default PricingForm

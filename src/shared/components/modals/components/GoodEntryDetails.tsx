'use client'

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import type { BaseModalProps } from '../types'

export type GoodEntryDetailsModalData = {
    productCode?: string
    productName?: string
    category?: string
    specs?: string
    supplier?: string
    requestDate?: string
    approvalStatus?: string
    labels?: string
    warehouseId?: string
    description?: string
    onConfirm?: (payload: {
        warehouseId: string
        description: string
    }) => void
}

const WAREHOUSE_OPTIONS = [
    { label: 'انبار مرکزی تهران', value: 'tehran-central' },
    { label: 'انبار کرج', value: 'karaj' },
    { label: 'انبار اصفهان', value: 'isfahan' },
    { label: 'انبار مشهد', value: 'mashhad' },
]

const DEFAULT_DATA: Required<
    Omit<GoodEntryDetailsModalData, 'onConfirm' | 'warehouseId' | 'description'>
> = {
    productCode: '۷۳۵۲-۷۱',
    productName: 'شورت زنانه نخی',
    category: 'پوشاک زنانه / لباس زیر',
    specs: 'M · صورتی · نخ پنبه · ZM-114',
    supplier: 'فروشگاه رومینا',
    requestDate: '۱۴۰۴/۱۲/۰۶',
    approvalStatus: 'تایید شده',
    labels: 'نو',
}

const GoodEntryDetails = ({ closeModal, data }: BaseModalProps) => {
    const modalData =
        (data as GoodEntryDetailsModalData | null | undefined) ?? {}
    const fields = { ...DEFAULT_DATA, ...modalData }

    const [warehouseId, setWarehouseId] = useState(
        modalData.warehouseId ?? 'tehran-central'
    )
    const [description, setDescription] = useState(
        modalData.description ?? ''
    )

    const handleConfirm = () => {
        modalData.onConfirm?.({ warehouseId, description })
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-4' dir='rtl'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <Input
                    label='کد کالا'
                    value={fields.productCode}
                    disabled
                />
                <Input
                    label='نام کالا'
                    value={fields.productName}
                    disabled
                />
                <Input
                    label='دسته اصلی / فرعی'
                    value={fields.category}
                    disabled
                />
                <Input
                    label='مشخصات'
                    value={fields.specs}
                    disabled
                />
                <Input
                    label='تامین کننده'
                    value={fields.supplier}
                    disabled
                />
                <Input
                    label='تاریخ درخواست'
                    value={fields.requestDate}
                    disabled
                />
                <Input
                    label='وضعیت تایید مدیر تامین'
                    value={fields.approvalStatus}
                    disabled
                />
                <Input
                    label='لیبل ها'
                    value={fields.labels}
                    disabled
                />
            </div>

            <div className='flex flex-col gap-1.5'>
                <FormDropdown
                    label='انبار مقصد'
                    value={warehouseId}
                    options={WAREHOUSE_OPTIONS}
                    onChange={setWarehouseId}
                />
                <p className='text-label-md text-outline'>
                    با ثبت انبار مقصد، درخواست در کارتابل انباردار همان انبار قرار
                    می‌گیرد.
                </p>
            </div>

            <div className='flex flex-col gap-1.5'>
                <label className='text-label-md text-on-surface-variant'>
                    توضیحات مدیر انبار
                </label>
                <div className='rounded-container-lg bg-surface-container-high px-3 py-3'>
                    <Textarea
                        rows={4}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder='توضیحات برای انباردار...'
                        className='min-h-24 resize-none border-0 bg-transparent p-0 text-on-surface shadow-none focus-visible:ring-0'
                    />
                </div>
            </div>

            <div className='flex flex-row items-center justify-start gap-2 pt-2'>
                <Button type='button' variant='primary' onClick={handleConfirm}>
                    تعیین انبار مقصد و ارجاع به انباردار
                </Button>
                <Button type='button' variant='outline' onClick={closeModal}>
                    انصراف
                </Button>
            </div>
        </div>
    )
}

export default GoodEntryDetails

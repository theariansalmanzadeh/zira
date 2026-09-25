'use client'

import { useState } from 'react'
import { Badge } from '@/src/shared/components/ui/Badge'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { cn } from '@shared/libs/utils'
import type { WarehouseGradeLevel } from '@/src/routes/categories/productDetail/types'
import type { BaseModalProps } from '../types'

export type ChangeWarehouseGradePayload = {
    quantity: number
    grade: WarehouseGradeLevel
    description: string
    discountPercent: number | null
}

export type ChangeWarehouseGradeModalData = {
    currentGrade?: WarehouseGradeLevel
    quantity?: number
    description?: string
    discountPercent?: number | null
    onConfirm?: (payload: ChangeWarehouseGradePayload) => void
}

const GRADE_OPTIONS: WarehouseGradeLevel[] = [1, 2, 3]

const GRADE_BADGE_CLASS: Record<WarehouseGradeLevel, string> = {
    1: 'border-0 bg-success-container text-on-success-container',
    2: 'border-0 bg-warning-container text-on-warning-container',
    3: 'border-0 bg-surface-container-high text-on-surface-variant',
}

const ChangeWarehouseGrade = ({ closeModal, data }: BaseModalProps) => {
    const modalData =
        (data as ChangeWarehouseGradeModalData | null | undefined) ?? {}
    const currentGrade = modalData.currentGrade ?? 1

    const [quantity, setQuantity] = useState(
        String(modalData.quantity ?? 0)
    )
    const [grade, setGrade] = useState<WarehouseGradeLevel>(currentGrade)
    const [description, setDescription] = useState(modalData.description ?? '')
    const [discount, setDiscount] = useState(
        modalData.discountPercent == null
            ? ''
            : String(modalData.discountPercent)
    )

    const handleSubmit = () => {
        const parsedDiscount = discount.trim() === '' ? null : Number(discount)
        modalData.onConfirm?.({
            quantity: Number(quantity) || 0,
            grade,
            description: description.trim(),
            discountPercent:
                parsedDiscount == null || Number.isNaN(parsedDiscount)
                    ? null
                    : parsedDiscount,
        })
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-6' dir='rtl'>
            <div className='flex flex-row items-start justify-between gap-4'>
                <div className='flex min-w-0 flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                        <span className='h-4 w-1 shrink-0 rounded-full bg-primary' />
                        <h3 className='text-title-md font-bold text-on-surface'>
                            تغییر گرید کالا
                        </h3>
                    </div>
                    <p className='pr-3 text-label-md text-outline'>
                        تعدادی از موجودی این کالا را انتخاب کنید و گرید جدید را
                        برای آن ثبت کنید.
                    </p>
                </div>

                <div className='flex shrink-0 flex-row items-center gap-2'>
                    <span className='text-label-md text-outline'>گرید فعلی</span>
                    <Badge
                        variant='default'
                        className={GRADE_BADGE_CLASS[currentGrade]}
                    >
                        گرید {formatFaNumber(currentGrade)}
                    </Badge>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='flex flex-col gap-1.5'>
                    <label className='text-label-md text-on-surface-variant'>
                        تعداد
                    </label>
                    <div className='flex flex-row items-center gap-2 rounded-container-lg border border-outline-variant bg-surface-container-lowest px-3 py-2.5'>
                        <span className='shrink-0 text-label-md text-outline'>
                            عدد
                        </span>
                        <input
                            type='number'
                            min={0}
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                            className='w-full bg-transparent text-body-md text-on-surface outline-none'
                        />
                    </div>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <span className='text-label-md text-on-surface-variant'>
                        گرید جدید
                    </span>
                    <div className='flex flex-row flex-wrap gap-2'>
                        {GRADE_OPTIONS.map((option) => {
                            const selected = grade === option
                            return (
                                <button
                                    key={option}
                                    type='button'
                                    onClick={() => setGrade(option)}
                                    className={cn(
                                        'rounded-container-md border px-4 py-2.5 text-label-md transition-colors',
                                        selected
                                            ? 'border-primary text-primary'
                                            : 'border-outline-variant text-on-surface'
                                    )}
                                >
                                    گرید {formatFaNumber(option)}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='flex flex-col gap-1.5 sm:col-span-2'>
                    <label className='text-label-md text-on-surface-variant'>
                        توضیحات
                    </label>
                    <Textarea
                        rows={4}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        placeholder='توضیحات گرید و وضعیت کالا را وارد کنید'
                        className='min-h-24 resize-none rounded-container-lg border-0 bg-surface-container-high px-3 py-2 text-on-surface placeholder:text-outline'
                    />
                </div>

                <Input
                    label='تخفیف'
                    type='number'
                    min={0}
                    max={100}
                    value={discount}
                    onChange={setDiscount}
                    placeholder='۰'
                    wrapperClassName='border border-outline-variant bg-surface-container-lowest'
                />
            </div>

            <div className='flex justify-start'>
                <Button type='button' variant='primary' onClick={handleSubmit}>
                    ثبت تغییر گرید
                </Button>
            </div>
        </div>
    )
}

export default ChangeWarehouseGrade

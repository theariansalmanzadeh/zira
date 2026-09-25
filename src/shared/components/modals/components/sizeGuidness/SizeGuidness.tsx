'use client'

import { Ruler } from 'lucide-react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import type { BaseModalProps } from '../../types'

const SIZE_GUIDE_ROWS = [
    { size: '70', band: '۶۸ - ۷۲', cupB: '۸۴ - ۸۶', cupC: '۸۶ - ۸۸' },
    { size: '75', band: '۷۳ - ۷۷', cupB: '۸۹ - ۹۱', cupC: '۹۱ - ۹۳' },
    { size: '80', band: '۷۸ - ۸۲', cupB: '۹۴ - ۹۶', cupC: '۹۶ - ۹۸' },
    { size: '85', band: '۸۳ - ۸۷', cupB: '۹۹ - ۱۰۱', cupC: '۱۰۱ - ۱۰۳' },
    { size: '90', band: '۸۸ - ۹۲', cupB: '۱۰۴ - ۱۰۶', cupC: '۱۰۶ - ۱۰۸' },
]

const HEADERS = ['سایز', 'دور زیر سینه (cm)', 'دور سینه کاپ B (cm)', 'دور سینه کاپ C (cm)']

const SizeGuidness = ({ closeModal }: BaseModalProps) => {
    return (
        <div className='flex flex-col gap-5' dir='rtl'>
            <div className='flex items-center justify-between'>
                <Ruler className='size-5 text-primary' />
                <button
                    type='button'
                    aria-label='بستن'
                    className='inline-flex size-8 items-center justify-center rounded-full bg-surface-container-high'
                    onClick={closeModal}
                >
                    <Icon label='closeSm400Linear' className='size-5 text-on-surface-variant' />
                </button>
            </div>
            <div className='flex flex-col gap-3 text-center'>
                <h2 className='text-title-md font-bold text-on-surface'>
                    راهنمای جامع سایزبندی سوتین و لباس زیر
                </h2>
                <p className='text-body-md leading-7 text-on-surface-variant'>
                    جهت تعیین سایز دقیق، دور زیر سینه (Band) و برجسته‌ترین قسمت دور سینه (Bust) را با متر بدون کشیدگی اندازه بگیرید:
                </p>
            </div>
            <div className='overflow-hidden rounded-card-lg'>
                <div className='grid grid-cols-4 bg-surface-container-high px-3 py-3 text-center text-label-sm text-on-surface-variant'>
                    {HEADERS.map((header) => (
                        <span key={header}>{header}</span>
                    ))}
                </div>
                {SIZE_GUIDE_ROWS.map((row) => (
                    <div
                        key={row.size}
                        className='grid grid-cols-4 border-b border-outline-variant px-3 py-3 text-center text-label-md text-on-surface last:border-b-0'
                    >
                        <span className='font-bold text-primary'>{row.size}</span>
                        <span>{row.band}</span>
                        <span>{row.cupB}</span>
                        <span>{row.cupC}</span>
                    </div>
                ))}
            </div>
            <Button
                type='button'
                className='h-12 w-full rounded-full bg-inverse-surface text-on-inverse-surface hover:bg-inverse-surface/90'
                onClick={closeModal}
            >
                متوجه شدم و بستن
            </Button>
        </div>
    )
}

export default SizeGuidness

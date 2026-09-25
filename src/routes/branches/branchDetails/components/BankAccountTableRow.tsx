'use client'

import { useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import { cn } from '@/src/shared/libs/utils'
import {
    BANK_ACCOUNT_GRID_CLASS,
    type BankAccountRowData,
} from '../constants'

type BankAccountTableRowProps = {
    data: BankAccountRowData
}

const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '')
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ')
    return formatFaNumber(formatted, { useGrouping: false })
}

const formatSheba = (value: string) => {
    const match = value.match(/^(IR)?(\d+)$/i)
    if (!match) return value
    const prefix = match[1] ? 'IR' : ''
    return `${prefix}${formatFaNumber(match[2], { useGrouping: false })}`
}

const BankAccountTableRow = ({ data }: BankAccountTableRowProps) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className='overflow-hidden border-b border-outline-variant bg-surface-container-lowest last:border-b-0'>
            <div
                className={cn(
                    BANK_ACCOUNT_GRID_CLASS,
                    'min-w-[1100px] px-3 py-3 text-label-lg text-on-surface-variant'
                )}
            >
                <div>{data.bank}</div>
                <div>{data.accountType}</div>
                <div dir='ltr' className='text-right'>
                    {formatFaNumber(data.accountNumber, {
                        useGrouping: false,
                    })}
                </div>
                <div dir='ltr' className='text-right'>
                    {formatSheba(data.sheba)}
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <span>{formatPrice(data.balance)}</span>
                    <Icon
                        label='currency'
                        className='size-5! text-on-surface-variant'
                    />
                </div>
                <div>
                    {data.isDefault ? (
                        <Pill
                            text='پیش‌فرض'
                            variant='contained'
                            size='sm'
                            className='border-0'
                        />
                    ) : (
                        <Pill
                            text='—'
                            variant='tonal'
                            size='sm'
                            className='border-0'
                        />
                    )}
                </div>
                <div>
                    <Pill
                        text={data.status}
                        variant={
                            data.status === 'فعال' ? 'success' : 'tonal'
                        }
                        size='sm'
                        className='border-0'
                    />
                </div>
                <div className='flex justify-end'>
                    <IconButton
                        icon='chevronDown300Linear'
                        onClick={() => setIsExpanded((prev) => !prev)}
                        className='size-9!'
                        iconClassName={cn(
                            'size-5! transition-transform duration-200',
                            isExpanded && 'rotate-180'
                        )}
                    />
                </div>
            </div>

            <div
                className={cn(
                    'grid transition-[grid-template-rows] duration-200 ease-out',
                    isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
            >
                <div className='overflow-hidden'>
                    <div className='border-t border-outline-variant px-3 py-4'>
                        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
                            <div className='flex flex-col gap-1 text-right'>
                                <span className='text-label-md text-outline'>
                                    شماره کارت
                                </span>
                                <span
                                    dir='ltr'
                                    className='text-right text-label-lg text-on-surface'
                                >
                                    {formatCardNumber(data.cardNumber)}
                                </span>
                            </div>
                            <div className='flex flex-col gap-1 text-right'>
                                <span className='text-label-md text-outline'>
                                    صاحب حساب
                                </span>
                                <span className='text-label-lg text-on-surface'>
                                    {data.accountHolder}
                                </span>
                            </div>
                            <div className='flex flex-col gap-1 text-right'>
                                <span className='text-label-md text-outline'>
                                    شعبه بانک
                                </span>
                                <span className='text-label-lg text-on-surface'>
                                    {data.bankBranch} — کد{' '}
                                    {formatFaNumber(data.bankBranchCode, {
                                        useGrouping: false,
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BankAccountTableRow

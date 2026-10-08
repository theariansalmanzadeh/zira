'use client'

import DocumentFileUpload from '@/src/routes/contentManagment/liecense/new/components/DocumentFileUpload'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Input } from '@/src/shared/components/ui/Input'
import { CHEQUE_BANK_OPTIONS } from '../constants'
import type { ChequeInfo } from '../types'

type ChequeInputCardProps = {
    value: ChequeInfo
    onChange: (info: Partial<ChequeInfo>) => void
    onRemove?: () => void
}

const ChequeInputCard = ({ value, onChange, onRemove }: ChequeInputCardProps) => {
    return (
        <div
            className='relative flex flex-col gap-4 rounded-card-sm border border-outline-variant bg-surface-container-lowest p-5'
            dir='rtl'
        >
            {onRemove && (
                <IconButton
                    icon='delete300Linear'
                    iconClassName='size-4! text-outline'
                    className='absolute left-3 top-3'
                    onClick={onRemove}
                />
            )}
            <div className='grid grid-cols-4 gap-3'>
                <FormDropdown
                    label='بانک صادرکننده:'
                    value={value.bank}
                    options={CHEQUE_BANK_OPTIONS}
                    onChange={(bank) => onChange({ bank })}
                    placeholder='بانک ملی ایران'
                />
                <Input
                    label='نام یا کد شعبه:'
                    value={value.branch}
                    onChange={(branch) => onChange({ branch })}
                    placeholder='مثال: شعبه بازار (کد ۱۰۴)'
                />
                <Input
                    label='شناسه صیادی ۱۶ رقمی:'
                    value={value.sayyadId}
                    onChange={(sayyadId) => onChange({ sayyadId })}
                    placeholder='۱۶ رقم بدون خط تیره'
                    inputMode='numeric'
                    dir='ltr'
                    className='text-right'
                />
                <Input
                    label='مبلغ برگه چک:'
                    value={value.amount}
                    onChange={(amount) => onChange({ amount })}
                    inputMode='numeric'
                    dir='ltr'
                    wrapperClassName='flex-row-reverse'
                    icon={<span className='shrink-0 text-sm text-outline'>تومان</span>}
                />
                <Input
                    label='شماره سریال چک:'
                    value={value.serialNumber}
                    onChange={(serialNumber) => onChange({ serialNumber })}
                    placeholder='سریال عددی چک...'
                    inputMode='numeric'
                    dir='ltr'
                    className='text-right'
                />
                <Input
                    label='شماره شبا حساب متصل:'
                    value={value.iban}
                    onChange={(iban) => onChange({ iban })}
                    placeholder='IR...'
                    dir='ltr'
                    className='text-right'
                />
                <Input
                    label='کد ملی صاحب حساب / صادرکننده:'
                    value={value.nationalId}
                    onChange={(nationalId) => onChange({ nationalId })}
                    placeholder='۱۰ رقم کد ملی'
                    inputMode='numeric'
                    dir='ltr'
                    className='text-right'
                />
                <Input
                    label='نام و نام خانوادگی صادرکننده:'
                    value={value.issuerName}
                    onChange={(issuerName) => onChange({ issuerName })}
                    placeholder='نام دارنده حساب...'
                />
                <Input
                    label='در وجه:'
                    value={value.payee}
                    onChange={(payee) => onChange({ payee })}
                    containerClassName='col-span-2'
                />
                <CalendarButton
                    label='تاریخ سررسید (چک روز):'
                    value={value.dueDate}
                    onChange={(dueDate) => onChange({ dueDate })}
                    className='col-span-2'
                />
            </div>

            <div className='grid grid-cols-2 gap-3'>
                <DocumentFileUpload
                    fileName={value.frontFileName}
                    onChange={(file) => onChange({ frontFileName: file?.name })}
                />
                <DocumentFileUpload
                    fileName={value.backFileName}
                    onChange={(file) => onChange({ backFileName: file?.name })}
                />
            </div>
        </div>
    )
}

export default ChequeInputCard

'use client'

import { useState } from 'react'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import DocumentFileUpload from '@/src/shared/components/ui/DocumentFileUpload'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import SelectItem from '@/src/shared/components/ui/SelectItem'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import { cn } from '@shared/libs/utils'
import {
    BANK_OPTIONS,
    CREDIT_RELATED_OPTIONS,
    GUARANTEE_STATUS_OPTIONS,
} from '../constants/creditProof'

type GuaranteeType = 'personal-cheque' | 'promissory-note'

const sanitizeNumericInput = (value: string) =>
    toEnglishDigits(value).replace(/[^\d]/g, '')

const PersonalChequeForm = () => {
    const [creditRelated, setCreditRelated] = useState('cheque-credit')
    const [amount, setAmount] = useState('250000000')
    const [chequeNumber, setChequeNumber] = useState('')
    const [bank, setBank] = useState('mellat')
    const [branch, setBranch] = useState('')
    const [accountHolder, setAccountHolder] = useState('')
    const [dueDate, setDueDate] = useState<Date | undefined>(
        new Date('2026-06-05T00:00:00.000Z')
    )
    const [status, setStatus] = useState('active')
    const [fileName, setFileName] = useState<string>()

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormDropdown
                    label="مربوط به اعتبار"
                    value={creditRelated}
                    options={CREDIT_RELATED_OPTIONS}
                    onChange={setCreditRelated}
                />
                <Input
                    label="مبلغ ضمانت (تومان)"
                    inputMode="numeric"
                    value={amount ? formatFaNumber(amount) : ''}
                    onChange={(value) => setAmount(sanitizeNumericInput(value))}
                />
                <Input
                    label="شماره چک (صیادی)"
                    placeholder="رقم شناسه صیاد ۱۶"
                    inputMode="numeric"
                    value={chequeNumber ? formatFaNumber(chequeNumber) : ''}
                    onChange={(value) =>
                        setChequeNumber(sanitizeNumericInput(value))
                    }
                />
                <FormDropdown
                    label="نام بانک"
                    value={bank}
                    options={BANK_OPTIONS}
                    onChange={setBank}
                />
                <Input
                    label="شعبه"
                    placeholder="مثلاً شعبه ولنجک"
                    value={branch}
                    onChange={setBranch}
                />
                <Input
                    label="صاحب حساب / صادرکننده"
                    placeholder="نام و نام خانوادگی"
                    value={accountHolder}
                    onChange={setAccountHolder}
                />
                <CalendarButton
                    label="تاریخ سررسید چک"
                    value={dueDate}
                    onChange={setDueDate}
                />
                <FormDropdown
                    label="وضعیت ضمانت"
                    value={status}
                    options={GUARANTEE_STATUS_OPTIONS}
                    onChange={setStatus}
                />
            </div>

            <DocumentFileUpload
                title="تصویر چک"
                hint="روی چک عبارت «ضمانت» درج شده باشد — JPG یا PDF"
                fileName={fileName}
                onChange={(file) => setFileName(file?.name)}
            />
        </div>
    )
}

const PromissoryNoteForm = () => {
    const [creditRelated, setCreditRelated] = useState('cheque-credit')
    const [amount, setAmount] = useState('250000000')
    const [noteNumber, setNoteNumber] = useState('1234567')
    const [guarantorName, setGuarantorName] = useState('')
    const [guarantorNationalId, setGuarantorNationalId] = useState('0072345689')
    const [dueDate, setDueDate] = useState<Date | undefined>(
        new Date('2026-06-05T00:00:00.000Z')
    )
    const [status, setStatus] = useState('active')
    const [fileName, setFileName] = useState<string>()

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormDropdown
                    label="مربوط به اعتبار"
                    value={creditRelated}
                    options={CREDIT_RELATED_OPTIONS}
                    onChange={setCreditRelated}
                />
                <Input
                    label="مبلغ ضمانت (تومان)"
                    inputMode="numeric"
                    value={amount ? formatFaNumber(amount) : ''}
                    onChange={(value) => setAmount(sanitizeNumericInput(value))}
                />
                <Input
                    label="شماره سفته"
                    inputMode="numeric"
                    value={noteNumber ? formatFaNumber(noteNumber) : ''}
                    onChange={(value) =>
                        setNoteNumber(sanitizeNumericInput(value))
                    }
                />
                <Input
                    label="نام ضامن"
                    placeholder="نام و نام خانوادگی ضامن"
                    value={guarantorName}
                    onChange={setGuarantorName}
                />
                <Input
                    label="کد ملی ضامن"
                    inputMode="numeric"
                    value={
                        guarantorNationalId
                            ? formatFaNumber(guarantorNationalId)
                            : ''
                    }
                    onChange={(value) =>
                        setGuarantorNationalId(sanitizeNumericInput(value))
                    }
                />
                <CalendarButton
                    label="تاریخ سررسید سفته"
                    value={dueDate}
                    onChange={setDueDate}
                />
                <FormDropdown
                    label="وضعیت ضمانت"
                    value={status}
                    options={GUARANTEE_STATUS_OPTIONS}
                    onChange={setStatus}
                />
            </div>

            <DocumentFileUpload
                title="تصویر سفته"
                hint="سفته با امضای ضامن — JPG یا PDF"
                fileName={fileName}
                onChange={(file) => setFileName(file?.name)}
            />
        </div>
    )
}

const CreditProof = () => {
    const [guaranteeType, setGuaranteeType] =
        useState<GuaranteeType>('personal-cheque')

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <div className="flex flex-col gap-1">
                <span className="text-label-lg font-semibold text-on-surface">
                    ضمانت
                </span>
                <span className="text-label-md text-outline">
                    ضمانت فقط از نوع چک شخصی یا سفته است — می‌توانید چند ضمانت
                    ثبت کنید.
                </span>
            </div>

            <div className="flex flex-col gap-6 rounded-card-md border border-outline-variant bg-surface-container-lowest p-6">
                <div className="flex flex-col gap-3 rounded-container-lg border border-outline-variant p-4">
                    <span className="text-label-md text-on-surface-variant">
                        نوع ضمانت
                    </span>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <SelectItem
                            title="چک شخصی"
                            description="چک صیادی به نام مشتری"
                            icon="description400Linear"
                            selected={guaranteeType === 'personal-cheque'}
                            onClick={() => setGuaranteeType('personal-cheque')}
                            className={cn(
                                guaranteeType === 'personal-cheque' &&
                                    'bg-primary-container/40'
                            )}
                        />
                        <SelectItem
                            title="سفته"
                            description="سفته با امضای ضامن"
                            icon="fileNew400Linear"
                            selected={guaranteeType === 'promissory-note'}
                            onClick={() => setGuaranteeType('promissory-note')}
                            className={cn(
                                guaranteeType === 'promissory-note' &&
                                    'bg-primary-container/40'
                            )}
                        />
                    </div>
                </div>

                {guaranteeType === 'personal-cheque' ? (
                    <PersonalChequeForm />
                ) : (
                    <PromissoryNoteForm />
                )}
            </div>
        </div>
    )
}

export default CreditProof

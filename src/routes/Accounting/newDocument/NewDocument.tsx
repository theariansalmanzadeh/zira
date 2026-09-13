'use client'

import { useState } from 'react'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import { CopyableInput } from '@/src/shared/components/ui/CopyableInput'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { DOCUMENT_TYPE_OPTIONS } from './constants'

const NewDocument = () => {
    const [documentType, setDocumentType] = useState('payment')
    const [documentNumber, setDocumentNumber] = useState('5318_92')
    const [documentDate, setDocumentDate] = useState<Date | undefined>(
        new Date('2026-02-21')
    )
    const [issuer, setIssuer] = useState('مریم احمدی')
    const [description, setDescription] = useState(
        'بابت ثبت هزینه اجاره دفتر مرکزی'
    )

    return (
        <div className="grid grid-cols-12 gap-4" dir="rtl">
            <div className="col-span-12 grid grid-cols-8 gap-4 lg:col-span-8">
                <div className="col-span-8 grid grid-cols-8 gap-4 rounded-card-md bg-surface-container-lowest p-6">
                    <FormDropdown
                        className="col-span-8 sm:col-span-4 lg:col-span-2"
                        label="نوع سند"
                        value={documentType}
                        options={DOCUMENT_TYPE_OPTIONS}
                        onChange={setDocumentType}
                    />
                    <div className="col-span-8 sm:col-span-4 lg:col-span-2">
                        <CopyableInput
                            label="شماره سند"
                            value={documentNumber}
                            onChange={(event) =>
                                setDocumentNumber(event.target.value)
                            }
                            readOnly
                        />
                    </div>
                    <CalendarButton
                        className="col-span-8 sm:col-span-4 lg:col-span-2"
                        label="تاریخ"
                        value={documentDate}
                        onChange={setDocumentDate}
                    />
                    <div className="col-span-8 sm:col-span-4 lg:col-span-2">
                        <Input
                            wrapperClassName="w-full"
                            label="صادرکننده"
                            value={issuer}
                            onChange={setIssuer}
                        />
                    </div>
                    <div className="col-span-8">
                        <Input
                            wrapperClassName="w-full"
                            label="شرح سند"
                            value={description}
                            onChange={setDescription}
                        />
                    </div>
                </div>
            </div>

            <div className="col-span-12 grid grid-cols-4 gap-4 lg:col-span-4">
                <div className="col-span-4 rounded-card-md bg-surface-container-lowest p-6">
                    <span className="text-title-md font-medium text-on-surface">
                        خلاصه
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NewDocument

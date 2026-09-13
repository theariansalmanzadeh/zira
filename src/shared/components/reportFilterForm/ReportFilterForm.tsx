"use client"

import { useState } from 'react'
import { Button } from '@/src/shared/components/ui/button'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'


type ReportFilterFormProps = {
    onUpdate?: (filters: {
        firstBranch?: string
        secondBranch?: string
        fromDate?: Date
        toDate?: Date
        firstDropdownOptions: {
            label: string
            value: string
        }[]
        secondDropdownOptions?: {
            label: string
            value: string
        }[]
    }) => void
    firstDropdownOptions: {
        label: string, items: {
            label: string
            value: string
        }[]
    }
    secondDropdownOptions?: {
        label: string, items: {
            label: string
            value: string
        }[]
    }
    submitLabel?: string
}

const ReportFilterForm = ({
    onUpdate,
    firstDropdownOptions,
    secondDropdownOptions,
    submitLabel = 'به روز رسانی گزارش',
}: ReportFilterFormProps) => {
    const [firstBranch, setFirstBranch] = useState<string>()
    const [secondBranch, setSecondBranch] = useState<string>()
    const [fromDate, setFromDate] = useState<Date>()
    const [toDate, setToDate] = useState<Date>()

    const handleUpdate = () => {
        // onUpdate?.({ firstBranch, secondBranch, fromDate, toDate, firstDropdownOptions, secondDropdownOptions })
    }

    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6" dir="rtl">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <FormDropdown
                    label={firstDropdownOptions.label}
                    placeholder="انتخاب"
                    value={firstBranch}
                    options={firstDropdownOptions.items}
                    onChange={setFirstBranch}
                />
                {secondDropdownOptions && <FormDropdown
                    label={secondDropdownOptions.label}
                    placeholder="انتخاب"
                    value={secondBranch}
                    options={secondDropdownOptions.items}
                    onChange={setSecondBranch}
                />}
                <CalendarButton
                    label="از تاریخ"
                    placeholder="انتخاب تاریخ"
                    value={fromDate}
                    onChange={setFromDate}
                />
                <div className="flex flex-col gap-3">
                    <CalendarButton
                        label="تا تاریخ"
                        placeholder="انتخاب تاریخ"
                        value={toDate}
                        onChange={setToDate}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button variant="primary" className="w-fit mt-6 mr-auto" onClick={handleUpdate}>
                    {submitLabel}
                </Button>
            </div>
        </div>
    )
}

export default ReportFilterForm

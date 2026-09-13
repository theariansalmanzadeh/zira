import { Button } from '@/src/shared/components/ui/button'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useState } from 'react'

const LEVEL_OPTIONS = [
    { label: "سطح 1", value: "level1" },
    { label: "سطح 2", value: "level2" },
    { label: "سطح 3", value: "level3" },
]

const ACCOUNT_OPTIONS = [
    { label: "حساب 1", value: "account1" },
    { label: "حساب 2", value: "account2" },
    { label: "حساب 3", value: "account3" },
]
const ReportFilter = ({ onUpdate }: { onUpdate: (filters: { firstBranch: string, secondBranch: string, fromDate: Date, toDate: Date }) => void }) => {
    const [firstBranch, setFirstBranch] = useState<string>()
    const [secondBranch, setSecondBranch] = useState<string>()
    const [fromDate, setFromDate] = useState<Date>()
    const [toDate, setToDate] = useState<Date>()

    const handleUpdate = () => {
        // onUpdate({ firstBranch, secondBranch, fromDate, toDate })
    }
    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6" dir="rtl">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <FormDropdown
                    label={"سطح"}
                    placeholder="انتخاب"
                    value={firstBranch}
                    options={LEVEL_OPTIONS}
                    onChange={setFirstBranch}
                />
                {<FormDropdown
                    label={"حساب"}
                    placeholder="انتخاب"
                    value={secondBranch}
                    options={ACCOUNT_OPTIONS}
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
                    به روز رسانی گزارش
                </Button>
            </div>
        </div>
    )
}

export default ReportFilter
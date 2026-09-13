"use client"

import ReportFilterForm from '@/src/shared/components/reportFilterForm/ReportFilterForm'

const BranchesReport = () => {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ReportFilterForm firstDropdownOptions={{ label: 'شعبه', items: [{ label: 'شعبه 1', value: '1' }, { label: 'شعبه 2', value: '2' }] }} secondDropdownOptions={{ label: 'تاریخ', items: [{ label: 'تاریخ 1', value: '1' }, { label: 'تاریخ 2', value: '2' }] }} />
        </div>
    )
}

export default BranchesReport

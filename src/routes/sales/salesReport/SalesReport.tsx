import ReportFilterForm from '@/src/shared/components/reportFilterForm/ReportFilterForm'

const SalesReport = () => {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ReportFilterForm firstDropdownOptions={{ label: 'شعبه اول', items: [] }} secondDropdownOptions={{ label: 'انبار', items: [] }} />
        </div>
    )
}

export default SalesReport
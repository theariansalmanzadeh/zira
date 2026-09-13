import ReportFilterForm from '@/src/shared/components/reportFilterForm/ReportFilterForm'

const LEVEL_OPTIONS = [
    { label: 'سطح 1', value: 'level-1' },
    { label: 'سطح 2', value: 'level-2' },
    { label: 'سطح 3', value: 'level-3' },
]

const AccountingReport = () => {
    return (
        <div className="flex flex-col gap-4" dir="rtl">
            <ReportFilterForm
                firstDropdownOptions={{
                    label: 'level',
                    items: LEVEL_OPTIONS,
                }}
                secondDropdownOptions={{
                    label: 'acount',
                    items: [],
                }}
            />
        </div>
    )
}

export default AccountingReport

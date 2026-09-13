'use client'

import ReportFilter from './component/ReportFilter'
import ResultTable from './component/ResultTable'
import LedgerReportProvider from './provider/LedgerReportProvider'

const LedgerReport = () => {
    const handleUpdate = (_filters: {
        firstBranch: string
        secondBranch: string
        fromDate: Date
        toDate: Date
    }) => {
        // TODO: fetch ledger report when API is ready
    }

    return (
        <LedgerReportProvider>
            <div className="flex flex-col gap-3" dir="rtl">
                <ReportFilter onUpdate={handleUpdate} />
                <ResultTable />
            </div>
        </LedgerReportProvider>
    )
}

export default LedgerReport

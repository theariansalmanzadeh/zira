'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react'
import type { LedgerReportRowData } from '../component/TableRow'
import {
    LEDGER_REPORT_DUMMY,
    LEDGER_REPORT_TOTAL_COUNT,
    SUMMARY_STATS,
} from '../constants'

type LedgerReportContextValue = {
    summaryStats: typeof SUMMARY_STATS
    rows: LedgerReportRowData[]
    setRows: Dispatch<SetStateAction<LedgerReportRowData[]>>
    totalCount: number
}

const LedgerReportContext = createContext<LedgerReportContextValue | null>(null)

export function useLedgerReport() {
    const context = useContext(LedgerReportContext)

    if (!context) {
        throw new Error('useLedgerReport must be used within LedgerReportProvider')
    }

    return context
}

type LedgerReportProviderProps = {
    children: ReactNode
}

const LedgerReportProvider = ({ children }: LedgerReportProviderProps) => {
    const [rows, setRows] = useState<LedgerReportRowData[]>(LEDGER_REPORT_DUMMY)

    const value = useMemo(
        () => ({
            summaryStats: SUMMARY_STATS,
            rows,
            setRows,
            totalCount: LEDGER_REPORT_TOTAL_COUNT,
        }),
        [rows]
    )

    return (
        <LedgerReportContext.Provider value={value}>
            {children}
        </LedgerReportContext.Provider>
    )
}

export default LedgerReportProvider

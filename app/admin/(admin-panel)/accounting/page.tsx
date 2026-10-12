import type { ComponentType } from 'react'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'
import {
    ACCOUNTING_SUB_PARAMS,
    type AccountingSubParam,
} from '@/src/routes/Accounting/constants'

const AccountingDashboard = dynamic(
    () => import('@/src/routes/Accounting/accountingDashboard/AccountingDashboard'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const AccountingDocuments = dynamic(
    () => import('@/src/routes/Accounting/accountingDocuments/AccountingDocuments'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const AccountReciept = dynamic(
    () => import('@/src/routes/Accounting/accountReciept/AccountReciept'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BankAndVaults = dynamic(
    () => import('@/src/routes/Accounting/bankAndVaults/BankAndVaults'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ChequeManagment = dynamic(
    () => import('@/src/routes/Accounting/chequeManagment/ChequeManagment'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const InternalTransfers = dynamic(
    () => import('@/src/routes/Accounting/internalTransfers/InternalTransfers'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const PaymentNotices = dynamic(
    () => import('@/src/routes/Accounting/paymentNotices/PaymentNotices'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Vat = dynamic(
    () => import('@/src/routes/Accounting/vat/Vat'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Payroll = dynamic(
    () => import('@/src/routes/Accounting/payroll/Payroll'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const CustomerAnalysis = dynamic(
    () => import('@/src/routes/Accounting/customerAnalysis/CustomerAnalysis'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ChartOfAccount = dynamic(
    () => import('@/src/routes/Accounting/chartOfAccount/ChartOfAccount'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const TrialBalance = dynamic(
    () => import('@/src/routes/Accounting/trialBalance/TrialBalance'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const ACCOUNTING_PAGE_COMPONENTS: Partial<
    Record<AccountingSubParam, ComponentType>
> = {
    dashboard: AccountingDashboard,
    'chart-of-accounts': ChartOfAccount,
    documents: AccountingDocuments,
    'trial-balance': TrialBalance,
    receipts: AccountReciept,
    'payment-notices': PaymentNotices,
    'check-management': ChequeManagment,
    'banks-and-cash': BankAndVaults,
    'internal-transfer': InternalTransfers,
    vat: Vat,
    payroll: Payroll,
    'customer-analysis': CustomerAnalysis,
}

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) => {
    const { sub } = await searchParams
    const sectionKey = (
        sub && ACCOUNTING_SUB_PARAMS.includes(sub as AccountingSubParam)
            ? sub
            : 'dashboard'
    ) as AccountingSubParam
    const Component =
        ACCOUNTING_PAGE_COMPONENTS[sectionKey] ?? AccountingDashboard

    return (
        <Suspense fallback={<TableLoadingSkeleton isPending />}>
            <Component />
        </Suspense>
    )
}

export default page

import type { ComponentType } from 'react'
import ConsignmentSales from '@/src/routes/sales/consignmentSales/ConsignmentSales'
// import PreSale from '@/src/routes/sales/'
import PreFactor from '@/src/routes/sales/preFactor/PreFactor'
import ReturnSales from '@/src/routes/sales/returnSales/ReturnSales'
import SalesDashboard from '@/src/routes/sales/salesDashboard/SalesDashboard'
import SalesInvoice from '@/src/routes/sales/salesInvoice/SalesInvoice'
import { SALES_SUB_PARAMS, type SalesSubParam } from '@/src/routes/sales/constants'
import SalesAccount from '@/src/routes/sales/salesAccount/SalesAccount'
import SalesReport from '@/src/routes/sales/salesReport/SalesReport'

const SALES_PAGE_COMPONENTS: Partial<Record<SalesSubParam, ComponentType>> = {
    dashboard: SalesDashboard,
    'pre-factor': PreFactor,
    invoices: SalesInvoice,
    returns: ReturnSales,
    accounts: SalesAccount,
    report: SalesReport,
    consignment: ConsignmentSales,
    // 'pre-sale': PreSaleSales,
}

const page = async ({ searchParams }: { searchParams: Promise<{ sub?: string }> }) => {
    const { sub } = await searchParams
    const sectionKey = (sub && SALES_SUB_PARAMS.includes(sub as SalesSubParam)
        ? sub
        : 'dashboard') as SalesSubParam
    const Component = SALES_PAGE_COMPONENTS[sectionKey] ?? SalesDashboard

    return <Component />
}

export default page

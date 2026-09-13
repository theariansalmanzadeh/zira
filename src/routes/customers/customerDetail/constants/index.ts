import type { ComponentType } from 'react'
import Infos from '../components/Infos'
import Credits from '../components/Credits'
import OrderHistory from '../components/OrderHistory'
import Dashboard from '../components/Dashboard'
import Transactions from '../components/Transactions'
import Groups from '../components/Groups'

export const CUSTOMER_DETAIL_TABS = [
    { value: 'infos', label: 'اطلاعات', tabContent: Infos },
    { value: 'credits', label: 'اعتبارات', tabContent: Credits },
    {
        value: 'order-history',
        label: 'تاریخچه سفارشات',
        tabContent: OrderHistory,
    },
    { value: 'dashboard', label: 'داشبورد', tabContent: Dashboard },
    { value: 'transactions', label: 'معین', tabContent: Transactions },
    { value: 'groups', label: 'گروه‌ها', tabContent: Groups },
] as const satisfies ReadonlyArray<{
    value: string
    label: string
    tabContent: ComponentType
}>

export type CustomerDetailTabValue =
    (typeof CUSTOMER_DETAIL_TABS)[number]['value']

import type { TableFilterItem } from '@/src/shared/store/table-actions-store'
import type {
    TrialBalanceRowData,
    TrialBalanceTotals,
} from '../types'

export const TABLE_COLOUMN: TableFilterItem[] = [
    { id: 'code', header_label: 'کد', isChecked: true },
    { id: 'title', header_label: 'عنوان حساب', isChecked: true },
    { id: 'debitTurnover', header_label: 'گردش بدهکار', isChecked: true },
    { id: 'creditTurnover', header_label: 'گردش بستانکار', isChecked: true },
    { id: 'debitBalance', header_label: 'مانده بدهکار', isChecked: true },
    { id: 'creditBalance', header_label: 'مانده بستانکار', isChecked: true },
]

export const TRIAL_BALANCE_DUMMY: TrialBalanceRowData[] = [
    {
        id: '1',
        code: '1004',
        title: 'دارایی‌های جاری',
        debitTurnover: '12,400',
        creditTurnover: '6,200',
        debitBalance: '6,200',
        creditBalance: '0',
    },
    {
        id: '2',
        code: '2001',
        title: 'دارایی‌های ثابت',
        debitTurnover: '2,100',
        creditTurnover: '300',
        debitBalance: '1,800',
        creditBalance: '0',
    },
    {
        id: '3',
        code: '3031',
        title: 'بدهی‌های جاری',
        debitTurnover: '3,800',
        creditTurnover: '5,700',
        debitBalance: '0',
        creditBalance: '1,900',
    },
    {
        id: '4',
        code: '3837',
        title: 'حقوق صاحبان سهام',
        debitTurnover: '0',
        creditTurnover: '3,200',
        debitBalance: '0',
        creditBalance: '3,200',
    },
    {
        id: '5',
        code: '2809',
        title: 'درآمدها',
        debitTurnover: '200',
        creditTurnover: '8,800',
        debitBalance: '0',
        creditBalance: '8,600',
    },
    {
        id: '6',
        code: '0382',
        title: 'هزینه‌ها',
        debitTurnover: '7,700',
        creditTurnover: '20',
        debitBalance: '7,680',
        creditBalance: '0',
    },
]

export const TRIAL_BALANCE_TOTALS: TrialBalanceTotals = {
    debitTurnover: '26,200',
    creditTurnover: '26,200',
    debitBalance: '15,680',
    creditBalance: '15,680',
}

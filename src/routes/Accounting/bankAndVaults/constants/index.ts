export type BankAccountTab =
    | 'bankAccounts'
    | 'vaults'
    | 'pos'
    | 'checkbooks'

export type BankAccountData = {
    id: string
    name: string
    code: string
    logoUrl: string
    balance?: string
    status: 'active' | 'inactive'
    tab: BankAccountTab
}

export const BANK_ACCOUNTS_DUMMY: BankAccountData[] = [
    {
        id: '1',
        name: 'بانک صادرات',
        code: 'B_9372',
        logoUrl: '/images/shahr-bank.png',
        balance: '-',
        status: 'active',
        tab: 'bankAccounts',
    },
    {
        id: '2',
        name: 'بانک شهر',
        code: 'B_9372',
        logoUrl: '/images/shahr-bank.png',
        balance: '-',
        status: 'active',
        tab: 'bankAccounts',
    },
    {
        id: '3',
        name: 'بانک دی',
        code: 'B_9372',
        logoUrl: '/images/shahr-bank.png',
        balance: '-',
        status: 'active',
        tab: 'bankAccounts',
    },
    {
        id: '4',
        name: 'بانک صادرات',
        code: 'B_9372',
        logoUrl: '/images/shahr-bank.png',
        balance: '-',
        status: 'active',
        tab: 'bankAccounts',
    },
    {
        id: '5',
        name: 'بانک شهر',
        code: 'B_9372',
        logoUrl: '/images/shahr-bank.png',
        balance: '-',
        status: 'active',
        tab: 'bankAccounts',
    },
    {
        id: '6',
        name: 'بانک دی',
        code: 'B_9372',
        logoUrl: '/images/shahr-bank.png',
        balance: '-',
        status: 'active',
        tab: 'bankAccounts',
    },
]

export const filterBankAccounts = (
    accounts: BankAccountData[],
    tab: BankAccountTab | string
) => accounts.filter((account) => account.tab === tab)

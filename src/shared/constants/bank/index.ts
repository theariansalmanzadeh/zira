import type { FormDropdownOption } from '@/src/shared/components/ui/FormDropdown'
import type { IconLabel } from '@/src/shared/types/icon'
import banksJson from './banks.json'

export type BankDefinition = {
    name: string
    slug: string
    logo: string
}

export type BankOption = FormDropdownOption & {
    icon: IconLabel
}

const slugToIconLabel = (slug: string): IconLabel => {
    const parts = slug.split(/[-_]/).filter(Boolean)
    const label = parts
        .map((part, index) => {
            const lower = part.toLowerCase()
            if (index === 0) return lower
            return lower.charAt(0).toUpperCase() + lower.slice(1)
        })
        .join('')
    return label as IconLabel
}

export const BANKS = (banksJson as BankDefinition[]).map((bank) => ({
    ...bank,
    icon: slugToIconLabel(bank.slug),
}))

export const BANK_OPTIONS: BankOption[] = BANKS.map((bank) => ({
    label: bank.name,
    value: bank.slug,
    icon: bank.icon,
}))

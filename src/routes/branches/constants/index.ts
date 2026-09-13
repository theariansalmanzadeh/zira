import { IconLabel } from '@/src/shared/types/icon'

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    action?: () => void
    variant: 'primary' | 'default' | 'outline'
}

export type SectionHeading = {
    title: string
    subtitle: string
    buttons?: HeadingButton[]
    showPeriodToggle?: boolean
    showDateRange?: boolean
}

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'داشبورد شعب',
        subtitle: 'نمای کلی شبکه شعب، فروش و عملکرد — دوره: این ماه',
        showPeriodToggle: true,
        showDateRange: true,
        buttons: [
            {
                label: 'شعبه جدید',
                icon: 'addSm400Broken',
                href: '/admin/branches/new',
                variant: 'primary',
            },
        ],
    },
    list: {
        title: 'لیست شعب',
        subtitle: 'مدیریت شعب فروش و نمایندگی‌ها',
        buttons: [
            {
                label: 'شعبه جدید',
                icon: 'addSm400Broken',
                href: '/admin/branches/new',
                variant: 'primary',
            },
        ],
    },
    report: {
        title: 'گزارش و مقایسه شعب',
        subtitle: 'نمای کلی شبکه شعب، فروش و عملکرد — دوره: این ماه',
        buttons: [
            {
                label: 'خروجی اکسل',
                icon: 'export300Linear',
                variant: 'outline',
            },
        ],
    },
    new: null,
}

export const getBranchesSectionKey = (sub: string) => sub || 'dashboard'

export const getBranchesSectionKeyFromPath = (pathname: string): string | null => {
    const segments = pathname.replace(/^\/admin\/branches\/?/, '').split('/').filter(Boolean)

    if (segments.length === 0) return null

    return null
}

export const BRANCH_PERIOD_OPTIONS = [
    { value: 'month', label: 'ماه' },
    { value: 'week', label: 'هفته' },
    { value: 'today', label: 'امروز' },
] as const

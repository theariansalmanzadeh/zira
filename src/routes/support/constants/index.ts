import { IconLabel } from '@/src/shared/types/icon'

export type HeadingButton = {
    label: string
    icon?: IconLabel
    href?: string
    action?: () => void
    variant: 'primary' | 'default'
}

export type SectionHeading = {
    title: string
    subtitle: string
    buttons?: HeadingButton[]
}

const SUPPORT_SUBTITLE =
    'نمای کلی تیکت‌ها، زمان پاسخ‌گویی و ارتباطات — این هفته'

export const sectionToHeading: Record<string, SectionHeading | null> = {
    dashboard: {
        title: 'داشبورد پشتیبانی',
        subtitle: SUPPORT_SUBTITLE,
        buttons: [
            {
                label: 'پیام جدید',
                icon: 'addSm400Broken',
                href: '/admin/support/ticket/new',
                variant: 'primary',
            },
        ],
    },
    supportDashboard: {
        title: 'داشبورد پشتیبانی',
        subtitle: SUPPORT_SUBTITLE,
        buttons: [
            {
                label: 'پیام جدید',
                icon: 'addSm400Broken',
                href: '/admin/support/ticket/new',
                variant: 'primary',
            },
        ],
    },
    ticket: {
        title: 'صندوق تیکت‌ها',
        subtitle: SUPPORT_SUBTITLE,
        buttons: [
            {
                label: 'پیام جدید',
                icon: 'addSm400Broken',
                href: '/admin/support/ticket/new',
                variant: 'primary',
            },
        ],
    },
    department: {
        title: 'دپارتمان‌ها',
        subtitle: SUPPORT_SUBTITLE,
    },
    'colleague-messages': {
        title: 'پیام همکاران',
        subtitle: 'گفتگوهای داخلی بین همکاران پشتیبانی',
    },
}

export const getSupportSectionKey = (sub: string) => sub || 'dashboard'

export const getSupportSectionKeyFromPath = (
    searchParams: Pick<URLSearchParams, 'get'>
): string | null => {
    const sub = searchParams.get('sub')
    if (!sub) return null

    if (sub === 'supportDashboard') return 'dashboard'

    return sub
}

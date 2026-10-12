import type { VariantProps } from 'class-variance-authority'
import type { PillVariants } from '@/src/shared/components/ui/Pill'

export type CampaignStatus = 'active' | 'inactive' | 'archive' | 'draft'

export type CampaignItem = {
    id: string
    title: string
    subtitle: string
    status: CampaignStatus
    statusLabel: string
    statusVariant: VariantProps<typeof PillVariants>['variant']
    discount: string
    timeline: string
    visits: string
    orders: string
    conversionRate: string
    budgetUsedLabel: string
    budgetTotalLabel: string
    budgetPercent: number
}

export const CAMPAIGN_STATUS_LABEL: Record<CampaignStatus, string> = {
    active: 'فعال',
    inactive: 'غیرفعال',
    archive: 'آرشیو',
    draft: 'پیش‌نویس',
}

export const CAMPAIGN_STATUS_VARIANT: Record<
    CampaignStatus,
    VariantProps<typeof PillVariants>['variant']
> = {
    active: 'success',
    inactive: 'error',
    archive: 'tonal',
    draft: 'warning',
}

export const CAMPAIGNS_DUMMY: CampaignItem[] = [
    {
        id: '1',
        title: 'کمپین تابستانه',
        subtitle: 'مجموعه محصولات منتخب',
        status: 'active',
        statusLabel: CAMPAIGN_STATUS_LABEL.active,
        statusVariant: CAMPAIGN_STATUS_VARIANT.active,
        discount: '۲۰٪',
        timeline: '۱۰ روز',
        visits: '۱۲,۴۰۰',
        orders: '۸۹۰',
        conversionRate: '۷٫۲٪',
        budgetUsedLabel: '۳۲۰ م',
        budgetTotalLabel: '۵۰۰ م',
        budgetPercent: 64,
    },
    {
        id: '2',
        title: 'کمپین پاییزه',
        subtitle: 'ویژه دسته‌بندی لباس خواب',
        status: 'inactive',
        statusLabel: CAMPAIGN_STATUS_LABEL.inactive,
        statusVariant: CAMPAIGN_STATUS_VARIANT.inactive,
        discount: '۱۵٪',
        timeline: '۱۴ روز',
        visits: '۸,۲۰۰',
        orders: '۵۱۰',
        conversionRate: '۶٫۲٪',
        budgetUsedLabel: '۱۸۰ م',
        budgetTotalLabel: '۴۰۰ م',
        budgetPercent: 45,
    },
    {
        id: '3',
        title: 'کمپین VIP',
        subtitle: 'مشتریان ویژه',
        status: 'active',
        statusLabel: CAMPAIGN_STATUS_LABEL.active,
        statusVariant: CAMPAIGN_STATUS_VARIANT.active,
        discount: '۲۵٪',
        timeline: '۷ روز',
        visits: '۴,۶۰۰',
        orders: '۳۲۰',
        conversionRate: '۷٫۰٪',
        budgetUsedLabel: '۲۱۰ م',
        budgetTotalLabel: '۳۰۰ م',
        budgetPercent: 70,
    },
    {
        id: '4',
        title: 'کمپین نوروزی',
        subtitle: 'محصولات فصلی',
        status: 'archive',
        statusLabel: CAMPAIGN_STATUS_LABEL.archive,
        statusVariant: CAMPAIGN_STATUS_VARIANT.archive,
        discount: '۳۰٪',
        timeline: '۲۱ روز',
        visits: '۱۸,۹۰۰',
        orders: '۱,۴۵۰',
        conversionRate: '۷٫۷٪',
        budgetUsedLabel: '۴۸۰ م',
        budgetTotalLabel: '۶۰۰ م',
        budgetPercent: 80,
    },
    {
        id: '5',
        title: 'کمپین جدید',
        subtitle: 'در حال آماده‌سازی',
        status: 'draft',
        statusLabel: CAMPAIGN_STATUS_LABEL.draft,
        statusVariant: CAMPAIGN_STATUS_VARIANT.draft,
        discount: '۱۰٪',
        timeline: '۵ روز',
        visits: '۰',
        orders: '۰',
        conversionRate: '۰٪',
        budgetUsedLabel: '۰ م',
        budgetTotalLabel: '۲۵۰ م',
        budgetPercent: 0,
    },
]

export const getCampaignById = (id: string) =>
    CAMPAIGNS_DUMMY.find((campaign) => campaign.id === id) ?? CAMPAIGNS_DUMMY[0]

export const getCampaignDetailHref = (id: string) =>
    `/admin/catalog/campaigns/${id}`

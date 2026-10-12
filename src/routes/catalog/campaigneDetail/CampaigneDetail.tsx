'use client'

import { useRouter } from 'next/navigation'
import type { VariantProps } from 'class-variance-authority'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { Button } from '@/src/shared/components/ui/button'
import { Spinner } from '@/src/shared/components/ui/spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import type {
    AudienceOut,
    CampaignDetailOut,
    CampaignStatusEnum,
    ChannelEnum,
} from '@/src/api/types/admin/pricing'
import { useGetCampaign } from '@/src/routes/catalog/hooks/pricing'
import { formatFaDateTime, formatFaNumber } from '@/src/shared/libs/formatter'
import BudgetConsumption from './components/BudgetConsumption'
import CampaigneDeputy from './components/CampaigneDeputy'
import CampaigneSpecs, {
    type CampaigneSpecRow,
} from './components/CampaigneSpecs'
import Domains, { type DomainSection } from './components/Domains'
import Reports, {
    CATEGORY_SHARE_DUMMY,
    DAILY_TREND_DUMMY,
    REPORT_METRICS_DUMMY,
    TOP_PRODUCTS_DUMMY,
} from './components/Reports'

const STATUS_LABEL: Record<CampaignStatusEnum, string> = {
    DRAFT: 'پیش‌نویس',
    PUBLISHED: 'فعال',
    DISABLED: 'غیرفعال',
    ARCHIVED: 'آرشیو',
}

const STATUS_VARIANT: Record<
    CampaignStatusEnum,
    VariantProps<typeof PillVariants>['variant']
> = {
    DRAFT: 'warning',
    PUBLISHED: 'success',
    DISABLED: 'error',
    ARCHIVED: 'tonal',
}

const CHANNEL_LABEL: Record<ChannelEnum, string> = {
    ALL: 'همه کانال‌ها',
    ONLINE: 'آنلاین',
    APP: 'اپلیکیشن',
    IN_STORE: 'حضوری',
}

const dash = (value?: string | null) => value?.trim() || '—'

const audienceLabel = (audience: AudienceOut) =>
    audience.cooperation_level ||
    audience.customer_id ||
    audience.customer_group_id ||
    audience.audience_type

const budgetPercent = (used?: string | null, total?: string | null) => {
    const usedAmount = Number(used)
    const totalAmount = Number(total)
    if (!totalAmount || Number.isNaN(usedAmount) || Number.isNaN(totalAmount)) {
        return 0
    }
    return Math.min(100, Math.round((usedAmount / totalAmount) * 100))
}

const specRows = (campaign: CampaignDetailOut): CampaigneSpecRow[] => [
    { label: 'نام کمپین', value: campaign.name },
    { label: 'ماهیت کمپین', value: campaign.nature_display },
    { label: 'هدف کمپین', value: dash(campaign.goal) },
    { label: 'کانال', value: CHANNEL_LABEL[campaign.channel] },
    { label: 'تاریخ و ساعت شروع', value: formatFaDateTime(campaign.starts_at) },
    { label: 'تاریخ و ساعت خاتمه', value: formatFaDateTime(campaign.ends_at) },
    { label: 'توضیحات', value: dash(campaign.description) },
]

const productDomain = (campaign: CampaignDetailOut): DomainSection => ({
    label: 'محصولات مورد نظر',
    summary: `${formatFaNumber(campaign.targets.length)} مورد`,
    items: campaign.targets.map((target) => target.label),
    pillClassName:
        'border-0 bg-primary-container [&_span]:text-on-primary-container',
})

const customerDomain = (campaign: CampaignDetailOut): DomainSection => ({
    label: 'مشتریان مورد هدف',
    summary: `${formatFaNumber(campaign.audiences.length)} مورد`,
    items: campaign.audiences.map(audienceLabel),
    pillClassName: 'border-0 bg-info-container [&_span]:text-on-info-container',
})

type CampaigneDetailProps = {
    id: string
}

const CampaigneDetail = ({ id }: CampaigneDetailProps) => {
    const { back } = useRouter()
    const { data, isPending } = useGetCampaign(id)
    const campaign: CampaignDetailOut | undefined = data

    if (isPending) {
        return (
            <div className='flex justify-center py-10'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (!campaign) {
        return (
            <div className='py-10 text-center text-label-md text-outline'>
                کمپین یافت نشد.
            </div>
        )
    }

    const discountLabel =
        campaign.discounts[0]?.value_display ||
        formatFaNumber(campaign.discount_count)

    return (
        <div className="w-full rounded-card-lg p-6" dir="rtl">
            <div className="mb-6 flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                    <IconButton
                        icon="rightArrow"
                        onClick={() => back()}
                        iconClassName="size-6"
                        variant="ghost"
                    />
                    <span className="text-title-lg font-medium text-on-surface">
                        جزئیات کمپین
                    </span>
                    <Pill
                        text={STATUS_LABEL[campaign.status]}
                        variant={STATUS_VARIANT[campaign.status]}
                        className="border-0"
                    />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <Button variant="outline" size="default" className="gap-1.5">
                        <Icon label="edit400Linear" className="size-5 text-on-surface-variant" />
                        ویرایش کمپین
                    </Button>
                    <Button
                        variant="outline"
                        size="default"
                        className="text-error"
                    >
                        غیرفعال کردن
                    </Button>
                    <Button variant="outline" size="default">
                        آرشیو کردن
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-6 rounded-card-md bg-surface-container-lowest p-6">
                <div className="flex flex-col gap-2 text-right">
                    <h1 className="text-title-lg font-medium text-on-surface">
                        {campaign.name}
                    </h1>
                    <p className="text-label-md text-outline">
                        {campaign.nature_display}
                    </p>
                    <BudgetConsumption
                        className="mt-2"
                        label="مصرف بودجه"
                        usedLabel={formatFaNumber(campaign.budget_used)}
                        totalLabel={
                            campaign.budget
                                ? formatFaNumber(campaign.budget)
                                : '—'
                        }
                        percent={budgetPercent(
                            campaign.budget_used,
                            campaign.budget
                        )}
                    />
                </div>

                <div className="border-0 border-t-[1.5px] border-dashed border-outline-variant" />

                <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface-variant">
                            {discountLabel}
                        </span>
                        <span className="text-label-md text-outline">
                            درصد تخفیف
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface">
                            —
                        </span>
                        <span className="text-label-md text-outline">بازدید</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface">
                            —
                        </span>
                        <span className="text-label-md text-outline">سفارش</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-success">
                            —
                        </span>
                        <span className="text-label-md text-outline">
                            نرخ تبدیل
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 rounded-card-lg bg-surface-container-lowest p-6">
                <Tabs defaultValue="details" dir="rtl" className="w-full">
                    <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden border-b-0!">
                        <TabsTrigger value="details" className="border-b-0!">
                            مشخصات
                        </TabsTrigger>
                        <TabsTrigger value="reports" className="border-b-0!">
                            گزارش
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="pt-xl">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-8 flex flex-col gap-4">
                                <CampaigneSpecs
                                    title="مشخصات کمپین"
                                    rows={specRows(campaign)}
                                />
                                <Domains
                                    title="دامنه کمپین"
                                    products={productDomain(campaign)}
                                    customers={customerDomain(campaign)}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-4">
                                <CampaigneDeputy
                                    title="سابقه و مسئولین"
                                    createdAt={campaign.created_at}
                                    publishedAt={campaign.published_at || '—'}
                                    creatorName="—"
                                    publisherName="—"
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reports" className="pt-xl">
                        <Reports
                            title="گزارش عملکرد کمپین"
                            subtitle={`روند فروش، بازدید و نرخ تبدیل کمپین «${campaign.name}».`}
                            metrics={REPORT_METRICS_DUMMY}
                            chartTitle="روند روزانه کمپین"
                            chartSubtitle="مقایسه فروش با بازدید"
                            chartData={DAILY_TREND_DUMMY}
                            categoryShareTitle="سهم دسته‌بندی از فروش کمپین"
                            categoryShareTotal={750}
                            categoryShare={CATEGORY_SHARE_DUMMY}
                            topProductsTitle="پرفروش‌ترین کالاهای کمپین"
                            topProductsSubtitle="واحد: عدد"
                            topProducts={TOP_PRODUCTS_DUMMY}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default CampaigneDetail

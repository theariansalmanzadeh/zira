'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Button } from '@/src/shared/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/components/ui/Tabs'
import { getCampaignById } from '@/src/routes/catalog/campaigne/constants'
import BudgetConsumption from './components/BudgetConsumption'
import CampaigneDeputy, {
    CAMPAIGNE_DEPUTY_DUMMY,
} from './components/CampaigneDeputy'
import CampaigneSpecs, {
    CAMPAIGNE_SPECS_DUMMY,
} from './components/CampaigneSpecs'
import Domains, {
    DOMAIN_CUSTOMERS_DUMMY,
    DOMAIN_PRODUCTS_DUMMY,
} from './components/Domains'
import Reports, {
    CATEGORY_SHARE_DUMMY,
    DAILY_TREND_DUMMY,
    REPORT_METRICS_DUMMY,
    TOP_PRODUCTS_DUMMY,
} from './components/Reports'

type CampaigneDetailProps = {
    id?: string
}

const CampaigneDetail = ({ id = '1' }: CampaigneDetailProps) => {
    const { back } = useRouter()
    const campaign = getCampaignById(id)

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
                        text={campaign.statusLabel}
                        variant={campaign.statusVariant}
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
                        {campaign.title}
                    </h1>
                    <p className="text-label-md text-outline">
                        {campaign.subtitle}
                    </p>
                    <BudgetConsumption
                        className="mt-2"
                        label="مصرف بودجه"
                        usedLabel={campaign.budgetUsedLabel}
                        totalLabel={campaign.budgetTotalLabel}
                        percent={campaign.budgetPercent}
                    />
                </div>

                <div className="border-0 border-t-[1.5px] border-dashed border-outline-variant" />

                <div className="flex flex-row items-start justify-between gap-4">
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface-variant">
                            {campaign.discount}
                        </span>
                        <span className="text-label-md text-outline">
                            درصد تخفیف
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface">
                            {campaign.visits}
                        </span>
                        <span className="text-label-md text-outline">بازدید</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-on-surface">
                            {campaign.orders}
                        </span>
                        <span className="text-label-md text-outline">سفارش</span>
                    </div>
                    <div className="flex flex-col gap-2 text-right">
                        <span className="text-label-lg font-bold text-success">
                            {campaign.conversionRate}
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
                                    rows={CAMPAIGNE_SPECS_DUMMY}
                                />
                                <Domains
                                    title="دامنه کمپین"
                                    products={DOMAIN_PRODUCTS_DUMMY}
                                    customers={DOMAIN_CUSTOMERS_DUMMY}
                                />
                            </div>
                            <div className="col-span-4 flex flex-col gap-4">
                                <CampaigneDeputy
                                    title="سابقه و مسئولین"
                                    createdAt={CAMPAIGNE_DEPUTY_DUMMY.createdAt}
                                    publishedAt={CAMPAIGNE_DEPUTY_DUMMY.publishedAt}
                                    creatorName={CAMPAIGNE_DEPUTY_DUMMY.creatorName}
                                    publisherName={CAMPAIGNE_DEPUTY_DUMMY.publisherName}
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reports" className="pt-xl">
                        <Reports
                            title="گزارش عملکرد کمپین"
                            subtitle={`روند فروش، بازدید و نرخ تبدیل کمپین «${campaign.title}».`}
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

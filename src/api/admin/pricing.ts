import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    ListPricesParams,
    ExportPricesParams,
    PreviewItemPriceParams,
    ListBundlePricesParams,
    ListPriceListsParams,
    ListPriceListLinesParams,
    ImportPriceListRequest,
    ListContractsParams,
    ListDiscountsParams,
    ListCouponsParams,
    ExportCouponsParams,
    ListCampaignsParams,
    UpdateCampaignBannerRequest,
    ListTaxRulesParams,
    GetQuoteParams,
    PaginationOut_PriceRowOut_,
    PriceRowOut,
    PriceBulkIn,
    PriceBulkRowIn,
    PriceBulkOut,
    PriceDetailOut,
    PackComponentOut,
    PriceSetIn,
    PricePreviewOut,
    PaginationOut_BundlePriceOut_,
    BundlePriceOut,
    BundleLinePriceOut,
    BundleDiscountTypeEnum,
    BundlePriceIn,
    BundleLineDiscountIn,
    PaginationOut_PriceListOut_,
    PriceListOut,
    PriceListSourceEnum,
    PriceListStatusEnum,
    PriceListCreateIn,
    PriceListLineIn,
    PriceListUpdateIn,
    PaginationOut_PriceListLineOut_,
    PriceListLineOut,
    PaginationOut_ContractOut_,
    ContractOut,
    ContractDirectionEnum,
    ContractRoundingEnum,
    ContractStatusEnum,
    ContractCreateIn,
    ContractScopeIn,
    ContractDetailOut,
    ContractScopeOut,
    ContractUpdateIn,
    ContractPreviewOut,
    ContractPreviewRowOut,
    PaginationOut_DiscountOut_,
    DiscountOut,
    DiscountKindEnum,
    DiscountValueTypeEnum,
    DiscountTriggerEnum,
    PaymentScopeEnum,
    DiscountStatusEnum,
    ValidityEnum,
    DiscountCreateIn,
    TargetIn,
    TargetTypeEnum,
    AudienceIn,
    AudienceTypeEnum,
    CooperationLevelEnum,
    BundleRuleIn,
    TierIn,
    DiscountDetailOut,
    TargetOut,
    AudienceOut,
    BundleRuleOut,
    TierOut,
    DiscountUpdateIn,
    CouponIssueIn,
    CouponIssueOut,
    CouponOut,
    CouponStatusEnum,
    CouponSourceEnum,
    PaginationOut_CouponOut_,
    CouponCreateIn,
    CouponUpdateIn,
    PaginationOut_CampaignOut_,
    CampaignOut,
    CampaignNatureEnum,
    ChannelEnum,
    CampaignStatusEnum,
    CampaignPhaseEnum,
    CampaignCreateIn,
    CampaignTargetIn,
    CampaignDetailOut,
    CampaignTargetOut,
    CampaignUpdateIn,
    PaginationOut_TaxRuleOut_,
    TaxRuleOut,
    TaxRuleUpdateIn,
    QuoteOut,
    QuoteLineOut,
    QuoteDiscountOut,
    QuoteCartDiscountOut,
    QuoteCouponOut,
    SettlementTypeEnum,
} from '../types/admin/pricing'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

const multipartConfig = (
    config?: AxiosRequestConfig
): AxiosRequestConfig => ({
    ...config,
    headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
    },
})

export const listPrices = (
    params?: ListPricesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_PriceRowOut_>(`/pricing/prices`, {
        ...config,
        params: toParams(params),
    })

export const bulkSetPrices = (
    body: PriceBulkIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<PriceBulkOut, PriceBulkIn>(`/pricing/prices/bulk`, body, config)

export const exportPrices = (
    params?: ExportPricesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/pricing/prices/export`, {
        ...config,
        params: toParams(params),
    })

export const getItemPrice = (
    itemId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PriceDetailOut>(`/pricing/prices/${itemId}`, config)

export const setItemPrice = (
    itemId: string,
    body: PriceSetIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<PriceDetailOut, PriceSetIn>(`/pricing/prices/${itemId}`, body, config)

export const previewItemPrice = (
    itemId: string,
    params: PreviewItemPriceParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PricePreviewOut>(`/pricing/prices/${itemId}/preview`, {
        ...config,
        params: toParams(params),
    })

export const listBundlePrices = (
    params?: ListBundlePricesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BundlePriceOut_>(`/pricing/bundle-prices`, {
        ...config,
        params: toParams(params),
    })

export const getBundlePrice = (
    bundleId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<BundlePriceOut>(`/pricing/bundle-prices/${bundleId}`, config)

export const setBundlePrice = (
    bundleId: string,
    body: BundlePriceIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<BundlePriceOut, BundlePriceIn>(`/pricing/bundle-prices/${bundleId}`, body, config)

export const listPriceLists = (
    params?: ListPriceListsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_PriceListOut_>(`/pricing/price-lists`, {
        ...config,
        params: toParams(params),
    })

export const createPriceList = (
    body: PriceListCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PriceListOut, PriceListCreateIn>(`/pricing/price-lists`, body, config)

export const getPriceList = (
    pricelistId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PriceListOut>(`/pricing/price-lists/${pricelistId}`, config)

export const updatePriceList = (
    pricelistId: string,
    body: PriceListUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<PriceListOut, PriceListUpdateIn>(`/pricing/price-lists/${pricelistId}`, body, config)

export const listPriceListLines = (
    pricelistId: string,
    params?: ListPriceListLinesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_PriceListLineOut_>(`/pricing/price-lists/${pricelistId}/lines`, {
        ...config,
        params: toParams(params),
    })

export const importPriceList = (
    pricelistId: string,
    body: ImportPriceListRequest,
    config?: AxiosRequestConfig
) => {
    const formData = new FormData()
    formData.append('file', body.file)
    return staffAuthPut<PriceListOut, FormData>(`/pricing/price-lists/${pricelistId}/import`, formData, multipartConfig(config))
}

export const publishPriceList = (
    pricelistId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PriceListOut>(`/pricing/price-lists/${pricelistId}/publish`, undefined, config)

export const cancelPriceList = (
    pricelistId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<PriceListOut>(`/pricing/price-lists/${pricelistId}/cancel`, undefined, config)

export const listContracts = (
    params?: ListContractsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ContractOut_>(`/pricing/contracts`, {
        ...config,
        params: toParams(params),
    })

export const createContract = (
    body: ContractCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ContractDetailOut, ContractCreateIn>(`/pricing/contracts`, body, config)

export const getContract = (
    contractId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ContractDetailOut>(`/pricing/contracts/${contractId}`, config)

export const updateContract = (
    contractId: string,
    body: ContractUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ContractDetailOut, ContractUpdateIn>(`/pricing/contracts/${contractId}`, body, config)

export const previewContract = (
    contractId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ContractPreviewOut>(`/pricing/contracts/${contractId}/preview`, config)

export const applyContract = (
    contractId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<PriceListOut>(`/pricing/contracts/${contractId}/apply`, undefined, config)

export const cancelContract = (
    contractId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ContractDetailOut>(`/pricing/contracts/${contractId}/cancel`, undefined, config)

export const listDiscounts = (
    params?: ListDiscountsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_DiscountOut_>(`/pricing/discounts`, {
        ...config,
        params: toParams(params),
    })

export const createDiscount = (
    body: DiscountCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<DiscountDetailOut, DiscountCreateIn>(`/pricing/discounts`, body, config)

export const getDiscount = (
    discountId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<DiscountDetailOut>(`/pricing/discounts/${discountId}`, config)

export const updateDiscount = (
    discountId: string,
    body: DiscountUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<DiscountDetailOut, DiscountUpdateIn>(`/pricing/discounts/${discountId}`, body, config)

export const deleteDiscount = (
    discountId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/pricing/discounts/${discountId}`, undefined, config)

export const approveDiscount = (
    discountId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<DiscountDetailOut>(`/pricing/discounts/${discountId}/approve`, undefined, config)

export const deactivateDiscount = (
    discountId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<DiscountDetailOut>(`/pricing/discounts/${discountId}/deactivate`, undefined, config)

export const archiveDiscount = (
    discountId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<DiscountDetailOut>(`/pricing/discounts/${discountId}/archive`, undefined, config)

export const issueDiscountCoupons = (
    discountId: string,
    body: CouponIssueIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CouponIssueOut, CouponIssueIn>(`/pricing/discounts/${discountId}/coupons`, body, config)

export const listCoupons = (
    params?: ListCouponsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_CouponOut_>(`/pricing/coupons`, {
        ...config,
        params: toParams(params),
    })

export const createCoupon = (
    body: CouponCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CouponOut, CouponCreateIn>(`/pricing/coupons`, body, config)

export const exportCoupons = (
    params?: ExportCouponsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/pricing/coupons/export`, {
        ...config,
        params: toParams(params),
    })

export const getCoupon = (
    couponId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CouponOut>(`/pricing/coupons/${couponId}`, config)

export const updateCoupon = (
    couponId: string,
    body: CouponUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CouponOut, CouponUpdateIn>(`/pricing/coupons/${couponId}`, body, config)

export const enableCoupon = (
    couponId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CouponOut>(`/pricing/coupons/${couponId}/enable`, undefined, config)

export const disableCoupon = (
    couponId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CouponOut>(`/pricing/coupons/${couponId}/disable`, undefined, config)

export const listCampaigns = (
    params?: ListCampaignsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_CampaignOut_>(`/pricing/campaigns`, {
        ...config,
        params: toParams(params),
    })

export const createCampaign = (
    body: CampaignCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CampaignDetailOut, CampaignCreateIn>(`/pricing/campaigns`, body, config)

export const getCampaign = (
    campaignId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CampaignDetailOut>(`/pricing/campaigns/${campaignId}`, config)

export const updateCampaign = (
    campaignId: string,
    body: CampaignUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CampaignDetailOut, CampaignUpdateIn>(`/pricing/campaigns/${campaignId}`, body, config)

export const updateCampaignBanner = (
    campaignId: string,
    body: UpdateCampaignBannerRequest,
    config?: AxiosRequestConfig
) => {
    const formData = new FormData()
    formData.append('banner', body.banner)
    return staffAuthPut<CampaignDetailOut, FormData>(`/pricing/campaigns/${campaignId}/banner`, formData, multipartConfig(config))
}

export const publishCampaign = (
    campaignId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CampaignDetailOut>(`/pricing/campaigns/${campaignId}/publish`, undefined, config)

export const disableCampaign = (
    campaignId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CampaignDetailOut>(`/pricing/campaigns/${campaignId}/disable`, undefined, config)

export const archiveCampaign = (
    campaignId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CampaignDetailOut>(`/pricing/campaigns/${campaignId}/archive`, undefined, config)

export const listTaxRules = (
    params?: ListTaxRulesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_TaxRuleOut_>(`/pricing/tax-rules`, {
        ...config,
        params: toParams(params),
    })

export const updateTaxRule = (
    taxRuleId: string,
    body: TaxRuleUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<TaxRuleOut, TaxRuleUpdateIn>(`/pricing/tax-rules/${taxRuleId}`, body, config)

export const getQuote = (
    params?: GetQuoteParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<QuoteOut>(`/pricing/quote`, {
        ...config,
        params: toParams(params),
    })


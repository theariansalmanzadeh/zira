'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    listPrices,
    bulkSetPrices,
    exportPrices,
    getItemPrice,
    setItemPrice,
    previewItemPrice,
    listBundlePrices,
    getBundlePrice,
    setBundlePrice,
    listPriceLists,
    createPriceList,
    getPriceList,
    updatePriceList,
    listPriceListLines,
    importPriceList,
    publishPriceList,
    cancelPriceList,
    listContracts,
    createContract,
    getContract,
    updateContract,
    previewContract,
    applyContract,
    cancelContract,
    listDiscounts,
    createDiscount,
    getDiscount,
    updateDiscount,
    deleteDiscount,
    approveDiscount,
    deactivateDiscount,
    archiveDiscount,
    issueDiscountCoupons,
    listCoupons,
    createCoupon,
    exportCoupons,
    getCoupon,
    updateCoupon,
    enableCoupon,
    disableCoupon,
    listCampaigns,
    createCampaign,
    getCampaign,
    updateCampaign,
    updateCampaignBanner,
    publishCampaign,
    disableCampaign,
    archiveCampaign,
    listTaxRules,
    updateTaxRule,
    getQuote,
} from '@/src/api/admin/pricing'
import type {
    BundlePriceIn,
    CampaignCreateIn,
    CampaignUpdateIn,
    ContractCreateIn,
    ContractUpdateIn,
    CouponCreateIn,
    CouponIssueIn,
    CouponUpdateIn,
    DiscountCreateIn,
    DiscountUpdateIn,
    ExportCouponsParams,
    ExportPricesParams,
    GetQuoteParams,
    ImportPriceListRequest,
    ListBundlePricesParams,
    ListCampaignsParams,
    ListContractsParams,
    ListCouponsParams,
    ListDiscountsParams,
    ListPriceListLinesParams,
    ListPriceListsParams,
    ListPricesParams,
    ListTaxRulesParams,
    PreviewItemPriceParams,
    PriceBulkIn,
    PriceListCreateIn,
    PriceListUpdateIn,
    PriceSetIn,
    TaxRuleUpdateIn,
    UpdateCampaignBannerRequest,
} from '@/src/api/types/admin/pricing'

export const pricingKeys = {
    all: ['pricing'] as const,
    prices: {
        all: () => [...pricingKeys.all, 'prices'] as const,
        listPrices: (params?: ListPricesParams) =>
            [...pricingKeys.prices.all(), params ?? {}] as const,
        getItemPrice: (itemId: string) =>
            [...pricingKeys.prices.all(), itemId] as const,
        previewItemPrice: (itemId: string, params: PreviewItemPriceParams) =>
            [...pricingKeys.prices.all(), itemId, params ?? {}] as const,
    },
    bundlePrices: {
        all: () => [...pricingKeys.all, 'bundlePrices'] as const,
        listBundlePrices: (params?: ListBundlePricesParams) =>
            [...pricingKeys.bundlePrices.all(), params ?? {}] as const,
        getBundlePrice: (bundleId: string) =>
            [...pricingKeys.bundlePrices.all(), bundleId] as const,
    },
    priceLists: {
        all: () => [...pricingKeys.all, 'priceLists'] as const,
        listPriceLists: (params?: ListPriceListsParams) =>
            [...pricingKeys.priceLists.all(), params ?? {}] as const,
        getPriceList: (pricelistId: string) =>
            [...pricingKeys.priceLists.all(), pricelistId] as const,
        listPriceListLines: (pricelistId: string, params?: ListPriceListLinesParams) =>
            [...pricingKeys.priceLists.all(), pricelistId, params ?? {}] as const,
    },
    contracts: {
        all: () => [...pricingKeys.all, 'contracts'] as const,
        listContracts: (params?: ListContractsParams) =>
            [...pricingKeys.contracts.all(), params ?? {}] as const,
        getContract: (contractId: string) =>
            [...pricingKeys.contracts.all(), contractId] as const,
        previewContract: (contractId: string) =>
            [...pricingKeys.contracts.all(), contractId] as const,
    },
    discounts: {
        all: () => [...pricingKeys.all, 'discounts'] as const,
        listDiscounts: (params?: ListDiscountsParams) =>
            [...pricingKeys.discounts.all(), params ?? {}] as const,
        getDiscount: (discountId: string) =>
            [...pricingKeys.discounts.all(), discountId] as const,
    },
    coupons: {
        all: () => [...pricingKeys.all, 'coupons'] as const,
        listCoupons: (params?: ListCouponsParams) =>
            [...pricingKeys.coupons.all(), params ?? {}] as const,
        getCoupon: (couponId: string) =>
            [...pricingKeys.coupons.all(), couponId] as const,
    },
    campaigns: {
        all: () => [...pricingKeys.all, 'campaigns'] as const,
        listCampaigns: (params?: ListCampaignsParams) =>
            [...pricingKeys.campaigns.all(), params ?? {}] as const,
        getCampaign: (campaignId: string) =>
            [...pricingKeys.campaigns.all(), campaignId] as const,
    },
    taxRules: {
        all: () => [...pricingKeys.all, 'taxRules'] as const,
        listTaxRules: (params?: ListTaxRulesParams) =>
            [...pricingKeys.taxRules.all(), params ?? {}] as const,
    },
    quote: {
        all: () => [...pricingKeys.all, 'quote'] as const,
        getQuote: (params?: GetQuoteParams) =>
            [...pricingKeys.quote.all(), params ?? {}] as const,
    },
}

export const useListPrices = (params?: ListPricesParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.prices.listPrices(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listPrices(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useBulkSetPrices = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: PriceBulkIn) => {
            const result = await bulkSetPrices(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.prices.all() })
        },
    })
}

export const useExportPrices = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { params?: ExportPricesParams }) => {
            const result = await exportPrices(input.params)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.prices.all() })
        },
    })
}

export const useGetItemPrice = (itemId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.prices.getItemPrice(itemId),
        enabled: Boolean(itemId) && enabled,
        queryFn: async () => {
            const result = await getItemPrice(itemId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetItemPrice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { itemId: string; body: PriceSetIn }) => {
            const result = await setItemPrice(input.itemId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.prices.all() })
        },
    })
}

export const usePreviewItemPrice = (itemId: string, params: PreviewItemPriceParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.prices.previewItemPrice(itemId, params),
        enabled: Boolean(itemId) && enabled,
        queryFn: async () => {
            const result = await previewItemPrice(itemId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListBundlePrices = (params?: ListBundlePricesParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.bundlePrices.listBundlePrices(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listBundlePrices(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetBundlePrice = (bundleId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.bundlePrices.getBundlePrice(bundleId),
        enabled: Boolean(bundleId) && enabled,
        queryFn: async () => {
            const result = await getBundlePrice(bundleId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetBundlePrice = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { bundleId: string; body: BundlePriceIn }) => {
            const result = await setBundlePrice(input.bundleId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.bundlePrices.all() })
        },
    })
}

export const useListPriceLists = (params?: ListPriceListsParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.priceLists.listPriceLists(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listPriceLists(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreatePriceList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: PriceListCreateIn) => {
            const result = await createPriceList(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.priceLists.all() })
        },
    })
}

export const useGetPriceList = (pricelistId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.priceLists.getPriceList(pricelistId),
        enabled: Boolean(pricelistId) && enabled,
        queryFn: async () => {
            const result = await getPriceList(pricelistId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdatePriceList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { pricelistId: string; body: PriceListUpdateIn }) => {
            const result = await updatePriceList(input.pricelistId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.priceLists.all() })
        },
    })
}

export const useListPriceListLines = (pricelistId: string, params?: ListPriceListLinesParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.priceLists.listPriceListLines(pricelistId, params),
        enabled: Boolean(pricelistId) && enabled,
        queryFn: async () => {
            const result = await listPriceListLines(pricelistId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useImportPriceList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { pricelistId: string; body: ImportPriceListRequest }) => {
            const result = await importPriceList(input.pricelistId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.priceLists.all() })
        },
    })
}

export const usePublishPriceList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { pricelistId: string }) => {
            const result = await publishPriceList(input.pricelistId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.priceLists.all() })
        },
    })
}

export const useCancelPriceList = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { pricelistId: string }) => {
            const result = await cancelPriceList(input.pricelistId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.priceLists.all() })
        },
    })
}

export const useListContracts = (params?: ListContractsParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.contracts.listContracts(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listContracts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateContract = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: ContractCreateIn) => {
            const result = await createContract(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.contracts.all() })
        },
    })
}

export const useGetContract = (contractId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.contracts.getContract(contractId),
        enabled: Boolean(contractId) && enabled,
        queryFn: async () => {
            const result = await getContract(contractId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateContract = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { contractId: string; body: ContractUpdateIn }) => {
            const result = await updateContract(input.contractId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.contracts.all() })
        },
    })
}

export const usePreviewContract = (contractId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.contracts.previewContract(contractId),
        enabled: Boolean(contractId) && enabled,
        queryFn: async () => {
            const result = await previewContract(contractId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useApplyContract = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { contractId: string }) => {
            const result = await applyContract(input.contractId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.contracts.all() })
        },
    })
}

export const useCancelContract = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { contractId: string }) => {
            const result = await cancelContract(input.contractId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.contracts.all() })
        },
    })
}

export const useListDiscounts = (params?: ListDiscountsParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.discounts.listDiscounts(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listDiscounts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: DiscountCreateIn) => {
            const result = await createDiscount(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useGetDiscount = (discountId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.discounts.getDiscount(discountId),
        enabled: Boolean(discountId) && enabled,
        queryFn: async () => {
            const result = await getDiscount(discountId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { discountId: string; body: DiscountUpdateIn }) => {
            const result = await updateDiscount(input.discountId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useDeleteDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { discountId: string }) => {
            const result = await deleteDiscount(input.discountId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useApproveDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { discountId: string }) => {
            const result = await approveDiscount(input.discountId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useDeactivateDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { discountId: string }) => {
            const result = await deactivateDiscount(input.discountId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useArchiveDiscount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { discountId: string }) => {
            const result = await archiveDiscount(input.discountId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useIssueDiscountCoupons = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { discountId: string; body: CouponIssueIn }) => {
            const result = await issueDiscountCoupons(input.discountId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.coupons.all() })
            queryClient.invalidateQueries({ queryKey: pricingKeys.discounts.all() })
        },
    })
}

export const useListCoupons = (params?: ListCouponsParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.coupons.listCoupons(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listCoupons(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCoupon = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: CouponCreateIn) => {
            const result = await createCoupon(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.coupons.all() })
        },
    })
}

export const useExportCoupons = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { params?: ExportCouponsParams }) => {
            const result = await exportCoupons(input.params)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.coupons.all() })
        },
    })
}

export const useGetCoupon = (couponId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.coupons.getCoupon(couponId),
        enabled: Boolean(couponId) && enabled,
        queryFn: async () => {
            const result = await getCoupon(couponId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCoupon = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { couponId: string; body: CouponUpdateIn }) => {
            const result = await updateCoupon(input.couponId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.coupons.all() })
        },
    })
}

export const useEnableCoupon = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { couponId: string }) => {
            const result = await enableCoupon(input.couponId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.coupons.all() })
        },
    })
}

export const useDisableCoupon = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { couponId: string }) => {
            const result = await disableCoupon(input.couponId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.coupons.all() })
        },
    })
}

export const useListCampaigns = (params?: ListCampaignsParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.campaigns.listCampaigns(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listCampaigns(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCampaign = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: CampaignCreateIn) => {
            const result = await createCampaign(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.campaigns.all() })
        },
    })
}

export const useGetCampaign = (campaignId: string, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.campaigns.getCampaign(campaignId),
        enabled: Boolean(campaignId) && enabled,
        queryFn: async () => {
            const result = await getCampaign(campaignId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateCampaign = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { campaignId: string; body: CampaignUpdateIn }) => {
            const result = await updateCampaign(input.campaignId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.campaigns.all() })
        },
    })
}

export const useUpdateCampaignBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { campaignId: string; body: UpdateCampaignBannerRequest }) => {
            const result = await updateCampaignBanner(input.campaignId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.campaigns.all() })
        },
    })
}

export const usePublishCampaign = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { campaignId: string }) => {
            const result = await publishCampaign(input.campaignId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.campaigns.all() })
        },
    })
}

export const useDisableCampaign = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { campaignId: string }) => {
            const result = await disableCampaign(input.campaignId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.campaigns.all() })
        },
    })
}

export const useArchiveCampaign = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { campaignId: string }) => {
            const result = await archiveCampaign(input.campaignId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.campaigns.all() })
        },
    })
}

export const useListTaxRules = (params?: ListTaxRulesParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.taxRules.listTaxRules(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await listTaxRules(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateTaxRule = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { taxRuleId: string; body: TaxRuleUpdateIn }) => {
            const result = await updateTaxRule(input.taxRuleId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pricingKeys.taxRules.all() })
        },
    })
}

export const useGetQuote = (params?: GetQuoteParams, enabled = true) => {
    return useQuery({
        queryKey: pricingKeys.quote.getQuote(params),
        enabled: enabled,
        queryFn: async () => {
            const result = await getQuote(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}


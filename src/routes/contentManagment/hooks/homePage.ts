'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    dashboard,
    listHomeBlocks,
    previewHome,
    reorderHomeBlocks,
    publishAll,
    homeBlockDetail,
    updateHomeBlock,
    hideHomeBlock,
    showHomeBlock,
    publishHomeBlock,
    unpublishHomeBlock,
    blockItems,
    setBlockItems,
    listPromos,
    createPromo,
    updatePromo,
    archivePromo,
    publishPromo,
    unpublishPromo,
    listCtas,
    createCta,
    updateCta,
    archiveCta,
    publishCta,
    unpublishCta,
    listBrands,
    createBrand,
    updateBrand,
    setBrandLogo,
    archiveBrand,
    publishBrand,
    unpublishBrand,
    listSlides,
    createSlide,
    updateSlide,
    setSlideImage,
    archiveSlide,
    publishSlide,
    unpublishSlide,
    listBanners,
    createBanner,
    updateBanner,
    setBannerImage,
    archiveBanner,
    publishBanner,
    unpublishBanner,
} from '@/src/api/admin/cms/homePage'
import type {
    ListHomeBlocksParams,
    OrderIn,
    HomeBlockUpdateIn,
    BlockItemsParams,
    BlockItemsIn,
    ListPromosParams,
    PromoIn,
    PromoUpdateIn,
    ListCtasParams,
    CtaIn,
    CtaUpdateIn,
    ListBrandsParams,
    BrandIn,
    BrandUpdateIn,
    SetBrandLogoRequest,
    ListSlidesParams,
    CreateSlideRequest,
    SlideUpdateIn,
    SetSlideImageRequest,
    ListBannersParams,
    CreateBannerRequest,
    BannerUpdateIn,
    SetBannerImageRequest,
} from '@/src/api/types/admin/cms/homePage'

export const cmsHomePageKeys = {
    all: ['cms', 'homePage'] as const,
    dashboard: () =>
        [...cmsHomePageKeys.all, 'dashboard'] as const,
    listHomeBlocks: (params?: ListHomeBlocksParams) =>
        [...cmsHomePageKeys.all, 'listHomeBlocks', params ?? {}] as const,
    previewHome: () =>
        [...cmsHomePageKeys.all, 'previewHome'] as const,
    homeBlockDetail: (blockId: string) =>
        [...cmsHomePageKeys.all, 'homeBlockDetail', blockId] as const,
    blockItems: (blockId: string, params?: BlockItemsParams) =>
        [...cmsHomePageKeys.all, 'blockItems', blockId, params ?? {}] as const,
    listPromos: (params?: ListPromosParams) =>
        [...cmsHomePageKeys.all, 'listPromos', params ?? {}] as const,
    listCtas: (params?: ListCtasParams) =>
        [...cmsHomePageKeys.all, 'listCtas', params ?? {}] as const,
    listBrands: (params?: ListBrandsParams) =>
        [...cmsHomePageKeys.all, 'listBrands', params ?? {}] as const,
    listSlides: (params?: ListSlidesParams) =>
        [...cmsHomePageKeys.all, 'listSlides', params ?? {}] as const,
    listBanners: (params?: ListBannersParams) =>
        [...cmsHomePageKeys.all, 'listBanners', params ?? {}] as const,
}

export const useDashboard = () => {
    return useQuery({
        queryKey: cmsHomePageKeys.dashboard(),
        
        queryFn: async () => {
            const result = await dashboard()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListHomeBlocks = (params?: ListHomeBlocksParams) => {
    return useQuery({
        queryKey: cmsHomePageKeys.listHomeBlocks(params),
        
        queryFn: async () => {
            const result = await listHomeBlocks(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const usePreviewHome = () => {
    return useQuery({
        queryKey: cmsHomePageKeys.previewHome(),
        
        queryFn: async () => {
            const result = await previewHome()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useReorderHomeBlocks = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: OrderIn }) => {
            const result = await reorderHomeBlocks(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishAll = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const result = await publishAll()
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useHomeBlockDetail = (blockId: string, enabled = true) => {
    return useQuery({
        queryKey: cmsHomePageKeys.homeBlockDetail(blockId),
        enabled: Boolean(blockId) && enabled,
        queryFn: async () => {
            const result = await homeBlockDetail(blockId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateHomeBlock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ blockId, body }: { blockId: string; body: HomeBlockUpdateIn }) => {
            const result = await updateHomeBlock(blockId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useHideHomeBlock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ blockId }: { blockId: string }) => {
            const result = await hideHomeBlock(blockId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useShowHomeBlock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ blockId }: { blockId: string }) => {
            const result = await showHomeBlock(blockId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishHomeBlock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ blockId }: { blockId: string }) => {
            const result = await publishHomeBlock(blockId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUnpublishHomeBlock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ blockId }: { blockId: string }) => {
            const result = await unpublishHomeBlock(blockId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useBlockItems = (blockId: string, params?: BlockItemsParams, enabled = true) => {
    return useQuery({
        queryKey: cmsHomePageKeys.blockItems(blockId, params),
        enabled: Boolean(blockId) && enabled,
        queryFn: async () => {
            const result = await blockItems(blockId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useSetBlockItems = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ blockId, body }: { blockId: string; body: BlockItemsIn }) => {
            const result = await setBlockItems(blockId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useListPromos = (params?: ListPromosParams) => {
    return useQuery({
        queryKey: cmsHomePageKeys.listPromos(params),
        
        queryFn: async () => {
            const result = await listPromos(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreatePromo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: PromoIn }) => {
            const result = await createPromo(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUpdatePromo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ promoId, body }: { promoId: string; body: PromoUpdateIn }) => {
            const result = await updatePromo(promoId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useArchivePromo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ promoId }: { promoId: string }) => {
            const result = await archivePromo(promoId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishPromo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ promoId }: { promoId: string }) => {
            const result = await publishPromo(promoId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUnpublishPromo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ promoId }: { promoId: string }) => {
            const result = await unpublishPromo(promoId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useListCtas = (params?: ListCtasParams) => {
    return useQuery({
        queryKey: cmsHomePageKeys.listCtas(params),
        
        queryFn: async () => {
            const result = await listCtas(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCta = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: CtaIn }) => {
            const result = await createCta(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUpdateCta = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ ctaId, body }: { ctaId: string; body: CtaUpdateIn }) => {
            const result = await updateCta(ctaId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useArchiveCta = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ ctaId }: { ctaId: string }) => {
            const result = await archiveCta(ctaId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishCta = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ ctaId }: { ctaId: string }) => {
            const result = await publishCta(ctaId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUnpublishCta = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ ctaId }: { ctaId: string }) => {
            const result = await unpublishCta(ctaId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useListBrands = (params?: ListBrandsParams) => {
    return useQuery({
        queryKey: cmsHomePageKeys.listBrands(params),
        
        queryFn: async () => {
            const result = await listBrands(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: BrandIn }) => {
            const result = await createBrand(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUpdateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ brandId, body }: { brandId: string; body: BrandUpdateIn }) => {
            const result = await updateBrand(brandId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useSetBrandLogo = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ brandId, body }: { brandId: string; body: SetBrandLogoRequest }) => {
            const result = await setBrandLogo(brandId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useArchiveBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ brandId }: { brandId: string }) => {
            const result = await archiveBrand(brandId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ brandId }: { brandId: string }) => {
            const result = await publishBrand(brandId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUnpublishBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ brandId }: { brandId: string }) => {
            const result = await unpublishBrand(brandId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useListSlides = (params?: ListSlidesParams) => {
    return useQuery({
        queryKey: cmsHomePageKeys.listSlides(params),
        
        queryFn: async () => {
            const result = await listSlides(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateSlide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: CreateSlideRequest }) => {
            const result = await createSlide(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUpdateSlide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ slideId, body }: { slideId: string; body: SlideUpdateIn }) => {
            const result = await updateSlide(slideId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useSetSlideImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ slideId, body }: { slideId: string; body: SetSlideImageRequest }) => {
            const result = await setSlideImage(slideId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useArchiveSlide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ slideId }: { slideId: string }) => {
            const result = await archiveSlide(slideId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishSlide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ slideId }: { slideId: string }) => {
            const result = await publishSlide(slideId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUnpublishSlide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ slideId }: { slideId: string }) => {
            const result = await unpublishSlide(slideId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useListBanners = (params?: ListBannersParams) => {
    return useQuery({
        queryKey: cmsHomePageKeys.listBanners(params),
        
        queryFn: async () => {
            const result = await listBanners(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: CreateBannerRequest }) => {
            const result = await createBanner(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUpdateBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ bannerId, body }: { bannerId: string; body: BannerUpdateIn }) => {
            const result = await updateBanner(bannerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useSetBannerImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ bannerId, body }: { bannerId: string; body: SetBannerImageRequest }) => {
            const result = await setBannerImage(bannerId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useArchiveBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ bannerId }: { bannerId: string }) => {
            const result = await archiveBanner(bannerId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const usePublishBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ bannerId }: { bannerId: string }) => {
            const result = await publishBanner(bannerId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

export const useUnpublishBanner = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ bannerId }: { bannerId: string }) => {
            const result = await unpublishBanner(bannerId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsHomePageKeys.all })
        },
    })
}

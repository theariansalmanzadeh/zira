import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../../http'
import type {
    BannerOut,
    BannerUpdateIn,
    BlockItemOut,
    BlockItemsIn,
    BlockItemsParams,
    BrandIn,
    BrandOut,
    BrandUpdateIn,
    CreateBannerRequest,
    CreateSlideRequest,
    CtaIn,
    CtaOut,
    CtaUpdateIn,
    DashboardOut,
    HomeBlockOut,
    HomeBlockUpdateIn,
    HomePreviewOut,
    ListBannersParams,
    ListBrandsParams,
    ListCtasParams,
    ListHomeBlocksParams,
    ListPromosParams,
    ListSlidesParams,
    OrderIn,
    PaginationOut_BannerOut_,
    PaginationOut_BlockItemOut_,
    PaginationOut_BrandOut_,
    PaginationOut_CtaOut_,
    PaginationOut_HomeBlockOut_,
    PaginationOut_PromoOut_,
    PaginationOut_SlideOut_,
    PromoIn,
    PromoOut,
    PromoUpdateIn,
    PublishAllOut,
    SetBannerImageRequest,
    SetBrandLogoRequest,
    SetSlideImageRequest,
    SlideOut,
    SlideUpdateIn,
} from '../../types/admin/cms/homePage'

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

const toSetBrandLogoFormData = (body: SetBrandLogoRequest) => {
    const formData = new FormData()
    if (body.logo !== undefined && body.logo !== null) formData.append('logo', body.logo)
    return formData
}

const toCreateSlideFormData = (body: CreateSlideRequest) => {
    const formData = new FormData()
    if (body.name !== undefined && body.name !== null) formData.append('name', String(body.name))
    if (body.alt_text !== undefined && body.alt_text !== null) formData.append('alt_text', String(body.alt_text))
    if (body.body_text !== undefined && body.body_text !== null) formData.append('body_text', String(body.body_text))
    if (body.item_id !== undefined && body.item_id !== null) formData.append('item_id', String(body.item_id))
    if (body.cta_label !== undefined && body.cta_label !== null) formData.append('cta_label', String(body.cta_label))
    if (body.cta_url !== undefined && body.cta_url !== null) formData.append('cta_url', String(body.cta_url))
    if (body.sort_order !== undefined && body.sort_order !== null) formData.append('sort_order', String(body.sort_order))
    if (body.starts_at !== undefined && body.starts_at !== null) formData.append('starts_at', String(body.starts_at))
    if (body.ends_at !== undefined && body.ends_at !== null) formData.append('ends_at', String(body.ends_at))
    if (body.image !== undefined && body.image !== null) formData.append('image', body.image)
    return formData
}

const toSetSlideImageFormData = (body: SetSlideImageRequest) => {
    const formData = new FormData()
    if (body.image !== undefined && body.image !== null) formData.append('image', body.image)
    return formData
}

const toCreateBannerFormData = (body: CreateBannerRequest) => {
    const formData = new FormData()
    if (body.name !== undefined && body.name !== null) formData.append('name', String(body.name))
    if (body.position !== undefined && body.position !== null) formData.append('position', String(body.position))
    if (body.alt_text !== undefined && body.alt_text !== null) formData.append('alt_text', String(body.alt_text))
    if (body.item_id !== undefined && body.item_id !== null) formData.append('item_id', String(body.item_id))
    if (body.cta_label !== undefined && body.cta_label !== null) formData.append('cta_label', String(body.cta_label))
    if (body.target_url !== undefined && body.target_url !== null) formData.append('target_url', String(body.target_url))
    if (body.sort_order !== undefined && body.sort_order !== null) formData.append('sort_order', String(body.sort_order))
    if (body.starts_at !== undefined && body.starts_at !== null) formData.append('starts_at', String(body.starts_at))
    if (body.ends_at !== undefined && body.ends_at !== null) formData.append('ends_at', String(body.ends_at))
    if (body.image !== undefined && body.image !== null) formData.append('image', body.image)
    return formData
}

const toSetBannerImageFormData = (body: SetBannerImageRequest) => {
    const formData = new FormData()
    if (body.image !== undefined && body.image !== null) formData.append('image', body.image)
    return formData
}

export const dashboard = (
    config?: AxiosRequestConfig
) =>
    staffAuthGet<DashboardOut>(`/cms/dashboard`, config)

export const listHomeBlocks = (
    params?: ListHomeBlocksParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_HomeBlockOut_>(`/cms/home-blocks`, { ...config, params: toParams(params) })

export const previewHome = (
    config?: AxiosRequestConfig
) =>
    staffAuthGet<HomePreviewOut[]>(`/cms/home-blocks/preview`, config)

export const reorderHomeBlocks = (
    body: OrderIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<HomeBlockOut[], OrderIn>(`/cms/home-blocks/order`, body, config)

export const publishAll = (
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PublishAllOut>(`/cms/home-blocks/publish-all`, undefined, config)

export const homeBlockDetail = (
    blockId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<HomeBlockOut>(`/cms/home-blocks/${blockId}`, config)

export const updateHomeBlock = (
    blockId: string,
    body: HomeBlockUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<HomeBlockOut, HomeBlockUpdateIn>(`/cms/home-blocks/${blockId}`, body, config)

export const hideHomeBlock = (
    blockId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<HomeBlockOut>(`/cms/home-blocks/${blockId}/hide`, undefined, config)

export const showHomeBlock = (
    blockId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<HomeBlockOut>(`/cms/home-blocks/${blockId}/show`, undefined, config)

export const publishHomeBlock = (
    blockId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<HomeBlockOut>(`/cms/home-blocks/${blockId}/publish`, undefined, config)

export const unpublishHomeBlock = (
    blockId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<HomeBlockOut>(`/cms/home-blocks/${blockId}/unpublish`, undefined, config)

export const blockItems = (
    blockId: string,
    params?: BlockItemsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BlockItemOut_>(`/cms/home-blocks/${blockId}/items`, { ...config, params: toParams(params) })

export const setBlockItems = (
    blockId: string,
    body: BlockItemsIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<BlockItemOut[], BlockItemsIn>(`/cms/home-blocks/${blockId}/items`, body, config)

export const listPromos = (
    params?: ListPromosParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_PromoOut_>(`/cms/promos`, { ...config, params: toParams(params) })

export const createPromo = (
    body: PromoIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PromoOut, PromoIn>(`/cms/promos`, body, config)

export const updatePromo = (
    promoId: string,
    body: PromoUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<PromoOut, PromoUpdateIn>(`/cms/promos/${promoId}`, body, config)

export const archivePromo = (
    promoId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<PromoOut>(`/cms/promos/${promoId}/archive`, undefined, config)

export const publishPromo = (
    promoId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PromoOut>(`/cms/promos/${promoId}/publish`, undefined, config)

export const unpublishPromo = (
    promoId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PromoOut>(`/cms/promos/${promoId}/unpublish`, undefined, config)

export const listCtas = (
    params?: ListCtasParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_CtaOut_>(`/cms/ctas`, { ...config, params: toParams(params) })

export const createCta = (
    body: CtaIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CtaOut, CtaIn>(`/cms/ctas`, body, config)

export const updateCta = (
    ctaId: string,
    body: CtaUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CtaOut, CtaUpdateIn>(`/cms/ctas/${ctaId}`, body, config)

export const archiveCta = (
    ctaId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<CtaOut>(`/cms/ctas/${ctaId}/archive`, undefined, config)

export const publishCta = (
    ctaId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CtaOut>(`/cms/ctas/${ctaId}/publish`, undefined, config)

export const unpublishCta = (
    ctaId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CtaOut>(`/cms/ctas/${ctaId}/unpublish`, undefined, config)

export const listBrands = (
    params?: ListBrandsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BrandOut_>(`/cms/brands`, { ...config, params: toParams(params) })

export const createBrand = (
    body: BrandIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BrandOut, BrandIn>(`/cms/brands`, body, config)

export const updateBrand = (
    brandId: string,
    body: BrandUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BrandOut, BrandUpdateIn>(`/cms/brands/${brandId}`, body, config)

export const setBrandLogo = (
    brandId: string,
    body: SetBrandLogoRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<BrandOut, FormData>(`/cms/brands/${brandId}/logo`, toSetBrandLogoFormData(body), multipartConfig(config))

export const archiveBrand = (
    brandId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<BrandOut>(`/cms/brands/${brandId}/archive`, undefined, config)

export const publishBrand = (
    brandId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BrandOut>(`/cms/brands/${brandId}/publish`, undefined, config)

export const unpublishBrand = (
    brandId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BrandOut>(`/cms/brands/${brandId}/unpublish`, undefined, config)

export const listSlides = (
    params?: ListSlidesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_SlideOut_>(`/cms/slides`, { ...config, params: toParams(params) })

export const createSlide = (
    body: CreateSlideRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SlideOut, FormData>(`/cms/slides`, toCreateSlideFormData(body), multipartConfig(config))

export const updateSlide = (
    slideId: string,
    body: SlideUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<SlideOut, SlideUpdateIn>(`/cms/slides/${slideId}`, body, config)

export const setSlideImage = (
    slideId: string,
    body: SetSlideImageRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<SlideOut, FormData>(`/cms/slides/${slideId}/image`, toSetSlideImageFormData(body), multipartConfig(config))

export const archiveSlide = (
    slideId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<SlideOut>(`/cms/slides/${slideId}/archive`, undefined, config)

export const publishSlide = (
    slideId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SlideOut>(`/cms/slides/${slideId}/publish`, undefined, config)

export const unpublishSlide = (
    slideId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SlideOut>(`/cms/slides/${slideId}/unpublish`, undefined, config)

export const listBanners = (
    params?: ListBannersParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BannerOut_>(`/cms/banners`, { ...config, params: toParams(params) })

export const createBanner = (
    body: CreateBannerRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BannerOut, FormData>(`/cms/banners`, toCreateBannerFormData(body), multipartConfig(config))

export const updateBanner = (
    bannerId: string,
    body: BannerUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BannerOut, BannerUpdateIn>(`/cms/banners/${bannerId}`, body, config)

export const setBannerImage = (
    bannerId: string,
    body: SetBannerImageRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<BannerOut, FormData>(`/cms/banners/${bannerId}/image`, toSetBannerImageFormData(body), multipartConfig(config))

export const archiveBanner = (
    bannerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<BannerOut>(`/cms/banners/${bannerId}/archive`, undefined, config)

export const publishBanner = (
    bannerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BannerOut>(`/cms/banners/${bannerId}/publish`, undefined, config)

export const unpublishBanner = (
    bannerId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BannerOut>(`/cms/banners/${bannerId}/unpublish`, undefined, config)


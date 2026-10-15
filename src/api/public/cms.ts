import type { AxiosRequestConfig } from 'axios'

import { publicGet, publicGetBlob } from '../http'
import type {
    ListPublicBlogPostsParams,
    ListPublicCertificatesParams,
    ListPublicFaqItemsParams,
    ListPublicPromosParams,
    PaginationOut_PublicBlogCategoryOut_,
    PaginationOut_PublicBlogPostCardOut_,
    PaginationOut_PublicBlogTagOut_,
    PaginationOut_PublicCertificateOut_,
    PaginationOut_PublicFaqCategoryOut_,
    PaginationOut_PublicFaqItemOut_,
    PaginationOut_PublicHomeBlockOut_,
    PaginationOut_PublicPromoOut_,
    PublicBlogPostDetailOut,
    PublicCertificateOut,
    PublicCmsPageParams,
    PublicContactInfoOut,
    PublicCooperationPageOut,
    PublicStaticPageOut,
} from '../types/public/cms'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

export const listPublicHomeBlocks = (
    params?: PublicCmsPageParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicHomeBlockOut_>('/cms/home-blocks', {
        ...config,
        params: toParams(params),
    })

export const listPublicPromos = (
    params?: ListPublicPromosParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicPromoOut_>('/cms/promos', {
        ...config,
        params: toParams(params),
    })

export const getPublicAboutUs = (config?: AxiosRequestConfig) =>
    publicGet<PublicStaticPageOut>('/cms/pages/about-us', config)

export const getPublicCooperation = (config?: AxiosRequestConfig) =>
    publicGet<PublicCooperationPageOut>('/cms/pages/cooperation', config)

export const getPublicB2bTerms = (config?: AxiosRequestConfig) =>
    publicGet<PublicStaticPageOut>('/cms/pages/b2b-terms', config)

export const listPublicBlogPosts = (
    params?: ListPublicBlogPostsParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicBlogPostCardOut_>('/cms/blog/posts', {
        ...config,
        params: toParams(params),
    })

export const getPublicBlogPost = (slug: string, config?: AxiosRequestConfig) =>
    publicGet<PublicBlogPostDetailOut>(`/cms/blog/posts/${slug}`, config)

export const listPublicBlogCategories = (
    params?: PublicCmsPageParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicBlogCategoryOut_>('/cms/blog/categories', {
        ...config,
        params: toParams(params),
    })

export const listPublicBlogTags = (
    params?: PublicCmsPageParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicBlogTagOut_>('/cms/blog/tags', {
        ...config,
        params: toParams(params),
    })

export const listPublicFaqCategories = (
    params?: PublicCmsPageParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicFaqCategoryOut_>('/cms/faq/categories', {
        ...config,
        params: toParams(params),
    })

export const listPublicFaqItems = (
    params?: ListPublicFaqItemsParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicFaqItemOut_>('/cms/faq', {
        ...config,
        params: toParams(params),
    })

export const listPublicCertificates = (
    params?: ListPublicCertificatesParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_PublicCertificateOut_>('/cms/certificates', {
        ...config,
        params: toParams(params),
    })

export const getPublicCertificate = (
    certificateId: string,
    config?: AxiosRequestConfig
) =>
    publicGet<PublicCertificateOut>(
        `/cms/certificates/${certificateId}`,
        config
    )

export const getPublicCertificateFile = (
    certificateId: string,
    config?: AxiosRequestConfig
) => publicGetBlob(`/cms/certificates/${certificateId}/file`, config)

export const getPublicContactInfo = (config?: AxiosRequestConfig) =>
    publicGet<PublicContactInfoOut>('/cms/contact-info', config)

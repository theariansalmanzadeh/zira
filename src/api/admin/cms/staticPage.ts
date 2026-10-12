import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../../http'
import type {
    ListStaticPagesParams,
    OrderIn,
    PageSectionIn,
    PageSectionOut,
    PageSectionUpdateIn,
    PaginationOut_StaticPageOut_,
    ReplaceGuideRequest,
    StaticPageDetailOut,
    StaticPageUpdateIn,
} from '../../types/admin/cms/staticPage'

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

const toReplaceGuideFormData = (body: ReplaceGuideRequest) => {
    const formData = new FormData()
    if (body.file !== undefined && body.file !== null) formData.append('file', body.file)
    if (body.caption !== undefined && body.caption !== null) formData.append('caption', String(body.caption))
    return formData
}

export const listStaticPages = (
    params?: ListStaticPagesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_StaticPageOut_>(`/cms/static-pages`, { ...config, params: toParams(params) })

export const staticPageDetail = (
    page: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<StaticPageDetailOut>(`/cms/static-pages/${page}`, config)

export const updateStaticPage = (
    page: string,
    body: StaticPageUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<StaticPageDetailOut, StaticPageUpdateIn>(`/cms/static-pages/${page}`, body, config)

export const publishStaticPage = (
    page: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<StaticPageDetailOut>(`/cms/static-pages/${page}/publish`, undefined, config)

export const unpublishStaticPage = (
    page: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<StaticPageDetailOut>(`/cms/static-pages/${page}/unpublish`, undefined, config)

export const replaceGuide = (
    page: string,
    body: ReplaceGuideRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<StaticPageDetailOut, FormData>(`/cms/static-pages/${page}/guide`, toReplaceGuideFormData(body), multipartConfig(config))

export const createSection = (
    page: string,
    body: PageSectionIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PageSectionOut, PageSectionIn>(`/cms/static-pages/${page}/sections`, body, config)

export const reorderSections = (
    page: string,
    body: OrderIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<StaticPageDetailOut, OrderIn>(`/cms/static-pages/${page}/sections/order`, body, config)

export const updateSection = (
    page: string,
    sectionId: string,
    body: PageSectionUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<PageSectionOut, PageSectionUpdateIn>(`/cms/static-pages/${page}/sections/${sectionId}`, body, config)

export const archiveSection = (
    page: string,
    sectionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<PageSectionOut>(`/cms/static-pages/${page}/sections/${sectionId}/archive`, undefined, config)

export const publishSection = (
    page: string,
    sectionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PageSectionOut>(`/cms/static-pages/${page}/sections/${sectionId}/publish`, undefined, config)

export const unpublishSection = (
    page: string,
    sectionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<PageSectionOut>(`/cms/static-pages/${page}/sections/${sectionId}/unpublish`, undefined, config)


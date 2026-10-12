import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
} from '../../http'
import type {
    ExportFaqParams,
    FaqCategoryIn,
    FaqCategoryOut,
    FaqCategoryUpdateIn,
    FaqItemIn,
    FaqItemOut,
    FaqItemUpdateIn,
    ListFaqCategoriesParams,
    ListFaqItemsParams,
    PaginationOut_FaqCategoryOut_,
    PaginationOut_FaqItemOut_,
} from '../../types/admin/cms/faq'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined


export const listFaqCategories = (
    params?: ListFaqCategoriesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_FaqCategoryOut_>(`/cms/faq/categories`, { ...config, params: toParams(params) })

export const createFaqCategory = (
    body: FaqCategoryIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<FaqCategoryOut, FaqCategoryIn>(`/cms/faq/categories`, body, config)

export const updateFaqCategory = (
    categoryId: string,
    body: FaqCategoryUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<FaqCategoryOut, FaqCategoryUpdateIn>(`/cms/faq/categories/${categoryId}`, body, config)

export const deactivateFaqCategory = (
    categoryId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<FaqCategoryOut>(`/cms/faq/categories/${categoryId}/deactivate`, undefined, config)

export const activateFaqCategory = (
    categoryId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<FaqCategoryOut>(`/cms/faq/categories/${categoryId}/activate`, undefined, config)

export const listFaqItems = (
    params?: ListFaqItemsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_FaqItemOut_>(`/cms/faq`, { ...config, params: toParams(params) })

export const createFaqItem = (
    body: FaqItemIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<FaqItemOut, FaqItemIn>(`/cms/faq`, body, config)

export const exportFaq = (
    params?: ExportFaqParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/cms/faq/export`, { ...config, params: toParams(params) })

export const updateFaqItem = (
    itemId: string,
    body: FaqItemUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<FaqItemOut, FaqItemUpdateIn>(`/cms/faq/${itemId}`, body, config)

export const archiveFaqItem = (
    itemId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<FaqItemOut>(`/cms/faq/${itemId}/archive`, undefined, config)


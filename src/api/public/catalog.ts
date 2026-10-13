import type { AxiosRequestConfig } from 'axios'

import { publicGet } from '../http'
import type {
    GetPublicCategoryParams,
    ListPublicCategoriesParams,
    ListPublicFacetsParams,
    ListPublicProductsParams,
    ListPublicRelatedProductsParams,
    PaginationOut_CardOut_,
    PaginationOut_FacetItemOut_,
    PaginationOut_StorefrontCategoryOut_,
    PDPOut,
    StorefrontCategoryDetailOut,
} from '../types/public/catalog'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

export const listPublicCategories = (
    params?: ListPublicCategoriesParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_StorefrontCategoryOut_>('/catalog/categories', {
        ...config,
        params: toParams(params),
    })

export const getPublicCategory = (
    slug: string,
    params?: GetPublicCategoryParams,
    config?: AxiosRequestConfig
) =>
    publicGet<StorefrontCategoryDetailOut>(`/catalog/categories/${slug}`, {
        ...config,
        params: toParams(params),
    })

export const listPublicFacets = (
    params?: ListPublicFacetsParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_FacetItemOut_>('/catalog/facets', {
        ...config,
        params: toParams(params),
    })

export const listPublicProducts = (
    params?: ListPublicProductsParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_CardOut_>('/catalog/products', {
        ...config,
        params: toParams(params),
    })

export const getPublicProduct = (slug: string, config?: AxiosRequestConfig) =>
    publicGet<PDPOut>(`/catalog/products/${slug}`, config)

export const listPublicRelatedProducts = (
    slug: string,
    params?: ListPublicRelatedProductsParams,
    config?: AxiosRequestConfig
) =>
    publicGet<PaginationOut_CardOut_>(`/catalog/products/${slug}/related`, {
        ...config,
        params: toParams(params),
    })

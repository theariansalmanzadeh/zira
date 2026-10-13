'use client'

import { useQuery } from '@tanstack/react-query'

import {
    getPublicCategory,
    getPublicProduct,
    listPublicCategories,
    listPublicFacets,
    listPublicProducts,
    listPublicRelatedProducts,
} from '@/src/api/public/catalog'
import type {
    GetPublicCategoryParams,
    ListPublicCategoriesParams,
    ListPublicFacetsParams,
    ListPublicProductsParams,
    ListPublicRelatedProductsParams,
} from '@/src/api/types/public/catalog'

export const publicCatalogKeys = {
    all: ['public', 'catalog'] as const,
    categories: {
        all: () => [...publicCatalogKeys.all, 'categories'] as const,
        list: (params?: ListPublicCategoriesParams) =>
            [...publicCatalogKeys.categories.all(), params ?? {}] as const,
        detail: (slug: string, params?: GetPublicCategoryParams) =>
            [...publicCatalogKeys.categories.all(), slug, params ?? {}] as const,
    },
    facets: {
        all: () => [...publicCatalogKeys.all, 'facets'] as const,
        list: (params?: ListPublicFacetsParams) =>
            [...publicCatalogKeys.facets.all(), params ?? {}] as const,
    },
    products: {
        all: () => [...publicCatalogKeys.all, 'products'] as const,
        list: (params?: ListPublicProductsParams) =>
            [...publicCatalogKeys.products.all(), params ?? {}] as const,
        detail: (slug: string) =>
            [...publicCatalogKeys.products.all(), slug] as const,
        related: (slug: string, params?: ListPublicRelatedProductsParams) =>
            [...publicCatalogKeys.products.all(), slug, 'related', params ?? {}] as const,
    },
}

export const useListPublicCategories = (
    params?: ListPublicCategoriesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCatalogKeys.categories.list(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicCategories(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicCategory = (
    slug: string,
    params?: GetPublicCategoryParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCatalogKeys.categories.detail(slug, params),
        enabled: Boolean(slug) && enabled,
        queryFn: async () => {
            const result = await getPublicCategory(slug, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicFacets = (
    params?: ListPublicFacetsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCatalogKeys.facets.list(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicFacets(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicProducts = (
    params?: ListPublicProductsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCatalogKeys.products.list(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicProducts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicProduct = (slug: string, enabled = true) => {
    return useQuery({
        queryKey: publicCatalogKeys.products.detail(slug),
        enabled: Boolean(slug) && enabled,
        queryFn: async () => {
            const result = await getPublicProduct(slug)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicRelatedProducts = (
    slug: string,
    params?: ListPublicRelatedProductsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCatalogKeys.products.related(slug, params),
        enabled: Boolean(slug) && enabled,
        queryFn: async () => {
            const result = await listPublicRelatedProducts(slug, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

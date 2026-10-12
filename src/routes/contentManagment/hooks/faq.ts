'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    listFaqCategories,
    createFaqCategory,
    updateFaqCategory,
    deactivateFaqCategory,
    activateFaqCategory,
    listFaqItems,
    createFaqItem,
    exportFaq,
    updateFaqItem,
    archiveFaqItem,
} from '@/src/api/admin/cms/faq'
import type {
    ListFaqCategoriesParams,
    FaqCategoryIn,
    FaqCategoryUpdateIn,
    ListFaqItemsParams,
    FaqItemIn,
    ExportFaqParams,
    FaqItemUpdateIn,
} from '@/src/api/types/admin/cms/faq'

export const cmsFaqKeys = {
    all: ['cms', 'faq'] as const,
    listFaqCategories: (params?: ListFaqCategoriesParams) =>
        [...cmsFaqKeys.all, 'listFaqCategories', params ?? {}] as const,
    listFaqItems: (params?: ListFaqItemsParams) =>
        [...cmsFaqKeys.all, 'listFaqItems', params ?? {}] as const,
}

export const useListFaqCategories = (params?: ListFaqCategoriesParams) => {
    return useQuery({
        queryKey: cmsFaqKeys.listFaqCategories(params),
        
        queryFn: async () => {
            const result = await listFaqCategories(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: FaqCategoryIn }) => {
            const result = await createFaqCategory(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsFaqKeys.all })
        },
    })
}

export const useUpdateFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId, body }: { categoryId: string; body: FaqCategoryUpdateIn }) => {
            const result = await updateFaqCategory(categoryId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsFaqKeys.all })
        },
    })
}

export const useDeactivateFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId }: { categoryId: string }) => {
            const result = await deactivateFaqCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsFaqKeys.all })
        },
    })
}

export const useActivateFaqCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId }: { categoryId: string }) => {
            const result = await activateFaqCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsFaqKeys.all })
        },
    })
}

export const useListFaqItems = (params?: ListFaqItemsParams) => {
    return useQuery({
        queryKey: cmsFaqKeys.listFaqItems(params),
        
        queryFn: async () => {
            const result = await listFaqItems(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateFaqItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: FaqItemIn }) => {
            const result = await createFaqItem(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsFaqKeys.all })
        },
    })
}

export const useExportFaq = () => {
    return useMutation({
        mutationFn: async ({ params }: { params?: ExportFaqParams }) => {
            const result = await exportFaq(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateFaqItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: FaqItemUpdateIn }) => {
            const result = await updateFaqItem(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsFaqKeys.all })
        },
    })
}

export const useArchiveFaqItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId }: { itemId: string }) => {
            const result = await archiveFaqItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: cmsFaqKeys.listFaqItems(),
            })
        },
    })
}

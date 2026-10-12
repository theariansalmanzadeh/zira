'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    listStaticPages,
    staticPageDetail,
    updateStaticPage,
    publishStaticPage,
    unpublishStaticPage,
    replaceGuide,
    createSection,
    reorderSections,
    updateSection,
    archiveSection,
    publishSection,
    unpublishSection,
} from '@/src/api/admin/cms/staticPage'
import type {
    ListStaticPagesParams,
    StaticPageUpdateIn,
    ReplaceGuideRequest,
    PageSectionIn,
    OrderIn,
    PageSectionUpdateIn,
} from '@/src/api/types/admin/cms/staticPage'

export const cmsStaticPageKeys = {
    all: ['cms', 'staticPage'] as const,
    listStaticPages: (params?: ListStaticPagesParams) =>
        [...cmsStaticPageKeys.all, 'listStaticPages', params ?? {}] as const,
    staticPageDetail: (page: string) =>
        [...cmsStaticPageKeys.all, 'staticPageDetail', page] as const,
}

export const useListStaticPages = (params?: ListStaticPagesParams) => {
    return useQuery({
        queryKey: cmsStaticPageKeys.listStaticPages(params),
        
        queryFn: async () => {
            const result = await listStaticPages(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useStaticPageDetail = (page: string, enabled = true) => {
    return useQuery({
        queryKey: cmsStaticPageKeys.staticPageDetail(page),
        enabled: Boolean(page) && enabled,
        queryFn: async () => {
            const result = await staticPageDetail(page)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateStaticPage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, body }: { page: string; body: StaticPageUpdateIn }) => {
            const result = await updateStaticPage(page, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const usePublishStaticPage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page }: { page: string }) => {
            const result = await publishStaticPage(page)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useUnpublishStaticPage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page }: { page: string }) => {
            const result = await unpublishStaticPage(page)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useReplaceGuide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, body }: { page: string; body: ReplaceGuideRequest }) => {
            const result = await replaceGuide(page, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useCreateSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, body }: { page: string; body: PageSectionIn }) => {
            const result = await createSection(page, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useReorderSections = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, body }: { page: string; body: OrderIn }) => {
            const result = await reorderSections(page, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useUpdateSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, sectionId, body }: { page: string; sectionId: string; body: PageSectionUpdateIn }) => {
            const result = await updateSection(page, sectionId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useArchiveSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, sectionId }: { page: string; sectionId: string }) => {
            const result = await archiveSection(page, sectionId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const usePublishSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, sectionId }: { page: string; sectionId: string }) => {
            const result = await publishSection(page, sectionId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

export const useUnpublishSection = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ page, sectionId }: { page: string; sectionId: string }) => {
            const result = await unpublishSection(page, sectionId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsStaticPageKeys.all })
        },
    })
}

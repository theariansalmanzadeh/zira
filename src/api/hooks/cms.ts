'use client'

import { useQuery } from '@tanstack/react-query'

import {
    getPublicAboutUs,
    getPublicB2bTerms,
    getPublicBlogPost,
    getPublicCertificate,
    getPublicCertificateFile,
    getPublicContactInfo,
    getPublicCooperation,
    listPublicBlogCategories,
    listPublicBlogPosts,
    listPublicBlogTags,
    listPublicCertificates,
    listPublicFaqCategories,
    listPublicFaqItems,
    listPublicHomeBlocks,
    listPublicPromos,
} from '@/src/api/public/cms'
import type {
    ListPublicBlogPostsParams,
    ListPublicCertificatesParams,
    ListPublicFaqItemsParams,
    ListPublicPromosParams,
    PublicCmsPageParams,
} from '@/src/api/types/public/cms'

export const publicCmsKeys = {
    all: ['public', 'cms'] as const,
    homeBlocks: (params?: PublicCmsPageParams) =>
        [...publicCmsKeys.all, 'home-blocks', params ?? {}] as const,
    promos: (params?: ListPublicPromosParams) =>
        [...publicCmsKeys.all, 'promos', params ?? {}] as const,
    aboutUs: () => [...publicCmsKeys.all, 'about-us'] as const,
    cooperation: () => [...publicCmsKeys.all, 'cooperation'] as const,
    b2bTerms: () => [...publicCmsKeys.all, 'b2b-terms'] as const,
    blogPosts: (params?: ListPublicBlogPostsParams) =>
        [...publicCmsKeys.all, 'blog-posts', params ?? {}] as const,
    blogPost: (slug: string) =>
        [...publicCmsKeys.all, 'blog-post', slug] as const,
    blogCategories: (params?: PublicCmsPageParams) =>
        [...publicCmsKeys.all, 'blog-categories', params ?? {}] as const,
    blogTags: (params?: PublicCmsPageParams) =>
        [...publicCmsKeys.all, 'blog-tags', params ?? {}] as const,
    faqCategories: (params?: PublicCmsPageParams) =>
        [...publicCmsKeys.all, 'faq-categories', params ?? {}] as const,
    faqItems: (params?: ListPublicFaqItemsParams) =>
        [...publicCmsKeys.all, 'faq-items', params ?? {}] as const,
    certificates: (params?: ListPublicCertificatesParams) =>
        [...publicCmsKeys.all, 'certificates', params ?? {}] as const,
    certificate: (certificateId: string) =>
        [...publicCmsKeys.all, 'certificate', certificateId] as const,
    certificateFile: (certificateId: string) =>
        [...publicCmsKeys.all, 'certificate-file', certificateId] as const,
    contactInfo: () => [...publicCmsKeys.all, 'contact-info'] as const,
}

export const useListPublicHomeBlocks = (
    params?: PublicCmsPageParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.homeBlocks(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicHomeBlocks(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicPromos = (
    params?: ListPublicPromosParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.promos(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicPromos(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicAboutUs = (enabled = true) => {
    return useQuery({
        queryKey: publicCmsKeys.aboutUs(),
        enabled,
        queryFn: async () => {
            const result = await getPublicAboutUs()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicCooperation = (enabled = true) => {
    return useQuery({
        queryKey: publicCmsKeys.cooperation(),
        enabled,
        queryFn: async () => {
            const result = await getPublicCooperation()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicB2bTerms = (enabled = true) => {
    return useQuery({
        queryKey: publicCmsKeys.b2bTerms(),
        enabled,
        queryFn: async () => {
            const result = await getPublicB2bTerms()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicBlogPosts = (
    params?: ListPublicBlogPostsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.blogPosts(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicBlogPosts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicBlogPost = (slug: string, enabled = true) => {
    return useQuery({
        queryKey: publicCmsKeys.blogPost(slug),
        enabled: Boolean(slug) && enabled,
        queryFn: async () => {
            const result = await getPublicBlogPost(slug)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicBlogCategories = (
    params?: PublicCmsPageParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.blogCategories(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicBlogCategories(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicBlogTags = (
    params?: PublicCmsPageParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.blogTags(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicBlogTags(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicFaqCategories = (
    params?: PublicCmsPageParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.faqCategories(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicFaqCategories(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicFaqItems = (
    params?: ListPublicFaqItemsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.faqItems(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicFaqItems(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPublicCertificates = (
    params?: ListPublicCertificatesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.certificates(params),
        enabled,
        queryFn: async () => {
            const result = await listPublicCertificates(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicCertificate = (
    certificateId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.certificate(certificateId),
        enabled: Boolean(certificateId) && enabled,
        queryFn: async () => {
            const result = await getPublicCertificate(certificateId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicCertificateFile = (
    certificateId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: publicCmsKeys.certificateFile(certificateId),
        enabled: Boolean(certificateId) && enabled,
        queryFn: async () => {
            const result = await getPublicCertificateFile(certificateId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetPublicContactInfo = (enabled = true) => {
    return useQuery({
        queryKey: publicCmsKeys.contactInfo(),
        enabled,
        queryFn: async () => {
            const result = await getPublicContactInfo()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

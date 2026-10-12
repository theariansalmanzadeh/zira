'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    listBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    deactivateBlogCategory,
    activateBlogCategory,
    listBlogTags,
    listPosts,
    createPost,
    exportPosts,
    postDetail,
    updatePost,
    setPostCover,
    setPostImages,
    publishPost,
    unpublishPost,
    archivePost,
} from '@/src/api/admin/cms/blog'
import type {
    ListBlogCategoriesParams,
    BlogCategoryIn,
    BlogCategoryUpdateIn,
    ListBlogTagsParams,
    ListPostsParams,
    BlogPostIn,
    ExportPostsParams,
    BlogPostUpdateIn,
    SetPostCoverRequest,
    SetPostImagesRequest,
} from '@/src/api/types/admin/cms/blog'

export const cmsBlogKeys = {
    all: ['cms', 'blog'] as const,
    listBlogCategories: (params?: ListBlogCategoriesParams) =>
        [...cmsBlogKeys.all, 'listBlogCategories', params ?? {}] as const,
    listBlogTags: (params?: ListBlogTagsParams) =>
        [...cmsBlogKeys.all, 'listBlogTags', params ?? {}] as const,
    listPosts: (params?: ListPostsParams) =>
        [...cmsBlogKeys.all, 'listPosts', params ?? {}] as const,
    postDetail: (postId: string) =>
        [...cmsBlogKeys.all, 'postDetail', postId] as const,
}

export const useListBlogCategories = (params?: ListBlogCategoriesParams) => {
    return useQuery({
        queryKey: cmsBlogKeys.listBlogCategories(params),
        
        queryFn: async () => {
            const result = await listBlogCategories(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateBlogCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: BlogCategoryIn }) => {
            const result = await createBlogCategory(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useUpdateBlogCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId, body }: { categoryId: string; body: BlogCategoryUpdateIn }) => {
            const result = await updateBlogCategory(categoryId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useDeactivateBlogCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId }: { categoryId: string }) => {
            const result = await deactivateBlogCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useActivateBlogCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId }: { categoryId: string }) => {
            const result = await activateBlogCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useListBlogTags = (params?: ListBlogTagsParams) => {
    return useQuery({
        queryKey: cmsBlogKeys.listBlogTags(params),
        
        queryFn: async () => {
            const result = await listBlogTags(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListPosts = (params?: ListPostsParams) => {
    return useQuery({
        queryKey: cmsBlogKeys.listPosts(params),
        
        queryFn: async () => {
            const result = await listPosts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ body }: { body: BlogPostIn }) => {
            const result = await createPost(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useExportPosts = () => {
    return useMutation({
        mutationFn: async ({ params }: { params?: ExportPostsParams }) => {
            const result = await exportPosts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const usePostDetail = (postId: string, enabled = true) => {
    return useQuery({
        queryKey: cmsBlogKeys.postDetail(postId),
        enabled: Boolean(postId) && enabled,
        queryFn: async () => {
            const result = await postDetail(postId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId, body }: { postId: string; body: BlogPostUpdateIn }) => {
            const result = await updatePost(postId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useSetPostCover = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId, body }: { postId: string; body: SetPostCoverRequest }) => {
            const result = await setPostCover(postId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useSetPostImages = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId, body }: { postId: string; body: SetPostImagesRequest }) => {
            const result = await setPostImages(postId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const usePublishPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId }: { postId: string }) => {
            const result = await publishPost(postId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useUnpublishPost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId }: { postId: string }) => {
            const result = await unpublishPost(postId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

export const useArchivePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId }: { postId: string }) => {
            const result = await archivePost(postId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: cmsBlogKeys.all })
        },
    })
}

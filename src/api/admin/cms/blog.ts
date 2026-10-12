import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../../http'
import type {
    BlogCategoryIn,
    BlogCategoryOut,
    BlogCategoryUpdateIn,
    BlogImageOut,
    BlogPostDetailOut,
    BlogPostIn,
    BlogPostUpdateIn,
    ExportPostsParams,
    ListBlogCategoriesParams,
    ListBlogTagsParams,
    ListPostsParams,
    PaginationOut_BlogCategoryOut_,
    PaginationOut_BlogPostListOut_,
    PaginationOut_BlogTagOut_,
    SetPostCoverRequest,
    SetPostImagesRequest,
} from '../../types/admin/cms/blog'

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

const toSetPostCoverFormData = (body: SetPostCoverRequest) => {
    const formData = new FormData()
    if (body.image !== undefined && body.image !== null) formData.append('image', body.image)
    return formData
}

const toSetPostImagesFormData = (body: SetPostImagesRequest) => {
    const formData = new FormData()
    if (body.rows !== undefined && body.rows !== null) formData.append('rows', String(body.rows))
    body.files?.forEach((file) => formData.append('files', file))
    return formData
}

export const listBlogCategories = (
    params?: ListBlogCategoriesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BlogCategoryOut_>(`/cms/blog/categories`, { ...config, params: toParams(params) })

export const createBlogCategory = (
    body: BlogCategoryIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BlogCategoryOut, BlogCategoryIn>(`/cms/blog/categories`, body, config)

export const updateBlogCategory = (
    categoryId: string,
    body: BlogCategoryUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BlogCategoryOut, BlogCategoryUpdateIn>(`/cms/blog/categories/${categoryId}`, body, config)

export const deactivateBlogCategory = (
    categoryId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BlogCategoryOut>(`/cms/blog/categories/${categoryId}/deactivate`, undefined, config)

export const activateBlogCategory = (
    categoryId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BlogCategoryOut>(`/cms/blog/categories/${categoryId}/activate`, undefined, config)

export const listBlogTags = (
    params?: ListBlogTagsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BlogTagOut_>(`/cms/blog/tags`, { ...config, params: toParams(params) })

export const listPosts = (
    params?: ListPostsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BlogPostListOut_>(`/cms/blog/posts`, { ...config, params: toParams(params) })

export const createPost = (
    body: BlogPostIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BlogPostDetailOut, BlogPostIn>(`/cms/blog/posts`, body, config)

export const exportPosts = (
    params?: ExportPostsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/cms/blog/posts/export`, { ...config, params: toParams(params) })

export const postDetail = (
    postId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<BlogPostDetailOut>(`/cms/blog/posts/${postId}`, config)

export const updatePost = (
    postId: string,
    body: BlogPostUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BlogPostDetailOut, BlogPostUpdateIn>(`/cms/blog/posts/${postId}`, body, config)

export const setPostCover = (
    postId: string,
    body: SetPostCoverRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<BlogPostDetailOut, FormData>(`/cms/blog/posts/${postId}/cover`, toSetPostCoverFormData(body), multipartConfig(config))

export const setPostImages = (
    postId: string,
    body: SetPostImagesRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<BlogImageOut[], FormData>(`/cms/blog/posts/${postId}/images`, toSetPostImagesFormData(body), multipartConfig(config))

export const publishPost = (
    postId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BlogPostDetailOut>(`/cms/blog/posts/${postId}/publish`, undefined, config)

export const unpublishPost = (
    postId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BlogPostDetailOut>(`/cms/blog/posts/${postId}/unpublish`, undefined, config)

export const archivePost = (
    postId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<BlogPostDetailOut>(`/cms/blog/posts/${postId}/archive`, undefined, config)


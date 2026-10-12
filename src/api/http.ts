import type { AxiosError, AxiosRequestConfig } from 'axios'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { apiClient, publicApi, staffApiClient } from './config'
import { ERROR_MESSAGES } from '@shared/constants/ERROR_MESSAGES'

export type ApiError = {
    message: string
    status?: number
    data?: unknown
}

export type ApiErrorResponseBody = {
    message?: string
    detail?: string
}

export type ApiAxiosError = AxiosError<ApiErrorResponseBody>

export type ApiResponse<T> =
    | {
        success: true
        data: T
    }
    | {
        success: false
        error: ApiError
        data?: undefined
    }

export function toApiError(error: unknown): ApiError {
    if (isAxiosError(error)) {
        const axiosError = error as ApiAxiosError
        const responseData = axiosError.response?.data

        return {
            message:
                (responseData && responseData.message) ||
                (responseData && responseData.detail) ||
                axiosError.message ||
                'Request failed',
            status: axiosError.response?.status,
            data: responseData,
        }
    }

    if (error instanceof Error) {
        return { message: error.message }
    }

    return { message: 'Unexpected error' }
}

function showRequestErrorToast(error: unknown) {
    const axiosError = error as ApiAxiosError
    const status = axiosError.response?.status ?? axiosError.status

    if (status === 429) {
        toast.error('خطا در ارسال درخواست', {
            description: ERROR_MESSAGES.TOO_MANY_REQUESTS,
        })
        return
    }

    toast.error('خطا در ارسال درخواست', {
        description:
            axiosError.response?.data?.detail ||
            axiosError.response?.data?.message ||
            ERROR_MESSAGES.REQUEST_FAILED,
    })
}

export async function publicGet<T>(
    url: string,
    config?: AxiosRequestConfig,
    callback?: VoidFunction
): Promise<ApiResponse<T>> {
    try {
        const response = await publicApi.get(url, config)
        callback?.()
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function publicPost<T, TBody = unknown>(
    url: string,
    isToastError = true,
    body?: TBody,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await publicApi.post(url, body, config)
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        if (isToastError) {
            showRequestErrorToast(error)
        }
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function authGet<T>(
    url: string,
    config?: AxiosRequestConfig,
    callback?: VoidFunction
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient.get(url, config)
        callback?.()
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function authGetBlob(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<Blob>> {
    try {
        const response = await apiClient.get<Blob>(url, {
            ...config,
            responseType: 'blob',
        })
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function authPost<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient.post(url, body, config)
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        if (isToastError) {
            showRequestErrorToast(error)
        }
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function authPatch<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient.patch(url, body, config)
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function staffAuthGet<T>(
    url: string,
    config?: AxiosRequestConfig,
    callback?: VoidFunction
): Promise<ApiResponse<T>> {
    try {
        const response = await staffApiClient.get(url, config)
        callback?.()
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function staffAuthPost<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await staffApiClient.post(url, body, config)
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        if (isToastError) {
            showRequestErrorToast(error)
        }
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function staffAuthPut<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await staffApiClient.put(url, body, config)
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        if (isToastError) {
            showRequestErrorToast(error)
        }
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function staffAuthPatch<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await staffApiClient.patch(url, body, config)
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        if (isToastError) {
            showRequestErrorToast(error)
        }
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function staffAuthGetBlob(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<Blob>> {
    try {
        const response = await staffApiClient.get<Blob>(url, {
            ...config,
            responseType: 'blob',
        })
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

export async function staffAuthDelete<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await staffApiClient.delete(url, {
            ...config,
            data: body,
        })
        return {
            success: true,
            data: response.data,
        }
    } catch (error) {
        if (isToastError) {
            showRequestErrorToast(error)
        }
        return {
            success: false,
            error: toApiError(error),
        }
    }
}

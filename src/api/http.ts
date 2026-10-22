import type { AxiosError, AxiosRequestConfig } from 'axios'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { apiClient, publicApi, staffApiClient } from './config'
import { getApiFieldLabelFa } from '@shared/constants/API_FIELD_LABELS_FA'
import { ERROR_MESSAGES } from '@shared/constants/ERROR_MESSAGES'

export type ApiError = {
    message: string
    status?: number
    data?: unknown
}

export type ApiErrorResponseBody = {
    message?: string
    detail?: unknown
    code?: string
    status_code?: number
    request_id?: string
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

type ValidationErrorItem = {
    loc?: Array<string | number>
    msg?: string
    message?: string
    type?: string
}

const isValidationErrorItem = (value: unknown): value is ValidationErrorItem => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return false
    const record = value as Record<string, unknown>
    const hasLoc = Array.isArray(record.loc)
    const hasMsg =
        typeof record.msg === 'string' || typeof record.message === 'string'
    return hasLoc || (hasMsg && ('type' in record || 'ctx' in record))
}

const formatValidationErrorItem = (item: ValidationErrorItem): string | null => {
    const msg =
        (typeof item.msg === 'string' && item.msg) ||
        (typeof item.message === 'string' && item.message) ||
        ''
    if (!msg) return null

    const loc = Array.isArray(item.loc) ? item.loc : []
    const fieldKey = loc.length > 0 ? String(loc[loc.length - 1]) : ''
    if (!fieldKey || fieldKey === 'body' || fieldKey === 'query' || fieldKey === 'path') {
        return msg
    }

    return `${getApiFieldLabelFa(fieldKey)}: ${msg}`
}

const formatFieldErrorDict = (
    detail: Record<string, unknown>
): string | null => {
    const parts = Object.entries(detail)
        .map(([key, value]) => {
            if (
                key === 'type' ||
                key === 'loc' ||
                key === 'msg' ||
                key === 'message' ||
                key === 'input' ||
                key === 'ctx' ||
                key === 'url'
            ) {
                return null
            }
            const text = formatErrorDetail(value)
            if (!text) return null
            return `${getApiFieldLabelFa(key)}: ${text}`
        })
        .filter(Boolean)

    return parts.length > 0 ? parts.join('\n') : null
}

/**
 * Formats API `detail` for toasts:
 * - string → same text
 * - dict → Persian field label + nested message
 * - 422 validation list → map `loc[-1]` to Persian field name + `msg`
 */
export function formatErrorDetail(detail: unknown): string | null {
    if (detail == null || detail === '') return null
    if (typeof detail === 'string') return detail
    if (typeof detail === 'number' || typeof detail === 'boolean') {
        return String(detail)
    }
    if (Array.isArray(detail)) {
        const parts = detail
            .map((item) => {
                if (isValidationErrorItem(item)) {
                    return formatValidationErrorItem(item)
                }
                return formatErrorDetail(item)
            })
            .filter(Boolean)
        return parts.length > 0 ? parts.join('\n') : null
    }
    if (typeof detail === 'object') {
        if (isValidationErrorItem(detail)) {
            return formatValidationErrorItem(detail)
        }
        return formatFieldErrorDict(detail as Record<string, unknown>)
    }
    return null
}

function getResponseErrorMessage(error: unknown): string | null {
    if (!isAxiosError(error)) return null
    const axiosError = error as ApiAxiosError
    const responseData = axiosError.response?.data
    return (
        formatErrorDetail(responseData?.detail) ||
        formatErrorDetail(responseData?.message) ||
        null
    )
}

export function toApiError(error: unknown): ApiError {
    if (isAxiosError(error)) {
        const axiosError = error as ApiAxiosError
        const responseData = axiosError.response?.data

        return {
            message:
                getResponseErrorMessage(error) ||
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
        toast.error(ERROR_MESSAGES.TOO_MANY_REQUESTS)
        return
    }

    const detailMessage = getResponseErrorMessage(error)
    toast.error(detailMessage || ERROR_MESSAGES.REQUEST_FAILED)
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

export async function publicGetBlob(
    url: string,
    config?: AxiosRequestConfig
): Promise<ApiResponse<Blob>> {
    try {
        const response = await publicApi.get<Blob>(url, {
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
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient.patch(url, body, config)
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

export async function authPut<T, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: AxiosRequestConfig,
    isToastError = true
): Promise<ApiResponse<T>> {
    try {
        const response = await apiClient.put(url, body, config)
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

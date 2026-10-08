import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@shared/store/auth-store'
import { useStaffAuthStore } from '@shared/store/staff-auth-store'
import { refreshSession, refreshStaffSession } from './register'

/**
 * API base is baked at build time from `NEXT_PUBLIC_API_BASE_URL`.
 * Do not fall back to production here — an empty env would silently hit prod.
 */
const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
const DEFAULT_ADMIN_API_URL =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ?? DEFAULT_API_URL

const API_URL =
  typeof window === 'undefined'
    ? withTrailingSlash(DEFAULT_API_URL)
    : withTrailingSlash(DEFAULT_API_URL)

const ADMIN_API_URL =
  typeof window === 'undefined'
    ? withTrailingSlash(DEFAULT_ADMIN_API_URL)
    : withTrailingSlash(DEFAULT_ADMIN_API_URL)

function withTrailingSlash(url: string) {
  if (!url) return url
  return url.endsWith('/') ? url : `${url}/`
}

/**
 * Absolute API base (including origin). Use for EventSource and other
 * clients that cannot rely on axios `baseURL`.
 */
export function getApiBaseUrl() {
  return withTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL || DEFAULT_API_URL)
}

const DEFAULT_PAYMENT_CALLBACK_URL = process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_URL ?? ''
export function getPaymentCallbackUrl() {
  return withTrailingSlash(
    process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_URL || DEFAULT_PAYMENT_CALLBACK_URL
  )
}

export const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true,
})

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true,
})

export const staffApiClient = axios.create({
  baseURL: ADMIN_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

staffApiClient.interceptors.request.use(
  (config) => {
    const accessToken = useStaffAuthStore.getState().accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (err) => Promise.reject(err),
)

let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const config = err.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (!config || err.response?.status !== 401 || config._retry) {
      return Promise.reject(err)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        config.headers.Authorization = `Bearer ${token}`
        return apiClient(config)
      })
    }

    config._retry = true
    isRefreshing = true

    try {
      const newAccess = await refreshSession()
      useAuthStore.getState().setAccessToken(newAccess)

      processQueue(null, newAccess)
      config.headers.Authorization = `Bearer ${newAccess}`
      return apiClient(config)
    } catch (refreshError) {
      processQueue(refreshError, null)
      useAuthStore.getState().clearAuth()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

let isStaffRefreshing = false
let staffFailedQueue: Array<{
  resolve: (token: string) => void
  reject: (err: unknown) => void
}> = []

const processStaffQueue = (error: unknown, token: string | null = null) => {
  staffFailedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  staffFailedQueue = []
}

staffApiClient.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const config = err.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (!config || err.response?.status !== 401 || config._retry) {
      return Promise.reject(err)
    }

    if (isStaffRefreshing) {
      return new Promise((resolve, reject) => {
        staffFailedQueue.push({ resolve, reject })
      }).then((token) => {
        config.headers.Authorization = `Bearer ${token}`
        return staffApiClient(config)
      })
    }

    config._retry = true
    isStaffRefreshing = true

    try {
      const newAccess = await refreshStaffSession()
      useStaffAuthStore.getState().setAccessToken(newAccess)
      processStaffQueue(null, newAccess)
      config.headers.Authorization = `Bearer ${newAccess}`
      return staffApiClient(config)
    } catch (refreshError) {
      processStaffQueue(refreshError, null)
      useStaffAuthStore.getState().clearAuth()
      return Promise.reject(refreshError)
    } finally {
      isStaffRefreshing = false
    }
  },
)

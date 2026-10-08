import type { AxiosRequestConfig } from 'axios'

import { apiClient } from './config'

export const customInstance = <T>(
    config: AxiosRequestConfig,
    options?: AxiosRequestConfig,
): Promise<T> => {
    return apiClient({
        ...config,
        ...options,
    }).then(({ data }) => data)
}

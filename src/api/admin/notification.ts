import type { AxiosRequestConfig } from 'axios'

import { staffAuthGet, staffAuthPost } from '../http'
import type {
    GetNotificationResponse,
    ListNotificationSeenUsersParams,
    ListNotificationSeenUsersResponse,
    ListNotificationsResponse,
    SendNotificationRequest,
    SendNotificationResponse,
} from '../types/admin/notification'

const toParams = (params?: object) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

export const listNotifications = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListNotificationsResponse>('/auth/notifications', config)

export const getNotification = (
    notificationId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetNotificationResponse>(
        `/auth/notifications/${notificationId}`,
        config
    )

export const listNotificationSeenUsers = (
    notificationId: string,
    params?: ListNotificationSeenUsersParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListNotificationSeenUsersResponse>(
        `/auth/notifications/${notificationId}/seen-users`,
        { ...config, params: toParams(params) }
    )

export const sendNotification = (
    body: SendNotificationRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SendNotificationResponse, SendNotificationRequest>(
        '/auth/notifications',
        body,
        config
    )

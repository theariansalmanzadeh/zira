import type { AxiosRequestConfig } from 'axios'

import { staffAuthGet, staffAuthPost } from '../http'
import type {
    GetNotificationResponse,
    ListNotificationsResponse,
    SendNotificationRequest,
    SendNotificationResponse,
} from '../types/admin/notification'

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

export const sendNotification = (
    body: SendNotificationRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SendNotificationResponse, SendNotificationRequest>(
        '/auth/notifications',
        body,
        config
    )

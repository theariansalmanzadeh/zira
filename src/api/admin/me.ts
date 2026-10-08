import type { AxiosRequestConfig } from 'axios'

import { staffAuthGet, staffAuthPost, staffAuthPut } from '../http'
import type {
    ChangeMyPasswordRequest,
    ChangeMyPasswordResponse,
    DeliveryActionRequest,
    GetStaffNotificationPreferencesResponse,
    GetStaffProfileResponse,
    ListStaffNotificationsResponse,
    UpdateStaffNotificationPreferencesRequest,
    UpdateStaffNotificationPreferencesResponse,
} from '../types/admin/me'
import type { MessageResponse } from '../types/admin/user'

export const getStaffProfile = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetStaffProfileResponse>('/auth/me', config)

export const changeMyPassword = (
    body: ChangeMyPasswordRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ChangeMyPasswordResponse, ChangeMyPasswordRequest>(
        '/auth/me/password',
        body,
        config
    )

export const listStaffNotifications = (config?: AxiosRequestConfig) =>
    staffAuthGet<ListStaffNotificationsResponse>(
        '/auth/me/notifications',
        config
    )

export const markStaffNotificationsSeen = (
    body: DeliveryActionRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<MessageResponse, DeliveryActionRequest>(
        '/auth/me/notifications/seen',
        body,
        config
    )

export const dismissStaffNotifications = (
    body: DeliveryActionRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<MessageResponse, DeliveryActionRequest>(
        '/auth/me/notifications/dismiss',
        body,
        config
    )

export const getStaffNotificationPreferences = (
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetStaffNotificationPreferencesResponse>(
        '/auth/me/notifications/preferences',
        config
    )

export const updateStaffNotificationPreferences = (
    body: UpdateStaffNotificationPreferencesRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<
        UpdateStaffNotificationPreferencesResponse,
        UpdateStaffNotificationPreferencesRequest
    >('/auth/me/notifications/preferences', body, config)

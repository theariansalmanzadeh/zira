import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
} from '../http'
import type {
    ActiveSession,
    ActivityLogChange,
    ActivityLogDetail,
    ActivityLogListItem,
    EventType,
    IpRule,
    IpRuleRequest,
    ListActiveSessionsParams,
    ListActiveSessionsResponse,
    ListActivityLogChangesParams,
    ListActivityLogsParams,
    ListEventTypesParams,
    ListIpRulesParams,
    ListSessionRulesParams,
    Paginated,
    SecurityPolicy,
    SecurityPolicyUpdate,
    SessionLimit,
    SessionLimitRequest,
    SessionTerminateRequest,
    SessionTimeout,
    SessionTimeoutRequest,
} from '../types/admin/securityAndEvents'

const toParams = (params?: object) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null && value !== ''
              )
          )
        : undefined

export const listActiveSessions = (
    params?: ListActiveSessionsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListActiveSessionsResponse>('/events/sessions/active', {
        ...config,
        params: toParams(params),
    })

export const getActiveSession = (
    sessionId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ActiveSession>(
        `/events/sessions/active/${sessionId}`,
        config
    )

export const terminateActiveSession = (
    sessionId: string,
    body?: SessionTerminateRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void, SessionTerminateRequest>(
        `/events/sessions/active/${sessionId}`,
        body,
        config
    )

export const listActivityLogs = (
    params?: ListActivityLogsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Paginated<ActivityLogListItem>>('/events/activity-log', {
        ...config,
        params: toParams(params),
    })

export const exportActivityLogs = (
    params?: ListActivityLogsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob('/events/activity-log/export', {
        ...config,
        params: toParams(params),
    })

export const getActivityLog = (
    logId: string,
    config?: AxiosRequestConfig
) => staffAuthGet<ActivityLogDetail>(`/events/activity-log/${logId}`, config)

export const listActivityLogChanges = (
    logId: string,
    params?: ListActivityLogChangesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Paginated<ActivityLogChange>>(
        `/events/activity-log/${logId}/changes`,
        {
            ...config,
            params: toParams(params),
        }
    )

export const listSessionLimits = (
    params?: ListSessionRulesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Paginated<SessionLimit>>('/events/sessions/limits', {
        ...config,
        params: toParams(params),
    })

export const setSessionLimit = (
    body: SessionLimitRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SessionLimit, SessionLimitRequest>(
        '/events/sessions/limits',
        body,
        config
    )

export const clearSessionLimit = (
    ruleId: string,
    config?: AxiosRequestConfig
) => staffAuthDelete<void>(`/events/sessions/limits/${ruleId}`, undefined, config)

export const listSessionTimeouts = (
    params?: ListSessionRulesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Paginated<SessionTimeout>>('/events/sessions/timeouts', {
        ...config,
        params: toParams(params),
    })

export const setSessionTimeout = (
    body: SessionTimeoutRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SessionTimeout, SessionTimeoutRequest>(
        '/events/sessions/timeouts',
        body,
        config
    )

export const clearSessionTimeout = (
    ruleId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(
        `/events/sessions/timeouts/${ruleId}`,
        undefined,
        config
    )

export const getSecurityPolicy = (config?: AxiosRequestConfig) =>
    staffAuthGet<SecurityPolicy>('/events/security-policy', config)

export const updateSecurityPolicy = (
    body: SecurityPolicyUpdate,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<SecurityPolicy, SecurityPolicyUpdate>(
        '/events/security-policy',
        body,
        config
    )

export const listIpRules = (
    params?: ListIpRulesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Paginated<IpRule>>('/events/security-policy/ip-rules', {
        ...config,
        params: toParams(params),
    })

export const createIpRule = (
    body: IpRuleRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<IpRule, IpRuleRequest>(
        '/events/security-policy/ip-rules',
        body,
        config
    )

export const deleteIpRule = (ruleId: string, config?: AxiosRequestConfig) =>
    staffAuthDelete<void>(
        `/events/security-policy/ip-rules/${ruleId}`,
        undefined,
        config
    )

export const listEventTypes = (
    params?: ListEventTypesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Paginated<EventType>>('/events/event-types', {
        ...config,
        params: toParams(params),
    })

export const getEventType = (
    eventTypeId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<EventType>(`/events/event-types/${eventTypeId}`, config)

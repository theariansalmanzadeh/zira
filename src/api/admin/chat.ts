import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthGet,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    GetChatConversationResponse,
    GetChatSummaryResponse,
    ListChatContactsParams,
    ListChatContactsResponse,
    ListChatConversationsParams,
    ListChatConversationsResponse,
    ListChatMessagesParams,
    ListChatMessagesResponse,
    ListSupervisedMessagesParams,
    ListSupervisedMessagesResponse,
    MarkConversationReadRequest,
    MarkConversationReadResponse,
    OpenDirectConversationRequest,
    OpenDirectConversationResponse,
    SendChatMessageRequest,
    SendChatMessageResponse,
} from '../types/admin/chat'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

export const listChatContacts = (
    params?: ListChatContactsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListChatContactsResponse>('/chat/contacts', {
        ...config,
        params: toParams(params),
    })

export const openDirectConversation = (
    body: OpenDirectConversationRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<
        OpenDirectConversationResponse,
        OpenDirectConversationRequest
    >('/chat/conversations/direct', body, config)

export const listChatConversations = (
    params?: ListChatConversationsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListChatConversationsResponse>('/chat/conversations', {
        ...config,
        params: toParams(params),
    })

export const getChatSummary = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetChatSummaryResponse>('/chat/summary', config)

export const getConversationsSummary = (config?: AxiosRequestConfig) =>
    staffAuthGet<GetChatSummaryResponse>('/chat/conversations/summary', config)

export const listSupervisedMessages = (
    params: ListSupervisedMessagesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListSupervisedMessagesResponse>('/chat/supervision/messages', {
        ...config,
        params: toParams(params),
    })

export const getChatConversation = (
    conversationId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GetChatConversationResponse>(
        `/chat/conversations/${conversationId}`,
        config
    )

export const listChatMessages = (
    conversationId: string,
    params?: ListChatMessagesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ListChatMessagesResponse>(
        `/chat/conversations/${conversationId}/messages`,
        {
            ...config,
            params: toParams(params),
        }
    )

export const sendChatMessage = (
    conversationId: string,
    body: SendChatMessageRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SendChatMessageResponse, SendChatMessageRequest>(
        `/chat/conversations/${conversationId}/messages`,
        body,
        config
    )

export const patchConversationRead = (
    conversationId: string,
    body: MarkConversationReadRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<MarkConversationReadResponse, MarkConversationReadRequest>(
        `/chat/conversations/${conversationId}/read`,
        body,
        config
    )

export const putConversationRead = (
    conversationId: string,
    body: MarkConversationReadRequest,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<MarkConversationReadResponse, MarkConversationReadRequest>(
        `/chat/conversations/${conversationId}/read`,
        body,
        config
    )

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    getChatConversation,
    getChatSummary,
    getConversationsSummary,
    listChatContacts,
    listChatConversations,
    listChatMessages,
    listSupervisedMessages,
    openDirectConversation,
    patchConversationRead,
    putConversationRead,
    sendChatMessage,
} from '@/src/api/admin/chat'
import type {
    ListChatContactsParams,
    ListChatConversationsParams,
    ListChatMessagesParams,
    ListSupervisedMessagesParams,
    MarkConversationReadRequest,
    OpenDirectConversationRequest,
    SendChatMessageRequest,
} from '@/src/api/types/admin/chat'

export const chatKeys = {
    all: ['chat'] as const,
    contacts: (params?: ListChatContactsParams) =>
        [...chatKeys.all, 'contacts', params ?? {}] as const,
    conversations: () => [...chatKeys.all, 'conversations'] as const,
    conversationList: (params?: ListChatConversationsParams) =>
        [...chatKeys.conversations(), 'list', params ?? {}] as const,
    conversationDetail: (conversationId: string) =>
        [...chatKeys.conversations(), 'detail', conversationId] as const,
    messages: (conversationId: string, params?: ListChatMessagesParams) =>
        [
            ...chatKeys.conversationDetail(conversationId),
            'messages',
            params ?? {},
        ] as const,
    summary: () => [...chatKeys.all, 'summary'] as const,
    conversationsSummary: () =>
        [...chatKeys.all, 'conversations-summary'] as const,
    supervisedMessages: (params: ListSupervisedMessagesParams) =>
        [...chatKeys.all, 'supervision', 'messages', params] as const,
}

export const useListChatContacts = (
    params?: ListChatContactsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: chatKeys.contacts(params),
        enabled,
        queryFn: async () => {
            const result = await listChatContacts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListChatConversations = (
    params?: ListChatConversationsParams,
    enabled = true
) => {
    return useQuery({
        queryKey: chatKeys.conversationList(params),
        enabled,
        queryFn: async () => {
            const result = await listChatConversations(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetChatConversation = (
    conversationId: string,
    enabled = true
) => {
    return useQuery({
        queryKey: chatKeys.conversationDetail(conversationId),
        enabled: Boolean(conversationId) && enabled,
        queryFn: async () => {
            const result = await getChatConversation(conversationId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListChatMessages = (
    conversationId: string,
    params?: ListChatMessagesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: chatKeys.messages(conversationId, params),
        enabled: Boolean(conversationId) && enabled,
        queryFn: async () => {
            const result = await listChatMessages(conversationId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetChatSummary = (enabled = true) => {
    return useQuery({
        queryKey: chatKeys.summary(),
        enabled,
        queryFn: async () => {
            const result = await getChatSummary()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetConversationsSummary = (enabled = true) => {
    return useQuery({
        queryKey: chatKeys.conversationsSummary(),
        enabled,
        queryFn: async () => {
            const result = await getConversationsSummary()
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListSupervisedMessages = (
    params: ListSupervisedMessagesParams,
    enabled = true
) => {
    return useQuery({
        queryKey: chatKeys.supervisedMessages(params),
        enabled:
            Boolean(params.user_a_id) && Boolean(params.user_b_id) && enabled,
        queryFn: async () => {
            const result = await listSupervisedMessages(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useOpenDirectConversation = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (body: OpenDirectConversationRequest) => {
            const result = await openDirectConversation(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversations(),
            })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationDetail(data.id),
            })
        },
    })
}

export const useSendChatMessage = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            conversationId,
            body,
        }: {
            conversationId: string
            body: SendChatMessageRequest
        }) => {
            const result = await sendChatMessage(conversationId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationDetail(data.conversation_id),
            })
            queryClient.invalidateQueries({
                queryKey: [
                    ...chatKeys.conversationDetail(data.conversation_id),
                    'messages',
                ],
            })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversations(),
            })
            queryClient.invalidateQueries({ queryKey: chatKeys.summary() })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationsSummary(),
            })
        },
    })
}

export const usePatchConversationRead = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            conversationId,
            body,
        }: {
            conversationId: string
            body: MarkConversationReadRequest
        }) => {
            const result = await patchConversationRead(conversationId, body)
            if (!result.success) throw result.error
            return { conversationId, data: result.data }
        },
        onSuccess: ({ conversationId }) => {
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationDetail(conversationId),
            })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversations(),
            })
            queryClient.invalidateQueries({ queryKey: chatKeys.summary() })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationsSummary(),
            })
        },
    })
}

export const usePutConversationRead = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            conversationId,
            body,
        }: {
            conversationId: string
            body: MarkConversationReadRequest
        }) => {
            const result = await putConversationRead(conversationId, body)
            if (!result.success) throw result.error
            return { conversationId, data: result.data }
        },
        onSuccess: ({ conversationId }) => {
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationDetail(conversationId),
            })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversations(),
            })
            queryClient.invalidateQueries({ queryKey: chatKeys.summary() })
            queryClient.invalidateQueries({
                queryKey: chatKeys.conversationsSummary(),
            })
        },
    })
}

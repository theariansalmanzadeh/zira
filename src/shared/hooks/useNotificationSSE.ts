'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { AxiosInstance } from 'axios'
import { staffApiClient } from '@/src/api/config'
import { listStaffNotifications } from '@/src/api/admin/me'
import { refreshSession, refreshStaffSession } from '@/src/api/register'
import type { StaffNotificationDelivery } from '@/src/api/types/admin/me'
import { useAuthStore } from '@/src/shared/store/auth-store'
import { useStaffAuthStore } from '@/src/shared/store/staff-auth-store'

type NotificationSyncState = {
    unread_count: number
    reason: 'initial' | 'changed' | 'reconcile'
    refresh_required: boolean
}

type UseNotificationSSEOptions = {
    isAdmin?: boolean
}

const STREAM_PATH = 'auth/me/notifications/stream'

const getClient = (): AxiosInstance => staffApiClient

const toReadableStream = (data: unknown): ReadableStream<Uint8Array> | null => {
    if (data instanceof ReadableStream) return data
    return null
}

export function useNotificationSSE({
    isAdmin = false,
}: UseNotificationSSEOptions = {}) {
    const [unreadCount, setUnreadCount] = useState(0)
    const [isConnected, setIsConnected] = useState(false)
    const [messages, setMessages] = useState<StaffNotificationDelivery[]>([])
    const [isLoadingMessages, setIsLoadingMessages] = useState(true)
    const [isMessagesError, setIsMessagesError] = useState(false)
    const abortRef = useRef<AbortController | null>(null)
    const lastUnreadCountRef = useRef(0)

    const refreshMessages = useCallback(async () => {
        if (!isAdmin) {
            setIsLoadingMessages(false)
            return
        }

        setIsMessagesError(false)
        const result = await listStaffNotifications()
        if (!result.success) {
            setIsMessagesError(true)
            setIsLoadingMessages(false)
            return
        }

        setMessages(result.data.results ?? [])
        setIsLoadingMessages(false)
    }, [isAdmin])

    useEffect(() => {
        void refreshMessages()
    }, [refreshMessages])

    useEffect(() => {
        let isMounted = true
        let attempt = 0
        const client = getClient()

        const refreshAuth = async () => {
            try {
                if (isAdmin) {
                    const token = await refreshStaffSession()
                    useStaffAuthStore.getState().setAccessToken(token)
                    return token
                }
                const token = await refreshSession()
                useAuthStore.getState().setAccessToken(token)
                return token
            } catch {
                if (isAdmin) {
                    useStaffAuthStore.getState().clearAuth()
                } else {
                    useAuthStore.getState().clearAuth()
                }
                return null
            }
        }

        async function startStream() {
            while (isMounted) {
                abortRef.current = new AbortController()
                const { signal } = abortRef.current

                try {
                    const response = await client.get(STREAM_PATH, {
                        headers: {
                            Accept: 'text/event-stream',
                        },
                        responseType: 'stream',
                        adapter: 'fetch',
                        timeout: 0,
                        signal,
                        validateStatus: (status) =>
                            status === 200 || status === 401,
                    })

                    if (response.status === 401) {
                        const token = await refreshAuth()
                        if (!token) break
                        continue
                    }

                    const stream = toReadableStream(response.data)
                    if (!stream) {
                        throw new Error('SSE stream unavailable')
                    }

                    if (isMounted) {
                        setIsConnected(true)
                    }
                    attempt = 0

                    const reader = stream.getReader()
                    const decoder = new TextDecoder()
                    let buffer = ''
                    let currentEvent = 'message'

                    while (isMounted && !signal.aborted) {
                        const { value, done } = await reader.read()
                        if (done) break

                        buffer += decoder.decode(value, { stream: true })
                        const lines = buffer.split(/\r\n|\r|\n/)
                        buffer = lines.pop() || ''

                        for (const line of lines) {
                            if (line.startsWith(':')) continue
                            if (line.startsWith('event:')) {
                                currentEvent = line
                                    .replace('event:', '')
                                    .trim()
                            } else if (line.startsWith('data:')) {
                                const rawData = line
                                    .replace('data:', '')
                                    .trim()

                                if (currentEvent === 'notifications.sync') {
                                    const state: NotificationSyncState =
                                        JSON.parse(rawData)
                                    const nextUnread = state.unread_count
                                    const previousUnread =
                                        lastUnreadCountRef.current
                                    const unreadIncreased =
                                        nextUnread > previousUnread

                                    lastUnreadCountRef.current = nextUnread

                                    if (isMounted) {
                                        setUnreadCount(nextUnread)
                                    }

                                    if (unreadIncreased) {
                                        await refreshMessages()
                                    }
                                } else if (currentEvent === 'auth.required') {
                                    await refreshAuth()
                                    abortRef.current?.abort()
                                }
                            } else if (line === '') {
                                currentEvent = 'message'
                            }
                        }
                    }
                } catch {
                    if (signal.aborted) break
                } finally {
                    if (isMounted) {
                        setIsConnected(false)
                    }
                }

                if (isMounted) {
                    const delay = Math.min(
                        30000,
                        3000 * Math.pow(2, Math.min(attempt++, 4))
                    )
                    await new Promise((resolve) => setTimeout(resolve, delay))
                }
            }
        }

        void startStream()

        return () => {
            isMounted = false
            abortRef.current?.abort()
        }
    }, [isAdmin, refreshMessages])

    return {
        unreadCount,
        isConnected,
        messages,
        isLoadingMessages,
        isMessagesError,
        refreshMessages,
    }
}

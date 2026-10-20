'use client'

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import type { Conversation } from '@/src/api/types/admin/chat'
import { useListChatConversations } from '@/src/routes/support/hooks/chat'

type ColleagueMessagesContextValue = {
    filter: string
    setFilter: (value: string) => void
    conversationsHistory: Conversation[]
    conversations: Conversation[]
    conversationId: string | null
    setConversationId: (id: string) => void
    selected: Conversation | null
}

const ColleagueMessagesContext =
    createContext<ColleagueMessagesContextValue | null>(null)

export const ColleagueMessagesProvider = ({
    children,
}: {
    children: ReactNode
}) => {
    const { data: conversationsData } = useListChatConversations({
        page: 1,
        page_size: 100,
    })
    const [conversationsHistory, setConversationsHistory] = useState<
        Conversation[]
    >([])
    const [filter, setFilter] = useState('all')
    const [conversationId, setConversationId] = useState<string | null>(null)

    useEffect(() => {
        if (conversationsData?.results) {
            setConversationsHistory(conversationsData.results)
        }
    }, [conversationsData])

    const conversations = useMemo(
        () =>
            conversationsHistory.filter((item) =>
                filter === 'unread' ? (item.unread_count ?? 0) > 0 : true
            ),
        [conversationsHistory, filter]
    )

    const selected =
        conversationsHistory.find((item) => item.id === conversationId) ?? null

    const value = useMemo(
        () => ({
            filter,
            setFilter,
            conversationsHistory,
            conversations,
            conversationId,
            setConversationId,
            selected,
        }),
        [
            filter,
            conversationsHistory,
            conversations,
            conversationId,
            selected,
        ]
    )

    return (
        <ColleagueMessagesContext.Provider value={value}>
            {children}
        </ColleagueMessagesContext.Provider>
    )
}

export const useColleagueMessages = () => {
    const context = useContext(ColleagueMessagesContext)
    if (!context) {
        throw new Error(
            'useColleagueMessages must be used within ColleagueMessagesProvider'
        )
    }
    return context
}

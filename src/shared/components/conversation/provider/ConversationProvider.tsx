'use client'

import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'
import type { TicketMessage } from '@/src/api/types/admin/support'
import {
    useListTicketMessages,
    useReplyTicketMessage,
} from '@/src/routes/support/hooks/support'

type ConversationContextValue = {
    messages: TicketMessage[]
    isLoading: boolean
    addText: (text: string) => void
}

const ConversationContext = createContext<ConversationContextValue | null>(null)

export const useConversation = () => {
    const context = useContext(ConversationContext)
    if (!context) {
        throw new Error('useConversation must be used within ConversationProvider')
    }
    return context
}

type ConversationProviderProps = {
    ticketId: string
    children: ReactNode
}

const ConversationProvider = ({
    ticketId,
    children,
}: ConversationProviderProps) => {
    const { data, isPending } = useListTicketMessages(ticketId)
    const { mutate: replyTicketMessage } = useReplyTicketMessage()
    const [messages, setMessages] = useState<TicketMessage[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(isPending)
        if (!data) return
        setMessages(
            [...data.items].sort((left, right) => left.sequence - right.sequence)
        )
    }, [data, isPending])

    const addText = (text: string) => {
        const body = text.trim()
        if (!body) return

        replyTicketMessage({ ticketId, body: { body } })
    }

    return (
        <ConversationContext.Provider value={{ messages, isLoading, addText }}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationProvider

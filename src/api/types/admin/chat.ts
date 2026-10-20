import type { PaginatedResponse } from './common'

export type ChatContact = {
    user_id: string
    display_name: string
}

export type ConversationPeer = {
    user_id: string
    display_name: string
}

export type ChatMessage = {
    id: string
    conversation_id: string
    sequence: number
    sender_id: string
    body: string
    client_message_id: string
    sent_at: string
}

export type Conversation = {
    id: string
    peer: ConversationPeer
    last_message?: ChatMessage | null
    last_message_sequence: number
    last_message_at?: string | null
    own_last_read_sequence: number
    peer_last_read_sequence: number
    unread_count?: number | null
    can_send?: boolean
}

export type ChatSummary = {
    unread_messages: number
    unread_conversations: number
}

export type ChatInspectionParticipant = {
    user_id: string
    display_name: string
}

export type ChatInspectionPage = {
    total: number
    page: number
    page_size: number
    results: ChatMessage[]
    conversation_id: string
    snapshot_sequence: number
    participant_low: ChatInspectionParticipant
    participant_high: ChatInspectionParticipant
}

export type ChatMessagePage = {
    total: number
    page: number
    page_size: number
    results: ChatMessage[]
    snapshot_sequence: number
    own_last_read_sequence: number
    peer_last_read_sequence: number
}

export type ListChatContactsParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListChatConversationsParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type ListChatMessagesParams = {
    page?: number
    page_size?: number
    query?: string | null
    snapshot_sequence?: number | null
    after_sequence?: number | null
    before_sequence?: number | null
}

export type ListSupervisedMessagesParams = {
    user_a_id: string
    user_b_id: string
    page?: number
    page_size?: number
    query?: string | null
    snapshot_sequence?: number | null
    after_sequence?: number | null
    before_sequence?: number | null
}

export type OpenDirectConversationRequest = {
    peer_user_id: string
}

export type SendChatMessageRequest = {
    body: string
    client_message_id: string
}

export type MarkConversationReadRequest = {
    through_message_id: string
}

export type ConversationRead = {
    last_read_sequence: number
    peer_last_read_sequence: number
}

export type ListChatContactsResponse = PaginatedResponse<ChatContact>

export type ListChatConversationsResponse = PaginatedResponse<Conversation>

export type OpenDirectConversationResponse = Conversation
export type GetChatConversationResponse = Conversation
export type GetChatSummaryResponse = ChatSummary
export type ListChatMessagesResponse = ChatMessagePage
export type ListSupervisedMessagesResponse = ChatInspectionPage
export type SendChatMessageResponse = ChatMessage
export type MarkConversationReadResponse = ConversationRead

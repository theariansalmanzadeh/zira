import { create } from 'zustand'

export type ChatAttachment = {
    id: string
    name: string
    url: string
} | null

export type ChatOperator = {
    id: string
    name: string
}

export type ChatMessage = {
    id: string
    textContent: string
    attachment: ChatAttachment
    date: string
    operator: ChatOperator
}

type ChatState = {
    query: ChatMessage[]
    response: ChatMessage[]
    addQuery: (message: ChatMessage) => void
    addResponse: (message: ChatMessage) => void
    setQuery: (messages: ChatMessage[]) => void
    setResponse: (messages: ChatMessage[]) => void
    clearChat: () => void
}

export const useChatStore = create<ChatState>((set) => ({
    query: [],
    response: [],
    addQuery: (message) =>
        set((state) => ({
            query: [...state.query, message],
        })),
    addResponse: (message) =>
        set((state) => ({
            response: [...state.response, message],
        })),
    setQuery: (messages) => set({ query: messages }),
    setResponse: (messages) => set({ response: messages }),
    clearChat: () => set({ query: [], response: [] }),
}))

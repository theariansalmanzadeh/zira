'use client'

import { ToggleGroup, ToggleGroupItem } from '@/src/shared/components/ui/ToggleGroup'
import { useGetConversationsSummary } from '@/src/routes/support/hooks/chat'

const FILTERS = [
    { value: 'all', label: 'همه' },
    { value: 'unread', label: 'خوانده‌نشده' },
] as const

type MessageListHeaderProps = {
    value: string
    onValueChange: (value: string) => void
}

const MessageListHeader = ({ value, onValueChange }: MessageListHeaderProps) => {
    const { data: summary } = useGetConversationsSummary()
    const unreadConversations = summary?.unread_conversations ?? 0

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-3">
            <h2 className="text-title-lg text-on-surface">پیام همکاران</h2>
            <ToggleGroup
                type="single"
                value={value}
                onValueChange={(next) => {
                    if (next) onValueChange(next)
                }}
                variant="outline-variant"
                size="sm"
            >
                {FILTERS.map((filter) => (
                    <ToggleGroupItem key={filter.value} value={filter.value}>
                        {filter.value === 'unread' && unreadConversations > 0
                            ? `${filter.label} (${unreadConversations.toLocaleString('fa-IR')})`
                            : filter.label}
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    )
}

export default MessageListHeader

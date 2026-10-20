'use client'

import { useMemo, useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Input } from '@/src/shared/components/ui/Input'
import { cn } from '@/src/shared/libs/utils'
import { useGetStaffProfile } from '@/src/routes/userManagment/hooks/me'
import {
    useListChatMessages,
    useSendChatMessage,
} from '@/src/routes/support/hooks/chat'
import { useColleagueMessages } from '../provider/ColleagueMessagesProvider'

type ThreadMessage = {
    id: string
    sender: string
    content: string
    createdAt: string
    mine: boolean
}

const formatTime = (iso: string) =>
    new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date(iso))

const EmptyThread = () => (
    <div className="flex flex-col items-center gap-2 text-center">
        <Icon label="conversation" size={40} className="size-10 text-outline" />
        <h3 className="text-title-md text-on-surface">گفتگویی انتخاب نشده</h3>
        <p className="text-body-sm text-on-surface-variant">
            یک پیام را از فهرست انتخاب کنید.
        </p>
    </div>
)

const MessageBubble = ({ message }: { message: ThreadMessage }) => {
    const mine = Boolean(message.mine)
    return (
        <li
            className={cn(
                'flex max-w-[75%] flex-col gap-1 rounded-2xl px-4 py-3 shadow-sm',
                mine
                    ? 'self-end rounded-ee-md bg-primary text-on-primary'
                    : 'self-start rounded-es-md bg-surface-container-lowest text-on-surface'
            )}
        >
            <div className="flex items-center justify-between gap-3">
                <p
                    className={cn(
                        'truncate text-label-md',
                        mine ? 'text-on-primary' : 'text-on-surface'
                    )}
                >
                    {message.sender}
                </p>
                <span
                    className={cn(
                        'shrink-0 text-label-sm',
                        mine ? 'text-on-primary/80' : 'text-on-surface-variant'
                    )}
                >
                    {message.createdAt}
                </span>
            </div>
            <p
                className={cn(
                    'text-body-md',
                    mine ? 'text-on-primary' : 'text-on-surface-variant'
                )}
            >
                {message.content}
            </p>
        </li>
    )
}

const MessageComposer = ({ conversationId }: { conversationId: string }) => {
    const [draft, setDraft] = useState('')
    const { mutate: sendMessage, isPending } = useSendChatMessage()

    return (
        <form
            className="flex items-center gap-2 border-t border-outline-variant bg-surface-container-lowest p-4"
            onSubmit={(event) => {
                event.preventDefault()
                const text = draft.trim()
                if (!text || isPending) return

                sendMessage(
                    {
                        conversationId,
                        body: {
                            body: text,
                            client_message_id: crypto.randomUUID(),
                        },
                    },
                    {
                        onSuccess: () => setDraft(''),
                    }
                )
            }}
        >
            <Input
                value={draft}
                onChange={setDraft}
                placeholder="پیام خود را بنویسید"
                containerClassName="min-w-0 flex-1"
                disabled={isPending}
            />
            <Button
                type="submit"
                variant="primary"
                size="icon"
                disabled={!draft.trim() || isPending}
                isLoading={isPending}
                aria-label="ارسال پیام"
            >
                <Icon
                    label="arrowUpward400Linear"
                    className="size-5 text-primary"
                />
            </Button>
        </form>
    )
}

const MessageThread = () => {
    const { selected, conversationId } = useColleagueMessages()
    const { data: profile } = useGetStaffProfile()
    const { data: messagesPage } = useListChatMessages(
        conversationId ?? '',
        { page: 1, page_size: 100 },
        Boolean(conversationId)
    )

    const messages = useMemo<ThreadMessage[]>(() => {
        const peerName = selected?.peer.display_name ?? ''
        const myId = profile?.id

        return [...(messagesPage?.results ?? [])]
            .sort((a, b) => a.sequence - b.sequence)
            .map((message) => {
                const mine = Boolean(myId && message.sender_id === myId)
                return {
                    id: message.id,
                    sender: mine ? 'شما' : peerName,
                    content: message.body,
                    createdAt: formatTime(message.sent_at),
                    mine,
                }
            })
    }, [messagesPage, profile?.id, selected?.peer.display_name])

    if (!selected || !conversationId) {
        return (
            <section className="hidden items-center justify-center bg-surface-container sm:col-span-8 sm:flex">
                <EmptyThread />
            </section>
        )
    }

    return (
        <section className="hidden min-h-0 flex-col bg-surface-container sm:col-span-8 sm:flex">
            <ul className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                ))}
            </ul>
            <MessageComposer conversationId={conversationId} />
        </section>
    )
}

export default MessageThread

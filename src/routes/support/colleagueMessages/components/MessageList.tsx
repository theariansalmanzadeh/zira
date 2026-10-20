'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import IconButton from '@/src/shared/components/ui/IconButton'
import { ModalTypes } from '@/src/shared/components/modals/types'
import { cn } from '@/src/shared/libs/utils'
import { useModalStore } from '@/src/shared/store/modal-store'
import { useColleagueMessages } from '../provider/ColleagueMessagesProvider'
import MessageListHeader from './MessageListHeader'

const ConversationsEmptyState = ({ isUnreadFilter }: { isUnreadFilter: boolean }) => (
    <div className="flex flex-1 flex-col items-center justify-center gap-2 px-5 py-10 text-center">
        <Icon label="conversation" size={40} className="size-10 text-outline" />
        <h3 className="text-title-md text-on-surface">
            {isUnreadFilter ? 'پیام خوانده‌نشده‌ای نیست' : 'گفتگویی وجود ندارد'}
        </h3>
        <p className="text-body-sm text-on-surface-variant">
            {isUnreadFilter
                ? 'همه گفتگوها خوانده شده‌اند.'
                : 'برای شروع، پیام جدیدی ارسال کنید.'}
        </p>
    </div>
)

const initials = (name: string) =>
    name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0] ?? '')
        .join('')

const formatTime = (iso?: string | null) => {
    if (!iso) return ''
    return new Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(new Date(iso))
}

const MessageList = () => {
    const {
        conversations,
        filter,
        setFilter,
        conversationId,
        setConversationId,
    } = useColleagueMessages()
    const openModal = useModalStore((state) => state.openModal)

    return (
        <aside className="col-span-full flex flex-col border-outline-variant bg-surface-container-lowest pt-5 sm:col-span-4 sm:border-e">
            <div className="flex items-start justify-between gap-2 border-b border-outline-variant px-5 pb-4">
                <MessageListHeader value={filter} onValueChange={setFilter} />
                <IconButton
                    icon="addSm400Linear"
                    className="bg-info-container text-info shrink-0"
                    iconClassName="text-info"
                    aria-label="پیام جدید"
                    onClick={() =>
                        openModal(ModalTypes.NEW_COLLEAGUE_MESSAGE, {
                            onOpened: setConversationId,
                        })
                    }
                />
            </div>
            {conversations.length === 0 ? (
                <ConversationsEmptyState isUnreadFilter={filter === 'unread'} />
            ) : (
                <ul className="flex flex-col overflow-y-auto">
                    {conversations.map((item) => {
                        const name = item.peer.display_name
                        const unread = (item.unread_count ?? 0) > 0

                        return (
                            <li key={item.id}>
                                <button
                                    type="button"
                                    onClick={() => setConversationId(item.id)}
                                    className={cn(
                                        'flex w-full cursor-pointer gap-3 border-b border-outline-variant px-5 py-4 text-start hover:bg-surface-container',
                                        conversationId === item.id &&
                                            'bg-surface-container'
                                    )}
                                >
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-label-md text-on-surface-variant">
                                        {initials(name)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <p className="grow truncate text-label-lg text-on-surface">
                                                {name}
                                            </p>
                                            <span className="shrink-0 text-label-sm text-on-surface-variant">
                                                {formatTime(
                                                    item.last_message_at ??
                                                        item.last_message?.sent_at
                                                )}
                                            </span>
                                            {unread ? (
                                                <span className="size-2 shrink-0 rounded-full bg-error" />
                                            ) : null}
                                        </div>
                                        <p className="truncate text-body-sm text-on-surface-variant">
                                            {item.last_message?.body ?? ''}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </aside>
    )
}

export default MessageList

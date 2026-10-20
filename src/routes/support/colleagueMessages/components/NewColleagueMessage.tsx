'use client'

import { useMemo, useState } from 'react'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { Button } from '@/src/shared/components/ui/button'
import type { BaseModalProps } from '@/src/shared/components/modals/types'
import {
    useListChatContacts,
    useOpenDirectConversation,
    useSendChatMessage,
} from '@/src/routes/support/hooks/chat'

export type NewColleagueMessageModalData = {
    onOpened?: (conversationId: string) => void
}

const NewColleagueMessage = ({ closeModal, data }: BaseModalProps) => {
    const modalData = (data as NewColleagueMessageModalData | null) ?? {}
    const [peerUserId, setPeerUserId] = useState('')
    const [body, setBody] = useState('')
    const [contactQuery, setContactQuery] = useState('')

    const { data: contactsPage } = useListChatContacts({
        page: 1,
        page_size: 100,
        query: contactQuery || null,
    })
    const { mutate: openConversation, isPending: isOpening } =
        useOpenDirectConversation()
    const { mutate: sendMessage, isPending: isSending } = useSendChatMessage()

    const isPending = isOpening || isSending
    const contactOptions = useMemo(
        () =>
            (contactsPage?.results ?? []).map((contact) => ({
                label: contact.display_name,
                value: contact.user_id,
            })),
        [contactsPage]
    )

    const canSubmit = Boolean(peerUserId && body.trim()) && !isPending

    return (
        <form
            className="flex flex-col gap-4 pt-2"
            onSubmit={(event) => {
                event.preventDefault()
                if (!canSubmit) return

                openConversation(
                    { peer_user_id: peerUserId },
                    {
                        onSuccess: (conversation) => {
                            sendMessage(
                                {
                                    conversationId: conversation.id,
                                    body: {
                                        body: body.trim(),
                                        client_message_id: crypto.randomUUID(),
                                    },
                                },
                                {
                                    onSuccess: () => {
                                        modalData.onOpened?.(conversation.id)
                                        closeModal()
                                    },
                                }
                            )
                        },
                    }
                )
            }}
        >
            <FormDropdown
                label="کاربر"
                placeholder="انتخاب همکار"
                value={peerUserId}
                options={contactOptions}
                onChange={setPeerUserId}
                hasSearch
                searchQuery={contactQuery}
                onSearch={setContactQuery}
            />
            <div className="flex flex-col gap-1.5">
                <span className="text-label-md text-on-surface-variant">
                    پیام
                </span>
                <Textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="پیام خود را بنویسید"
                    rows={4}
                />
            </div>
            <Button
                type="submit"
                variant="primary"
                disabled={!canSubmit}
                isLoading={isPending}
                className="self-end"
            >
                ارسال
            </Button>
        </form>
    )
}

export default NewColleagueMessage

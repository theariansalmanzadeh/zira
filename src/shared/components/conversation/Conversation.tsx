'use client'

import { cn } from '@shared/libs/utils'
import { Spinner } from '@/src/shared/components/ui/spinner'
import ConversationInput from './component/ConversationInput'
import QueryBlubbe from './component/QueryBlubbe'
import ResponseBlubbe from './component/ResponseBlubbe'
import ConversationProvider, { useConversation } from './provider/ConversationProvider'

type ConversationProps = {
    ticketId: string
    className?: string
}

const ConversationBody = ({ className }: { className?: string }) => {
    const { messages, isLoading } = useConversation()
    const customerMessages = messages.filter((message) => !message.is_reply)
    const replies = messages.filter((message) => message.is_reply)

    return (
        <div
            className={cn(
                'relative flex h-full flex-col gap-6 rounded-container-xl bg-surface-container-lowest p-6',
                className
            )}
            dir='rtl'
        >
            {isLoading ? (
                <div className='flex justify-center py-6'>
                    <Spinner className='size-6' />
                </div>
            ) : (
                <>
                    <div className='flex flex-col items-end gap-6'>
                        {customerMessages.map((message) => (
                            <QueryBlubbe
                                key={message.id}
                                textContent={message.body}
                                date={message.sent_at}
                                operator={{
                                    id: message.id,
                                    name: message.sender_name,
                                }}
                            />
                        ))}
                    </div>
                    <div className='flex flex-col gap-6'>
                        {replies.map((message) => (
                            <ResponseBlubbe
                                key={message.id}
                                textContent={message.body}
                                date={message.sent_at}
                                operator={{
                                    id: message.id,
                                    name: message.sender_name,
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
            <ConversationInput />
        </div>
    )
}

const Conversation = ({ ticketId, className }: ConversationProps) => {
    return (
        <ConversationProvider ticketId={ticketId}>
            <ConversationBody className={className} />
        </ConversationProvider>
    )
}

export default Conversation

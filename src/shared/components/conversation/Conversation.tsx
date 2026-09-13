import { cn } from '@shared/libs/utils'
import ConversationInput from './component/ConversationInput'
import ResponseBlubbe from './component/ResponseBlubbe'
import QueryBlubbe from './component/QueryBlubbe'

type ConversationProps = {
    children?: React.ReactNode
    className?: string
}

const Conversation = ({ className }: ConversationProps) => {
    return (
        <div
            className={cn(
                'flex flex-col gap-6 rounded-container-xl bg-surface-container-lowest',
                "p-6",
                "relative h-full",
                className
            )}
            dir="rtl"
        >
            <div className='flex flex-col items-end gap-6'>
                <QueryBlubbe textContent="این یک درخواست است" date="2026-07-16" operator={{ name: "علی", id: "1" }} />
            </div>

            <div className='flex flex-col gap-6'>
                {/* <ResponseBlubbe textContent="این یک پاسخ به یک درخواست است" date="2026-07-16" operator={{ name: "علی", avatar: "https://via.placeholder.com/150" }} />
                <ResponseBlubbe textContent="این یک پاسخ به یک درخواست است" date="2026-07-16" operator={{ name: "محمد", avatar: "https://via.placeholder.com/150" }} />
                <ResponseBlubbe textContent="این یک پاسخ به یک درخواست است" date="2026-07-16" operator={{ name: "رضا", avatar: "https://via.placeholder.com/150" }} /> */}
            </div>
            <ConversationInput />
        </div>
    )
}

export default Conversation

'use client'

import MessageList from './components/MessageList'
import MessageThread from './components/MessageThread'
import { ColleagueMessagesProvider } from './provider/ColleagueMessagesProvider'

const ColleagueMessages = () => (
    <ColleagueMessagesProvider>
        <div className="grid min-h-[70vh] flex-1 grid-cols-12 overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-lowest">
            <MessageList />
            <MessageThread />
        </div>
    </ColleagueMessagesProvider>
)

export default ColleagueMessages

'use client'

import { useId, useState } from 'react'
import { Textarea } from '../../ui/TextArea'
import IconButton from '../../ui/IconButton'
import { Label } from '../../ui/Label'
import { Button } from '../../ui/button'
import { Checkbox } from '../../ui/Checkbox'
import { Icon } from '../../Icons/Icon'
import { useEnterKey } from '@/src/shared/hooks/useEnterKey'
import { useConversation } from '../provider/ConversationProvider'

const ConversationInput = () => {
    const internalNoteId = useId()
    const [isInternalNote, setIsInternalNote] = useState(false)
    const [text, setText] = useState('')
    const { addText } = useConversation()

    const handleSend = () => {
        addText(text)
        setText('')
    }

    const containerRef = useEnterKey<HTMLDivElement>(handleSend)

    return (
        <div
            ref={containerRef}
            className="w-[95%] mx-auto flex flex-col gap-3 shadow-2xl rounded-card-lg bg-surface-container-lowest p-6 absolute bottom-[20px] left-0 right-0"
            dir="rtl"
        >
            <Textarea
                placeholder='پاسخ خود را بنویسید...'
                rows={1}
                value={text}
                onChange={(event) => setText(event.target.value)}
                className='bg-surface-container-highest'
            />
            <div className="border-1 border-dashed border-outline-variant   " />
            <div className="flex flex-row items-center justify-between gap-3">
                <div className="flex flex-row items-center gap-3">
                    <IconButton icon="attachment400Linear" variant="ghost" />
                    <div className="flex flex-row items-center gap-2">
                        <Checkbox
                            id={internalNoteId}
                            checked={isInternalNote}
                            onCheckedChange={(checked) =>
                                setIsInternalNote(checked === true)
                            }
                            className="size-5 rounded-md"
                            variant="default-outline"
                        />
                        <Label
                            htmlFor={internalNoteId}
                            className="cursor-pointer text-label-md text-on-surface-variant"
                        >
                            یادداشت داخلی
                        </Label>
                    </div>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <Button variant="ghost" className='text-label-md text-on-surface-variant'>بستن تیکت</Button>
                    <Button type='button' variant='primary' onClick={handleSend}>
                        ارسال <Icon label="arrowOutwardLeft400Broken" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConversationInput

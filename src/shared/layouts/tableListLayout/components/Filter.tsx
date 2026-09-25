'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/src/shared/components/ui/Dialog'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Icon } from '@/src/shared/components/Icons/Icon'
import FilterBody from './FilterBody'

const Filter = () => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <IconButton icon='filter400Linear' />
            </DialogTrigger>
            <DialogContent
                className='min-w-[700px]! p-3'
                showCloseButton={true}
            >
                <DialogHeader className='flex flex-row items-center justify-between'>
                    <DialogTitle>فیلتر جدول</DialogTitle>
                    <Icon label='info' />
                </DialogHeader>
                <FilterBody
                    onBack={() => setOpen(false)}
                    onApply={() => setOpen(false)}
                    onReset={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
}

export default Filter

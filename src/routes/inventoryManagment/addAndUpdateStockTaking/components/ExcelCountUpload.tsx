'use client'

import { useRef, useState } from 'react'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { cn } from '@shared/libs/utils'

const ExcelCountUpload = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [fileName, setFileName] = useState<string>()
    const [isDragging, setIsDragging] = useState(false)

    const handlePick = (file?: File | null) => {
        if (!file) return
        setFileName(file.name)
    }

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center gap-3 rounded-card-lg border border-dashed border-outline-variant bg-surface-container-high/40 px-6 py-10 text-center transition-colors',
                isDragging && 'border-primary bg-primary/5'
            )}
            dir='rtl'
            onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(event) => {
                event.preventDefault()
                setIsDragging(false)
                handlePick(event.dataTransfer.files?.[0])
            }}
        >
            <Icon
                label='fileNew400Linear'
                className='size-10! text-outline'
            />
            <div className='flex flex-col gap-1.5'>
                <span className='text-label-lg font-semibold text-on-surface'>
                    {fileName
                        ? fileName
                        : 'فایل اکسل شمارش را اینجا رها کنید'}
                </span>
                <p className='max-w-xl text-label-md text-outline'>
                    ستون‌های «کد محصول» و «تعداد شمارش‌شده» الزامی هستند. مقادیر
                    به‌صورت تجمیعی روی ردیف‌های زیر اعمال می‌شوند.
                </p>
            </div>
            <Button
                type='button'
                variant='ghost'
                className='bg-primary/10 text-primary hover:bg-primary/16'
                onClick={() => inputRef.current?.click()}
            >
                <span className='text-label-sm text-primary'>
                    انتخاب فایل اکسل
                </span>
            </Button>
            <input
                ref={inputRef}
                type='file'
                accept='.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                className='hidden'
                onChange={(event) => handlePick(event.target.files?.[0])}
            />
        </div>
    )
}

export default ExcelCountUpload

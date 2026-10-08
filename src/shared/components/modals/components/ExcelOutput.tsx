'use client'

import { useState } from 'react'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import { toEnglishDigits } from '@/src/shared/schema/generalSchema'
import { exportToExcel } from '@/src/shared/libs/exportExcel'
import type { ExcelTemplateColumn } from '@/src/routes/customers/constants/excelTemplate'
import type { BaseModalProps } from '../types'

export type ExcelOutputModalData = {
    columns: ExcelTemplateColumn[]
    getData: () => Record<string, string | number>[]
}

const onlyDigits = (value: string) => toEnglishDigits(value).replace(/\D/g, '')

const ExcelOutput = ({ closeModal, data }: BaseModalProps) => {
    const modalData = data as ExcelOutputModalData | null | undefined
    const columns = modalData?.columns ?? []
    const [fileName, setFileName] = useState('export.xlsx')
    const [queryFrom, setQueryFrom] = useState('')
    const [queryTo, setQueryTo] = useState('')

    const handleExport = async () => {
        const trimmedName = fileName.trim()
        if (!trimmedName || !modalData?.getData) return

        const name = trimmedName.endsWith('.xlsx')
            ? trimmedName
            : `${trimmedName}.xlsx`

        await exportToExcel(modalData.getData(), columns, name)
        closeModal()
    }

    return (
        <div className='flex w-full flex-col gap-5' dir='rtl'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                <div className='sm:col-span-2'>
                    <Input
                        label='نام فایل'
                        value={fileName}
                        onChange={setFileName}
                        wrapperClassName='w-full'
                    />
                </div>
                <Input
                    label='از'
                    value={queryFrom}
                    inputMode='numeric'
                    onChange={(value) => setQueryFrom(onlyDigits(value))}
                    wrapperClassName='w-full'
                />
                <Input
                    label='تا'
                    value={queryTo}
                    inputMode='numeric'
                    onChange={(value) => setQueryTo(onlyDigits(value))}
                    wrapperClassName='w-full'
                />
            </div>
            <div className='flex flex-row items-center gap-3 border-t border-outline-variant pt-4'>
                <Button
                    type='button'
                    variant='primary'
                    disabled={!fileName.trim() || !queryFrom || !queryTo}
                    onClick={handleExport}
                >
                    خروجی اکسل
                </Button>
                <Button type='button' variant='outline' onClick={closeModal}>
                    انصراف
                </Button>
            </div>
        </div>
    )
}

export default ExcelOutput

'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import {
    BRANCH_OPTIONS,
    FILTER_DEFAULTS,
    FILTER_QUERY_KEYS,
    STORAGE_OPTIONS,
} from '../constants'

const Filters = () => {
    const searchParams = useSearchParams()
    const { setSearchParams } = useSearchParam()

    const [branch, setBranch] = useState(
        searchParams.get(FILTER_QUERY_KEYS.branch) ?? FILTER_DEFAULTS.branch
    )
    const [storage, setStorage] = useState(
        searchParams.get(FILTER_QUERY_KEYS.storage) ?? FILTER_DEFAULTS.storage
    )

    const handleUpdate = () => {
        setSearchParams({
            [FILTER_QUERY_KEYS.branch]: branch,
            [FILTER_QUERY_KEYS.storage]: storage,
        })
    }

    return (
        <div
            className='rounded-card-md bg-surface-container-lowest p-6'
            dir='rtl'
        >
            <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                <FormDropdown
                    label='انتخاب شعبه *'
                    placeholder='انتخاب'
                    value={branch}
                    options={BRANCH_OPTIONS}
                    onChange={setBranch}
                />
                <FormDropdown
                    label='محل نگهداری (خود شعبه و انبارها)'
                    placeholder='انتخاب'
                    value={storage}
                    options={STORAGE_OPTIONS}
                    onChange={setStorage}
                />
            </div>
            <div className='flex justify-end'>
                <Button
                    type='button'
                    variant='primary'
                    className='mt-6 mr-auto w-fit'
                    onClick={handleUpdate}
                >
                    به روز رسانی گزارش
                </Button>
            </div>
        </div>
    )
}

export default Filters

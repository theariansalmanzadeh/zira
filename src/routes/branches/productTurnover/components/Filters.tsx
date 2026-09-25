'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Button } from '@/src/shared/components/ui/button'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import {
    BRANCH_OPTIONS,
    DOCUMENT_TYPE_OPTIONS,
    FILTER_DEFAULTS,
    FILTER_QUERY_KEYS,
    TIME_RANGE_OPTIONS,
    WAREHOUSE_OPTIONS,
} from '../constants'

const Filters = () => {
    const searchParams = useSearchParams()
    const { setSearchParams } = useSearchParam()

    const [branch, setBranch] = useState(
        searchParams.get(FILTER_QUERY_KEYS.branch) ?? FILTER_DEFAULTS.branch
    )
    const [warehouse, setWarehouse] = useState(
        searchParams.get(FILTER_QUERY_KEYS.warehouse) ??
            FILTER_DEFAULTS.warehouse
    )
    const [documentType, setDocumentType] = useState(
        searchParams.get(FILTER_QUERY_KEYS.documentType) ??
            FILTER_DEFAULTS.documentType
    )
    const [timeRange, setTimeRange] = useState(
        searchParams.get(FILTER_QUERY_KEYS.timeRange) ??
            FILTER_DEFAULTS.timeRange
    )

    const handleApply = () => {
        setSearchParams({
            [FILTER_QUERY_KEYS.branch]: branch,
            [FILTER_QUERY_KEYS.warehouse]: warehouse,
            [FILTER_QUERY_KEYS.documentType]: documentType,
            [FILTER_QUERY_KEYS.timeRange]: timeRange,
        })
    }

    const handleReset = () => {
        setBranch(FILTER_DEFAULTS.branch)
        setWarehouse(FILTER_DEFAULTS.warehouse)
        setDocumentType(FILTER_DEFAULTS.documentType)
        setTimeRange(FILTER_DEFAULTS.timeRange)
        setSearchParams({
            [FILTER_QUERY_KEYS.branch]: null,
            [FILTER_QUERY_KEYS.warehouse]: null,
            [FILTER_QUERY_KEYS.documentType]: null,
            [FILTER_QUERY_KEYS.timeRange]: null,
        })
    }

    return (
        <div
            className='flex flex-col gap-4 rounded-card-lg bg-surface-container-lowest p-4'
            dir='rtl'
        >
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                <FormDropdown
                    label='شعبه'
                    value={branch}
                    options={BRANCH_OPTIONS}
                    onChange={setBranch}
                />
                <FormDropdown
                    label='انبار'
                    value={warehouse}
                    options={WAREHOUSE_OPTIONS}
                    onChange={setWarehouse}
                />
                <FormDropdown
                    label='نوع سند'
                    value={documentType}
                    options={DOCUMENT_TYPE_OPTIONS}
                    onChange={setDocumentType}
                />
                <FormDropdown
                    label='بازه زمانی'
                    value={timeRange}
                    options={TIME_RANGE_OPTIONS}
                    onChange={setTimeRange}
                />
            </div>

            <div className='flex flex-row flex-wrap items-center justify-end gap-2'>
                <Button type='button' variant='outline' onClick={handleReset}>
                    بازنشانی
                </Button>
                <Button type='button' variant='primary' onClick={handleApply}>
                    اعمال فیلتر
                </Button>
            </div>
        </div>
    )
}

export default Filters

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { Controller, useForm, type Control } from 'react-hook-form'
import { Button } from '@/src/shared/components/ui/button'
import CalendarButton from '@/src/shared/components/ui/CalendarButton'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { useSearchParam } from '@/src/shared/hooks/useSearchParam'
import {
    BRANCHES_REPORT_FILTER_DEFAULTS,
    branchesReportFilterSchema,
    type BranchesReportFilterValues,
} from '../schema'

type DropdownItem = {
    label: string
    value: string
}

type DropdownOptions = {
    label: string
    items: DropdownItem[]
}

export type FilterFormProps = {
    firstDropdownOptions: DropdownOptions
    secondDropdownOptions?: DropdownOptions
    submitLabel?: string
    compareLabel?: string
}

const FILTER_QUERY_KEYS = {
    compare: 'compare',
    first: 'first',
    fromDate: 'fromDate',
    toDate: 'toDate',
    compareFirst: 'compareFirst',
    compareFromDate: 'compareFromDate',
    compareToDate: 'compareToDate',
} as const

const parseDateParam = (value: string | null) => {
    if (!value) return undefined
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? undefined : date
}

const toDateParam = (value?: Date) =>
    value ? value.toISOString().slice(0, 10) : null

type FilterFieldsProps = {
    name: 'primary' | 'compare'
    control: Control<BranchesReportFilterValues>
    firstDropdownOptions: DropdownOptions
}

const FilterFields = ({
    name,
    control,
    firstDropdownOptions,
}: FilterFieldsProps) => {
    return (
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
            <Controller
                name={`${name}.first`}
                control={control}
                render={({ field }) => (
                    <FormDropdown
                        label={firstDropdownOptions.label}
                        placeholder='انتخاب'
                        value={field.value}
                        options={firstDropdownOptions.items}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name={`${name}.fromDate`}
                control={control}
                render={({ field }) => (
                    <CalendarButton
                        label='از تاریخ'
                        placeholder='انتخاب تاریخ'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name={`${name}.toDate`}
                control={control}
                render={({ field }) => (
                    <CalendarButton
                        label='تا تاریخ'
                        placeholder='انتخاب تاریخ'
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
        </div>
    )
}

const FilterForm = ({
    firstDropdownOptions,
    submitLabel = 'به روز رسانی گزارش',
    compareLabel = 'مقایسه',
}: FilterFormProps) => {
    const searchParams = useSearchParams()
    const { addSearchParam, setSearchParams } = useSearchParam()
    const isCompare = searchParams.get(FILTER_QUERY_KEYS.compare) === '1'

    const { control, handleSubmit } = useForm<BranchesReportFilterValues>({
        resolver: zodResolver(branchesReportFilterSchema),
        defaultValues: {
            primary: {
                first:
                    searchParams.get(FILTER_QUERY_KEYS.first) ??
                    BRANCHES_REPORT_FILTER_DEFAULTS.primary.first,
                fromDate: parseDateParam(
                    searchParams.get(FILTER_QUERY_KEYS.fromDate)
                ),
                toDate: parseDateParam(
                    searchParams.get(FILTER_QUERY_KEYS.toDate)
                ),
            },
            compare: {
                first:
                    searchParams.get(FILTER_QUERY_KEYS.compareFirst) ??
                    BRANCHES_REPORT_FILTER_DEFAULTS.compare.first,
                fromDate: parseDateParam(
                    searchParams.get(FILTER_QUERY_KEYS.compareFromDate)
                ),
                toDate: parseDateParam(
                    searchParams.get(FILTER_QUERY_KEYS.compareToDate)
                ),
            },
        },
    })

    const handleCompare = () => {
        addSearchParam(FILTER_QUERY_KEYS.compare, '1')
    }

    const onSubmit = (values: BranchesReportFilterValues) => {
        setSearchParams({
            [FILTER_QUERY_KEYS.first]: values.primary.first,
            [FILTER_QUERY_KEYS.fromDate]: toDateParam(values.primary.fromDate),
            [FILTER_QUERY_KEYS.toDate]: toDateParam(values.primary.toDate),
            [FILTER_QUERY_KEYS.compare]: isCompare ? '1' : null,
            [FILTER_QUERY_KEYS.compareFirst]: isCompare
                ? values.compare.first
                : null,
            [FILTER_QUERY_KEYS.compareFromDate]: isCompare
                ? toDateParam(values.compare.fromDate)
                : null,
            [FILTER_QUERY_KEYS.compareToDate]: isCompare
                ? toDateParam(values.compare.toDate)
                : null,
        })
    }

    return (
        <form
            className='rounded-card-md bg-surface-container-lowest p-6'
            dir='rtl'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='flex flex-col gap-4'>
                <FilterFields
                    name='primary'
                    control={control}
                    firstDropdownOptions={firstDropdownOptions}
                />

                {isCompare ? (
                    <FilterFields
                        name='compare'
                        control={control}
                        firstDropdownOptions={firstDropdownOptions}
                    />
                ) : null}
            </div>

            <div className='mt-6 flex flex-row flex-wrap items-center justify-end gap-2'>
                {!isCompare ? (
                    <Button
                        type='button'
                        variant='outline'
                        className='w-fit'
                        onClick={handleCompare}
                    >
                        {compareLabel}
                    </Button>
                ) : null}
                <Button type='submit' variant='primary' className='w-fit'>
                    {submitLabel}
                </Button>
            </div>
        </form>
    )
}

export default FilterForm

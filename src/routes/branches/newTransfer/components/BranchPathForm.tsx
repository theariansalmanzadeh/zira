'use client'

import { Controller, useFormContext, useWatch } from 'react-hook-form'
import {
    BRANCH_OPTIONS,
    BRANCH_WAREHOUSE_OPTIONS,
} from '../constants'
import type { NewTransferFormValues } from '../schema'
import LocationSelectField from './LocationSelectField'
import TransferPathConnector from './TransferPathConnector'

const BranchPathForm = () => {
    const { control, setValue } = useFormContext<NewTransferFormValues>()
    const fromBranchId = useWatch({ control, name: 'fromBranchId' })
    const toBranchId = useWatch({ control, name: 'toBranchId' })

    const fromWarehouses = BRANCH_WAREHOUSE_OPTIONS[fromBranchId] ?? []
    const toWarehouses = BRANCH_WAREHOUSE_OPTIONS[toBranchId] ?? []

    return (
        <div className='flex flex-col' dir='rtl'>
            <div className='flex flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4'>
                <h3 className='text-title-md font-semibold text-primary'>
                    مبدا
                </h3>
                <Controller
                    name='fromBranchId'
                    control={control}
                    render={({ field }) => (
                        <LocationSelectField
                            label='شعبه مبدا'
                            required
                            value={field.value}
                            options={BRANCH_OPTIONS}
                            onChange={(branchId) => {
                                field.onChange(branchId)
                                const nextWarehouses =
                                    BRANCH_WAREHOUSE_OPTIONS[branchId] ?? []
                                setValue(
                                    'fromWarehouseId',
                                    nextWarehouses[0]?.id ?? ''
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    name='fromWarehouseId'
                    control={control}
                    render={({ field }) => (
                        <LocationSelectField
                            label='انبار مبدا (یا خود شعبه)'
                            required
                            value={field.value}
                            options={fromWarehouses}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <TransferPathConnector />

            <div className='flex flex-col gap-4 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4'>
                <h3 className='text-title-md font-semibold text-info'>مقصد</h3>
                <Controller
                    name='toBranchId'
                    control={control}
                    render={({ field }) => (
                        <LocationSelectField
                            label='شعبه مقصد'
                            required
                            value={field.value}
                            options={BRANCH_OPTIONS}
                            onChange={(branchId) => {
                                field.onChange(branchId)
                                const nextWarehouses =
                                    BRANCH_WAREHOUSE_OPTIONS[branchId] ?? []
                                setValue(
                                    'toWarehouseId',
                                    nextWarehouses[0]?.id ?? ''
                                )
                            }}
                        />
                    )}
                />
                <Controller
                    name='toWarehouseId'
                    control={control}
                    render={({ field }) => (
                        <LocationSelectField
                            label='انبار مقصد (یا خود شعبه)'
                            required
                            value={field.value}
                            options={toWarehouses}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}

export default BranchPathForm

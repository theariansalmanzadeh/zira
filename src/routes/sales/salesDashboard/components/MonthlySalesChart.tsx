'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import { MONTHLY_SALES_DATA } from '../constants'

const MonthlySalesChart = () => {
    return (
        <>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center gap-4'>
                    <div className='flex flex-row items-center gap-1.5'>
                        <span className='size-2.5 rounded-full bg-success' />
                        <span className='text-label-sm text-outline'>فروش</span>
                    </div>
                    <div className='flex flex-row items-center gap-1.5'>
                        <span className='size-2.5 rounded-full bg-error' />
                        <span className='text-label-sm text-outline'>برگشت</span>
                    </div>
                </div>
                <span className='text-title-md font-medium text-on-surface'>
                    روند فروش ماهانه
                </span>
            </div>
            <ResponsiveContainer width='100%' height="95%">
                <BarChart
                    data={MONTHLY_SALES_DATA}
                    margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                    barGap={4}
                    barCategoryGap='20%'
                >
                    <CartesianGrid
                        strokeDasharray='4 4'
                        vertical={false}
                        horizontal={false}
                        stroke='var(--color-outline-variant)'
                    />
                    <XAxis
                        dataKey='date'
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--color-outline)', fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Bar
                        dataKey='returns'
                        fill='#f5c4c6'
                        radius={[36, 36, 0, 0]}
                        maxBarSize={28}
                    />
                    <Bar
                        dataKey='sales'
                        fill='var(--color-success-container)'
                        radius={[36, 36, 0, 0]}
                        maxBarSize={28}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default MonthlySalesChart

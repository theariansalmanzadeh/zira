'use client'

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    XAxis,
    YAxis,
} from 'recharts'
import { STOCK_FLOW_DATA } from '../constants'

const StockFlowChart = () => {
    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row items-center gap-4">
                    <div className="flex flex-row items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-success" />
                        <span className="text-label-sm text-outline">ورود</span>
                    </div>
                    <div className="flex flex-row items-center gap-1.5">
                        <span className="size-2.5 rounded-full bg-error" />
                        <span className="text-label-sm text-outline">خروج</span>
                    </div>
                </div>
                <span className="text-title-md font-medium text-on-surface">
                    نمودار ورود و خروج کالا
                </span>
            </div>
            <ResponsiveContainer width="100%" height="95%">
                <BarChart
                    data={STOCK_FLOW_DATA}
                    margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
                    barGap={4}
                    barCategoryGap="20%"
                >
                    <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        horizontal={false}
                        stroke="var(--color-outline-variant)"
                    />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'var(--color-outline)', fontSize: 12 }}
                    />
                    <YAxis hide />
                    <Bar
                        dataKey="outflow"
                        fill="#f5c4c6"
                        radius={[36, 36, 0, 0]}
                        maxBarSize={28}
                    />
                    <Bar
                        dataKey="inflow"
                        fill="var(--color-success-container)"
                        radius={[36, 36, 0, 0]}
                        maxBarSize={28}
                    />
                </BarChart>
            </ResponsiveContainer>
        </>
    )
}

export default StockFlowChart

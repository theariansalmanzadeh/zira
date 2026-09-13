'use client'

import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import { DASHBOARD_KPIS } from '../constants/dashboard'
import ChequeStatus from './ChequeStatus'

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-3.5" dir="rtl">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                {DASHBOARD_KPIS.map((kpi) => (
                    <div
                        key={kpi.label}
                        className="rounded-card-md border border-outline-variant bg-surface-container-lowest px-4 py-3.5"
                    >
                        <div className="mb-2 text-label-sm text-outline">
                            {kpi.label}
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span
                                className={cn(
                                    'text-title-lg! font-semibold',
                                    kpi.valueClassName
                                )}
                            >
                                {kpi.value}
                            </span>
                            {(kpi.unit || kpi.showCurrency) && (
                                <span className="inline-flex items-center gap-0.5 text-label-md text-outline">
                                    {kpi.unit}
                                    {kpi.showCurrency && (
                                        <Icon
                                            label="currency"
                                            className="size-5! text-outline"
                                        />
                                    )}
                                </span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <ChequeStatus />
        </div>
    )
}

export default Dashboard

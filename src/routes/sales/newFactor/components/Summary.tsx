'use client'

import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { formatFaNumber, formatPrice } from '@/src/shared/libs/formatter'
import {
    SETTLEMENT_TYPE_OPTIONS,
    WAREHOUSE_OPTIONS,
} from '../constants'
import { useNewFactorContext } from '../provider/NewFactorProvider'

const Summary = () => {
    const {
        warehouseId,
        setWarehouseId,
        settlementType,
        setSettlementType,
        cartCount,
        cartTotal,
        taxAmount,
        finalTotal,
    } = useNewFactorContext()

    return (
        <div className="flex flex-col gap-5 rounded-card-md bg-surface-container-lowest p-6" dir="rtl">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormDropdown
                    label="انبار"
                    value={warehouseId}
                    options={WAREHOUSE_OPTIONS}
                    onChange={setWarehouseId}
                />
                <FormDropdown
                    label="نوع تسویه"
                    value={settlementType}
                    options={SETTLEMENT_TYPE_OPTIONS}
                    onChange={setSettlementType}
                />
            </div>

            <div className="flex flex-col gap-4 rounded-card-md bg-surface-container-high p-4">
                <div className="flex flex-row items-center justify-between gap-3">
                    <span className="text-label-md text-outline">
                        جمع اقلام ({formatFaNumber(cartCount)} عدد)
                    </span>
                    <span className="text-label-lg text-on-surface">
                        {formatPrice(cartTotal)}
                    </span>
                </div>

                <div className="flex flex-row items-center justify-between gap-3">
                    <span className="text-label-md text-outline">
                        مالیات و عوارض (۱۰٪)
                    </span>
                    <span className="text-label-lg text-on-surface">
                        {formatPrice(taxAmount)}
                    </span>
                </div>

                <div className="h-px w-full bg-outline-variant" />

                <div className="flex flex-row items-center justify-between gap-3">
                    <span className="text-title-md font-bold text-on-surface">
                        مبلغ کل
                    </span>
                    <span className="text-title-md font-bold text-primary">
                        {formatPrice(finalTotal)}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Summary

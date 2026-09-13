'use client'

import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Input } from '@/src/shared/components/ui/Input'
import { Button } from '@/src/shared/components/ui/button'
import React, { useState } from 'react'

const Vat = () => {
    const [year, setYear] = useState<string>()
    const [season, setSeason] = useState<string>()
    const [type, setType] = useState<string>()
    const [rate, setRate] = useState<string>("")
    const firstDropdownOptions = [
        { label: "2026", value: "2026" },
        { label: "2025", value: "2025" },
        { label: "2024", value: "2024" },
    ]
    const seasonDropdownOptions = [
        { label: "بهار", value: "spring" },
        { label: "تابستان", value: "summer" },
        { label: "پاییز", value: "autumn" },
        { label: "زمستان", value: "winter" },
    ]
    const typeDropdownOptions = [
        { label: "قابل قبول", value: "accepted" },
        { label: "رد شده", value: "rejected" },
    ]
    const handleUpdate = () => {
        console.log("update")
    }
    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6" dir="rtl">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <FormDropdown
                    label={"سال"}
                    placeholder="انتخاب"
                    value={year}
                    options={firstDropdownOptions}
                    onChange={setYear}
                />
                <FormDropdown
                    label={"فصل"}
                    placeholder="انتخاب"
                    value={season}
                    options={seasonDropdownOptions}
                    onChange={setSeason}
                />
                <FormDropdown
                    label="نوع"
                    placeholder="انتخاب نوع"
                    value={type}
                    options={typeDropdownOptions}
                    onChange={setType}
                />
                <div className="flex flex-col gap-3">
                    <Input
                        label="نرخ"
                        placeholder="%"
                        value={rate}
                        onChange={setRate}
                    />
                </div>
            </div>
            <div className="flex justify-end">
                <Button variant="primary" className="w-fit mt-6 mr-auto" onClick={handleUpdate}>
                    به روز رسانی گزارش
                </Button>
            </div>
        </div>
    )
}

export default Vat
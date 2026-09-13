'use client'

import { MapPin } from 'lucide-react'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { CONTACT_ADDRESS_DEFAULT } from '../constants'

type AddressSectionProps = {
    value?: string
    onChange?: (value: string) => void
    onMapClick?: () => void
}

const AddressSection = ({
    value = CONTACT_ADDRESS_DEFAULT,
    onChange,
    onMapClick,
}: AddressSectionProps) => {
    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">آدرس</h2>
            <Textarea
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                className="min-h-20 resize-y"
            />
            <button
                type="button"
                onClick={onMapClick}
                className="mt-3 flex h-[120px] w-full items-center justify-center gap-2 rounded-card-md border border-dashed border-outline-variant bg-surface-container-high text-label-md text-outline transition-colors hover:bg-surface-container-highest"
            >
                <MapPin className="size-4" strokeWidth={1.8} />
                <span>موقعیت روی نقشه</span>
            </button>
        </section>
    )
}

export default AddressSection

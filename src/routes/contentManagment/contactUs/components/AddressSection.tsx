'use client'

import { MapPin } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { Textarea } from '@/src/shared/components/ui/TextArea'
import { cn } from '@shared/libs/utils'
import type { ContactUsFormValues } from '../schema'

type AddressSectionProps = {
    onMapClick?: () => void
}

const AddressSection = ({ onMapClick }: AddressSectionProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext<ContactUsFormValues>()

    return (
        <section className="rounded-card-lg border border-outline-variant bg-surface-container-lowest p-5">
            <h2 className="mb-4 text-title-md font-semibold text-on-surface">آدرس</h2>
            <Textarea
                {...register('address')}
                aria-invalid={!!errors.address}
                className={cn(
                    'min-h-20 resize-y',
                    errors.address && 'border border-red-600'
                )}
            />
            {errors.address?.message ? (
                <span className="mt-1 text-sm text-error">
                    {errors.address.message}
                </span>
            ) : null}
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

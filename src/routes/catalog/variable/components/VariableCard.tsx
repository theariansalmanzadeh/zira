import type { AttributeOut } from '@/src/api/types/admin/catalog'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import {
    FORM_DISPLAY_OPTIONS,
    INPUT_TYPE_OPTIONS,
    PRODUCT_ROLE_OPTIONS,
} from '../addAndUpdateVariable/schema'

type VariableCardItem = {
    id: string
    label: string
    hex?: string | null
}

type VariableCardProps = {
    data?: AttributeOut
    title?: string
    items?: VariableCardItem[]
    onManage?: () => void
}

const optionLabel = (
    options: { label: string; value: string }[],
    value?: string | null
) => options.find((option) => option.value === value)?.label ?? value ?? '-'

const VariableCard = ({ data, title, items, onManage }: VariableCardProps) => {
    const isFixed = Boolean(items)
    const name = title || data?.name || ''
    const pills = items ?? (data?.values ?? []).map((value) => ({
        id: value.id,
        label: value.value,
        hex: value.hex_code,
    }))

    return (
    <article className="flex flex-col gap-3 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
        <div className="flex items-start justify-between gap-3">
            <h3 className="text-title-md font-bold text-on-surface">{name}</h3>
            {data && !isFixed && (
                <span className="rounded-full bg-primary/12 px-3 py-1 text-label-md text-primary">
                    {optionLabel(PRODUCT_ROLE_OPTIONS, data.role)}
                </span>
            )}
        </div>

        {data?.hint && !isFixed ? (
            <p className="text-label-md text-outline">{data.hint}</p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
            {data && !isFixed ? (
                <div className="flex flex-wrap items-center gap-4 text-label-md text-on-surface-variant">
                    <p className='text-on-surface'>نوع: <span className="text-on-surface-variant">{optionLabel(INPUT_TYPE_OPTIONS, data.kind)}</span></p>
                    <p className='text-on-surface'>کنترل: <span className="text-on-surface-variant">{optionLabel(FORM_DISPLAY_OPTIONS, data.input_control)}</span></p>
                </div>
            ) : null}
            <span className="text-label-lg font-bold text-primary">
                {formatFaNumber(pills.length)} مقدار
            </span>
        </div>

        <div className="flex flex-wrap gap-2">
            {pills.map((value) => (
                <Pill
                    key={value.id}
                    variant="tonal"
                    text={value.label}
                    hasDot={Boolean(value.hex)}
                    dotColor={value.hex || undefined}
                />
            ))}
        </div>

        {onManage ? (
            <div className="flex justify-end">
                <Button
                    type="button"
                    variant="primary-outline"
                    className="gap-1.5"
                    onClick={onManage}
                >
                    <Icon label="edit400Linear" className="size-4 text-primary" />
                    مدیریت مقادیر
                </Button>
            </div>
        ) : null}
    </article>
    )
}

export default VariableCard

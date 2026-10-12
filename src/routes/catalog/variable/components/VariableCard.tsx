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

type VariableCardProps = {
    data: AttributeOut
    onManage?: () => void
}

const optionLabel = (
    options: { label: string; value: string }[],
    value?: string | null
) => options.find((option) => option.value === value)?.label ?? value ?? '-'

const VariableCard = ({ data, onManage }: VariableCardProps) => (
    <article className="flex flex-col gap-3 rounded-card-lg border border-outline-variant bg-surface-container-lowest p-4">
        <div className="flex items-start justify-between gap-3">
            <h3 className="text-title-md font-bold text-on-surface">{data.name}</h3>
            <span className="rounded-full bg-primary/12 px-3 py-1 text-label-md text-primary">
                {optionLabel(PRODUCT_ROLE_OPTIONS, data.role)}
            </span>
        </div>

        <p className="text-label-md text-outline">{data.hint}</p>

        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-label-md text-on-surface-variant">
                <p className='text-on-surface'>نوع: <span className="text-on-surface-variant">{optionLabel(INPUT_TYPE_OPTIONS, data.kind)}</span></p>
                <p className='text-on-surface'>کنترل: <span className="text-on-surface-variant">{optionLabel(FORM_DISPLAY_OPTIONS, data.input_control)}</span></p>
            </div>
            <span className="text-label-lg font-bold text-primary">
                {formatFaNumber(data.values?.length ?? 0)} مقدار
            </span>
        </div>

        <div className="flex flex-wrap gap-2">
            {(data.values ?? []).map((value) => (
                <Pill
                    key={value.id}
                    variant="tonal"
                    text={value.value}
                    hasDot={Boolean(value.hex_code)}
                    dotColor={value.hex_code || undefined}
                />
            ))}
        </div>

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
    </article>
)

export default VariableCard

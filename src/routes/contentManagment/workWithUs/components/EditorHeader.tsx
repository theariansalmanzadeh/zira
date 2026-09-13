'use client'

import { Switch } from '@/src/shared/components/ui/Switch'
import { Input } from '@/src/shared/components/ui/Input'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Pill } from '@/src/shared/components/ui/Pill'
import { formatFaNumber } from '@/src/shared/libs/formatter'
import type { EditSectionStatus } from './EditSectionView'
import { useWorkWithUs } from '../provider'

export type EditorHeaderProps = {
    id: string
    index: number
}

const STATUS_PILL: Record<
    EditSectionStatus,
    { text: string; variant: 'success' | 'tonal' | 'outlined' }
> = {
    published: { text: 'منتشر شده', variant: 'success' },
    draft: { text: 'پیش‌نویس', variant: 'tonal' },
    hidden: { text: 'پنهان', variant: 'outlined' },
}

const EditorHeader = ({ id, index }: EditorHeaderProps) => {
    const { sections, updateSection, moveSection, removeSection } =
        useWorkWithUs()
    const section = sections.find((item) => item.id === id)

    if (!section) return null

    const statusPill = STATUS_PILL[section.status]

    return (
        <div className="flex flex-wrap items-center gap-2.5 border-b border-outline-variant/60 px-4 py-3">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-card-sm bg-primary/12 text-label-sm font-bold text-primary">
                {formatFaNumber(index + 1)}
            </span>
            <div className="min-w-0 flex-1">
                <Input
                    value={section.title}
                    onChange={(title) => updateSection(id, { title })}
                    className="text-title-md font-semibold text-on-surface"
                />
            </div>

            <label className="flex shrink-0 cursor-pointer items-center gap-2 px-2 py-1">
                <Switch
                    checked={section.visible}
                    onCheckedChange={(visible) =>
                        updateSection(id, { visible })
                    }
                />
                <span className="text-label-sm font-semibold text-on-surface-variant">
                    نمایش در صفحه
                </span>
            </label>

            <Pill
                text={statusPill.text}
                variant={statusPill.variant}
                hasDot
                size="sm"
                className="shrink-0 rounded-card-sm"
            />

            <div className="flex shrink-0 items-center gap-0.5">
                <IconButton
                    icon="chevronUp400Linear"
                    variant="ghost"
                    className="size-7!"
                    iconClassName="size-4! text-outline"
                    onClick={() => moveSection(index, -1)}
                />
                <IconButton
                    icon="chevronDown400Linear"
                    variant="ghost"
                    className="size-7!"
                    iconClassName="size-4! text-outline"
                    onClick={() => moveSection(index, 1)}
                />
                <IconButton
                    icon="delete400Linear"
                    variant="ghost"
                    className="size-7!"
                    iconClassName="size-4! text-outline"
                    onClick={() => removeSection(id)}
                />
            </div>
        </div>
    )
}

export default EditorHeader

'use client'

import { useState } from 'react'
import IconButton from '@/src/shared/components/ui/IconButton'
import { Button } from '@/src/shared/components/ui/button'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import {
    LANDING_STATUS_META,
    type LandingSectionItem,
} from '../constants'
import type { LandingSectionType } from '../types'
import { useReorderHomeBlocks } from '@/src/routes/contentManagment/hooks/homePage'
import { useLanding } from '../provider'
import SectionTypeThumbnail from './SectionTypeThumbnail'
import SectionTypeBody from './sectionTypeBody'

type SectionCardProps = {
    data: LandingSectionItem
    index: number
    type: LandingSectionType
}

const SectionCard = ({ data, index, type }: SectionCardProps) => {
    const { sections, moveSection, toggleVisibility } = useLanding()
    const { mutate: reorderHomeBlocks } = useReorderHomeBlocks()
    const [isOpen, setIsOpen] = useState(false)

    const isFirst = index === 0
    const isLast = index === sections.length - 1
    const isVisible = data.status !== 'hidden'

    const reorder = (direction: -1 | 1) => {
        const nextIndex = index + direction
        if (nextIndex < 0 || nextIndex >= sections.length) return

        const next = [...sections]
        const [item] = next.splice(index, 1)
        next.splice(nextIndex, 0, item)
        moveSection(index, direction)
        reorderHomeBlocks({ body: { ids: next.map((section) => section.id) } })
    }

    const onMoveUp = () => reorder(-1)

    const onMoveDown = () => reorder(1)

    const statusMeta = LANDING_STATUS_META[data.status]

    return (
        <div
            className="rounded-card-lg border border-outline-variant bg-surface-container-lowest"
            dir="rtl"
        >
            <div className="flex items-center gap-3 px-4 py-3.5">
                <SectionTypeThumbnail type={type} />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-label-lg font-semibold text-on-surface">
                            {data.title}
                        </span>
                        <Pill
                            text={statusMeta.label}
                            variant={statusMeta.pillVariant}
                            hasDot
                            size="sm"
                            className="border-0"
                        />
                    </div>
                    <p className="mt-1 truncate text-label-md text-outline">
                        {data.countLabel} · {data.actionLabel} · ویرایش{' '}
                        {data.updatedAt}
                    </p>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                    <IconButton
                        icon={
                            isVisible
                                ? 'visibility400Linear'
                                : 'visibilityOff400Linear'
                        }
                        variant="ghost"
                        className="size-9!"
                        iconClassName={cn(
                            'size-5!',
                            isVisible ? 'text-on-surface' : 'text-outline'
                        )}
                        onClick={() => toggleVisibility(data.id)}
                    />
                    <Button
                        type="button"
                        variant="outline"
                        className="h-9 gap-1.5 border-primary/30 bg-primary/8 px-3 text-primary hover:bg-primary/12!"
                        onClick={() => setIsOpen((prev) => !prev)}
                    >
                        <Icon
                            label={
                                isOpen
                                    ? 'chevronUp400Linear'
                                    : 'chevronDown400Linear'
                            }
                            className="size-4!"
                        />
                    </Button>
                </div>

                <div className="flex shrink-0 flex-col items-center gap-0.5">
                    <IconButton
                        icon="chevronUp400Linear"
                        variant="ghost"
                        className="size-7!"
                        iconClassName={cn(
                            'size-4!',
                            isFirst ? 'text-outline-variant' : 'text-outline'
                        )}
                        onClick={isFirst ? undefined : onMoveUp}
                    />
                    <IconButton
                        icon="chevronDown400Linear"
                        variant="ghost"
                        className="size-7!"
                        iconClassName={cn(
                            'size-4!',
                            isLast ? 'text-outline-variant' : 'text-outline'
                        )}
                        onClick={isLast ? undefined : onMoveDown}
                    />
                </div>
            </div>

            {isOpen ? (
                <div className="border-t border-outline-variant px-4 py-3.5">
                    <SectionTypeBody type={type} />
                </div>
            ) : null}
        </div>
    )
}

export default SectionCard

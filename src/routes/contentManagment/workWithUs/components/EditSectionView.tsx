'use client'

import { cn } from '@shared/libs/utils'
import EditorHeader from './EditorHeader'

export type EditSectionStatus = 'published' | 'draft' | 'hidden'

export type EditSectionViewProps = {
    id: string
    index: number
    className?: string
}

const EditSectionView = ({ id, index, className }: EditSectionViewProps) => (
    <div
        className={cn(
            'overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest',
            className
        )}
        dir="rtl"
    >
        <EditorHeader id={id} index={index} />
    </div>
)

export default EditSectionView

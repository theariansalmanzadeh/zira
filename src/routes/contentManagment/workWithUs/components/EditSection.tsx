'use client'

import EditSectionView from './EditSectionView'

export type { EditSectionStatus } from './EditSectionView'

export type EditSectionProps = {
    id: string
    index: number
    className?: string
}

const EditSection = ({ id, index, className }: EditSectionProps) => (
    <EditSectionView id={id} index={index} className={className} />
)

export default EditSection

'use client'

import { useLanding } from '../provider'
import SectionCard from './SectionCard'

const SectionContainer = () => {
    const { sections } = useLanding()

    return (
        <div className="flex flex-col gap-3">
            {sections.map((section, index) => (
                <SectionCard
                    key={section.id}
                    data={section}
                    index={index}
                    type={section.type}
                />
            ))}
        </div>
    )
}

export default SectionContainer

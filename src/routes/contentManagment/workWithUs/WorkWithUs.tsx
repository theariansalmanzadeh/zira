'use client'

import EditSection from './components/EditSection'
import WorkWithUsProvider, { useWorkWithUs } from './provider'

const WorkWithUsContent = () => {
    const { sections } = useWorkWithUs()

    return (
        <div className="flex flex-col gap-3.5" dir="rtl">
            {sections.map((section, index) => (
                <EditSection
                    key={section.id}
                    id={section.id}
                    index={index}
                />
            ))}
        </div>
    )
}

const WorkWithUs = () => (
    <WorkWithUsProvider>
        <WorkWithUsContent />
    </WorkWithUsProvider>
)

export default WorkWithUs

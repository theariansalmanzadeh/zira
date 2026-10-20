'use client'

import PageEditor from '@/src/shared/components/PageEditor'
import WorkWithUsProvider from './provider'

const WorkWithUsContent = () => {
    return (
        <div className="flex flex-col gap-3.5" dir="rtl">
            {/* {sections.map((section, index) => (
                <EditSection
                    key={section.id}
                    id={section.id}
                    index={index}
                />
            ))} */}
            <PageEditor />
        </div>
    )
}

const WorkWithUs = () => (
    <WorkWithUsProvider>
        <WorkWithUsContent />
    </WorkWithUsProvider>
)

export default WorkWithUs

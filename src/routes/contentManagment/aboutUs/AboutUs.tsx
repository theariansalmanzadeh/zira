'use client'

import EditSection from './components/EditSection'
import AboutUsProvider, { useAboutUs } from './provider'

const AboutUsContent = () => {
    const { sections } = useAboutUs()

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

const AboutUs = () => (
    <AboutUsProvider>
        <AboutUsContent />
    </AboutUsProvider>
)

export default AboutUs

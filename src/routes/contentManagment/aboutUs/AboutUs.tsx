'use client'

import { Button } from '@/src/shared/components/ui/button'
import EditSection from './components/EditSection'
import AboutUsProvider, { useAboutUs } from './provider'

const AboutUsContent = () => {
    const { sections, addSection } = useAboutUs()

    return (
        <div className="flex flex-col gap-3.5" dir="rtl">
            {sections.map((section, index) => (
                <EditSection
                    key={section.id}
                    id={section.id}
                    index={index}
                />
            ))}
            <Button
                type="button"
                variant="outline"
                className="w-fit border-primary text-primary"
                onClick={addSection}
            >
                افزودن بخش
            </Button>
        </div>
    )
}

const AboutUs = () => (
    <AboutUsProvider>
        <AboutUsContent />
    </AboutUsProvider>
)

export default AboutUs

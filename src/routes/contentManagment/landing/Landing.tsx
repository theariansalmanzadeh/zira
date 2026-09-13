'use client'

import LandingProvider from './provider'
import Summary from './components/Summary'
import SectionContainer from './components/SectionContainer'

const LandingContent = () => (
    <div className="grid grid-cols-12 gap-4" dir="rtl">
        <div className="col-span-12 lg:col-span-8">
            <SectionContainer />
        </div>
        <div className="col-span-12 lg:col-span-4">
            <Summary />
        </div>
    </div>
)

const Landing = () => (
    <LandingProvider>
        <LandingContent />
    </LandingProvider>
)

export default Landing

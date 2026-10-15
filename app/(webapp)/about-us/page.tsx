import { getPublicAboutUs } from '@/src/api/public/cms'
import AboutUs from '@/src/routes/about-us/AboutUs'

export default async function AboutUsPage() {
    const result = await getPublicAboutUs()
    return <AboutUs sections={result.data?.sections ?? []} />
}

import { getPublicContactInfo } from '@/src/api/public/cms'
import ContactUs from '@/src/routes/contact-us/ContactUs'

export default async function ContactUsPage() {
    const result = await getPublicContactInfo()

    return <ContactUs contactInfo={result.success ? result.data : null} />
}

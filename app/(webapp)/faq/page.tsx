import { listPublicFaqItems } from '@/src/api/public/cms'
import Faq from '@/src/shared/components/faq/Faq'

export default async function FaqPage() {
    const result = await listPublicFaqItems({ page: 1, page_size: 100 })
    console.log(result)
    return <Faq items={result.success ? result.data.results : []} />
}

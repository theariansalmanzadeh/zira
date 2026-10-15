import { getPublicCooperation } from '@/src/api/public/cms'
import WorkWithUs from '@/src/routes/workWithUs/WorkWithUs'

export default async function WorkWithUsPage() {
    const result = await getPublicCooperation()

    return (
        <WorkWithUs
            sections={result.success ? (result.data.sections ?? []) : []}
        />
    )
}

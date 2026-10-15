import { listPublicCertificates } from '@/src/api/public/cms'
import Liecense from '@/src/routes/liecense/Liecense'

const LiecensePage = async () => {
    const result = await listPublicCertificates({ page: 1, page_size: 100 })

    return (
        <Liecense certificates={result.success ? result.data.results : []} />
    )
}

export default LiecensePage

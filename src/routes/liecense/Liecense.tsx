import type { PublicCertificateOut } from '@/src/api/types/public/cms'
import type { LiecenseDetailsData } from '@/src/routes/contentManagment/liecenseDetails/constants'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/src/shared/components/ui/Carousel'
import LiecenseCard from './components/LiecenseCard'

const toLiecenseCard = (certificate: PublicCertificateOut): LiecenseDetailsData => ({
    id: certificate.id,
    title: certificate.title,
    code: certificate.document_no,
    issuer: certificate.issuer,
    issuedAt: certificate.issued_on,
    status: certificate.is_expired ? 'inactive' : 'active',
    fileType: certificate.file_type === 'IMAGE' ? 'image' : 'pdf',
    visibleOnSite: true,
    tab: certificate.category === 'LICENSE' ? 'licenses' : 'certificates',
    expiresAt: certificate.expires_on ?? '',
    fileSize: '',
    description: certificate.description,
    previewUrl: certificate.file_url ?? '',
})

type LiecenseProps = {
    certificates: PublicCertificateOut[]
}

const Liecense = ({ certificates }: LiecenseProps) => {
    const items = certificates.map(toLiecenseCard)

    console.log(items)
    return (
        <section
            className="flex w-full flex-col gap-6 py-10"
            dir="rtl"
        >
            <h1 className="text-title-lg font-bold text-on-surface">
                گواهی‌ها و مجوزها
            </h1>
            <Carousel className="w-full" dir="rtl" opts={{ direction: 'rtl' }}>
                <CarouselContent>
                    {items.map((item) => (
                        <CarouselItem key={item.id} className="basis-2/5">
                            <LiecenseCard className="w-1/3" data={item} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {items.length > 4 ? (
                    <>
                        <CarouselPrevious />
                        <CarouselNext />
                    </>
                ) : null}
            </Carousel>
        </section>
    )
}

export default Liecense

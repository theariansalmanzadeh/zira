'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import type { CertificateOut } from '@/src/api/types/admin/cms/certificates'
import {
    useArchiveCertificate,
    useListCertificates,
    useUpdateCertificate,
} from '@/src/routes/contentManagment/hooks/certificates'
import TableListLayout from '@/src/shared/layouts/tableListLayout/TableListLayout'
import LicenseCard from '../liecenses/components/LicenseCard'
import {
    filterLicenses,
    LICENSES_TOGGLE_BUTTON_VALUE,
    TABLE_COLOUMN,
    type LicenseCardData,
    type LicenseTab,
} from '../liecenses/constants'

const toLicenseCard = (item: CertificateOut): LicenseCardData => ({
    id: item.id,
    title: item.title,
    code: item.document_no,
    issuer: item.issuer,
    issuedAt: item.issued_on,
    status: item.status === 'PUBLISHED' && !item.is_expired ? 'active' : 'inactive',
    fileType: item.file_type === 'IMAGE' ? 'image' : 'pdf',
    visibleOnSite: item.is_visible,
    tab: item.category === 'LICENSE' ? 'licenses' : 'certificates',
})

const LiecenseContent = () => {
    const searchParams = useSearchParams()
    const activeTab = (searchParams.get('cat') ??
        'certificates') as LicenseTab | string
    const { data: certificatePage } = useListCertificates(
        activeTab === 'licenses'
            ? { category: 'LICENSE' }
            : { category: 'CERTIFICATE' }
    )
    const { mutate: updateCertificate } = useUpdateCertificate()
    const { mutate: archiveCertificate } = useArchiveCertificate()
    const items = useMemo(
        () => (certificatePage?.results ?? []).map(toLicenseCard),
        [certificatePage]
    )

    const filteredItems = useMemo(
        () => filterLicenses(items, activeTab),
        [items, activeTab]
    )

    return (
        <div className="flex flex-col gap-3" dir="rtl">
            <TableListLayout
                TableColoumn={TABLE_COLOUMN}
                value="certificates"
                toggleButtonValue={[...LICENSES_TOGGLE_BUTTON_VALUE]}
                hasHeaderActions
                isCardLayout
                hasTableSettings={false}
                hasFilter={false}
                hasSort={false}
                hasExpand={false}
            >
                {filteredItems.map((item) => (
                    <LicenseCard
                        key={item.id}
                        data={item}
                        onVisibleChange={(visibleOnSite) =>
                            updateCertificate({
                                certificateId: item.id,
                                body: { is_visible: visibleOnSite },
                            })
                        }
                        onDelete={() =>
                            archiveCertificate({ certificateId: item.id })
                        }
                    />
                ))}
            </TableListLayout>
        </div>
    )
}

const Liecense = () => (
    <Suspense fallback={null}>
        <LiecenseContent />
    </Suspense>
)

export default Liecense

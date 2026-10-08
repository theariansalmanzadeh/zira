import AnnouncementDetail from '@/src/routes/userManagment/announcementDetail/AnnouncementDetail'

type AnnouncementDetailPageProps = {
    params: Promise<{ id: string }>
}

export default async function AnnouncementDetailPage({
    params,
}: AnnouncementDetailPageProps) {
    const { id } = await params

    return <AnnouncementDetail id={id} />
}

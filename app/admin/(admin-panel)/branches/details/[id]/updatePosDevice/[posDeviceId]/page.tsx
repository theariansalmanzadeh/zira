import AddAndEditPosDevice from '@/src/routes/branches/addAndEditPosDevice/AddAndEditPosDevice'

type UpdatePosDevicePageProps = {
    params: Promise<{ posDeviceId: string }>
}

export default async function UpdatePosDevicePage({
    params,
}: UpdatePosDevicePageProps) {
    const { posDeviceId } = await params

    return <AddAndEditPosDevice id={posDeviceId} />
}
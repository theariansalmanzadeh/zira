import AddAndEditInvenotry from '@/src/routes/branches/addAndEditInvenotry/AddAndEditInvenotry'

type UpdateInventoryPageProps = {
    params: Promise<{ warehouseId: string }>
}

export default async function UpdateInventoryPage({
    params,
}: UpdateInventoryPageProps) {
    const { warehouseId } = await params

    return <AddAndEditInvenotry id={warehouseId} />
}

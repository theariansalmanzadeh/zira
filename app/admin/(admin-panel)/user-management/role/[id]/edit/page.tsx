import AddAndUpdateRole from '@/src/routes/userManagment/role/addAndUpdateRole'

type EditRolePageProps = {
    params: Promise<{ id: string }>
}

export default async function EditRolePage({ params }: EditRolePageProps) {
    const { id } = await params

    return <AddAndUpdateRole id={id} />
}

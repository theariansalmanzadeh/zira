import CreateAndUpdateDepartment from '@/src/routes/userManagment/department/createAndUpdateDepartment/CreateAndUpdateDepartment'

type EditDepartmentPageProps = {
    params: Promise<{ id: string }>
}

export default async function EditDepartmentPage({
    params,
}: EditDepartmentPageProps) {
    const { id } = await params

    return <CreateAndUpdateDepartment id={id} />
}

import GroupList from './groups/groupList/GroupList'
import RoleLists from './role/roleLists/RoleLists'
import UserLists from './user/userLists/UserLists'

export type UserManagementSearchParams = {
    group?: string
    user?: string
    role?: string
}

type UserManagementProps = {
    searchParams: UserManagementSearchParams
}

const UserManagement = ({ searchParams }: UserManagementProps) => {
    const { group, user, role } = searchParams

    const hasGroup = group !== undefined
    const hasUser = user !== undefined
    const hasRole = role !== undefined

    if (!hasGroup && !hasUser && !hasRole) {
        return <UserLists />
    }
    if (hasGroup) {
        return <GroupList />
    }

    if (hasRole) {
        return <RoleLists />
    }

    if (hasUser) {
        return <UserLists />
    }
}

export default UserManagement

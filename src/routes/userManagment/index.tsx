import AnnouncementList from './announcementList/AnnouncementList'
import DepartmentList from './department/departmentList/DepartmentList'
import GroupList from './groups/groupList/GroupList'
import RoleLists from './role/roleLists/RoleLists'
import UserLists from './user/userLists/UserLists'
import SessionList from './sessionList/SessionList'

export type UserManagementSearchParams = {
    sub?: string
    group?: string
    user?: string
    role?: string
}

type UserManagementProps = {
    searchParams: UserManagementSearchParams
}

const UserManagement = ({ searchParams }: UserManagementProps) => {
    const section = searchParams.sub ?? 'user'

    if (section === 'group') {
        return <GroupList />
    }

    if (section === 'role') {
        return <RoleLists />
    }

    if (section === 'department') {
        return <DepartmentList />
    }

    if (section === 'announcements') {
        return <AnnouncementList />
    }

    if (section === 'sessions') {
        return <SessionList userId={searchParams.user} />
    }

    return <UserLists />
}

export default UserManagement

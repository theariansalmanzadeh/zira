import type { AccessPermissionGroup } from './types'

export const INITIAL_ACCESS_GROUPS: AccessPermissionGroup[] = [
    {
        id: 'group-1',
        label: 'عنوان گروه دسترسی',
        items: [
            { id: 'access-1', label: 'عنوان دسترسی', checked: true },
            { id: 'access-2', label: 'عنوان دسترسی', checked: false },
            { id: 'access-3', label: 'عنوان دسترسی', checked: true },
            { id: 'access-4', label: 'عنوان دسترسی', checked: false },
            { id: 'access-5', label: 'عنوان دسترسی', checked: false },
        ],
    },
    {
        id: 'group-2',
        label: 'عنوان گروه دسترسی',
        items: [
            { id: 'access-6', label: 'عنوان دسترسی', checked: false },
            { id: 'access-7', label: 'عنوان دسترسی', checked: false },
            { id: 'access-8', label: 'عنوان دسترسی', checked: false },
        ],
    },
    {
        id: 'group-3',
        label: 'عنوان گروه دسترسی',
        items: [
            { id: 'access-9', label: 'عنوان دسترسی', checked: false },
            { id: 'access-10', label: 'عنوان دسترسی', checked: false },
        ],
    },
]

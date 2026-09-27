import type {
    InventoryCardData,
    InventoryCardStatus,
} from '../component/InventoryCard'

export const INVENTORY_LIST_DUMMY: InventoryCardData[] = [
    {
        id: 'WH-1001',
        title: 'انبار مرکزی تهران',
        code: 'WH-1001',
        status: 'active',
        managerName: 'رضا کاظمی',
        stockCount: '5216',
        capacity: '87',
        href: '/admin/inventory-managment/details/WH-1001',
    },
    {
        id: 'WH-1002',
        title: 'انبار مرکزی تهران',
        code: 'WH-1002',
        status: 'inactive',
        managerName: 'رضا کاظمی',
        stockCount: '5,216',
        capacity: '87%',
        href: '/admin/inventory-managment/details/WH-1002',
    },
    {
        id: 'WH-1003',
        title: 'انبار مرکزی تهران',
        code: 'WH-1003',
        status: 'active',
        managerName: 'رضا کاظمی',
        stockCount: '5,216',
        capacity: '87%',
        href: '/admin/inventory-managment/details/WH-1003',
    },
    {
        id: 'WH-1004',
        title: 'انبار مرکزی تهران',
        code: 'WH-1004',
        status: 'inactive',
        managerName: 'رضا کاظمی',
        stockCount: '5,216',
        capacity: '87%',
        href: '/admin/inventory-managment/details/WH-1004',
    },
]

export const filterInventoryList = (
    items: InventoryCardData[],
    filter: InventoryCardStatus | 'all' | string
) => {
    if (filter === 'all') return items
    return items.filter((item) => item.status === filter)
}

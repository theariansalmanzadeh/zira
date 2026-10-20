export type RelatedWarehouseItem = {
    id?: string
    name?: string
    code?: string
    type?: string
    area?: number
    fillPercent?: number
    manager?: string
    phone?: string
    itemCount?: number
    stock?: number
}

export const RELATED_WAREHOUSE_COLUMNS = [
    { id: 'name', label: 'نام انبار' },
    { id: 'type', label: 'نوع انبار' },
    { id: 'area', label: 'متراژ' },
    { id: 'fill', label: 'پر شدن' },
    { id: 'manager', label: 'مسئول انبار' },
    { id: 'phone', label: 'تلفن انبار' },
    { id: 'items', label: 'قلم کالا' },
    { id: 'stock', label: 'موجودی' },
    { id: 'chevron', label: '' },
] as const

export const RELATED_WAREHOUSE_GRID_CLASS =
    'grid grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)_minmax(0,0.8fr)_minmax(0,0.6fr)_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,0.7fr)_minmax(0,1fr)_4.5rem] items-center gap-3'

export const RELATED_WAREHOUSES_DUMMY: RelatedWarehouseItem[] = [
    {
        id: 'WH-2001',
        name: 'انبار مرکزی تهران',
        code: 'WH-2001',
        type: 'انبار اصلی',
        area: 2400,
        fillPercent: 82,
        manager: 'علی نعمتی',
        phone: '02188451290',
        itemCount: 1840,
        stock: 24850,
    },
    {
        id: 'WH-2002',
        name: 'انبار غرب تهران',
        code: 'WH-2002',
        type: 'انبار فرعی',
        area: 980,
        fillPercent: 64,
        manager: 'رضا کاظمی',
        phone: '02144551230',
        itemCount: 620,
        stock: 9100,
    },
]

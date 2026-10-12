export type ColorOption = {
    label: string
    color: string
}

export type SpecField = {
    label: string
    value: string
}

export type SpecificationsProps = {
    colors?: ColorOption[]
    sizes?: string[]
    saleUnits?: string[]
    fields?: SpecField[]
    labels?: string[]
    className?: string
}

export type WarehouseGradeLevel = 1 | 2 | 3

export type WarehouseGradeItem = {
    id: string
    warehouseName: string
    address: string
    stock: number
    discountPercent: number | null
    grade: WarehouseGradeLevel
    description: string
}

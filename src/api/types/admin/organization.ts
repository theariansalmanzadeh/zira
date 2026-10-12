export type BranchStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED'
export type BranchUpdateStatus = 'ACTIVE' | 'INACTIVE'

export type WarehouseKind = 'CENTRAL' | 'BRANCH_STORE'

export type InsuranceStatus =
    | 'INSURED'
    | 'UNINSURED'
    | 'EXPIRED'
    | 'UNDER_REVIEW'

export type WorkingHours = Record<string, unknown>

export type BranchPermit = {
    allow_credit_sale?: boolean
    allow_cheque_sale?: boolean
    allow_consignment_sale?: boolean
    allow_scrap_entry?: boolean
    allow_repricing?: boolean
}

export type Company = {
    id: string
    name: string
    national_id: string
    economic_code: string
    address: string
    created_at: string
    updated_at: string
}

export type UpdateCompanyRequest = {
    name?: string
    national_id?: string
    economic_code?: string
    address?: string
}

export type GetCompanyResponse = Company
export type UpdateCompanyResponse = Company

export type BranchListItem = {
    id: string
    code: string
    name: string
    province: string
    city: string
    full_address: string
    phone: string
    status: BranchStatus
    status_display: string
}

export type BranchWarehouseLink = {
    id: string
    branch_id: string
    warehouse_id: string
    warehouse_code: string
    warehouse_name: string
    warehouse_kind: WarehouseKind
    is_primary: boolean
    is_active: boolean
    priority: number
}

export type BranchEmployee = {
    id: string
    branch_id: string
    user_id: string
    position: string
    shift?: string
    start_date?: string
    assigned_at: string
    is_active: boolean
}

export type BranchPosDevice = {
    id: string
    terminal_no: string
    title: string
    bank_account_id: string
    is_active: boolean
}

export type Branch = {
    id: string
    code: string
    name: string
    province: string
    city: string
    full_address: string
    phone: string
    status: BranchStatus
    status_display: string
    county: string
    address_details: string
    postal_code: string
    latitude: string | null
    longitude: string | null
    manager_id: string | null
    working_hours: WorkingHours | null
    activity_start_date: string | null
    company_id: string
    permit: BranchPermit | null
    created_at: string
    updated_at: string
    warehouses: BranchWarehouseLink[]
    employees: BranchEmployee[]
    pos_devices?: BranchPosDevice[]
}

export type BranchNetwork = {
    id: string
    code: string
    name: string
    province: string
    city: string
    full_address: string
    phone: string
    status: BranchStatus
    status_display: string
    address_details: string
    warehouses: BranchWarehouseLink[]
    employees: BranchEmployee[]
}

export type ListBranchesParams = {
    search?: string
    code?: string
    name?: string
    province?: string
    county?: string
    city?: string
    status?: BranchStatus | string
}

export type CreateBranchRequest = {
    code: string
    name: string
    province?: string
    county?: string
    city?: string
    full_address?: string
    address_details?: string
    postal_code?: string
    phone?: string
    latitude?: number | null
    longitude?: number | null
    manager_id?: string | null
    working_hours?: WorkingHours | null
    activity_start_date?: string | null
    permits?: BranchPermit
}

export type UpdateBranchRequest = {
    name?: string
    province?: string
    county?: string
    city?: string
    full_address?: string
    address_details?: string
    postal_code?: string
    phone?: string
    latitude?: number | null
    longitude?: number | null
    manager_id?: string | null
    working_hours?: WorkingHours | null
    activity_start_date?: string | null
    status?: BranchUpdateStatus
}

export type AssignBranchEmployeeRequest = {
    user_id: string
    position: string
}

export type LinkBranchWarehouseRequest = {
    warehouse_id: string
    is_primary?: boolean
}

export type BranchAssortmentItem = {
    id: string
    branch_id: string
    item_id?: string | null
    category_id?: string | null
    min_stock_qty: string
}

export type SetBranchAssortmentItem = {
    item_id?: string | null
    category_id?: string | null
    min_stock_qty?: number
}

export type SetBranchAssortmentRequest = {
    items?: SetBranchAssortmentItem[]
}

export type ListBranchesResponse = BranchListItem[]
export type CreateBranchResponse = Branch
export type GetBranchResponse = Branch
export type UpdateBranchResponse = Branch
export type GetBranchNetworkResponse = BranchNetwork
export type ListBranchEmployeesResponse = BranchEmployee[]
export type AssignBranchEmployeeResponse = BranchEmployee
export type ListBranchWarehousesResponse = BranchWarehouseLink[]
export type GetBranchPermitsResponse = BranchPermit
export type UpdateBranchPermitsRequest = BranchPermit
export type UpdateBranchPermitsResponse = BranchPermit
export type ListBranchAssortmentResponse = BranchAssortmentItem[]

export type WarehouseListItem = {
    id: string
    code: string
    name: string
    kind: WarehouseKind
    kind_display: string
    area_sqm: string
    keeper_id: string | null
    insurance_status: InsuranceStatus
    insurance_status_display: string
    is_active: boolean
}

export type WarehouseBranchLink = {
    branch_id: string
    code: string
    name: string
    is_primary: boolean
}

export type Warehouse = {
    id: string
    code: string
    name: string
    kind: WarehouseKind
    kind_display: string
    area_sqm: string
    keeper_id: string | null
    insurance_status: InsuranceStatus
    insurance_status_display: string
    is_active: boolean
    address: string
    phone: string
    created_at: string
    updated_at: string
    branches: WarehouseBranchLink[]
}

export type ListWarehousesParams = {
    search?: string
    code?: string
    name?: string
    kind?: WarehouseKind | string
    insurance_status?: InsuranceStatus | string
    is_active?: boolean
    branch_id?: string
}

export type CreateWarehouseRequest = {
    code: string
    name: string
    address?: string
    phone?: string
    area_sqm?: number
    keeper_id?: string | null
    insurance_status?: InsuranceStatus
    is_active?: boolean
}

export type UpdateWarehouseRequest = {
    name?: string
    address?: string
    phone?: string
    area_sqm?: number
    keeper_id?: string | null
    insurance_status?: InsuranceStatus
    is_active?: boolean
}

export type ListWarehousesResponse = WarehouseListItem[]
export type CreateWarehouseResponse = Warehouse
export type GetWarehouseResponse = Warehouse
export type UpdateWarehouseResponse = Warehouse

export type CashBoxListItem = {
    id: string
    branch_id: string
    branch_name: string
    code: string
    title: string
    opening_balance: string
    opened_at: string
    detail_account_id: string | null
    is_active: boolean
}

export type CashBox = CashBoxListItem & {
    created_at: string
    updated_at: string
}

export type ListCashBoxesParams = {
    search?: string
    code?: string
    title?: string
    branch_id?: string
    is_active?: boolean
}

export type CreateCashBoxRequest = {
    branch_id: string
    code: string
    title: string
    opening_balance?: number
    opened_at?: string
    detail_account_id?: string | null
    is_active?: boolean
}

export type UpdateCashBoxRequest = {
    title?: string
    detail_account_id?: string | null
    is_active?: boolean
}

export type ListCashBoxesResponse = CashBoxListItem[]
export type CreateCashBoxResponse = CashBox
export type GetCashBoxResponse = CashBox
export type UpdateCashBoxResponse = CashBox

export type PosDeviceListItem = {
    id: string
    branch_id: string
    branch_name: string
    terminal_no: string
    title: string
    bank_account_id: string | null
    is_active: boolean
}

export type PosDevice = PosDeviceListItem & {
    created_at: string
    updated_at: string
}

export type ListPosDevicesParams = {
    search?: string
    terminal_no?: string
    title?: string
    branch_id?: string
    is_active?: boolean
}

export type CreatePosDeviceRequest = {
    branch_id: string
    terminal_no: string
    title?: string
    bank_account_id?: string | null
    is_active?: boolean
}

export type UpdatePosDeviceRequest = {
    title?: string
    bank_account_id?: string | null
    is_active?: boolean
}

export type ListPosDevicesResponse = PosDeviceListItem[]
export type CreatePosDeviceResponse = PosDevice
export type GetPosDeviceResponse = PosDevice
export type UpdatePosDeviceResponse = PosDevice

export type OrganizationMessageResponse = {
    message?: string
}

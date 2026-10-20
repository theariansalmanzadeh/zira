import type { PaginatedResponse } from './common'

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

export type BranchWarehouse = {
    warehouse_id: string
    code: string
    name: string
    is_primary: boolean
}

export type BranchBankAccount = {
    id: string
    bank_account_id: string
    is_default: boolean
    is_active: boolean
    bank_name?: string | null
    account_type?: string | null
    account_number?: string | null
    sheba?: string | null
    card_number?: string | null
    holder_name?: string | null
    bank_branch_name?: string | null
    balance?: string | null
}

export type ListBranchBankAccountsParams = {
    page?: number
    page_size?: number
    query?: string
}

export type ListBranchBankAccountsResponse =
    PaginatedResponse<BranchBankAccount>

export type BranchEmployee = {
    first_name: string
    last_name: string
    full_name: string
    phone_number: string
    national_id: string
    personnel_code: string
    address: string
    id: string
    user_id: string
    position: string
    shift: string
    start_date: string
    assigned_at: string
    is_active: boolean
}

export type BranchPosDevice = {
    id: string
    terminal_no: string
    title: string
    device_model: string
    serial_no: string
    bank_account_id: string
    cash_box_id: string
    cash_box_title: string
    is_active: boolean
    bank_name: string
    bank_account_number: string
    today_transactions_amount: string
    last_transaction_at: string
}

export type BranchCashBox = {
    id: string
    code: string
    title: string
    opening_balance: string
    opened_at: string
    detail_account_id: string
    is_active: boolean
    is_open: boolean
    shift: string
    cashier_user_id: string
    cashier_name: string
    pos_devices: BranchPosDevice[]
    current_cash_balance: string
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
    employees: BranchEmployee[]
    county: string
    address_details: string
    postal_code: string
    latitude: string
    longitude: string
    manager_id: string
    working_hours: CreateBranchWorkingHours
    activity_start_date: string
    company_id: string
    permit: BranchPermit
    created_at: string
    updated_at: string
    warehouses: BranchWarehouse[]
    cash_boxes: BranchCashBox[]
    pos_devices: BranchPosDevice[]
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
    page?: number
    page_size?: number
}

export type BranchDayHours = {
    is_closed: boolean
    open?: string
    close?: string
}

export type CreateBranchWorkingHours = {
    saturday: BranchDayHours
    sunday: BranchDayHours
    monday: BranchDayHours
    tuesday: BranchDayHours
    wednesday: BranchDayHours
    thursday: BranchDayHours
    friday: BranchDayHours
}

export type CreateBranchPermits = {
    allow_credit_sale: boolean
    allow_cheque_sale: boolean
    allow_consignment_sale: boolean
    allow_scrap_entry: boolean
}

export type CreateBranchRequest = {
    code: string
    name: string
    province: string
    county: string
    city: string
    full_address: string
    address_details: string
    postal_code: string
    phone: string
    latitude: number
    longitude: number
    manager_id: string
    working_hours: CreateBranchWorkingHours
    activity_start_date: string
    permits: CreateBranchPermits
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

export type ListBranchesResponse = PaginatedResponse<BranchListItem>
export type CreateBranchResponse = Branch
export type GetBranchResponse = Branch
export type UpdateBranchResponse = Branch
export type GetBranchNetworkResponse = BranchNetwork
export type ListBranchEmployeesResponse = PaginatedResponse<BranchEmployee>
export type AssignBranchEmployeeResponse = BranchEmployee
export type ListBranchWarehousesResponse = PaginatedResponse<BranchWarehouseLink>
export type GetBranchPermitsResponse = BranchPermit
export type UpdateBranchPermitsRequest = BranchPermit
export type UpdateBranchPermitsResponse = BranchPermit
export type ListBranchAssortmentResponse = PaginatedResponse<BranchAssortmentItem>

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
    page?: number
    page_size?: number
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

export type ListWarehousesResponse = PaginatedResponse<WarehouseListItem>
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
    page?: number
    page_size?: number
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

export type ListCashBoxesResponse = PaginatedResponse<CashBoxListItem>
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
    page?: number
    page_size?: number
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

export type ListPosDevicesResponse = PaginatedResponse<PosDeviceListItem>
export type CreatePosDeviceResponse = PosDevice
export type GetPosDeviceResponse = PosDevice
export type UpdatePosDeviceResponse = PosDevice

export type OrganizationMessageResponse = {
    message?: string
}

export type SessionListItem = {
    id: string
    user_id: string
    role_id?: string | null
    branch_id?: string | null
    started_at: string
    last_activity_at: string
    device_type: string
    browser?: string | null
    ip_address?: string | null
    approx_location?: string | null
    status: string
    expires_at: string
}

export type ListActiveSessionsParams = {
    page?: number
    page_size?: number
    query?: string
    user_id?: string
    status?: string
    device_type?: string
}

export type ListActiveSessionsResponse = {
    total: number
    page: number
    page_size: number
    results: SessionListItem[]
}

export type Paginated<T> = {
    total: number
    page: number
    page_size: number
    results: T[]
}

export type ActivityResult = 'SUCCESS' | 'FAILURE' | 'DENIED'
export type EventSeverity = 'INFO' | 'WARNING' | 'CRITICAL'
export type EventCategory = 'OPERATIONAL' | 'SECURITY' | 'FINANCIAL' | 'SYSTEM'
export type ActorKind = 'USER' | 'SYSTEM' | 'ANONYMOUS'
export type SessionRuleBasis = 'USER' | 'ROLE'
export type IpRestrictionMode = 'ALLOW_ALL' | 'WHITELIST_ONLY' | 'BLACKLIST_ONLY'
export type IpRuleMode = 'ALLOW' | 'BLOCK'
export type IpRuleAppliesTo = 'GLOBAL' | 'ROLE' | 'USER'

export type ActivityLogListItem = {
    id: string
    occurred_at: string
    domain_code: string
    event_code: string
    event_title: string
    severity: EventSeverity
    actor_user_id?: string | null
    actor_kind: ActorKind
    branch_id?: string | null
    object_type: string
    object_id?: string | null
    object_label: string
    summary: string
    result: ActivityResult
}

export type ActivityLogChange = {
    field_path: string
    field_label: string
    old_value?: string | null
    new_value?: string | null
}

export type ActivityLogDetail = ActivityLogListItem & {
    permission_code?: string | null
    payload: Record<string, unknown>
    ip_address?: string | null
    user_agent: string
    request_id?: string | null
    changes?: ActivityLogChange[]
}

export type ListActivityLogsParams = {
    page?: number
    page_size?: number
    query?: string | null
    domain_code?: string | null
    event_code?: string | null
    actor_user_id?: string | null
    result?: ActivityResult | null
    search?: string | null
    date_from?: string | null
    date_to?: string | null
}

export type ListActivityLogChangesParams = {
    page?: number
    page_size?: number
    query?: string | null
}

export type SessionTerminateRequest = {
    reason?: string
}

export type SessionLimit = {
    id: string
    basis: SessionRuleBasis
    target_id: string
    max_concurrent?: number | null
    evict_oldest_on_limit: boolean
    is_active: boolean
    created_at: string
    updated_at: string
}

export type SessionLimitRequest = {
    basis: SessionRuleBasis
    target_id: string
    max_concurrent: number
}

export type SessionTimeout = {
    id: string
    basis: SessionRuleBasis
    target_id: string
    idle_timeout_minutes?: number | null
    is_active: boolean
    created_at: string
    updated_at: string
}

export type SessionTimeoutRequest = {
    basis: SessionRuleBasis
    target_id: string
    idle_timeout_minutes: number
}

export type ListSessionRulesParams = {
    page?: number
    page_size?: number
    query?: string | null
    basis?: string | null
}

export type SecurityPolicy = {
    id: string
    key: string
    password_min_length: number
    require_digit: boolean
    require_symbol: boolean
    require_uppercase: boolean
    password_expiry_days: number
    password_history_depth: number
    max_login_attempts: number
    auto_lock_after_attempts: number
    auto_lock_minutes: number
    default_max_sessions: number
    default_idle_timeout_minutes: number
    min_browser_versions: Record<string, unknown>
    ip_restriction_mode: IpRestrictionMode
    updated_at?: string | null
}

export type SecurityPolicyUpdate = {
    password_min_length?: number | null
    require_digit?: boolean | null
    require_symbol?: boolean | null
    require_uppercase?: boolean | null
    password_expiry_days?: number | null
    password_history_depth?: number | null
    max_login_attempts?: number | null
    auto_lock_after_attempts?: number | null
    auto_lock_minutes?: number | null
    default_max_sessions?: number | null
    default_idle_timeout_minutes?: number | null
    min_browser_versions?: Record<string, unknown> | null
    ip_restriction_mode?: IpRestrictionMode | null
}

export type IpRule = {
    id: string
    mode: IpRuleMode
    cidr: string
    applies_to: IpRuleAppliesTo
    target_id?: string | null
    note: string
    is_active: boolean
    created_at: string
}

export type IpRuleRequest = {
    cidr: string
    mode?: IpRuleMode
    applies_to?: IpRuleAppliesTo
    target_id?: string | null
    note?: string
}

export type ListIpRulesParams = {
    page?: number
    page_size?: number
    query?: string | null
    mode?: string | null
}

export type EventType = {
    id: string
    code: string
    domain_code: string
    resource_code: string
    title: string
    category: EventCategory
    severity: EventSeverity
    is_audited: boolean
    is_alertable: boolean
    records_changes: boolean
    retention_days: number
    payload_schema: Record<string, unknown>
    is_active: boolean
    synced_at: string
}

export type ListEventTypesParams = {
    page?: number
    page_size?: number
    query?: string | null
    domain_code?: string | null
    category?: EventCategory | null
    severity?: EventSeverity | null
}

export type ActiveSession = {
    id: string
    user_id: string
    user_mobile: string
    role_id: string
    branch_id: string
    started_at: string
    last_activity_at: string
    device_type: string
    browser: string
    ip_address: string
    approx_location: string
    status: string
    expires_at: string
    terminated_at: string
    terminated_by_id: string
}

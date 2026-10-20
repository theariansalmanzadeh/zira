import * as z from 'zod'
import type { SecurityPolicy } from '@/src/api/types/admin/securityAndEvents'

const nonNegativeIntString = (label: string) =>
    z
        .string()
        .trim()
        .min(1, `${label} الزامی است`)
        .regex(/^\d+$/, `${label} باید عدد صحیح باشد`)

export const IP_RESTRICTION_MODE_OPTIONS = [
    { label: 'همه مجاز', value: 'ALLOW_ALL' },
    { label: 'فقط لیست سفید', value: 'WHITELIST_ONLY' },
    { label: 'فقط لیست سیاه', value: 'BLACKLIST_ONLY' },
] as const

export const securityPolicySchema = z.object({
    password_min_length: nonNegativeIntString('حداقل طول رمز عبور'),
    require_digit: z.boolean(),
    require_symbol: z.boolean(),
    require_uppercase: z.boolean(),
    password_expiry_days: nonNegativeIntString('مهلت انقضای رمز عبور'),
    password_history_depth: nonNegativeIntString('عمق تاریخچه رمز عبور'),
    max_login_attempts: nonNegativeIntString('حداکثر تلاش ورود'),
    auto_lock_after_attempts: nonNegativeIntString('قفل خودکار پس از تلاش'),
    auto_lock_minutes: nonNegativeIntString('مدت قفل خودکار'),
    default_max_sessions: nonNegativeIntString('حداکثر نشست‌ها'),
    default_idle_timeout_minutes: nonNegativeIntString('مهلت بی‌فعالیتی'),
    min_browser_versions: z.string(),
    ip_restriction_mode: z.enum([
        'ALLOW_ALL',
        'WHITELIST_ONLY',
        'BLACKLIST_ONLY',
    ]),
})

export type SecurityPolicyFormValues = z.infer<typeof securityPolicySchema>

export const SECURITY_POLICY_DEFAULT_VALUES: SecurityPolicyFormValues = {
    password_min_length: '0',
    require_digit: true,
    require_symbol: true,
    require_uppercase: true,
    password_expiry_days: '0',
    password_history_depth: '0',
    max_login_attempts: '0',
    auto_lock_after_attempts: '0',
    auto_lock_minutes: '0',
    default_max_sessions: '0',
    default_idle_timeout_minutes: '0',
    min_browser_versions: '{}',
    ip_restriction_mode: 'ALLOW_ALL',
}

export const toSecurityPolicyFormValues = (
    policy: SecurityPolicy
): SecurityPolicyFormValues => ({
    password_min_length: String(policy.password_min_length ?? 0),
    require_digit: Boolean(policy.require_digit),
    require_symbol: Boolean(policy.require_symbol),
    require_uppercase: Boolean(policy.require_uppercase),
    password_expiry_days: String(policy.password_expiry_days ?? 0),
    password_history_depth: String(policy.password_history_depth ?? 0),
    max_login_attempts: String(policy.max_login_attempts ?? 0),
    auto_lock_after_attempts: String(policy.auto_lock_after_attempts ?? 0),
    auto_lock_minutes: String(policy.auto_lock_minutes ?? 0),
    default_max_sessions: String(policy.default_max_sessions ?? 0),
    default_idle_timeout_minutes: String(
        policy.default_idle_timeout_minutes ?? 0
    ),
    min_browser_versions: JSON.stringify(
        policy.min_browser_versions ?? {},
        null,
        2
    ),
    ip_restriction_mode: policy.ip_restriction_mode ?? 'ALLOW_ALL',
})

export const toSecurityPolicyUpdate = (values: SecurityPolicyFormValues) => {
    let minBrowserVersions: Record<string, unknown> = {}
    try {
        const parsed = JSON.parse(values.min_browser_versions || '{}')
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
            minBrowserVersions = parsed as Record<string, unknown>
        }
    } catch {
        minBrowserVersions = {}
    }

    return {
        password_min_length: Number(values.password_min_length),
        require_digit: values.require_digit,
        require_symbol: values.require_symbol,
        require_uppercase: values.require_uppercase,
        password_expiry_days: Number(values.password_expiry_days),
        password_history_depth: Number(values.password_history_depth),
        max_login_attempts: Number(values.max_login_attempts),
        auto_lock_after_attempts: Number(values.auto_lock_after_attempts),
        auto_lock_minutes: Number(values.auto_lock_minutes),
        default_max_sessions: Number(values.default_max_sessions),
        default_idle_timeout_minutes: Number(
            values.default_idle_timeout_minutes
        ),
        min_browser_versions: minBrowserVersions,
        ip_restriction_mode: values.ip_restriction_mode,
    }
}

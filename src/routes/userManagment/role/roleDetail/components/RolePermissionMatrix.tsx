'use client'

import type {
    RoleMatrixDomain,
    RoleMatrixPermission,
    RoleMatrixResource,
} from '@/src/api/types/admin/role'
import { useGetRoleMatrix } from '@/src/routes/userManagment/hooks/role'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/src/shared/components/ui/Accordion'
import { Pill } from '@/src/shared/components/ui/Pill'
import { Spinner } from '@/src/shared/components/ui/spinner'

type RolePermissionMatrixProps = {
    roleId: string
}

const PermissionPill = ({ permission }: { permission: RoleMatrixPermission }) => {
    const isDelete = permission.action_code.toLowerCase() === 'delete'
    const isGranted = permission.is_granted

    return (
        <Pill
            text={permission.action_name}
            size='sm'
            icon={isGranted ? 'checkCircle400Linear' : undefined}
            variant={
                !isGranted
                    ? 'outlined'
                    : isDelete
                      ? 'warning'
                      : 'success'
            }
            className={!isGranted ? 'opacity-60' : undefined}
        />
    )
}

const ResourceRow = ({ resource }: { resource: RoleMatrixResource }) => {
    const permissions = resource.permissions ?? []

    return (
        <div className='flex flex-col gap-3 border-b border-outline-variant/60 py-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6'>
            <div className='min-w-0 shrink-0 text-right sm:max-w-56'>
                <p className='text-label-lg font-semibold text-on-surface'>
                    {resource.resource_name}
                </p>
                <p className='truncate font-mono text-label-sm text-outline' dir='ltr'>
                    {resource.resource_code}
                </p>
            </div>
            <div className='flex flex-1 flex-wrap items-center justify-start gap-2 sm:justify-end'>
                {permissions.length === 0 ? (
                    <span className='text-label-sm text-outline'>
                        دسترسی‌ای تعریف نشده
                    </span>
                ) : (
                    permissions.map((permission) => (
                        <PermissionPill
                            key={permission.permission_id || permission.code}
                            permission={permission}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

const DomainAccordion = ({ domain }: { domain: RoleMatrixDomain }) => (
    <AccordionItem
        value={domain.domain_code}
        className='overflow-hidden rounded-card-lg border border-outline-variant bg-surface-container-lowest px-4'
    >
        <AccordionTrigger
            iconType='chevronDown400Linear'
            className='py-4 text-right [&[data-state=open]>svg]:rotate-180'
        >
            <div className='flex flex-col items-start gap-0.5'>
                <span className='text-title-sm font-bold text-on-surface'>
                    {domain.domain_name}
                </span>
                <span className='font-mono text-label-sm text-outline' dir='ltr'>
                    {domain.domain_code}
                </span>
            </div>
        </AccordionTrigger>
        <AccordionContent className='pb-2'>
            {(domain.resources ?? []).map((resource) => (
                <ResourceRow key={resource.resource_code} resource={resource} />
            ))}
        </AccordionContent>
    </AccordionItem>
)

const RolePermissionMatrix = ({ roleId }: RolePermissionMatrixProps) => {
    const { data, isPending, isError } = useGetRoleMatrix(roleId)

    if (isPending) {
        return (
            <div className='flex justify-center py-16'>
                <Spinner className='size-6' />
            </div>
        )
    }

    if (isError) {
        return (
            <p className='py-10 text-center text-label-md text-outline'>
                دریافت ماتریس دسترسی‌ها با خطا مواجه شد.
            </p>
        )
    }

    const domains = data?.matrix ?? []

    if (domains.length === 0) {
        return (
            <p className='py-10 text-center text-label-md text-outline'>
                دسترسی‌ای برای این نقش تعریف نشده است.
            </p>
        )
    }

    return (
        <Accordion
            type='multiple'
            defaultValue={domains[0] ? [domains[0].domain_code] : []}
            className='flex flex-col gap-3'
            dir='rtl'
        >
            {domains.map((domain) => (
                <DomainAccordion key={domain.domain_code} domain={domain} />
            ))}
        </Accordion>
    )
}

export default RolePermissionMatrix

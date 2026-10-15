'use client'

import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/navigation'
import { Switch } from '@/src/shared/components/ui/Switch'
import { Button } from '@/src/shared/components/ui/button'
import { Icon } from '@/src/shared/components/Icons/Icon'
import {
    useCreateBranchContext,
    type BranchPermissions,
} from '../provider/CreateBranchProvider'

type PermissionItemConfig = {
    key: keyof BranchPermissions
    label: string
    description?: string
}

const PERMISSION_CONFIGS: PermissionItemConfig[] = [
    {
        key: 'allow_credit_sale',
        label: 'فروش اعتباری',
        description: 'امکان ثبت سفارش و فاکتور به صورت اعتباری در این شعبه',
    },
    {
        key: 'allow_cheque_sale',
        label: 'فروش چکی',
        description: 'امکان دریافت چک صیادی و ثبت فاکتورهای چکی',
    },
    {
        key: 'allow_consignment_sale',
        label: 'فروش امانی',
        description: 'امکان تحویل یا فروش کالاهای امانی در این شعبه',
    },
    {
        key: 'allow_scrap_entry',
        label: 'ثبت ضایعات',
        description: 'دسترسی به ثبت ضایعات و اقلام مرجوعی/اسقاطی',
    },
]

type SetAccessFormProps = {
    setActiveStep?: Dispatch<SetStateAction<number>>
}

const SetAccessForm = ({
    setActiveStep: propSetActiveStep,
}: SetAccessFormProps) => {
    const {
        permissions,
        togglePermission,
        submitBranch,
        isPending,
        setActiveStep: contextSetActiveStep,
    } = useCreateBranchContext()

    const setActiveStep = propSetActiveStep || contextSetActiveStep
    const router = useRouter()

    const handleSubmit = () => {
        submitBranch(() => {
            router.push('/admin/branches?sub=list')
        })
    }

    return (
        <div className="flex flex-col gap-6" dir="rtl">
            <div className="flex flex-col gap-3">
                <span className="text-label-lg font-medium text-outline">
                    مجوزها
                </span>
                <div className="rounded-card-md bg-surface-container-lowest p-6">
                    <div className="flex flex-col divide-y divide-outline-variant/30">
                        {PERMISSION_CONFIGS.map((perm) => (
                            <div
                                key={perm.key}
                                className="flex items-center justify-between py-3.5"
                            >
                                <div className="flex flex-col gap-1">
                                    <span className="text-label-lg font-medium text-on-surface">
                                        {perm.label}
                                    </span>
                                    {perm.description && (
                                        <span className="text-body-sm text-on-surface-variant">
                                            {perm.description}
                                        </span>
                                    )}
                                </div>
                                <Switch
                                    checked={permissions[perm.key]}
                                    onCheckedChange={(checked) =>
                                        togglePermission(perm.key, checked)
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row gap-3 mt-10">
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-fit gap-2 self-end text-on-surface-variant"
                            onClick={() => setActiveStep(2)}
                            disabled={isPending}
                        >
                            <Icon
                                label="arrorwRight400Linear"
                                className="size-4 text-on-surface-variant"
                            />
                            <span className="text-label-lg">بازگشت</span>
                        </Button>
                        <Button
                            type="button"
                            variant="primary"
                            size="lg"
                            className="w-full text-label-lg"
                            onClick={handleSubmit}
                            isLoading={isPending}
                            disabled={isPending}
                        >
                            ثبت شعبه
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SetAccessForm

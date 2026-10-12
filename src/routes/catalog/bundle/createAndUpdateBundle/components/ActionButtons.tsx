'use client'

import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/src/shared/components/ui/button'
import {
    useCreateBundle,
    useDeleteBundle,
    useUpdateBundle,
} from '@/src/routes/catalog/hooks/catalog'
import { useBundle } from '../provider'
import {
    mapBundleFormToCreatePayload,
    mapBundleFormToUpdatePayload,
} from '../utils/mappers'

type ActionButtonsProps = {
    id?: string
}

const ActionButtons = ({ id: propId }: ActionButtonsProps) => {
    const { push } = useRouter()
    const routeParams = useParams<{ id?: string }>()
    const bundleId = propId || routeParams?.id

    const { name, policy, description, products } = useBundle()

    const { mutate: createBundle, isPending: isCreating } = useCreateBundle()
    const { mutate: updateBundle, isPending: isUpdating } = useUpdateBundle()
    const { mutate: deleteBundle, isPending: isDeleting } = useDeleteBundle()

    const isSubmitting = isCreating || isUpdating

    const handleSubmit = () => {
        if (!name.trim()) {
            toast.error('لطفاً نام باندل را وارد کنید')
            return
        }

        if (!products || products.length === 0) {
            toast.error('حداقل یک محصول باید به باندل اضافه شود')
            return
        }

        if (bundleId) {
            const payload = mapBundleFormToUpdatePayload({
                name,
                policy,
                description,
                products,
            })

            updateBundle(
                { bundleId, body: payload },
                {
                    onSuccess: () => {
                        toast.success('باندل با موفقیت ویرایش شد')
                        push('/admin/catalog?sub=bundles')
                    },
                    onError: (error) => {
                        const message =
                            error instanceof Error
                                ? error.message
                                : 'خطا در ویرایش باندل'
                        toast.error(message)
                    },
                }
            )
        } else {
            const payload = mapBundleFormToCreatePayload({
                name,
                policy,
                description,
                products,
            })

            createBundle(payload, {
                onSuccess: () => {
                    toast.success('باندل با موفقیت ایجاد شد')
                    push('/admin/catalog?sub=bundles')
                },
                onError: (error) => {
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'خطا در ثبت باندل'
                    toast.error(message)
                },
            })
        }
    }

    const handleDelete = () => {
        if (!bundleId) return

        deleteBundle(bundleId, {
            onSuccess: () => {
                toast.success('باندل با موفقیت حذف شد')
                push('/admin/catalog?sub=bundles')
            },
            onError: (error) => {
                const message =
                    error instanceof Error ? error.message : 'خطا در حذف باندل'
                toast.error(message)
            },
        })
    }

    const handleCancel = () => {
        push('/admin/catalog?sub=bundles')
    }

    return (
        <div className="mt-4 flex items-center justify-between gap-3" dir="rtl">
            <div>
                {bundleId && (
                    <Button
                        type="button"
                        variant="error"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                        disabled={isSubmitting || isDeleting}
                    >
                        حذف باندل
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-3">
                <Button
                    type="button"
                    variant="default-outline"
                    onClick={handleCancel}
                    disabled={isSubmitting || isDeleting}
                >
                    انصراف
                </Button>
                <Button
                    type="button"
                    variant="primary"
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    disabled={isSubmitting || isDeleting}
                >
                    {bundleId ? 'ویرایش باندل' : 'ثبت باندل'}
                </Button>
            </div>
        </div>
    )
}

export default ActionButtons

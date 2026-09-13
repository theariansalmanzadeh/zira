import { PillVariants } from '@/src/shared/components/ui/Pill'
import { IconLabel } from '@/src/shared/types/icon'
import { VariantProps } from 'class-variance-authority'

export type PillVariant = NonNullable<VariantProps<typeof PillVariants>['variant']>

export const PILL_VARIANT_ICON: Partial<Record<PillVariant, IconLabel>> = {
    success: 'folderOpen300Linear',
    warning: 'paused300Broken',
    info: 'visibility400Linear',
    tonal: 'folder400Linear',
}

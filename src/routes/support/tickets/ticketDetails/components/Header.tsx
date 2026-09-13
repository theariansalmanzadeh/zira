import { Pill, PillVariants } from '@/src/shared/components/ui/Pill'
import { VariantProps } from 'class-variance-authority'

type HeaderProps = {
    ticketCode: string
    statusText: string
    statusVariant: VariantProps<typeof PillVariants>['variant']
    subtitle: string
}

const Header = ({
    ticketCode,
    statusText,
    statusVariant,
    subtitle,
}: HeaderProps) => {
    return (
        <div className="flex flex-col items-start justify-start gap-2">
            <div className="flex flex-row items-center justify-start gap-3">
                <span className="text-label-lg font-bold text-on-surface">
                    گفتگوی تیکت — {ticketCode}
                </span>
                <Pill hasDot text={statusText} variant={statusVariant} />
            </div>
            <span className="text-label-md text-outline">{subtitle}</span>
        </div>
    )
}

export default Header

import { cn } from "@/src/shared/libs/utils"

export interface InfoCardFieldProps {
    label: string
    value: string
    className?: string
}


const InfoCardField = ({ label, value, className }: InfoCardFieldProps) => (
    <div className={cn("flex flex-col gap-3 text-right", className)}>
        <span className="text-label-md text-outline">{label}</span>
        <span className="text-label-lg text-on-surface-variant">{value}</span>
    </div>
)

export default InfoCardField
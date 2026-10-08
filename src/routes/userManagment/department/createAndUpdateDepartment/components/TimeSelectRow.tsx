import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/shared/components/ui/DropdownMenu"
import { FormDropdownOption } from "@/src/shared/components/ui/FormDropdown"
import { Icon } from '@/src/shared/components/Icons/Icon'
import { cn } from '@shared/libs/utils'
import { TIME_OPTIONS } from "../constants"

export type ResponseHours = {
    start: string
    end: string
}

type TimeSelectProps = {
    value?: string
    options: FormDropdownOption[]
    onChange: (value: string) => void
}

const TimeSelect = ({ value, options, onChange }: TimeSelectProps) => {
    const selectedLabel = options.find((option) => option.value === value)?.label

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="bg-surface-container-high flex h-10 w-full flex-row-reverse items-center justify-between gap-1.5 rounded-container-lg px-3 text-right outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <Icon label="chevronDown300Broken" className="shrink-0 size-6! text-on-surface-variant" />
                    <span
                        className={cn(
                            'text-base md:text-sm',
                            'text-outline'
                        )}
                    >
                        {selectedLabel ?? 'انتخاب'}
                    </span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="start"
                className="bg-surface-container-lowest min-w-(--radix-dropdown-menu-trigger-width) rounded-card-md p-sm shadow-lg ring-4 ring-outline-variant"
            >
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        className="cursor-pointer rounded-md px-2 py-1.5 text-on-surface-variant focus:bg-surface-container-high"
                        onSelect={() => onChange(option.value)}
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

type TimeSelectRowProps = {
    value: ResponseHours
    onChange: (value: ResponseHours) => void
}

const TimeSelectRow = ({ value, onChange }: TimeSelectRowProps) => {
    return (
        <div className='flex flex-col'>
            <span className='mb-1.5 text-label-md text-on-surface-variant'>
                ساعت پاسخ‌گویی
            </span>
            <div className='flex items-center gap-2'>
                <TimeSelect
                    value={value.start}
                    options={TIME_OPTIONS}
                    onChange={(start) => onChange({ ...value, start })}
                />
                <span className='text-outline'>-</span>
                <TimeSelect
                    value={value.end}
                    options={TIME_OPTIONS}
                    onChange={(end) => onChange({ ...value, end })}
                />
            </div>
        </div>
    )
}

export default TimeSelectRow

import type { ReactNode } from 'react'
import InfoCardField from '@/src/shared/components/infoCard/components/InfoCardField'

export type ExitDetailField = {
    key: string
    label: string
    render?: (value: string) => ReactNode
}

const ExitDetailFields = ({
    fields,
    values,
}: {
    fields: ExitDetailField[]
    values?: Record<string, string>
}) => {
    const rows: ExitDetailField[][] = []

    for (let index = 0; index < fields.length; index += 5) {
        rows.push(fields.slice(index, index + 5))
    }

    return (
        <div className="rounded-card-md bg-surface-container-lowest p-6">
            {rows.map((row, index) => (
                <div key={row[0]?.key ?? index}>
                    {index > 0 && (
                        <hr className="my-6 border-0 border-t border-dashed border-outline-variant" />
                    )}
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
                        {row.map((field) => {
                            const value = values?.[field.key] ?? '—'

                            if (!field.render) {
                                return (
                                    <InfoCardField
                                        key={field.key}
                                        label={field.label}
                                        value={value}
                                    />
                                )
                            }

                            return (
                                <div
                                    key={field.key}
                                    className="flex flex-col gap-3 text-right"
                                >
                                    <span className="text-label-md text-outline">
                                        {field.label}
                                    </span>
                                    {field.render(value)}
                                </div>
                            )
                        })}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExitDetailFields

import type { UseFormRegisterReturn } from 'react-hook-form'

export const registerInput = (field: UseFormRegisterReturn) => ({
    name: field.name,
    ref: field.ref,
    onBlur: field.onBlur,
    onChange: (value: string) => {
        void field.onChange({ target: { value, name: field.name } })
    },
})

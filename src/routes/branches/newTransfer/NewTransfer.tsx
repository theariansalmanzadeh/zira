'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import BranchPathForm from './components/BranchPathForm'
import LocationPathForm from './components/LocationPathForm'
import TransferItems from './components/TransferItems'
import type { NewTransferVariant } from './constants'
import {
    NEW_TRANSFER_DEFAULT_VALUES,
    createNewTransferSchema,
    type NewTransferFormValues,
} from './schema'

type NewTransferProps = {
    variant: NewTransferVariant
}

const NewTransfer = ({ variant }: NewTransferProps) => {
    const methods = useForm<NewTransferFormValues>({
        resolver: zodResolver(createNewTransferSchema(variant)),
        defaultValues: NEW_TRANSFER_DEFAULT_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    })

    const handleSubmit = methods.handleSubmit((values) => {
        console.log(values)
    })

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit}
                className='mx-auto flex w-full max-w-[700px] flex-col gap-4 rounded-container-lg bg-surface-container-lowest p-4'
                dir='rtl'
            >
                {variant === 'branch-path' ? (
                    <BranchPathForm />
                ) : (
                    <LocationPathForm />
                )}
                <TransferItems />
            </form>
        </FormProvider>
    )
}

export default NewTransfer

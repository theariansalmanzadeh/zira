'use client'

import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/src/shared/components/ui/button'
import {
    useContactInfo,
    useUpdateContactInfo,
} from '@/src/routes/contentManagment/hooks/contact'
import ContactNumbers from './components/ContactNumbers'
import EmailAndHours from './components/EmailAndHours'
import AddressSection from './components/AddressSection'
import SocialNetworks from './components/SocialNetworks'
import {
    CONTACT_US_DEFAULT_VALUES,
    contactUsFormSchema,
    toContactInfoIn,
    toContactUsFormValues,
    type ContactUsFormValues,
} from './schema'

const ContactUs = () => {
    const { data: contactInfo } = useContactInfo()
    const { mutate: updateContactInfo, isPending } = useUpdateContactInfo()
    const defaultValues = useMemo(
        () =>
            contactInfo
                ? toContactUsFormValues(contactInfo)
                : CONTACT_US_DEFAULT_VALUES,
        [contactInfo]
    )
    const form = useForm<ContactUsFormValues>({
        resolver: zodResolver(contactUsFormSchema),
        defaultValues,
        values: contactInfo ? defaultValues : undefined,
        mode: 'onChange',
    })

    const onSubmit = (values: ContactUsFormValues) => {
        console.log(values)
        updateContactInfo(
            { body: toContactInfoIn(values, contactInfo) },
            {
                onSuccess: () => {
                    toast.success('اطلاعات تماس ذخیره شد')
                },
            }
        )
    }

    return (
        <FormProvider {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 lg:grid-cols-2"
                dir="rtl"
            >
                <div className="flex flex-col gap-4">
                    <ContactNumbers />
                    <SocialNetworks />
                </div>
                <div className="flex flex-col gap-4">
                    <EmailAndHours />
                    <AddressSection />
                    <Button
                        type="submit"
                        variant="primary"
                        className="self-end"
                        isLoading={isPending}
                    >
                        ذخیره
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default ContactUs

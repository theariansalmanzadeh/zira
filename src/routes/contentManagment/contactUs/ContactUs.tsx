'use client'

import { useMemo } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
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
    const { control, handleSubmit, setValue } = useForm<ContactUsFormValues>({
        resolver: zodResolver(contactUsFormSchema),
        defaultValues,
        values: contactInfo ? defaultValues : undefined,
        mode: 'onChange',
    })

    const [phones, emailHours, address, socials] = useWatch({
        control,
        name: ['phones', 'emailHours', 'address', 'socials'],
    })

    const onSubmit = (values: ContactUsFormValues) => {
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            dir="rtl"
        >
            <div className="flex flex-col gap-4">
                <ContactNumbers
                    values={phones}
                    onChange={(values) =>
                        setValue('phones', values, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
                <SocialNetworks
                    values={socials}
                    onChange={(values) =>
                        setValue('socials', values, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
            </div>
            <div className="flex flex-col gap-4">
                <EmailAndHours
                    values={emailHours}
                    onChange={(values) =>
                        setValue('emailHours', values, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
                <AddressSection
                    value={address}
                    onChange={(value) =>
                        setValue('address', value, {
                            shouldDirty: true,
                            shouldValidate: true,
                        })
                    }
                />
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
    )
}

export default ContactUs

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import ContactNumbers from './components/ContactNumbers'
import EmailAndHours from './components/EmailAndHours'
import AddressSection from './components/AddressSection'
import SocialNetworks from './components/SocialNetworks'
import {
    CONTACT_US_DEFAULT_VALUES,
    contactUsFormSchema,
    type ContactUsFormValues,
} from './schema'

const ContactUs = () => {
    const { control, handleSubmit, setValue } = useForm<ContactUsFormValues>({
        resolver: zodResolver(contactUsFormSchema),
        defaultValues: CONTACT_US_DEFAULT_VALUES,
        mode: 'onChange',
    })

    const [phones, emailHours, address, socials] = useWatch({
        control,
        name: ['phones', 'emailHours', 'address', 'socials'],
    })

    const onSubmit = () => {}

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
            </div>
        </form>
    )
}

export default ContactUs

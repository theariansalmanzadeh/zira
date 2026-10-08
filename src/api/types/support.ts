export type SubmitPublicContactFormRequest = {
    full_name: string
    subject: string
    body: string
    email: string
    phone: string
}

export type SubmitPublicContactFormResponse = {
    message: string
}

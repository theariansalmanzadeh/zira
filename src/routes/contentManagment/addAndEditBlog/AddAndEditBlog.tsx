'use client'

import { useEffect, useMemo } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import BlogDetailsCard from './components/BlogDetailsCard'
import SeoCard from './components/SeoCard'
import BlogImage from './components/BlogImage'
import Categories from './components/Categories'
import {
    ADD_BLOG_EMPTY_VALUES,
    EDIT_BLOG_DEFAULT_VALUES,
    addAndEditBlogFormSchema,
    type AddAndEditBlogFormValues,
} from './schema'

const paramsIncludeEdit = (params: ReturnType<typeof useParams>) =>
    Object.values(params ?? {}).some((value) =>
        (Array.isArray(value) ? value : [value]).some((item) =>
            String(item ?? '')
                .toLowerCase()
                .includes('edit')
        )
    )

const AddAndEditBlog = () => {
    const params = useParams()
    const isEdit = paramsIncludeEdit(params)

    const defaultValues = useMemo(
        () => (isEdit ? EDIT_BLOG_DEFAULT_VALUES : ADD_BLOG_EMPTY_VALUES),
        [isEdit]
    )

    const methods = useForm<AddAndEditBlogFormValues>({
        resolver: zodResolver(addAndEditBlogFormSchema),
        defaultValues,
        mode: 'onChange',
    })

    const { handleSubmit, reset } = methods

    useEffect(() => {
        reset(defaultValues)
    }, [defaultValues, reset])

    const onSubmit = () => {}

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mx-auto grid w-full max-w-300 grid-cols-12 gap-4"
                dir="rtl"
            >
                <div className="col-span-12 flex flex-col gap-4 lg:col-span-8">
                    <BlogDetailsCard />
                    <SeoCard />
                </div>

                <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
                    <BlogImage />
                    <Categories />
                </div>
            </form>
        </FormProvider>
    )
}

export default AddAndEditBlog

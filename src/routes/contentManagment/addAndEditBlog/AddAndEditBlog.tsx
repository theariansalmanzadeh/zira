'use client'

import { useMemo } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
    useCreatePost,
    usePostDetail,
    useUpdatePost,
} from '@/src/routes/contentManagment/hooks/blog'
import { Button } from '@/src/shared/components/ui/button'
import BlogDetailsCard from './components/BlogDetailsCard'
import SeoCard from './components/SeoCard'
import BlogImage from './components/BlogImage'
import Categories from './components/Categories'
import {
    ADD_BLOG_EMPTY_VALUES,
    addAndEditBlogFormSchema,
    toBlogFormValues,
    type AddAndEditBlogFormValues,
} from './schema'

const BLOGS_ROUTE = '/admin/content-managment?sub=blog'

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
    const searchParams = useSearchParams()
    const { push } = useRouter()
    const isEdit = paramsIncludeEdit(params)
    const postId = searchParams.get('id') ?? ''
    const { data: post } = usePostDetail(postId, isEdit && Boolean(postId))
    const { mutate: createPost, isPending: isCreating } = useCreatePost()
    const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()
    const isPending = isCreating || isUpdating
    const editValues = useMemo(
        () => (isEdit && post ? toBlogFormValues(post) : undefined),
        [isEdit, post]
    )

    const methods = useForm<AddAndEditBlogFormValues>({
        resolver: zodResolver(addAndEditBlogFormSchema),
        defaultValues: ADD_BLOG_EMPTY_VALUES,
        values: editValues,
        mode: 'onChange',
    })

    const { handleSubmit } = methods

    const onSubmit = (values: AddAndEditBlogFormValues) => {
        const body = {
            title: values.details.title.trim(),
            subject: values.details.subject.trim(),
            summary: values.details.summary.trim(),
            slug: values.seo.slug.trim() || null,
            tags: values.seo.tags,
            category_id: values.categories.selectedCategoryIds[0] ?? null,
            author_name: values.categories.author.trim(),
            source: values.categories.source.trim(),
            meta_title: values.seo.metaTitle.trim(),
            meta_description: values.seo.metaDescription.trim(),
        }

        const onSuccess = () => push(BLOGS_ROUTE)

        if (isEdit && postId) {
            updatePost({ postId, body }, { onSuccess })
            return
        }

        createPost({ body }, { onSuccess })
    }

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
                    <Button
                        type="submit"
                        variant="primary"
                        className="self-end"
                        isLoading={isPending}
                    >
                        {isEdit ? 'ذخیره تغییرات' : 'ثبت مقاله'}
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}

export default AddAndEditBlog

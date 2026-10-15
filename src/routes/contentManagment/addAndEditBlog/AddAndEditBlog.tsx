'use client'

import { useMemo } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import {
    useCreatePost,
    usePostDetail,
    usePublishPost,
    useSetPostCover,
    useUpdatePost,
} from '@/src/routes/contentManagment/hooks/blog'
import BlogDetailsCard from './components/BlogDetailsCard'
import SeoCard from './components/SeoCard'
import BlogImage from './components/BlogImage'
import Categories from './components/Categories'
import EditorView from './components/EditorView'
import Actions from './components/Actions'
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
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost()
    const { mutateAsync: updatePost, isPending: isUpdating } = useUpdatePost()
    const { mutateAsync: publishPost, isPending: isPublishing } = usePublishPost()
    const { mutateAsync: setPostCover, isPending: isSettingCover } =
        useSetPostCover()
    const isPending = isCreating || isUpdating || isPublishing || isSettingCover
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

    const { handleSubmit, formState } = methods
    const onSuccess = () => push(BLOGS_ROUTE)

    const onSubmit = async (values: AddAndEditBlogFormValues) => {
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
            content: values.content,
        }

        if (isEdit && postId) {
            await updatePost({ postId, body })
            await publishPost({ postId })
            if (
                formState.touchedFields.imageName &&
                values.imageName &&
                values.coverFile
            ) {
                await setPostCover({
                    postId,
                    body: { image: values.coverFile },
                })
            }
            onSuccess()
            return
        }

        const created = await createPost({ body })
        await publishPost({ postId: created.id })
        if (values.imageName && values.coverFile) {
            await setPostCover({
                postId: created.id,
                body: { image: values.coverFile },
            })
        }
        onSuccess()
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
                    <EditorView />
                </div>

                <div className="col-span-12 flex flex-col gap-4 lg:col-span-4">
                    <BlogImage />
                    <Categories />
                    <Actions
                        isEdit={isEdit}
                        postId={postId}
                        isPending={isPending}
                        onDeleted={onSuccess}
                    />
                </div>
            </form>
        </FormProvider>
    )
}

export default AddAndEditBlog

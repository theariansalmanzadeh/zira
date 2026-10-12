import * as z from 'zod'
import type { BlogPostDetailOut } from '@/src/api/types/admin/cms/blog'

const requiredString = (message: string) => z.string().trim().min(1, message)

export const addAndEditBlogFormSchema = z.object({
    details: z.object({
        title: requiredString('نام مقاله الزامی است'),
        subject: z.string(),
        summary: requiredString('خلاصه متن الزامی است'),
    }),
    seo: z.object({
        tags: z.array(z.string()).min(1, 'حداقل یک برچسب الزامی است'),
        slug: z.string(),
        metaTitle: z.string(),
        metaDescription: z.string(),
    }),
    categories: z.object({
        selectedCategoryIds: z.array(z.string()),
        author: z.string(),
        source: z.string(),
    }),
    imageName: z.string(),
})

export type AddAndEditBlogFormValues = z.infer<typeof addAndEditBlogFormSchema>

export const ADD_BLOG_EMPTY_VALUES: AddAndEditBlogFormValues = {
    details: {
        title: '',
        subject: '',
        summary: '',
    },
    seo: {
        tags: [],
        slug: '',
        metaTitle: '',
        metaDescription: '',
    },
    categories: {
        selectedCategoryIds: [],
        author: '',
        source: '',
    },
    imageName: '',
}

export const toBlogFormValues = (
    post: BlogPostDetailOut
): AddAndEditBlogFormValues => ({
    details: {
        title: post.title ?? '',
        subject: post.subject ?? '',
        summary: post.summary ?? '',
    },
    seo: {
        tags: post.tags ?? [],
        slug: post.slug ?? '',
        metaTitle: post.meta_title ?? '',
        metaDescription: post.meta_description ?? '',
    },
    categories: {
        selectedCategoryIds: post.category_id ? [post.category_id] : [],
        author: post.author_name ?? '',
        source: post.source ?? '',
    },
    imageName: '',
})

export const EDIT_BLOG_DEFAULT_VALUES: AddAndEditBlogFormValues = {
    details: {
        title: 'تفاوت پارچه مودال و ویسکوز',
        subject: 'شناخت پارچه',
        summary:
            'مقایسه دوام، جذب رطوبت و لمس دو پارچه پرکاربرد در پوشاک راحتی.',
    },
    seo: {
        tags: ['مودال', 'ویسکوز', 'جنس پارچه'],
        slug: 'zira-article-1038',
        metaTitle: 'تفاوت پارچه مودال و ویسکوز | زیرا مارکت',
        metaDescription:
            'مقایسه دوام، جذب رطوبت و لمس دو پارچه پرکاربرد در پوشاک راحتی.',
    },
    categories: {
        selectedCategoryIds: ['fabrics', 'health', 'pregnancy'],
        author: 'تیم محتوا',
        source: 'واحد کیفیت',
    },
    imageName: '',
}

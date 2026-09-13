import {
    CONTENT_SUB_PARAMS,
    getContentSectionKey,
    sectionToHeading,
    type ContentSubParam,
} from '@/src/routes/contentManagment/constants'
import ContentPlaceholder from '@/src/routes/contentManagment/components/ContentPlaceholder'
import AboutUs from '@/src/routes/contentManagment/aboutUs/AboutUs'
import WorkWithUs from '@/src/routes/contentManagment/workWithUs/WorkWithUs'
import ContactUs from '@/src/routes/contentManagment/contactUs/ContactUs'
import Liecense from '@/src/routes/contentManagment/liecense/Liecense'
import Faq from '@/src/routes/contentManagment/faq/Faq'
import Blog from '@/src/routes/contentManagment/blog/Blog'
import Landing from '@/src/routes/contentManagment/landing/Landing'
import ContentDashboard from '@/src/routes/contentManagment/contentDashboard/ContentDashboard'

async function ContentManagmentPage({
    searchParams,
}: {
    searchParams: Promise<{ sub?: string }>
}) {
    const { sub } = await searchParams
    const section = (
        sub && CONTENT_SUB_PARAMS.includes(sub as ContentSubParam)
            ? sub
            : getContentSectionKey(sub || '')
    ) as ContentSubParam

    if (section === 'dashboard') {
        return <ContentDashboard />
    }

    if (section === 'home') {
        return <Landing />
    }

    if (section === 'about') {
        return <AboutUs />
    }

    if (section === 'work-with-us') {
        return <WorkWithUs />
    }

    if (section === 'contact') {
        return <ContactUs />
    }

    if (section === 'certificates' || section === 'liecense') {
        return <Liecense />
    }

    if (section === 'faq') {
        return <Faq />
    }

    if (section === 'blog') {
        return <Blog />
    }

    return (
        <ContentPlaceholder
            title={sectionToHeading[section]?.title ?? 'مدیریت محتوا'}
        />
    )
}

export default ContentManagmentPage

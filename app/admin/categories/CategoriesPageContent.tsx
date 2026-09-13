'use client'

import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const CategoryDashboard = dynamic(
    () => import('@/src/routes/categories/categoriesDashboard/CategoryDashboard'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ProductList = dynamic(
    () => import('@/src/routes/categories/productList/ProductList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const CategoryTypes = dynamic(
    () => import('@/src/routes/categories/categoryTypes/CategoryTypes'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Pricing = dynamic(
    () => import('@/src/routes/categories/pricing/Pricing'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Discount = dynamic(
    () => import('@/src/routes/categories/discount/Discount'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Campaigne = dynamic(
    () => import('@/src/routes/categories/campaigne/Campaigne'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BundleList = dynamic(
    () => import('@/src/routes/categories/bundle/bundleList/BundleList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BrandsList = dynamic(
    () => import('@/src/routes/categories/brands/BrandsList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Report = dynamic(
    () => import('@/src/routes/categories/report/Report'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Variable = dynamic(
    () => import('@/src/routes/categories/variable/Variable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const CATEGORIES_PAGE_COMPONENTS: Record<string, ComponentType> = {
    dashboard: CategoryDashboard,
    list: ProductList,
    products: ProductList,
    'category-types': CategoryTypes,
    pricing: Pricing,
    discounts: Discount,
    'discount-codes': Discount,
    campaigns: Campaigne,
    bundles: BundleList,
    brands: BrandsList,
    report: Report,
    variable: Variable,
}

const CategoriesPageContent = () => {
    const searchParams = useSearchParams()
    const sectionKey = searchParams.get('sub') ?? 'dashboard'
    const Component =
        CATEGORIES_PAGE_COMPONENTS[sectionKey] ?? CategoryDashboard

    return <Component key={sectionKey} />
}

export default CategoriesPageContent

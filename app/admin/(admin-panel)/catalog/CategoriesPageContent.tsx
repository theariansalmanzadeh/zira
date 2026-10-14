'use client'

import type { ComponentType } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import TableLoadingSkeleton from '@/src/shared/components/loading/TableLoadingSkeleton'

const CategoryDashboard = dynamic(
    () => import('@/src/routes/catalog/categoriesDashboard/CategoryDashboard'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const ProductList = dynamic(
    () => import('@/src/routes/catalog/productList/ProductList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const CategoryTypes = dynamic(
    () => import('@/src/routes/catalog/categoryTypes/CategoryTypes'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Contracts = dynamic(
    () => import('@/src/routes/catalog/contracts/Contracts'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Discount = dynamic(
    () => import('@/src/routes/catalog/discount/Discount'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Campaigne = dynamic(
    () => import('@/src/routes/catalog/campaigne/Campaigne'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BundleList = dynamic(
    () => import('@/src/routes/catalog/bundle/bundleList/BundleList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const PacksList = dynamic(
    () => import('@/src/routes/catalog/packsList/PacksList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const BrandsList = dynamic(
    () => import('@/src/routes/catalog/brands/BrandsList'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Report = dynamic(
    () => import('@/src/routes/catalog/report/Report'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)
const Variable = dynamic(
    () => import('@/src/routes/catalog/variable/Variable'),
    { loading: () => <TableLoadingSkeleton isPending /> }
)

const CATEGORIES_PAGE_COMPONENTS: Record<string, ComponentType> = {
    dashboard: CategoryDashboard,
    list: ProductList,
    products: ProductList,
    'category-types': CategoryTypes,
    contracts: Contracts,
    discounts: Discount,
    'discount-codes': Discount,
    campaigns: Campaigne,
    bundles: BundleList,
    packs: PacksList,
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

'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    activateItem,
    activateProduct,
    addProductCells,
    archiveItem,
    archiveProduct,
    assignBarcode,
    createAttribute,
    createBrand,
    createBundle,
    createCategory,
    createColor,
    createColorSet,
    createDraft,
    createLabel,
    createMaterial,
    createPack,
    createProduct,
    createSeason,
    createSize,
    createSizeSet,
    deactivateAttribute,
    deactivateBrand,
    deactivateCategory,
    deleteAttribute,
    deleteBrand,
    deleteBundle,
    deleteCategory,
    deleteColor,
    deleteItem,
    deleteLabel,
    deleteMaterial,
    deleteProduct,
    deleteSeason,
    deleteSize,
    discardDraft,
    exportItems,
    exportProducts,
    getAttribute,
    getBundle,
    getCategory,
    getDraft,
    getItem,
    getItemPolicy,
    getProduct,
    hideItem,
    listAttributes,
    listBrands,
    listBundles,
    listCategories,
    listColorSets,
    listColors,
    listDrafts,
    listItems,
    listLabels,
    listMaterials,
    listModelLines,
    listProducts,
    listSeasons,
    listSizeSets,
    listSizes,
    lookupItemByBarcode,
    moveCategory,
    publishBundle,
    renameCategory,
    restoreItem,
    restoreProduct,
    retireBundle,
    saveAttributeValues,
    setItemAttributes,
    setItemImages,
    setItemPolicy,
    setItemRelations,
    setItemSpecs,
    setItemVisibility,
    setProductAttributes,
    updateAttribute,
    updateBrand,
    updateBundle,
    updateCategory,
    updateColor,
    updateColorSet,
    updateDraft,
    updateItem,
    updateLabel,
    updateMaterial,
    updateProduct,
    updateSeason,
    updateSize,
    updateSizeSet,
} from '@/src/api/admin/catalog'
import type {
    AttributeIn,
    AttributeOut,
    AttributeUpdateIn,
    AttributeValuesIn,
    BarcodeIn,
    BrandIn,
    BrandOut,
    BrandUpdateIn,
    BundleCreateIn,
    BundleDetailOut,
    BundleUpdateIn,
    CategoryIn,
    CategoryMoveIn,
    CategoryOut,
    CategoryRenameIn,
    CategoryUpdateIn,
    ColorIn,
    ColorOut,
    ColorSetIn,
    ColorSetOut,
    ColorSetUpdateIn,
    ColorUpdateIn,
    DraftIn,
    DraftOut,
    ExportItemsParams,
    ExportProductsParams,
    ItemDetailOut,
    ItemListOut,
    ItemPolicyIn,
    ItemPolicyOut,
    ItemUpdateIn,
    LabelIn,
    LabelOut,
    LabelUpdateIn,
    ListAttributesParams,
    ListBrandsParams,
    ListBundlesParams,
    ListCategoriesParams,
    ListColorSetsParams,
    ListColorsParams,
    ListItemsParams,
    ListLabelsParams,
    ListMaterialsParams,
    ListModelLinesParams,
    ListProductDraftsParams,
    ListProductsParams,
    ListSeasonsParams,
    ListSizeSetsParams,
    ListSizesParams,
    LookupItemParams,
    MaterialIn,
    MaterialOut,
    MaterialUpdateIn,
    PackCreateIn,
    PaginationOut_AttributeOut_,
    PaginationOut_BrandOut_,
    PaginationOut_BundleListOut_,
    PaginationOut_ColorOut_,
    PaginationOut_ColorSetOut_,
    PaginationOut_DraftListOut_,
    PaginationOut_ItemListOut_,
    PaginationOut_LabelOut_,
    PaginationOut_MaterialOut_,
    PaginationOut_ModelLineOut_,
    PaginationOut_ProductListOut_,
    PaginationOut_SeasonOut_,
    PaginationOut_SizeOut_,
    PaginationOut_SizeSetOut_,
    ProductAttributesIn,
    ProductCellsIn,
    ProductCreateIn,
    ProductDetailOut,
    ProductUpdateIn,
    RelationsIn,
    SeasonIn,
    SeasonOut,
    SeasonUpdateIn,
    SetItemImagesPayload,
    SizeIn,
    SizeOut,
    SizeSetIn,
    SizeSetOut,
    SizeSetUpdateIn,
    SizeUpdateIn,
    SpecsIn,
    VisibilityIn,
} from '@/src/api/types/admin/catalog'

export const catalogKeys = {
    all: ['catalog'] as const,
    categories: {
        all: () => [...catalogKeys.all, 'categories'] as const,
        lists: () => [...catalogKeys.categories.all(), 'list'] as const,
        list: (params?: ListCategoriesParams) =>
            [...catalogKeys.categories.lists(), params ?? {}] as const,
        details: () => [...catalogKeys.categories.all(), 'detail'] as const,
        detail: (id: string) => [...catalogKeys.categories.details(), id] as const,
    },
    brands: {
        all: () => [...catalogKeys.all, 'brands'] as const,
        lists: () => [...catalogKeys.brands.all(), 'list'] as const,
        list: (params?: ListBrandsParams) =>
            [...catalogKeys.brands.lists(), params ?? {}] as const,
        modelLines: (brandId: string, params?: ListModelLinesParams) =>
            [...catalogKeys.brands.all(), 'model-lines', brandId, params ?? {}] as const,
    },
    attributes: {
        all: () => [...catalogKeys.all, 'attributes'] as const,
        lists: () => [...catalogKeys.attributes.all(), 'list'] as const,
        list: (params?: ListAttributesParams) =>
            [...catalogKeys.attributes.lists(), params ?? {}] as const,
        details: () => [...catalogKeys.attributes.all(), 'detail'] as const,
        detail: (id: string) => [...catalogKeys.attributes.details(), id] as const,
    },
    sizes: {
        all: () => [...catalogKeys.all, 'sizes'] as const,
        lists: () => [...catalogKeys.sizes.all(), 'list'] as const,
        list: (params?: ListSizesParams) =>
            [...catalogKeys.sizes.lists(), params ?? {}] as const,
    },
    colors: {
        all: () => [...catalogKeys.all, 'colors'] as const,
        lists: () => [...catalogKeys.colors.all(), 'list'] as const,
        list: (params?: ListColorsParams) =>
            [...catalogKeys.colors.lists(), params ?? {}] as const,
    },
    materials: {
        all: () => [...catalogKeys.all, 'materials'] as const,
        lists: () => [...catalogKeys.materials.all(), 'list'] as const,
        list: (params?: ListMaterialsParams) =>
            [...catalogKeys.materials.lists(), params ?? {}] as const,
    },
    seasons: {
        all: () => [...catalogKeys.all, 'seasons'] as const,
        lists: () => [...catalogKeys.seasons.all(), 'list'] as const,
        list: (params?: ListSeasonsParams) =>
            [...catalogKeys.seasons.lists(), params ?? {}] as const,
    },
    labels: {
        all: () => [...catalogKeys.all, 'labels'] as const,
        lists: () => [...catalogKeys.labels.all(), 'list'] as const,
        list: (params?: ListLabelsParams) =>
            [...catalogKeys.labels.lists(), params ?? {}] as const,
    },
    sizeSets: {
        all: () => [...catalogKeys.all, 'size-sets'] as const,
        lists: () => [...catalogKeys.sizeSets.all(), 'list'] as const,
        list: (params?: ListSizeSetsParams) =>
            [...catalogKeys.sizeSets.lists(), params ?? {}] as const,
    },
    colorSets: {
        all: () => [...catalogKeys.all, 'color-sets'] as const,
        lists: () => [...catalogKeys.colorSets.all(), 'list'] as const,
        list: (params?: ListColorSetsParams) =>
            [...catalogKeys.colorSets.lists(), params ?? {}] as const,
    },
    products: {
        all: () => [...catalogKeys.all, 'products'] as const,
        lists: () => [...catalogKeys.products.all(), 'list'] as const,
        list: (params?: ListProductsParams) =>
            [...catalogKeys.products.lists(), params ?? {}] as const,
        details: () => [...catalogKeys.products.all(), 'detail'] as const,
        detail: (id: string) => [...catalogKeys.products.details(), id] as const,
    },
    drafts: {
        all: () => [...catalogKeys.all, 'drafts'] as const,
        lists: () => [...catalogKeys.drafts.all(), 'list'] as const,
        list: (params?: ListProductDraftsParams) =>
            [...catalogKeys.drafts.lists(), params ?? {}] as const,
        details: () => [...catalogKeys.drafts.all(), 'detail'] as const,
        detail: (id: string) => [...catalogKeys.drafts.details(), id] as const,
    },
    items: {
        all: () => [...catalogKeys.all, 'items'] as const,
        lists: () => [...catalogKeys.items.all(), 'list'] as const,
        list: (params?: ListItemsParams) =>
            [...catalogKeys.items.lists(), params ?? {}] as const,
        details: () => [...catalogKeys.items.all(), 'detail'] as const,
        detail: (id: string) => [...catalogKeys.items.details(), id] as const,
        policy: (id: string) => [...catalogKeys.items.detail(id), 'policy'] as const,
        lookup: (barcode: string) => [...catalogKeys.items.all(), 'lookup', barcode] as const,
    },
    bundles: {
        all: () => [...catalogKeys.all, 'bundles'] as const,
        lists: () => [...catalogKeys.bundles.all(), 'list'] as const,
        list: (params?: ListBundlesParams) =>
            [...catalogKeys.bundles.lists(), params ?? {}] as const,
        details: () => [...catalogKeys.bundles.all(), 'detail'] as const,
        detail: (id: string) => [...catalogKeys.bundles.details(), id] as const,
    },
}

// ===================== CATEGORIES =====================

export const useListCategories = (params?: ListCategoriesParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.categories.list(params),
        enabled,
        queryFn: async () => {
            const result = await listCategories(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetCategory = (categoryId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.categories.detail(categoryId),
        enabled: enabled && Boolean(categoryId),
        queryFn: async () => {
            const result = await getCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: CategoryIn) => {
            const result = await createCategory(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.all() })
        },
    })
}

export const useUpdateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId, body }: { categoryId: string; body: CategoryUpdateIn }) => {
            const result = await updateCategory(categoryId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { categoryId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.detail(categoryId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.lists() })
        },
    })
}

export const useDeleteCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (categoryId: string) => {
            const result = await deleteCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.all() })
        },
    })
}

export const useRenameCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId, body }: { categoryId: string; body: CategoryRenameIn }) => {
            const result = await renameCategory(categoryId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { categoryId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.detail(categoryId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.lists() })
        },
    })
}

export const useMoveCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ categoryId, body }: { categoryId: string; body: CategoryMoveIn }) => {
            const result = await moveCategory(categoryId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.all() })
        },
    })
}

export const useDeactivateCategory = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (categoryId: string) => {
            const result = await deactivateCategory(categoryId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, categoryId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.detail(categoryId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.categories.lists() })
        },
    })
}

// ===================== BRANDS =====================

export const useListBrands = (params?: ListBrandsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.brands.list(params),
        enabled,
        queryFn: async () => {
            const result = await listBrands(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useListModelLines = (brandId: string, params?: ListModelLinesParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.brands.modelLines(brandId, params),
        enabled: enabled && Boolean(brandId),
        queryFn: async () => {
            const result = await listModelLines(brandId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: BrandIn) => {
            const result = await createBrand(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.brands.all() })
        },
    })
}

export const useUpdateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ brandId, body }: { brandId: string; body: BrandUpdateIn }) => {
            const result = await updateBrand(brandId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.brands.all() })
        },
    })
}

export const useDeleteBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (brandId: string) => {
            const result = await deleteBrand(brandId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.brands.all() })
        },
    })
}

export const useDeactivateBrand = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (brandId: string) => {
            const result = await deactivateBrand(brandId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.brands.all() })
        },
    })
}

// ===================== ATTRIBUTES =====================

export const useListAttributes = (params?: ListAttributesParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.attributes.list(params),
        enabled,
        queryFn: async () => {
            const result = await listAttributes(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

const toAttribute = (
    data: PaginationOut_AttributeOut_ | AttributeOut,
    attributeId: string
): AttributeOut | null => {
    if ('results' in data) {
        const page = data as PaginationOut_AttributeOut_
        return (
            page.results.find((item) => item.id === attributeId) ??
            page.results[0] ??
            null
        )
    }
    return data
}

export const useGetAttribute = (attributeId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.attributes.detail(attributeId),
        enabled: enabled && Boolean(attributeId),
        queryFn: async () => {
            const result = await getAttribute(attributeId)
            if (!result.success) throw result.error
            return toAttribute(
                result.data as PaginationOut_AttributeOut_ | AttributeOut,
                attributeId
            )
        },
    })
}

export const useCreateAttribute = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: AttributeIn) => {
            const result = await createAttribute(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.all() })
        },
    })
}

export const useUpdateAttribute = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ attributeId, body }: { attributeId: string; body: AttributeUpdateIn }) => {
            const result = await updateAttribute(attributeId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { attributeId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.detail(attributeId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.lists() })
        },
    })
}

export const useDeleteAttribute = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (attributeId: string) => {
            const result = await deleteAttribute(attributeId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.all() })
        },
    })
}

export const useSaveAttributeValues = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ attributeId, body }: { attributeId: string; body: AttributeValuesIn }) => {
            const result = await saveAttributeValues(attributeId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { attributeId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.detail(attributeId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.lists() })
        },
    })
}

export const useDeactivateAttribute = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (attributeId: string) => {
            const result = await deactivateAttribute(attributeId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, attributeId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.detail(attributeId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.attributes.lists() })
        },
    })
}

// ===================== SIZES, COLORS, MATERIALS, SEASONS, LABELS =====================

export const useListSizes = (params?: ListSizesParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.sizes.list(params),
        enabled,
        queryFn: async () => {
            const result = await listSizes(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateSize = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: SizeIn) => {
            const result = await createSize(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.sizes.all() })
        },
    })
}

export const useUpdateSize = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ sizeId, body }: { sizeId: string; body: SizeUpdateIn }) => {
            const result = await updateSize(sizeId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.sizes.all() })
        },
    })
}

export const useDeleteSize = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (sizeId: string) => {
            const result = await deleteSize(sizeId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.sizes.all() })
        },
    })
}

export const useListColors = (params?: ListColorsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.colors.list(params),
        enabled,
        queryFn: async () => {
            const result = await listColors(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateColor = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: ColorIn) => {
            const result = await createColor(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.colors.all() })
        },
    })
}

export const useUpdateColor = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ colorId, body }: { colorId: string; body: ColorUpdateIn }) => {
            const result = await updateColor(colorId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.colors.all() })
        },
    })
}

export const useDeleteColor = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (colorId: string) => {
            const result = await deleteColor(colorId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.colors.all() })
        },
    })
}

export const useListMaterials = (params?: ListMaterialsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.materials.list(params),
        enabled,
        queryFn: async () => {
            const result = await listMaterials(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateMaterial = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: MaterialIn) => {
            const result = await createMaterial(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.materials.all() })
        },
    })
}

export const useUpdateMaterial = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ materialId, body }: { materialId: string; body: MaterialUpdateIn }) => {
            const result = await updateMaterial(materialId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.materials.all() })
        },
    })
}

export const useDeleteMaterial = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (materialId: string) => {
            const result = await deleteMaterial(materialId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.materials.all() })
        },
    })
}

export const useListSeasons = (params?: ListSeasonsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.seasons.list(params),
        enabled,
        queryFn: async () => {
            const result = await listSeasons(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateSeason = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: SeasonIn) => {
            const result = await createSeason(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.seasons.all() })
        },
    })
}

export const useUpdateSeason = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ seasonId, body }: { seasonId: string; body: SeasonUpdateIn }) => {
            const result = await updateSeason(seasonId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.seasons.all() })
        },
    })
}

export const useDeleteSeason = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (seasonId: string) => {
            const result = await deleteSeason(seasonId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.seasons.all() })
        },
    })
}

export const useListLabels = (params?: ListLabelsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.labels.list(params),
        enabled,
        queryFn: async () => {
            const result = await listLabels(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateLabel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: LabelIn) => {
            const result = await createLabel(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.labels.all() })
        },
    })
}

export const useUpdateLabel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ labelId, body }: { labelId: string; body: LabelUpdateIn }) => {
            const result = await updateLabel(labelId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.labels.all() })
        },
    })
}

export const useDeleteLabel = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (labelId: string) => {
            const result = await deleteLabel(labelId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.labels.all() })
        },
    })
}

export const useListSizeSets = (params?: ListSizeSetsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.sizeSets.list(params),
        enabled,
        queryFn: async () => {
            const result = await listSizeSets(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateSizeSet = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: SizeSetIn) => {
            const result = await createSizeSet(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.sizeSets.all() })
        },
    })
}

export const useUpdateSizeSet = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ setId, body }: { setId: string; body: SizeSetUpdateIn }) => {
            const result = await updateSizeSet(setId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.sizeSets.all() })
        },
    })
}

export const useListColorSets = (params?: ListColorSetsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.colorSets.list(params),
        enabled,
        queryFn: async () => {
            const result = await listColorSets(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateColorSet = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: ColorSetIn) => {
            const result = await createColorSet(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.colorSets.all() })
        },
    })
}

export const useUpdateColorSet = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ setId, body }: { setId: string; body: ColorSetUpdateIn }) => {
            const result = await updateColorSet(setId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.colorSets.all() })
        },
    })
}

// ===================== PRODUCTS & DRAFTS =====================

export const useListProducts = (params?: ListProductsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.products.list(params),
        enabled,
        queryFn: async () => {
            const result = await listProducts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetProduct = (productId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.products.detail(productId),
        enabled: enabled && Boolean(productId),
        queryFn: async () => {
            const result = await getProduct(productId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: ProductCreateIn) => {
            const result = await createProduct(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.all() })
        },
    })
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ productId, body }: { productId: string; body: ProductUpdateIn }) => {
            const result = await updateProduct(productId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.lists() })
        },
    })
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productId: string) => {
            const result = await deleteProduct(productId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.all() })
        },
    })
}

export const useCreatePack = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ productId, body }: { productId: string; body: PackCreateIn }) => {
            const result = await createPack(productId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.all() })
        },
    })
}

export const useAddProductCells = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ productId, body }: { productId: string; body: ProductCellsIn }) => {
            const result = await addProductCells(productId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.all() })
        },
    })
}

export const useSetProductAttributes = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ productId, body }: { productId: string; body: ProductAttributesIn }) => {
            const result = await setProductAttributes(productId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { productId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
        },
    })
}

export const useActivateProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productId: string) => {
            const result = await activateProduct(productId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, productId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.lists() })
        },
    })
}

export const useArchiveProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productId: string) => {
            const result = await archiveProduct(productId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, productId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.lists() })
        },
    })
}

export const useRestoreProduct = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productId: string) => {
            const result = await restoreProduct(productId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, productId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.detail(productId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.products.lists() })
        },
    })
}

export const useListProductDrafts = (params?: ListProductDraftsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.drafts.list(params),
        enabled,
        queryFn: async () => {
            const result = await listDrafts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetProductDraft = (draftId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.drafts.detail(draftId),
        enabled: enabled && Boolean(draftId),
        queryFn: async () => {
            const result = await getDraft(draftId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateProductDraft = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: DraftIn) => {
            const result = await createDraft(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.drafts.all() })
        },
    })
}

export const useUpdateProductDraft = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ draftId, body }: { draftId: string; body: DraftIn }) => {
            const result = await updateDraft(draftId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { draftId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.drafts.detail(draftId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.drafts.lists() })
        },
    })
}

export const useDiscardProductDraft = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (draftId: string) => {
            const result = await discardDraft(draftId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.drafts.all() })
        },
    })
}

// ===================== ITEMS (SKUS / VARIANTS) =====================

export const useListItems = (params?: ListItemsParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.items.list(params),
        enabled,
        queryFn: async () => {
            const result = await listItems(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetItem = (itemId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.items.detail(itemId),
        enabled: enabled && Boolean(itemId),
        queryFn: async () => {
            const result = await getItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useLookupItemByBarcode = (barcode: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.items.lookup(barcode),
        enabled: enabled && Boolean(barcode),
        queryFn: async () => {
            const result = await lookupItemByBarcode({ barcode })
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetItemPolicy = (itemId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.items.policy(itemId),
        enabled: enabled && Boolean(itemId),
        queryFn: async () => {
            const result = await getItemPolicy(itemId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useUpdateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: ItemUpdateIn }) => {
            const result = await updateItem(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useDeleteItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (itemId: string) => {
            const result = await deleteItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.all() })
        },
    })
}

export const useSetItemImages = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: SetItemImagesPayload }) => {
            const result = await setItemImages(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
        },
    })
}

export const useSetItemVisibility = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: VisibilityIn }) => {
            const result = await setItemVisibility(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useAssignItemBarcode = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: BarcodeIn }) => {
            const result = await assignBarcode(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useActivateItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (itemId: string) => {
            const result = await activateItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, itemId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useHideItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (itemId: string) => {
            const result = await hideItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, itemId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useArchiveItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (itemId: string) => {
            const result = await archiveItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, itemId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useRestoreItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (itemId: string) => {
            const result = await restoreItem(itemId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, itemId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.lists() })
        },
    })
}

export const useSetItemPolicy = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: ItemPolicyIn }) => {
            const result = await setItemPolicy(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.policy(itemId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
        },
    })
}

export const useSetItemRelations = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, kind, body }: { itemId: string; kind: string; body: RelationsIn }) => {
            const result = await setItemRelations(itemId, kind, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
        },
    })
}

export const useSetItemSpecs = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: SpecsIn }) => {
            const result = await setItemSpecs(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
        },
    })
}

export const useSetItemAttributes = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ itemId, body }: { itemId: string; body: ProductAttributesIn }) => {
            const result = await setItemAttributes(itemId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { itemId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.items.detail(itemId) })
        },
    })
}

// ===================== BUNDLES =====================

export const useListBundles = (params?: ListBundlesParams, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.bundles.list(params),
        enabled,
        queryFn: async () => {
            const result = await listBundles(params)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useGetBundle = (bundleId: string, enabled = true) => {
    return useQuery({
        queryKey: catalogKeys.bundles.detail(bundleId),
        enabled: enabled && Boolean(bundleId),
        queryFn: async () => {
            const result = await getBundle(bundleId)
            if (!result.success) throw result.error
            return result.data
        },
    })
}

export const useCreateBundle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (body: BundleCreateIn) => {
            const result = await createBundle(body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.all() })
        },
    })
}

export const useUpdateBundle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ bundleId, body }: { bundleId: string; body: BundleUpdateIn }) => {
            const result = await updateBundle(bundleId, body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, { bundleId }) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.detail(bundleId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.lists() })
        },
    })
}

export const useDeleteBundle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (bundleId: string) => {
            const result = await deleteBundle(bundleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.all() })
        },
    })
}

export const usePublishBundle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (bundleId: string) => {
            const result = await publishBundle(bundleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, bundleId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.detail(bundleId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.lists() })
        },
    })
}

export const useRetireBundle = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (bundleId: string) => {
            const result = await retireBundle(bundleId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: (_, bundleId) => {
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.detail(bundleId) })
            queryClient.invalidateQueries({ queryKey: catalogKeys.bundles.lists() })
        },
    })
}

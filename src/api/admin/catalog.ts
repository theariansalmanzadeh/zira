import type { AxiosRequestConfig } from 'axios'

import {
    staffAuthDelete,
    staffAuthGet,
    staffAuthGetBlob,
    staffAuthPatch,
    staffAuthPost,
    staffAuthPut,
} from '../http'
import type {
    AttributeIn,
    AttributeOut,
    AttributeUpdateIn,
    AttributeValueOut,
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
    CategoryNodeOut,
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
    ItemBriefOut,
    ItemCreateIn,
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
} from '../types/admin/catalog'

const toParams = <T extends object>(params?: T) =>
    params
        ? Object.fromEntries(
              Object.entries(params).filter(
                  ([, value]) => value !== undefined && value !== null
              )
          )
        : undefined

const multipartConfig = (
    config?: AxiosRequestConfig
): AxiosRequestConfig => ({
    ...config,
    headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
    },
})

/**
 * List Categories Endpoint
 */
export const listCategories = (
    params?: ListCategoriesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<Array<CategoryNodeOut>>(`/catalog/categories`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Category Endpoint
 */
export const createCategory = (
    body: CategoryIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CategoryOut, CategoryIn>(`/catalog/categories`, body, config)

/**
 * Get Category Endpoint
 */
export const getCategory = (
    category_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CategoryOut>(`/catalog/categories/${category_id}`, config)

/**
 * Update Category Endpoint
 */
export const updateCategory = (
    category_id: string,
    body: CategoryUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CategoryOut, CategoryUpdateIn>(`/catalog/categories/${category_id}`, body, config)

/**
 * Delete Category Endpoint
 */
export const deleteCategory = (
    category_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/categories/${category_id}`, undefined, config)

/**
 * Rename Category Endpoint
 */
export const renameCategory = (
    category_id: string,
    body: CategoryRenameIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CategoryOut, CategoryRenameIn>(`/catalog/categories/${category_id}/rename`, body, config)

/**
 * Move Category Endpoint
 */
export const moveCategory = (
    category_id: string,
    body: CategoryMoveIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CategoryOut, CategoryMoveIn>(`/catalog/categories/${category_id}/move`, body, config)

/**
 * Deactivate Category Endpoint
 */
export const deactivateCategory = (
    category_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CategoryOut>(`/catalog/categories/${category_id}/deactivate`, undefined, config)

/**
 * List Brands Endpoint
 */
export const listBrands = (
    params?: ListBrandsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BrandOut_>(`/catalog/brands`, {
        ...config,
        params: toParams(params),
    })

const toBrandFormData = (body: BrandIn) => {
    const formData = new FormData()
    formData.append('name', body.name)
    formData.append('latin_name', body.latin_name)
    formData.append('scope', body.scope)
    formData.append('country', body.country)
    formData.append('origin', body.origin)
    formData.append('status', body.status)
    formData.append('website', body.website)
    formData.append('description', body.description)
    if (body.logo) formData.append('logo', body.logo)
    return formData
}

const toBrandJson = ({ logo: _logo, ...body }: BrandIn) => body

/**
 * Create Brand Endpoint
 */
export const createBrand = (
    body: BrandIn,
    config?: AxiosRequestConfig
) =>
    body.logo
        ? staffAuthPost<BrandOut, FormData>(
              `/catalog/brands`,
              toBrandFormData(body),
              multipartConfig(config)
          )
        : staffAuthPost<BrandOut, Omit<BrandIn, 'logo'>>(
              `/catalog/brands`,
              toBrandJson(body),
              config
          )

/**
 * Get Brand Endpoint
 */
export const getBrand = (brand_id: string, config?: AxiosRequestConfig) =>
    staffAuthGet<BrandOut>(`/catalog/brands/${brand_id}`, config)

/**
 * Update Brand Endpoint
 */
export const updateBrand = (
    brand_id: string,
    body: BrandUpdateIn,
    config?: AxiosRequestConfig
) =>
    body.logo
        ? staffAuthPatch<BrandOut, FormData>(
              `/catalog/brands/${brand_id}`,
              toBrandFormData(body),
              multipartConfig(config)
          )
        : staffAuthPatch<BrandOut, Omit<BrandUpdateIn, 'logo'>>(
              `/catalog/brands/${brand_id}`,
              toBrandJson(body),
              config
          )

/**
 * Delete Brand Endpoint
 */
export const deleteBrand = (
    brand_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/brands/${brand_id}`, undefined, config)

/**
 * Deactivate Brand Endpoint
 */
export const deactivateBrand = (
    brand_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BrandOut>(`/catalog/brands/${brand_id}/deactivate`, undefined, config)

/**
 * List Model Lines Endpoint
 */
export const listModelLines = (
    brand_id: string,
    params?: ListModelLinesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ModelLineOut_>(`/catalog/brands/${brand_id}/model-lines`, {
        ...config,
        params: toParams(params),
    })

/**
 * List Attributes Endpoint
 */
export const listAttributes = (
    params?: ListAttributesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_AttributeOut_>(`/catalog/attributes`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Attribute Endpoint
 */
export const createAttribute = (
    body: AttributeIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<AttributeOut, AttributeIn>(`/catalog/attributes`, body, config)

/**
 * Get Attribute Endpoint
 */
export const getAttribute = (
    attribute_id: string,
    params?: Pick<ListAttributesParams, 'page' | 'page_size'>,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_AttributeOut_>(`/catalog/attributes/${attribute_id}`, {
        ...config,
        params: toParams(params),
    })

/**
 * Update Attribute Endpoint
 */
export const updateAttribute = (
    attribute_id: string,
    body: AttributeUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<AttributeOut, AttributeUpdateIn>(`/catalog/attributes/${attribute_id}`, body, config)

/**
 * Delete Attribute Endpoint
 */
export const deleteAttribute = (
    attribute_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/attributes/${attribute_id}`, undefined, config)

/**
 * Save Attribute Values Endpoint
 */
export const saveAttributeValues = (
    attribute_id: string,
    body: AttributeValuesIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<void, AttributeValuesIn>(`/catalog/attributes/${attribute_id}/values`, body, config)

/**
 * Deactivate Attribute Endpoint
 */
export const deactivateAttribute = (
    attribute_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<AttributeOut>(`/catalog/attributes/${attribute_id}/deactivate`, undefined, config)

/**
 * List Sizes Endpoint
 */
export const listSizes = (
    params?: ListSizesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_SizeOut_>(`/catalog/sizes`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Size Endpoint
 */
export const createSize = (
    body: SizeIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SizeOut, SizeIn>(`/catalog/sizes`, body, config)

/**
 * Update Size Endpoint
 */
export const updateSize = (
    size_id: string,
    body: SizeUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<SizeOut, SizeUpdateIn>(`/catalog/sizes/${size_id}`, body, config)

/**
 * Delete Size Endpoint
 */
export const deleteSize = (
    size_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/sizes/${size_id}`, undefined, config)

/**
 * List Colors Endpoint
 */
export const listColors = (
    params?: ListColorsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ColorOut_>(`/catalog/colors`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Color Endpoint
 */
export const createColor = (
    body: ColorIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ColorOut, ColorIn>(`/catalog/colors`, body, config)

/**
 * Update Color Endpoint
 */
export const updateColor = (
    color_id: string,
    body: ColorUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ColorOut, ColorUpdateIn>(`/catalog/colors/${color_id}`, body, config)

/**
 * Delete Color Endpoint
 */
export const deleteColor = (
    color_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/colors/${color_id}`, undefined, config)

/**
 * List Materials Endpoint
 */
export const listMaterials = (
    params?: ListMaterialsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_MaterialOut_>(`/catalog/materials`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Material Endpoint
 */
export const createMaterial = (
    body: MaterialIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<MaterialOut, MaterialIn>(`/catalog/materials`, body, config)

/**
 * Update Material Endpoint
 */
export const updateMaterial = (
    material_id: string,
    body: MaterialUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<MaterialOut, MaterialUpdateIn>(`/catalog/materials/${material_id}`, body, config)

/**
 * Delete Material Endpoint
 */
export const deleteMaterial = (
    material_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/materials/${material_id}`, undefined, config)

/**
 * List Seasons Endpoint
 */
export const listSeasons = (
    params?: ListSeasonsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_SeasonOut_>(`/catalog/seasons`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Season Endpoint
 */
export const createSeason = (
    body: SeasonIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SeasonOut, SeasonIn>(`/catalog/seasons`, body, config)

/**
 * Update Season Endpoint
 */
export const updateSeason = (
    season_id: string,
    body: SeasonUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<SeasonOut, SeasonUpdateIn>(`/catalog/seasons/${season_id}`, body, config)

/**
 * Delete Season Endpoint
 */
export const deleteSeason = (
    season_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/seasons/${season_id}`, undefined, config)

/**
 * List Labels Endpoint
 */
export const listLabels = (
    params?: ListLabelsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_LabelOut_>(`/catalog/labels`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Label Endpoint
 */
export const createLabel = (
    body: LabelIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<LabelOut, LabelIn>(`/catalog/labels`, body, config)

/**
 * Update Label Endpoint
 */
export const updateLabel = (
    label_id: string,
    body: LabelUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<LabelOut, LabelUpdateIn>(`/catalog/labels/${label_id}`, body, config)

/**
 * Delete Label Endpoint
 */
export const deleteLabel = (
    label_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/labels/${label_id}`, undefined, config)

/**
 * List Size Sets Endpoint
 */
export const listSizeSets = (
    params?: ListSizeSetsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_SizeSetOut_>(`/catalog/size-sets`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Size Set Endpoint
 */
export const createSizeSet = (
    body: SizeSetIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<SizeSetOut, SizeSetIn>(`/catalog/size-sets`, body, config)

/**
 * Update Size Set Endpoint
 */
export const updateSizeSet = (
    set_id: string,
    body: SizeSetUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<SizeSetOut, SizeSetUpdateIn>(`/catalog/size-sets/${set_id}`, body, config)

/**
 * List Color Sets Endpoint
 */
export const listColorSets = (
    params?: ListColorSetsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ColorSetOut_>(`/catalog/color-sets`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Color Set Endpoint
 */
export const createColorSet = (
    body: ColorSetIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ColorSetOut, ColorSetIn>(`/catalog/color-sets`, body, config)

/**
 * Update Color Set Endpoint
 */
export const updateColorSet = (
    set_id: string,
    body: ColorSetUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ColorSetOut, ColorSetUpdateIn>(`/catalog/color-sets/${set_id}`, body, config)

/**
 * List Products Endpoint
 */
export const listProducts = (
    params?: ListProductsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ProductListOut_>(`/catalog/products`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Product Endpoint
 */
export const createProduct = (
    body: ProductCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ProductDetailOut, ProductCreateIn>(`/catalog/products`, body, config)

/**
 * Export Products Endpoint
 */
export const exportProducts = (
    params?: ExportProductsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/catalog/products/export`, {
        ...config,
        params: toParams(params),
    })

/**
 * Get Product Endpoint
 */
export const getProduct = (
    product_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ProductDetailOut>(`/catalog/products/${product_id}`, config)

/**
 * Update Product Endpoint
 */
export const updateProduct = (
    product_id: string,
    body: ProductUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ProductDetailOut, ProductUpdateIn>(`/catalog/products/${product_id}`, body, config)

/**
 * Delete Product Endpoint
 */
export const deleteProduct = (
    product_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/products/${product_id}`, undefined, config)

/**
 * Set Item Images Endpoint
 */
export const setItemImages = (
    item_id: string,
    body: SetItemImagesPayload,
    config?: AxiosRequestConfig
) =>
    {
        const formData = new FormData()
        formData.append('rows', body.rows)
        if (body.files && body.files.length > 0) {
            body.files.forEach((file) => formData.append('files', file))
        }
        return staffAuthPut<ItemDetailOut, FormData>(
            `/catalog/items/${item_id}/images`,
            formData,
            multipartConfig(config)
        )
    }

/**
 * Create Pack Endpoint
 */
export const createPack = (
    product_id: string,
    body: PackCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ItemDetailOut, PackCreateIn>(`/catalog/products/${product_id}/packs`, body, config)

/**
 * Add Product Cells Endpoint
 */
export const addProductCells = (
    product_id: string,
    body: ProductCellsIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<void, ProductCellsIn>(`/catalog/products/${product_id}/cells`, body, config)

/**
 * Set Product Attributes Endpoint
 */
export const setProductAttributes = (
    product_id: string,
    body: ProductAttributesIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ProductDetailOut, ProductAttributesIn>(`/catalog/products/${product_id}/attributes`, body, config)

/**
 * Activate Product Endpoint
 */
export const activateProduct = (
    product_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ProductDetailOut>(`/catalog/products/${product_id}/activate`, undefined, config)

/**
 * Archive Product Endpoint
 */
export const archiveProduct = (
    product_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<ProductDetailOut>(`/catalog/products/${product_id}/archive`, undefined, config)

/**
 * Restore Product Endpoint
 */
export const restoreProduct = (
    product_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ProductDetailOut>(`/catalog/products/${product_id}/restore`, undefined, config)

/**
 * List Drafts Endpoint
 */
export const listDrafts = (
    params?: ListProductDraftsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_DraftListOut_>(`/catalog/product-drafts`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Draft Endpoint
 */
export const createDraft = (
    body: DraftIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<DraftOut, DraftIn>(`/catalog/product-drafts`, body, config)

/**
 * Get Draft Endpoint
 */
export const getDraft = (
    draft_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<DraftOut>(`/catalog/product-drafts/${draft_id}`, config)

/**
 * Update Draft Endpoint
 */
export const updateDraft = (
    draft_id: string,
    body: DraftIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<DraftOut, DraftIn>(`/catalog/product-drafts/${draft_id}`, body, config)

/**
 * Discard Draft Endpoint
 */
export const discardDraft = (
    draft_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<void>(`/catalog/product-drafts/${draft_id}/discard`, undefined, config)

/**
 * List Items Endpoint
 */
export const listItems = (
    params?: ListItemsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ItemListOut_>(`/catalog/items`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Item Endpoint
 */
export const createItem = (
    body: ItemCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ItemDetailOut, ItemCreateIn>(`/catalog/items`, body, config)

/**
 * Export Items Endpoint
 */
export const exportItems = (
    params?: ExportItemsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/catalog/items/export`, {
        ...config,
        params: toParams(params),
    })

/**
 * Lookup Item By Barcode Endpoint
 */
export const lookupItemByBarcode = (
    params?: LookupItemParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ItemListOut>(`/catalog/items/lookup`, {
        ...config,
        params: toParams(params),
    })

/**
 * Get Item Endpoint
 */
export const getItem = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ItemDetailOut>(`/catalog/items/${item_id}`, config)

/**
 * Update Item Endpoint
 */
export const updateItem = (
    item_id: string,
    body: ItemUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemDetailOut, ItemUpdateIn>(`/catalog/items/${item_id}`, body, config)

/**
 * Delete Item Endpoint
 */
export const deleteItem = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/items/${item_id}`, undefined, config)

/**
 * Set Item Visibility Endpoint
 */
export const setItemVisibility = (
    item_id: string,
    body: VisibilityIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemDetailOut, VisibilityIn>(`/catalog/items/${item_id}/visibility`, body, config)

/**
 * Assign Barcode Endpoint
 */
export const assignBarcode = (
    item_id: string,
    body: BarcodeIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemDetailOut, BarcodeIn>(`/catalog/items/${item_id}/barcode`, body, config)

/**
 * Activate Item Endpoint
 */
export const activateItem = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemDetailOut>(`/catalog/items/${item_id}/activate`, undefined, config)

/**
 * Hide Item Endpoint
 */
export const hideItem = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemDetailOut>(`/catalog/items/${item_id}/hide`, undefined, config)

/**
 * Archive Item Endpoint
 */
export const archiveItem = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<ItemDetailOut>(`/catalog/items/${item_id}/archive`, undefined, config)

/**
 * Restore Item Endpoint
 */
export const restoreItem = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemDetailOut>(`/catalog/items/${item_id}/restore`, undefined, config)

/**
 * Get Item Policy Endpoint
 */
export const getItemPolicy = (
    item_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ItemPolicyOut>(`/catalog/items/${item_id}/policy`, config)

/**
 * Set Item Policy Endpoint
 */
export const setItemPolicy = (
    item_id: string,
    body: ItemPolicyIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ItemPolicyOut, ItemPolicyIn>(`/catalog/items/${item_id}/policy`, body, config)

/**
 * Set Item Relations Endpoint
 */
export const setItemRelations = (
    item_id: string,
    kind: string,
    body: RelationsIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ItemDetailOut, RelationsIn>(`/catalog/items/${item_id}/relations/${kind}`, body, config)

/**
 * Set Item Specs Endpoint
 */
export const setItemSpecs = (
    item_id: string,
    body: SpecsIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ItemDetailOut, SpecsIn>(`/catalog/items/${item_id}/specs`, body, config)

/**
 * Set Item Attributes Endpoint
 */
export const setItemAttributes = (
    item_id: string,
    body: ProductAttributesIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ItemDetailOut, ProductAttributesIn>(`/catalog/items/${item_id}/attributes`, body, config)

/**
 * List Bundles Endpoint
 */
export const listBundles = (
    params?: ListBundlesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BundleListOut_>(`/catalog/bundles`, {
        ...config,
        params: toParams(params),
    })

/**
 * Create Bundle Endpoint
 */
export const createBundle = (
    body: BundleCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<BundleDetailOut, BundleCreateIn>(`/catalog/bundles`, body, config)

/**
 * Get Bundle Endpoint
 */
export const getBundle = (
    bundle_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<BundleDetailOut>(`/catalog/bundles/${bundle_id}`, config)

/**
 * Update Bundle Endpoint
 */
export const updateBundle = (
    bundle_id: string,
    body: BundleUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BundleDetailOut, BundleUpdateIn>(`/catalog/bundles/${bundle_id}`, body, config)

/**
 * Delete Bundle Endpoint
 */
export const deleteBundle = (
    bundle_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<void>(`/catalog/bundles/${bundle_id}`, undefined, config)

/**
 * Publish Bundle Endpoint
 */
export const publishBundle = (
    bundle_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BundleDetailOut>(`/catalog/bundles/${bundle_id}/publish`, undefined, config)

/**
 * Retire Bundle Endpoint
 */
export const retireBundle = (
    bundle_id: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BundleDetailOut>(`/catalog/bundles/${bundle_id}/retire`, undefined, config)


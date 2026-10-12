/**
 * Generated Catalog API Types based on OpenAPI specification
 */

export type PaginationOut<T> = {
  items: Array<T>;
  page: number;
  page_size: number;
  total: number;
  pages: number;
};

export type AttributeIn = {
  code: string;
  name: string;
  /** نوع صفت */
  kind?: AttributeKind;
  /** نقش صفت */
  role?: AttributeRole;
  /** کنترل ورودی صفت */
  input_control?: AttributeInputControl;
  hint?: string;
  is_active?: boolean;
  is_required?: boolean;
  is_filterable?: boolean;
  show_in_public?: boolean;
  sort_order?: number;
  values?: Array<AttributeValueIn> | null;
};

export type AttributeInputControl =
  | 'CHIP_SINGLE'
  | 'CHIP_MULTI'
  | 'DROPDOWN'
  | 'SWATCH'
  | 'TEXT_SUGGEST'
  | 'NUMBER'
  | 'AUTO';

export type AttributeKind =
  | 'SELECT'
  | 'SWATCH'
  | 'MULTI'
  | 'TEXT_SUGGEST'
  | 'NUMBER'
  | 'BOOL'
  | 'COMPUTED';

export type AttributeOut = {
  id: string;
  code: string;
  name: string;
  /** نوع صفت */
  kind: AttributeKind;
  /** نقش صفت */
  role: AttributeRole;
  /** کنترل ورودی صفت */
  input_control: AttributeInputControl;
  hint: string;
  is_active: boolean;
  is_required: boolean;
  is_filterable: boolean;
  show_in_public: boolean;
  sort_order: number;
  values?: Array<AttributeValueOut>;
};

export type AttributeRole =
  | 'VARIANT'
  | 'COMMON'
  | 'ITEM'
  | 'DESCRIPTIVE'
  | 'SYSTEM';

export type AttributeRowIn = {
  attribute_id: string;
  value_id?: string | null;
  value_text?: string | null;
  value_number?: number | string | null;
  value_bool?: boolean | null;
};

export type AttributeRowOut = {
  attribute_id: string;
  attribute_code: string;
  attribute_name: string;
  value_id?: string | null;
  value?: string | null;
  value_text?: string;
  value_number?: string | null;
  value_bool?: boolean | null;
};

export type AttributeUpdateIn = {
  name?: string | null;
  /** نقش صفت */
  role?: AttributeRole | null;
  /** کنترل ورودی صفت */
  input_control?: AttributeInputControl | null;
  hint?: string | null;
  is_active?: boolean | null;
  is_required?: boolean | null;
  is_filterable?: boolean | null;
  show_in_public?: boolean | null;
  sort_order?: number | null;
};

export type AttributeValueIn = {
  value?: string;
  hex_code?: string | null;
  sort_order?: number;
};

export type AttributeValueOut = {
  id: string;
  value: string;
  hex_code?: string | null;
  sort_order: number;
};

export type AttributeValuesIn = {
  values: Array<AttributeValueIn>;
};

export type BarcodeIn = {
  value?: string | null;
};

export type BrandIn = {
  name: string;
  latin_name?: string;
  scope?: string;
  country?: string;
  /** مبدا برند: DOMESTIC (داخلی)، IMPORTED (وارداتی)، LICENSED (تحت لیسانس) */
  origin?: BrandOrigin;
  /** وضعیت برند: ACTIVE (فعال)، DRAFT (پیش‌نویس)، INACTIVE (غیرفعال) */
  status?: BrandStatus;
  website?: string;
  description?: string;
};

export type BrandOrigin =
  | 'DOMESTIC'
  | 'IMPORTED'
  | 'LICENSED';

export type BrandHistoryOut = {
  year: string;
  title: string;
  description: string;
  sort_order: number;
};

export type BrandOut = {
  id: string;
  name: string;
  logo_url: string;
  tagline: string;
  intro: string;
  is_main: boolean;
  catalog_brand_id: string;
  sort_order: number;
  status: BrandStatus;
  status_display: string;
  history: BrandHistoryOut[];
  updated_at: string;
};

export type BrandStatus =
  | 'ACTIVE'
  | 'DRAFT'
  | 'INACTIVE';

export type BrandUpdateIn = {
  name?: string | null;
  latin_name?: string | null;
  scope?: string | null;
  country?: string | null;
  /** مبدا برند */
  origin?: BrandOrigin | null;
  /** وضعیت برند */
  status?: BrandStatus | null;
  website?: string | null;
  description?: string | null;
};

export type BundleCreateIn = {
  name: string;
  description?: string;
  /** سیاست باندل: SLOW_WITH_FAST, GIFT_PACK, SEASON_CLEARANCE, BASKET_BOOST */
  policy: BundlePolicy;
  lines: Array<BundleLineIn>;
};

export type BundleDetailOut = {
  id: string;
  code: string;
  name: string;
  /** سیاست باندل */
  policy: BundlePolicy;
  is_active: boolean;
  published_at?: string | null;
  line_count?: number;
  total_qty?: string;
  created_at: string;
  updated_at: string;
  description: string;
  lines: Array<BundleLineOut>;
  is_available: boolean;
};

export type BundleLineIn = {
  id?: string;
  item_id: string;
  quantity: number;
};

export type BundleLineOut = {
  id: string;
  item_id: string;
  item_code: string;
  item_name: string;
  /** وضعیت کالا */
  item_status: ItemStatus;
  size_code?: string | null;
  color_code?: string | null;
  is_pack: boolean;
  quantity: string;
};

export type BundleListOut = {
  id: string;
  code: string;
  name: string;
  /** سیاست باندل */
  policy: BundlePolicy;
  price: string;
  is_active: boolean;
  published_at?: string | null;
  line_count: number;
  total_qty: string;
  created_at: string;
  updated_at: string;
};

export type BundlePolicy =
  | 'SLOW_WITH_FAST'
  | 'GIFT_PACK'
  | 'SEASON_CLEARANCE'
  | 'BASKET_BOOST';

export type BundleUpdateIn = {
  name?: string | null;
  description?: string | null;
  /** سیاست باندل */
  policy?: BundlePolicy | null;
  lines?: Array<BundleLineIn> | null;
};

export type CategoryIn = {
  name: string;
  parent_id?: string | null;
  code?: string | null;
  sort_order?: number;
  is_visible?: boolean;
  description?: string;
};

export type CategoryMoveIn = {
  parent_id?: string | null;
};

export type CategoryNodeOut = {
  id: string;
  slug?: string | null;
  code: string;
  name: string;
  level: number;
  parent_id?: string | null;
  sort_order: number;
  is_active: boolean;
  is_visible: boolean;
  description?: string;
  product_count?: number;
  children?: Array<CategoryNodeOut>;
};

export type CategoryOut = {
  id: string;
  slug?: string | null;
  code: string;
  name: string;
  level: number;
  parent_id?: string | null;
  sort_order: number;
  is_active: boolean;
  is_visible: boolean;
  description: string;
};

export type CategoryRenameIn = {
  name: string;
};

export type CategoryUpdateIn = {
  slug?: string | null;
  code?: string | null;
  sort_order?: number | null;
  is_visible?: boolean | null;
  description?: string | null;
  is_active?: boolean | null;
};

export type CellIn = {
  size_id: string;
  color_id: string;
  base_code?: string;
};

export type ColorIn = {
  code: string;
  name: string;
  hex_code: string;
  is_active?: boolean;
};

export type ColorOut = {
  id: string;
  code: string;
  name: string;
  hex_code: string;
  is_active: boolean;
};

export type ColorSetIn = {
  name: string;
  color_ids: Array<string>;
};

export type ColorSetOut = {
  id: string;
  name: string;
  colors?: Array<ColorOut>;
};

export type ColorSetUpdateIn = {
  name?: string | null;
  color_ids?: Array<string> | null;
};

export type ColorUpdateIn = {
  name?: string | null;
  hex_code?: string | null;
  is_active?: boolean | null;
};

export type ComponentOut = {
  component_id: string;
  code: string;
  display_name: string;
  size_code?: string | null;
  color_code?: string | null;
  quantity: string;
};

export type DraftIn = {
  label: string;
  data?: Record<string, unknown> | null;
};

export type DraftListOut = {
  id: string;
  label: string;
  /** وضعیت پیش‌نویس: OPEN, CONVERTED, DISCARDED */
  status: ProductDraftStatus;
  product_id?: string | null;
  created_by_id: string;
  created_at: string;
  updated_at: string;
};

export type DraftOut = {
  id: string;
  label: string;
  /** وضعیت پیش‌نویس: OPEN, CONVERTED, DISCARDED */
  status: ProductDraftStatus;
  product_id?: string | null;
  created_by_id: string;
  created_at: string;
  updated_at: string;
  data: Record<string, unknown>;
};

export type ImageOut = {
  id: string;
  /** نوع تصویر کالا */
  kind: ItemImageKind;
  url: string;
  sort_order: number;
  is_primary: boolean;
};

export type ItemAudience =
  | 'ALL'
  | 'GROUPS';

export type ItemBarcodeSource =
  | 'GENERATED'
  | 'MANUAL';

export type ItemBriefOut = {
  id: string;
  code: string;
  sku: string;
  display_name: string;
  size_id?: string | null;
  color_id?: string | null;
  grade: number;
  /** وضعیت قلم کالا */
  status: ItemStatus;
  barcode?: string;
};

export type ItemDetailOut = {
  id: string;
  code: string;
  base_code: string;
  sku: string;
  slug: string;
  display_name: string;
  /** مخاطبان هدف */
  audience: ItemAudience;
  /** وضعیت کالا */
  status: ItemStatus;
  product_id: string;
  product_code: string;
  category_name: string;
  brand_name: string;
  size_id?: string | null;
  size_code?: string | null;
  color_id?: string | null;
  color_code?: string | null;
  color_hex?: string | null;
  grade: number;
  unit_id: string;
  pack_size: string;
  /** الگوی تنوع کالا */
  variation_pattern: ItemVariationPattern | string;
  barcode: string;
  created_at: string;
  product_name: string;
  description: string;
  /** منبع بارکد کالا */
  barcode_source: ItemBarcodeSource | string;
  show_in_public: boolean;
  allow_preorder: boolean;
  meta_title: string;
  meta_description: string;
  /** حالت کالاهای مرتبط */
  related_mode: ItemLinkMode;
  /** حالت کالاهای مشابه */
  similar_mode: ItemLinkMode;
  labels: Array<LabelOut>;
  seasons: Array<SeasonOut>;
  specs: Array<SpecOut>;
  attribute_values: Array<AttributeRowOut>;
  relations: Array<RelationOut>;
  components: Array<ComponentOut>;
  images: Array<ImageOut>;
  visible_group_ids: Array<string>;
};

export type ItemImageKind =
  | 'DIGIKALA'
  | 'MANNEQUIN'
  | 'HUMAN';

export type ItemLinkMode =
  | 'AUTO'
  | 'MANUAL'
  | 'OFF';

export type ItemListOut = {
  id: string;
  code: string;
  base_code: string;
  sku: string;
  slug?: string;
  display_name: string;
  /** مخاطبان هدف */
  audience: ItemAudience;
  /** وضعیت کالا */
  status: ItemStatus;
  product_id: string;
  product_code: string;
  category_name: string;
  brand_name: string;
  size_id?: string | null;
  size_code?: string | null;
  color_id?: string | null;
  color_code?: string | null;
  color_hex?: string | null;
  grade: number;
  unit_id: string;
  pack_size: string;
  /** الگوی تنوع کالا */
  variation_pattern: ItemVariationPattern | string;
  barcode: string;
  created_at: string;
};

export type ItemPolicyIn = {
  min_order_qty?: number | string | null;
  max_order_qty?: number | string | null;
  max_preorder_qty?: number | string | null;
  max_stock_cap?: number | string | null;
  reorder_threshold?: number | string | null;
  sales_target?: number | string | null;
  target_deadline?: string | null;
};

export type ItemPolicyOut = {
  item_id: string;
  min_order_qty: string;
  max_order_qty?: string | null;
  max_preorder_qty?: string | null;
  max_stock_cap?: string | null;
  reorder_threshold?: string | null;
  sales_target?: string | null;
  target_deadline?: string | null;
  updated_at: string;
};

export type ItemRelationKind =
  | 'RELATED'
  | 'SIMILAR';

export type ItemStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'HIDDEN'
  | 'ARCHIVED';

export type ItemUpdateIn = {
  display_name?: string | null;
  description?: string | null;
  slug?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
  show_in_public?: boolean | null;
  allow_preorder?: boolean | null;
  related_mode?: ItemLinkMode | null;
  similar_mode?: ItemLinkMode | null;
  label_ids?: Array<string> | null;
  season_ids?: Array<string> | null;
  base_code?: string | null;
};

export type ItemVariationPattern =
  | 'FIXED_COLOR'
  | 'FIXED_SIZE'
  | 'FREE'
  | 'STANDARD'
  | 'SIZE_ONLY'
  | 'COLOR_ONLY';

export type LabelIn = {
  name: string;
  is_active?: boolean;
};

export type LabelOut = {
  id: string;
  name: string;
  is_active: boolean;
};

export type LabelUpdateIn = {
  name?: string | null;
  is_active?: boolean | null;
};

export type MaterialIn = {
  name: string;
  is_active?: boolean;
};

export type MaterialOut = {
  id: string;
  name: string;
  is_active: boolean;
};

export type MaterialUpdateIn = {
  name?: string | null;
  is_active?: boolean | null;
};

export type ModelLineOut = {
  id: string;
  name: string;
  is_active: boolean;
};

export type PackComponentIn = {
  item_id: string;
  quantity: number;
};

export type PackCreateIn = {
  /** الگوی تنوع بسته */
  variation_pattern: ItemVariationPattern;
  unit_id: string;
  components: Array<PackComponentIn>;
  display_name?: string | null;
  base_code?: string | null;
};

export type PaginationOut_AttributeOut_ = PaginationOut<AttributeOut>;

export type PaginationOut_BrandOut_ = PaginationOut<BrandOut>;

export type PaginationOut_BundleListOut_ = PaginationOut<BundleListOut>;

export type PaginationOut_ColorOut_ = PaginationOut<ColorOut>;

export type PaginationOut_ColorSetOut_ = PaginationOut<ColorSetOut>;

export type PaginationOut_DraftListOut_ = PaginationOut<DraftListOut>;

export type PaginationOut_ItemListOut_ = PaginationOut<ItemListOut>;

export type PaginationOut_LabelOut_ = PaginationOut<LabelOut>;

export type PaginationOut_MaterialOut_ = PaginationOut<MaterialOut>;

export type PaginationOut_ModelLineOut_ = PaginationOut<ModelLineOut>;

export type PaginationOut_ProductListOut_ = PaginationOut<ProductListOut>;

export type PaginationOut_SeasonOut_ = PaginationOut<SeasonOut>;

export type PaginationOut_SizeOut_ = PaginationOut<SizeOut>;

export type PaginationOut_SizeSetOut_ = PaginationOut<SizeSetOut>;

export type ProductAttributesIn = {
  values: Array<AttributeRowIn>;
};

export type ProductCellsIn = {
  cells: Array<CellIn>;
};

export type ProductCreateIn = {
  category_id: string;
  brand_id: string;
  material_id: string;
  model_line: string;
  unit_id: string;
  size_ids: Array<string>;
  color_ids: Array<string>;
  cells: Array<CellIn>;
  draft_id?: string | null;
  base_code?: string;
};

export type ProductDetailOut = {
  id: string;
  slug?: string | null;
  code: string;
  base_code: string;
  name: string;
  /** وضعیت محصول */
  status: ProductStatus;
  category_id: string;
  category_name: string;
  brand_id: string;
  brand_name: string;
  material_id: string;
  material_name: string;
  model_line_id: string;
  model_line_name: string;
  size_count?: number;
  color_count?: number;
  item_count?: number;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
  category_path: Array<string>;
  sizes: Array<SizeOut>;
  colors: Array<ColorOut>;
  attribute_values: Array<AttributeRowOut>;
};

export type ProductDraftStatus =
  | 'OPEN'
  | 'CONVERTED'
  | 'DISCARDED';

export type ProductListOut = {
  id: string;
  slug?: string | null;
  code: string;
  base_code: string;
  name: string;
  /** وضعیت محصول */
  status: ProductStatus;
  category_id: string;
  category_name: string;
  brand_id: string;
  brand_name: string;
  material_id: string;
  material_name: string;
  model_line_id: string;
  model_line_name: string;
  size_count: number;
  color_count: number;
  item_count: number;
  is_complete: boolean;
  created_at: string;
  updated_at: string;
};

export type ProductStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'ARCHIVED';

export type ProductUpdateIn = {
  slug?: string | null;
  category_id?: string | null;
  brand_id?: string | null;
  material_id?: string | null;
  model_line?: string | null;
  base_code?: string | null;
};

export type RelationOut = {
  id: string;
  /** نوع ارتباط کالا */
  kind: ItemRelationKind;
  related_item_id: string;
  related_item_code: string;
  related_item_name: string;
};

export type RelationsIn = {
  item_ids: Array<string>;
};

export type SeasonIn = {
  name: string;
  sort_order?: number;
  is_active?: boolean;
};

export type SeasonOut = {
  id: string;
  name: string;
  sort_order: number;
  is_active: boolean;
};

export type SeasonUpdateIn = {
  name?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
};

export type SizeIn = {
  code: string;
  name: string;
  sort_order?: number;
  is_active?: boolean;
};

export type SizeOut = {
  id: string;
  code: string;
  name: string;
  sort_order: number;
  is_active: boolean;
};

export type SizeSetIn = {
  name: string;
  size_ids: Array<string>;
};

export type SizeSetOut = {
  id: string;
  name: string;
  sizes?: Array<SizeOut>;
};

export type SizeSetUpdateIn = {
  name?: string | null;
  size_ids?: Array<string> | null;
};

export type SizeUpdateIn = {
  name?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
};

export type SpecOut = {
  key: string;
  value: string;
  sort_order: number;
};

export type SpecRowIn = {
  key: string;
  value: string;
  sort_order?: number;
};

export type SpecsIn = {
  rows: Array<SpecRowIn>;
};

export type VisibilityIn = {
  audience: 'ALL' | 'GROUPS';
  group_ids?: Array<string>;
};


export type ListCategoriesParams = {
  include_inactive?: boolean;
};

export type ListBrandsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  status?: string;
  origin?: string;
  scope?: string;
};

export type ListModelLinesParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
};

export type ListAttributesParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  role?: AttributeRole;
  kind?: AttributeKind;
  is_active?: boolean;
};

export type ListSizesParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  is_active?: boolean;
};

export type ListColorsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  is_active?: boolean;
};

export type ListMaterialsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  is_active?: boolean;
};

export type ListSeasonsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  is_active?: boolean;
};

export type ListLabelsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  is_active?: boolean;
};

export type ListSizeSetsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
};

export type ListColorSetsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
};

export type ListProductsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  category_id?: string;
  brand_id?: string;
  material_id?: string;
  model_line_id?: string;
  status?: ProductStatus;
  is_complete?: boolean;
};

export type ExportProductsParams = {
  q?: string;
  category_id?: string;
  brand_id?: string;
  material_id?: string;
  model_line_id?: string;
  status?: ProductStatus;
  is_complete?: boolean;
};

export type ListProductDraftsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
};

export type ListItemsParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  product_id?: string;
  category_id?: string;
  brand_id?: string;
  size_id?: string;
  color_id?: string;
  grade?: number;
  status?: 'DRAFT' | 'ACTIVE' | 'HIDDEN' | 'ARCHIVED';
  is_pack?: boolean;
};

export type ExportItemsParams = {
  q?: string;
  product_id?: string;
  category_id?: string;
  brand_id?: string;
  size_id?: string;
  color_id?: string;
  grade?: number;
  status?: 'DRAFT' | 'ACTIVE' | 'HIDDEN' | 'ARCHIVED';
  is_pack?: boolean;
};

export type LookupItemParams = {
  barcode: string;
};

export type ListBundlesParams = {
  page?: number;
  page_size?: number;
  query?: string;
  q?: string;
  search?: string;
  policy?: BundlePolicy;
  is_active?: boolean;
};

export type SetItemImagesPayload = {
  rows: string;
  files?: File[];
};

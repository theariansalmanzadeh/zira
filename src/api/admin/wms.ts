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
    AssignIn,
    AssignWarehouseIn,
    BinDetailOut,
    BinOut,
    Count2ScopeIn,
    CountLinesParams,
    CountOpenIn,
    CountOut,
    CountRecordIn,
    DashboardParams,
    ExportStockParams,
    GradeDecisionIn,
    GradeOut,
    GradeRequestIn,
    ItemLocationOut,
    ItemLocationsParams,
    ItemOpIn,
    ItemOpOut,
    KardexPageOut,
    KardexParams,
    KpiOut,
    LayoutIn,
    LayoutOut,
    ListAssembliesParams,
    ListBinsParams,
    ListBreaksParams,
    ListCountsParams,
    ListGradesParams,
    ListOpeningsParams,
    ListReceiptsParams,
    ListScrapParams,
    ListStockParams,
    ListTransfersParams,
    ListZonesParams,
    LookupListParams,
    LookupOut,
    OpeningIn,
    OpeningOut,
    PaginationOut_BinOut_,
    PaginationOut_CountLineOut_,
    PaginationOut_CountOut_,
    PaginationOut_GradeOut_,
    PaginationOut_ItemLocationOut_,
    PaginationOut_ItemOpOut_,
    PaginationOut_MovementOut_,
    PaginationOut_OpeningOut_,
    PaginationOut_PolicyRowOut_,
    PaginationOut_ReceiptOut_,
    PaginationOut_RelocationOut_,
    PaginationOut_ReservationOut_,
    PaginationOut_ScrapOut_,
    PaginationOut_StockOut_,
    PaginationOut_SummaryRowOut_,
    PaginationOut_TransferOut_,
    PaginationOut_ZoneOut_,
    PoliciesParams,
    PolicyIn,
    PolicyOut,
    PolicyParams,
    ReasonIn,
    ReceiptCountIn,
    ReceiptCreateIn,
    ReceiptOut,
    RelocationIn,
    RelocationOut,
    RelocationsParams,
    ReportExportParams,
    ReportLinesParams,
    ReportSummaryParams,
    ReservationsParams,
    ScrapApproveIn,
    ScrapCreateIn,
    ScrapOut,
    TransferCreateIn,
    TransferOut,
    TransferReceiveIn,
    ZoneIn,
    ZoneOut,
    ZoneUpdateIn,
} from '@/src/api/types/admin/wms'

const toParams = (params?: object) => {
    if (!params) return undefined
    return Object.fromEntries(
        Object.entries(params).filter(
            ([, value]) => value !== undefined && value !== null && value !== ''
        )
    )
}

export const listStock = (
    params?: ListStockParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_StockOut_>(`/wms/stock`, { ...config, params: toParams(params) })

export const exportStock = (
    params?: ExportStockParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/wms/stock/export`, { ...config, params: toParams(params) })

export const dashboard = (
    params?: DashboardParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<KpiOut>(`/wms/stock/dashboard`, { ...config, params: toParams(params) })

export const kardex = (
    params: KardexParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<KardexPageOut>(`/wms/stock/kardex`, { ...config, params: toParams(params) })

export const reservations = (
    params?: ReservationsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ReservationOut_>(`/wms/stock/reservations`, { ...config, params: toParams(params) })

export const policy = (
    params: PolicyParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PolicyOut>(`/wms/stock/policy`, { ...config, params: toParams(params) })

export const setPolicy = (
    body: PolicyIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<PolicyOut, PolicyIn>(`/wms/stock/policy`, body, config)

export const policies = (
    params?: PoliciesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_PolicyRowOut_>(`/wms/stock/policies`, { ...config, params: toParams(params) })

export const lookupList = (
    params?: LookupListParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_StockOut_>(`/wms/stock-lookup`, { ...config, params: toParams(params) })

export const lookup = (
    itemId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<LookupOut>(`/wms/stock-lookup/${itemId}`, config)

export const reportSummary = (
    params?: ReportSummaryParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_SummaryRowOut_>(`/wms/reports/summary`, { ...config, params: toParams(params) })

export const reportLines = (
    params?: ReportLinesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_MovementOut_>(`/wms/reports/lines`, { ...config, params: toParams(params) })

export const reportExport = (
    params?: ReportExportParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/wms/reports/export`, { ...config, params: toParams(params) })

export const listZones = (
    params?: ListZonesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ZoneOut_>(`/wms/zones`, { ...config, params: toParams(params) })

export const createZone = (
    body: ZoneIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ZoneOut, ZoneIn>(`/wms/zones`, body, config)

export const updateZone = (
    zoneId: string,
    body: ZoneUpdateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ZoneOut, ZoneUpdateIn>(`/wms/zones/${zoneId}`, body, config)

export const layout = (
    zoneId: string,
    body: LayoutIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<LayoutOut, LayoutIn>(`/wms/zones/${zoneId}/layout`, body, config)

export const listBins = (
    params?: ListBinsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_BinOut_>(`/wms/bins`, { ...config, params: toParams(params) })

export const binDetail = (
    binId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<BinDetailOut>(`/wms/bins/${binId}`, config)

export const deactivateBin = (
    binId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthDelete<BinOut, unknown>(`/wms/bins/${binId}`, undefined, config)

export const activateBin = (
    binId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<BinOut, unknown>(`/wms/bins/${binId}/activate`, undefined, config)

export const itemLocations = (
    params?: ItemLocationsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ItemLocationOut_>(`/wms/item-locations`, { ...config, params: toParams(params) })

export const assignItem = (
    binId: string,
    itemId: string,
    body: AssignIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ItemLocationOut, AssignIn>(`/wms/bins/${binId}/items/${itemId}`, body, config)

export const removeItem = (
    locationId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<unknown, unknown>(`/wms/item-locations/${locationId}/remove`, undefined, config)

export const relocations = (
    params?: RelocationsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_RelocationOut_>(`/wms/relocations`, { ...config, params: toParams(params) })

export const relocate = (
    body: RelocationIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<RelocationOut, RelocationIn>(`/wms/relocations`, body, config)

export const listOpenings = (
    params?: ListOpeningsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_OpeningOut_>(`/wms/openings`, { ...config, params: toParams(params) })

export const postOpening = (
    body: OpeningIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<OpeningOut, OpeningIn>(`/wms/openings`, body, config)

export const openingDetail = (
    openingId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<OpeningOut>(`/wms/openings/${openingId}`, config)

export const listReceipts = (
    params?: ListReceiptsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ReceiptOut_>(`/wms/receipts`, { ...config, params: toParams(params) })

export const createReceipt = (
    body: ReceiptCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ReceiptOut, ReceiptCreateIn>(`/wms/receipts`, body, config)

export const receiptDetail = (
    receiptId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ReceiptOut>(`/wms/receipts/${receiptId}`, config)

export const assignWarehouse = (
    receiptId: string,
    body: AssignWarehouseIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ReceiptOut, AssignWarehouseIn>(`/wms/receipts/${receiptId}/warehouse`, body, config)

export const recordCount = (
    receiptId: string,
    body: ReceiptCountIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ReceiptOut, ReceiptCountIn>(`/wms/receipts/${receiptId}/count`, body, config)

export const keeperReturn = (
    receiptId: string,
    body: ReasonIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<ReceiptOut, ReasonIn>(`/wms/receipts/${receiptId}/return`, body, config)

export const managerReturn = (
    receiptId: string,
    body: ReasonIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ReceiptOut, ReasonIn>(`/wms/receipts/${receiptId}/final-return`, body, config)

export const recount = (
    receiptId: string,
    body: ReasonIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ReceiptOut, ReasonIn>(`/wms/receipts/${receiptId}/recount`, body, config)

export const postReceipt = (
    receiptId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ReceiptOut, unknown>(`/wms/receipts/${receiptId}/post`, undefined, config)

export const receiptImage = (
    receiptId: string,
    body: FormData,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<ReceiptOut, FormData>(`/wms/receipts/${receiptId}/image`, body, config)

export const receiptImageDownload = (
    receiptId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/wms/receipts/${receiptId}/image`, config)

export const listTransfers = (
    params?: ListTransfersParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_TransferOut_>(`/wms/transfers`, { ...config, params: toParams(params) })

export const createTransfer = (
    body: TransferCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<TransferOut, TransferCreateIn>(`/wms/transfers`, body, config)

export const transferDetail = (
    transferId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<TransferOut>(`/wms/transfers/${transferId}`, config)

export const approveTransfer = (
    transferId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<TransferOut, unknown>(`/wms/transfers/${transferId}/approve`, undefined, config)

export const dispatch = (
    transferId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<TransferOut, unknown>(`/wms/transfers/${transferId}/dispatch`, undefined, config)

export const receive = (
    transferId: string,
    body: TransferReceiveIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<TransferOut, TransferReceiveIn>(`/wms/transfers/${transferId}/receive`, body, config)

export const rejectTransfer = (
    transferId: string,
    body: ReasonIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<TransferOut, ReasonIn>(`/wms/transfers/${transferId}/reject`, body, config)

export const cancelTransfer = (
    transferId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<TransferOut, unknown>(`/wms/transfers/${transferId}/cancel`, undefined, config)

export const transferImage = (
    transferId: string,
    body: FormData,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<TransferOut, FormData>(`/wms/transfers/${transferId}/receipt-image`, body, config)

export const transferImageDownload = (
    transferId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/wms/transfers/${transferId}/receipt-image`, config)

export const listScrap = (
    params?: ListScrapParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ScrapOut_>(`/wms/scrap`, { ...config, params: toParams(params) })

export const createScrap = (
    body: ScrapCreateIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ScrapOut, ScrapCreateIn>(`/wms/scrap`, body, config)

export const scrapDetail = (
    scrapId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ScrapOut>(`/wms/scrap/${scrapId}`, config)

export const approveScrap = (
    scrapId: string,
    body: ScrapApproveIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ScrapOut, ScrapApproveIn>(`/wms/scrap/${scrapId}/approve`, body, config)

export const rejectScrap = (
    scrapId: string,
    body: ReasonIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ScrapOut, ReasonIn>(`/wms/scrap/${scrapId}/reject`, body, config)

export const scrapImage = (
    scrapId: string,
    lineId: string,
    body: FormData,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ScrapOut, FormData>(`/wms/scrap/${scrapId}/lines/${lineId}/image`, body, config)

export const scrapImageDownload = (
    scrapId: string,
    lineId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/wms/scrap/${scrapId}/lines/${lineId}/image`, config)

export const listCounts = (
    params?: ListCountsParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_CountOut_>(`/wms/counts`, { ...config, params: toParams(params) })

export const openCounts = (
    body: CountOpenIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CountOut[], CountOpenIn>(`/wms/counts`, body, config)

export const countDetail = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<CountOut>(`/wms/counts/${countId}`, config)

export const countLines = (
    countId: string,
    params?: CountLinesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_CountLineOut_>(`/wms/counts/${countId}/lines`, { ...config, params: toParams(params) })

export const startCount = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CountOut, unknown>(`/wms/counts/${countId}/start`, undefined, config)

export const recordCounts = (
    countId: string,
    body: CountRecordIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CountOut, CountRecordIn>(`/wms/counts/${countId}/counts`, body, config)

export const submitCount1 = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CountOut, unknown>(`/wms/counts/${countId}/submit-count-1`, undefined, config)

export const varianceRecount = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CountOut, unknown>(`/wms/counts/${countId}/variance-recount`, undefined, config)

export const initialApproval = (
    countId: string,
    body: Count2ScopeIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CountOut, Count2ScopeIn>(`/wms/counts/${countId}/initial-approval`, body, config)

export const submitCount2 = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CountOut, unknown>(`/wms/counts/${countId}/submit-count-2`, undefined, config)

export const finalRecount = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CountOut, unknown>(`/wms/counts/${countId}/final-recount`, undefined, config)

export const finalApproval = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<CountOut, unknown>(`/wms/counts/${countId}/final-approval`, undefined, config)

export const cancelCount = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthPatch<CountOut, unknown>(`/wms/counts/${countId}/cancel`, undefined, config)

export const countMinutes = (
    countId: string,
    body: FormData,
    config?: AxiosRequestConfig
) =>
    staffAuthPut<CountOut, FormData>(`/wms/counts/${countId}/minutes`, body, config)

export const countMinutesDownload = (
    countId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGetBlob(`/wms/counts/${countId}/minutes`, config)

export const listBreaks = (
    params?: ListBreaksParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ItemOpOut_>(`/wms/item-breaks`, { ...config, params: toParams(params) })

export const createBreak = (
    body: ItemOpIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ItemOpOut, ItemOpIn>(`/wms/item-breaks`, body, config)

export const breakDetail = (
    breakId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ItemOpOut>(`/wms/item-breaks/${breakId}`, config)

export const listAssemblies = (
    params?: ListAssembliesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_ItemOpOut_>(`/wms/item-assemblies`, { ...config, params: toParams(params) })

export const assemble = (
    body: ItemOpIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<ItemOpOut, ItemOpIn>(`/wms/item-assemblies`, body, config)

export const assemblyDetail = (
    assemblyId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<ItemOpOut>(`/wms/item-assemblies/${assemblyId}`, config)

export const listGrades = (
    params?: ListGradesParams,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<PaginationOut_GradeOut_>(`/wms/grade-changes`, { ...config, params: toParams(params) })

export const requestGrade = (
    body: GradeRequestIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<GradeOut, GradeRequestIn>(`/wms/grade-changes`, body, config)

export const gradeDetail = (
    requestId: string,
    config?: AxiosRequestConfig
) =>
    staffAuthGet<GradeOut>(`/wms/grade-changes/${requestId}`, config)

export const approveGrade = (
    requestId: string,
    body: GradeDecisionIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<GradeOut, GradeDecisionIn>(`/wms/grade-changes/${requestId}/approve`, body, config)

export const rejectGrade = (
    requestId: string,
    body: GradeDecisionIn,
    config?: AxiosRequestConfig
) =>
    staffAuthPost<GradeOut, GradeDecisionIn>(`/wms/grade-changes/${requestId}/reject`, body, config)


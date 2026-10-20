'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
    activateBin,
    approveGrade,
    approveScrap,
    approveTransfer,
    assemble,
    assemblyDetail,
    assignItem,
    assignWarehouse,
    binDetail,
    breakDetail,
    cancelCount,
    cancelTransfer,
    countDetail,
    countLines,
    countMinutes,
    countMinutesDownload,
    createBreak,
    createReceipt,
    createScrap,
    createTransfer,
    createZone,
    dashboard,
    deactivateBin,
    dispatch,
    exportStock,
    finalApproval,
    finalRecount,
    gradeDetail,
    initialApproval,
    itemLocations,
    kardex,
    keeperReturn,
    layout,
    listAssemblies,
    listBins,
    listBreaks,
    listCounts,
    listGrades,
    listOpenings,
    listReceipts,
    listScrap,
    listStock,
    listTransfers,
    listZones,
    lookup,
    lookupList,
    managerReturn,
    openCounts,
    openingDetail,
    policies,
    policy,
    postOpening,
    postReceipt,
    receiptDetail,
    receiptImage,
    receiptImageDownload,
    receive,
    recordCount,
    recordCounts,
    recount,
    rejectGrade,
    rejectScrap,
    rejectTransfer,
    relocate,
    relocations,
    removeItem,
    reportExport,
    reportLines,
    reportSummary,
    requestGrade,
    reservations,
    scrapDetail,
    scrapImage,
    scrapImageDownload,
    setPolicy,
    startCount,
    submitCount1,
    submitCount2,
    transferDetail,
    transferImage,
    transferImageDownload,
    updateZone,
    varianceRecount,
} from '@/src/api/admin/wms'
import type {
    AssignIn,
    AssignWarehouseIn,
    Count2ScopeIn,
    CountLinesParams,
    CountOpenIn,
    CountRecordIn,
    DashboardParams,
    ExportStockParams,
    GradeDecisionIn,
    GradeRequestIn,
    ItemLocationsParams,
    ItemOpIn,
    KardexParams,
    LayoutIn,
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
    OpeningIn,
    PoliciesParams,
    PolicyIn,
    PolicyParams,
    ReasonIn,
    ReceiptCountIn,
    ReceiptCreateIn,
    RelocationIn,
    RelocationsParams,
    ReportExportParams,
    ReportLinesParams,
    ReportSummaryParams,
    ReservationsParams,
    ScrapApproveIn,
    ScrapCreateIn,
    TransferCreateIn,
    TransferReceiveIn,
    ZoneIn,
    ZoneUpdateIn,
} from '@/src/api/types/admin/wms'

export const wmsKeys = {
    all: ['wms'] as const,
    listStock: (params?: ListStockParams) => ['listStock', params ?? {}] as const,
    dashboard: (params?: DashboardParams) => ['dashboard', params ?? {}] as const,
    kardex: (params?: KardexParams) => ['kardex', params ?? {}] as const,
    reservations: (params?: ReservationsParams) => ['reservations', params ?? {}] as const,
    policy: (params?: PolicyParams) => ['policy', params ?? {}] as const,
    policies: (params?: PoliciesParams) => ['policies', params ?? {}] as const,
    lookupList: (params?: LookupListParams) => ['lookupList', params ?? {}] as const,
    lookup: (itemId: string) => ['lookup', itemId] as const,
    reportSummary: (params?: ReportSummaryParams) => ['reportSummary', params ?? {}] as const,
    reportLines: (params?: ReportLinesParams) => ['reportLines', params ?? {}] as const,
    listZones: (params?: ListZonesParams) => ['listZones', params ?? {}] as const,
    listBins: (params?: ListBinsParams) => ['listBins', params ?? {}] as const,
    binDetail: (binId: string) => ['binDetail', binId] as const,
    itemLocations: (params?: ItemLocationsParams) => ['itemLocations', params ?? {}] as const,
    relocations: (params?: RelocationsParams) => ['relocations', params ?? {}] as const,
    listOpenings: (params?: ListOpeningsParams) => ['listOpenings', params ?? {}] as const,
    openingDetail: (openingId: string) => ['openingDetail', openingId] as const,
    listReceipts: (params?: ListReceiptsParams) => ['listReceipts', params ?? {}] as const,
    receiptDetail: (receiptId: string) => ['receiptDetail', receiptId] as const,
    listTransfers: (params?: ListTransfersParams) => ['listTransfers', params ?? {}] as const,
    transferDetail: (transferId: string) => ['transferDetail', transferId] as const,
    listScrap: (params?: ListScrapParams) => ['listScrap', params ?? {}] as const,
    scrapDetail: (scrapId: string) => ['scrapDetail', scrapId] as const,
    listCounts: (params?: ListCountsParams) => ['listCounts', params ?? {}] as const,
    countDetail: (countId: string) => ['countDetail', countId] as const,
    countLines: (countId: string, params?: CountLinesParams) => ['countLines', countId, params ?? {}] as const,
    listBreaks: (params?: ListBreaksParams) => ['listBreaks', params ?? {}] as const,
    breakDetail: (breakId: string) => ['breakDetail', breakId] as const,
    listAssemblies: (params?: ListAssembliesParams) => ['listAssemblies', params ?? {}] as const,
    assemblyDetail: (assemblyId: string) => ['assemblyDetail', assemblyId] as const,
    listGrades: (params?: ListGradesParams) => ['listGrades', params ?? {}] as const,
    gradeDetail: (requestId: string) => ['gradeDetail', requestId] as const,
}

export const useListStock = (params?: ListStockParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listStock(params),
        enabled,
        queryFn: async () => {
            const result = await listStock(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useExportStock = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { params?: ExportStockParams }) => {
            const result = await exportStock(input.params)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useDashboard = (params?: DashboardParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.dashboard(params),
        enabled,
        queryFn: async () => {
            const result = await dashboard(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useKardex = (params: KardexParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.kardex(params),
        enabled: Boolean(params) && enabled,
        queryFn: async () => {
            const result = await kardex(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useReservations = (params?: ReservationsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.reservations(params),
        enabled,
        queryFn: async () => {
            const result = await reservations(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const usePolicy = (params: PolicyParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.policy(params),
        enabled: Boolean(params) && enabled,
        queryFn: async () => {
            const result = await policy(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useSetPolicy = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: PolicyIn) => {
            const result = await setPolicy(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const usePolicies = (params?: PoliciesParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.policies(params),
        enabled,
        queryFn: async () => {
            const result = await policies(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useLookupList = (params?: LookupListParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.lookupList(params),
        enabled,
        queryFn: async () => {
            const result = await lookupList(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useLookup = (itemId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.lookup(itemId),
        enabled: Boolean(itemId) && enabled,
        queryFn: async () => {
            const result = await lookup(itemId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useReportSummary = (params?: ReportSummaryParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.reportSummary(params),
        enabled,
        queryFn: async () => {
            const result = await reportSummary(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useReportLines = (params?: ReportLinesParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.reportLines(params),
        enabled,
        queryFn: async () => {
            const result = await reportLines(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useReportExport = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { params?: ReportExportParams }) => {
            const result = await reportExport(input.params)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListZones = (params?: ListZonesParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listZones(params),
        enabled,
        queryFn: async () => {
            const result = await listZones(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateZone = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: ZoneIn) => {
            const result = await createZone(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useUpdateZone = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { zoneId: string; body: ZoneUpdateIn }) => {
            const result = await updateZone(input.zoneId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useLayout = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { zoneId: string; body: LayoutIn }) => {
            const result = await layout(input.zoneId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListBins = (params?: ListBinsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listBins(params),
        enabled,
        queryFn: async () => {
            const result = await listBins(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useBinDetail = (binId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.binDetail(binId),
        enabled: Boolean(binId) && enabled,
        queryFn: async () => {
            const result = await binDetail(binId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useDeactivateBin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { binId: string }) => {
            const result = await deactivateBin(input.binId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useActivateBin = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { binId: string }) => {
            const result = await activateBin(input.binId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useItemLocations = (params?: ItemLocationsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.itemLocations(params),
        enabled,
        queryFn: async () => {
            const result = await itemLocations(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useAssignItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { binId: string; itemId: string; body: AssignIn }) => {
            const result = await assignItem(input.binId, input.itemId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRemoveItem = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { locationId: string }) => {
            const result = await removeItem(input.locationId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRelocations = (params?: RelocationsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.relocations(params),
        enabled,
        queryFn: async () => {
            const result = await relocations(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useRelocate = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: RelocationIn) => {
            const result = await relocate(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListOpenings = (params?: ListOpeningsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listOpenings(params),
        enabled,
        queryFn: async () => {
            const result = await listOpenings(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const usePostOpening = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: OpeningIn) => {
            const result = await postOpening(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useOpeningDetail = (openingId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.openingDetail(openingId),
        enabled: Boolean(openingId) && enabled,
        queryFn: async () => {
            const result = await openingDetail(openingId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useListReceipts = (params?: ListReceiptsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listReceipts(params),
        enabled,
        queryFn: async () => {
            const result = await listReceipts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateReceipt = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: ReceiptCreateIn) => {
            const result = await createReceipt(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useReceiptDetail = (receiptId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.receiptDetail(receiptId),
        enabled: Boolean(receiptId) && enabled,
        queryFn: async () => {
            const result = await receiptDetail(receiptId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useAssignWarehouse = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string; body: AssignWarehouseIn }) => {
            const result = await assignWarehouse(input.receiptId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRecordCount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string; body: ReceiptCountIn }) => {
            const result = await recordCount(input.receiptId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useKeeperReturn = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string; body: ReasonIn }) => {
            const result = await keeperReturn(input.receiptId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useManagerReturn = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string; body: ReasonIn }) => {
            const result = await managerReturn(input.receiptId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRecount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string; body: ReasonIn }) => {
            const result = await recount(input.receiptId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const usePostReceipt = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string }) => {
            const result = await postReceipt(input.receiptId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useReceiptImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string; body: FormData }) => {
            const result = await receiptImage(input.receiptId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useReceiptImageDownload = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { receiptId: string }) => {
            const result = await receiptImageDownload(input.receiptId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListTransfers = (params?: ListTransfersParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listTransfers(params),
        enabled,
        queryFn: async () => {
            const result = await listTransfers(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateTransfer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: TransferCreateIn) => {
            const result = await createTransfer(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useTransferDetail = (transferId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.transferDetail(transferId),
        enabled: Boolean(transferId) && enabled,
        queryFn: async () => {
            const result = await transferDetail(transferId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useApproveTransfer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string }) => {
            const result = await approveTransfer(input.transferId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useDispatch = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string }) => {
            const result = await dispatch(input.transferId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useReceive = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string; body: TransferReceiveIn }) => {
            const result = await receive(input.transferId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRejectTransfer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string; body: ReasonIn }) => {
            const result = await rejectTransfer(input.transferId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useCancelTransfer = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string }) => {
            const result = await cancelTransfer(input.transferId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useTransferImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string; body: FormData }) => {
            const result = await transferImage(input.transferId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useTransferImageDownload = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { transferId: string }) => {
            const result = await transferImageDownload(input.transferId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListScrap = (params?: ListScrapParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listScrap(params),
        enabled,
        queryFn: async () => {
            const result = await listScrap(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateScrap = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: ScrapCreateIn) => {
            const result = await createScrap(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useScrapDetail = (scrapId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.scrapDetail(scrapId),
        enabled: Boolean(scrapId) && enabled,
        queryFn: async () => {
            const result = await scrapDetail(scrapId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useApproveScrap = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { scrapId: string; body: ScrapApproveIn }) => {
            const result = await approveScrap(input.scrapId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRejectScrap = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { scrapId: string; body: ReasonIn }) => {
            const result = await rejectScrap(input.scrapId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useScrapImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { scrapId: string; lineId: string; body: FormData }) => {
            const result = await scrapImage(input.scrapId, input.lineId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useScrapImageDownload = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { scrapId: string; lineId: string }) => {
            const result = await scrapImageDownload(input.scrapId, input.lineId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListCounts = (params?: ListCountsParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listCounts(params),
        enabled,
        queryFn: async () => {
            const result = await listCounts(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useOpenCounts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: CountOpenIn) => {
            const result = await openCounts(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useCountDetail = (countId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.countDetail(countId),
        enabled: Boolean(countId) && enabled,
        queryFn: async () => {
            const result = await countDetail(countId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCountLines = (countId: string, params?: CountLinesParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.countLines(countId, params),
        enabled: Boolean(countId) && enabled,
        queryFn: async () => {
            const result = await countLines(countId, params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useStartCount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await startCount(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRecordCounts = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string; body: CountRecordIn }) => {
            const result = await recordCounts(input.countId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useSubmitCount1 = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await submitCount1(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useVarianceRecount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await varianceRecount(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useInitialApproval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string; body: Count2ScopeIn }) => {
            const result = await initialApproval(input.countId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useSubmitCount2 = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await submitCount2(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useFinalRecount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await finalRecount(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useFinalApproval = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await finalApproval(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useCancelCount = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await cancelCount(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useCountMinutes = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string; body: FormData }) => {
            const result = await countMinutes(input.countId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useCountMinutesDownload = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { countId: string }) => {
            const result = await countMinutesDownload(input.countId)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useListBreaks = (params?: ListBreaksParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listBreaks(params),
        enabled,
        queryFn: async () => {
            const result = await listBreaks(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useCreateBreak = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: ItemOpIn) => {
            const result = await createBreak(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useBreakDetail = (breakId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.breakDetail(breakId),
        enabled: Boolean(breakId) && enabled,
        queryFn: async () => {
            const result = await breakDetail(breakId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useListAssemblies = (params?: ListAssembliesParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listAssemblies(params),
        enabled,
        queryFn: async () => {
            const result = await listAssemblies(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useAssemble = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: ItemOpIn) => {
            const result = await assemble(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useAssemblyDetail = (assemblyId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.assemblyDetail(assemblyId),
        enabled: Boolean(assemblyId) && enabled,
        queryFn: async () => {
            const result = await assemblyDetail(assemblyId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useListGrades = (params?: ListGradesParams, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.listGrades(params),
        enabled,
        queryFn: async () => {
            const result = await listGrades(params)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useRequestGrade = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: GradeRequestIn) => {
            const result = await requestGrade(input)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useGradeDetail = (requestId: string, enabled = true) =>
    useQuery({
        queryKey: wmsKeys.gradeDetail(requestId),
        enabled: Boolean(requestId) && enabled,
        queryFn: async () => {
            const result = await gradeDetail(requestId)
            if (!result.success) throw result.error
            return result.data
        },
    })

export const useApproveGrade = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { requestId: string; body: GradeDecisionIn }) => {
            const result = await approveGrade(input.requestId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}

export const useRejectGrade = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (input: { requestId: string; body: GradeDecisionIn }) => {
            const result = await rejectGrade(input.requestId, input.body)
            if (!result.success) throw result.error
            return result.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: wmsKeys.all })
        },
    })
}


import * as z from 'zod'

export const filterFieldsSchema = z.object({
    first: z.string().optional(),
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
})

export const branchesReportFilterSchema = z.object({
    primary: filterFieldsSchema,
    compare: filterFieldsSchema,
})

export type FilterFieldsValues = z.infer<typeof filterFieldsSchema>
export type BranchesReportFilterValues = z.infer<
    typeof branchesReportFilterSchema
>

export const FILTER_FIELDS_DEFAULTS: FilterFieldsValues = {
    first: undefined,
    fromDate: undefined,
    toDate: undefined,
}

export const BRANCHES_REPORT_FILTER_DEFAULTS: BranchesReportFilterValues = {
    primary: { ...FILTER_FIELDS_DEFAULTS },
    compare: { ...FILTER_FIELDS_DEFAULTS },
}

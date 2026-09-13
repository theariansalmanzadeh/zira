import type { TableFilterItem } from '@shared/store/table-actions-store'

export type TableHeaderItem = TableFilterItem

export type TableSettingsModalData = {
    TableColoumn: TableHeaderItem[]
    onApply?: (TableColoumn: TableHeaderItem[]) => void
}

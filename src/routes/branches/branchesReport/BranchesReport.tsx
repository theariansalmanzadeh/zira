'use client'

import FilterForm from './components/FilterForm'
import ReportResults from './components/ReportResults'
import {
    BRANCH_DROPDOWN_OPTIONS,
    DATE_DROPDOWN_OPTIONS,
} from './constants'

const BranchesReport = () => {
    return (
        <div className='flex flex-col gap-4' dir='rtl'>
            <FilterForm
                firstDropdownOptions={BRANCH_DROPDOWN_OPTIONS}
                secondDropdownOptions={DATE_DROPDOWN_OPTIONS}
            />
            <ReportResults />
        </div>
    )
}

export default BranchesReport

import BranchManagment from '@/src/routes/branches/branchesDashboard/BranchesDashboard'
import BranchesList from '@/src/routes/branches/branchesList/BranchesList'
import BranchesReport from '@/src/routes/branches/branchesReport/BranchesReport'
import React from 'react'

const page = async ({ searchParams }: { searchParams: Promise<{ sub: string }> }) => {
    const { sub } = await searchParams

    if (sub === 'dashboard') {
        return <BranchManagment />
    }
    if (sub === 'list') {
        return <BranchesList />
    }
    if (sub === 'report') {
        return <BranchesReport />
    }
    return (
        <BranchManagment />
    )
}

export default page
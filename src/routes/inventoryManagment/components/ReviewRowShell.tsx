'use client'

import { TableRow } from '@/src/shared/components/ui/Table'
import type { ReactNode } from 'react'

const ReviewRowShell = ({ children }: { children: ReactNode }) => (
    <>
        <TableRow className='[&>*]:text-label-lg [&>*]:font-normal [&>*]:text-on-surface'>
            {children}
        </TableRow>
        <div className='py-1' />
    </>
)

export default ReviewRowShell

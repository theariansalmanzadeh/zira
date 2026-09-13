"use client"

import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '../../ui/ToggleGroup';
import IconButton from '../../ui/IconButton';
import clsx from 'clsx';

const TablePagination = ({
    page = 2,
    totalAmount = 100,
    className,
    quantityRows = ["10", "50", "100"],
}: {
    page?: number
    totalAmount?: number
    className?: string
    quantityRows?: string[]
}) => {
    const QUANTITY_ROWS = quantityRows
    const [quantityRow, setQuantityRow] = useState(QUANTITY_ROWS[0])
    const [currentPage, setCurrentPage] = useState(page);
    const nextPageHandler = () => {
        setCurrentPage(currentPage + 1);
    }
    const previousPageHandler = () => {
        setCurrentPage(currentPage - 1);
    }
    return (
        <div className={clsx('flex flex-row justify-between w-full items-center', className)}>
            <ToggleGroup
                dir='rtl'
                variant="filled"
                type="single"
                value={quantityRow}
                className="p-1.5 rounded-container-md! bg-surface-container-high  h-auto!"
                onValueChange={(value) => {
                    setQuantityRow(value);
                }}
            >
                {QUANTITY_ROWS.map((item) => (
                    <ToggleGroupItem
                        className='text-title-md h-full'
                        key={item}
                        value={item}
                        aria-label={`Toggle`}
                    >
                        {item}
                        ردیف
                    </ToggleGroupItem>))}
            </ToggleGroup>
            <div className='bg-surface-container-high py-2 px-3 flex flex-row items-center rounded-container-md'>
                <div className='flex flex-row text-on-surface-variant'>
                    {`${page * +quantityRow - (+quantityRow - 1)} - ${+quantityRow * (page)}`}
                    از
                    {totalAmount}
                </div>
                <div className='flex flex-row items-center'>
                    <IconButton variant="ghost" icon='chevronRight300Linear' onClick={nextPageHandler} iconClassName='size-6' />
                    <IconButton variant="ghost" icon='chevronLeft300Linear' onClick={previousPageHandler} iconClassName='size-6' />
                </div>
            </div>
        </div >
    )
}

export default TablePagination
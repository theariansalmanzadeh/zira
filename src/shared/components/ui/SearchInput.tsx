import React from 'react'
import { Input } from './Input'

type SearchInputProps = {
    searchQuery: string
    onSearch: (query: string) => void
    placeholder: string
}

const SearchInput = ({ searchQuery, onSearch, placeholder }: SearchInputProps) => {
    return (
        <Input
            dir="rtl"
            value={searchQuery}
            onChange={onSearch}
            iconId="search300Linear"
            placeholder={placeholder}
            wrapperClassName="rounded-full flex-row-reverse px-1 focus-within:ring-0"
            className="text-right"
        />
    )
}

export default SearchInput
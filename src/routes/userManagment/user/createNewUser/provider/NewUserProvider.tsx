'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react'

export type UploadedDocument = {
    id?: string
    file: string
    slot: string
    label: string
    name: string
    previewUrl: string
    isImage: boolean
}

type NewUserContextValue = {
    userId?: string
    slot: string
    setSlot: (value: string) => void
    file: File | null
    setFile: (value: File | null) => void
    documents: UploadedDocument[]
    setDocuments: Dispatch<SetStateAction<UploadedDocument[]>>
}

const NewUserContext = createContext<NewUserContextValue | null>(null)

export const useNewUser = () => {
    const context = useContext(NewUserContext)
    if (!context) {
        throw new Error('useNewUser must be used within NewUserProvider')
    }
    return context
}

type NewUserProviderProps = {
    children: ReactNode
    userId?: string
    initialDocuments?: UploadedDocument[]
}

export const NewUserProvider = ({
    children,
    userId,
    initialDocuments = [],
}: NewUserProviderProps) => {
    const [slot, setSlot] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [documents, setDocuments] =
        useState<UploadedDocument[]>(initialDocuments)

    const value = useMemo(
        () => ({
            userId,
            slot,
            setSlot,
            file,
            setFile,
            documents,
            setDocuments,
        }),
        [userId, slot, file, documents]
    )

    return (
        <NewUserContext.Provider value={value}>
            {children}
        </NewUserContext.Provider>
    )
}

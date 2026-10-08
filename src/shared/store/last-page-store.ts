import { create } from 'zustand'

type LastPageState = {
    lastPage: string
    setLastPage: (page: string) => void
}

export const useLastPageStore = create<LastPageState>((set) => ({
    lastPage: '/',
    setLastPage: (lastPage) => set({ lastPage }),
}))

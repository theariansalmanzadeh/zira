import { create } from 'zustand'

type StaffAuthState = {
    accessToken: string | null
    setAccessToken: (token: string) => void
    clearAuth: () => void
}

export const useStaffAuthStore = create<StaffAuthState>((set) => ({
    accessToken: null,
    setAccessToken: (accessToken) => set({ accessToken }),
    clearAuth: () => set({ accessToken: null }),
}))

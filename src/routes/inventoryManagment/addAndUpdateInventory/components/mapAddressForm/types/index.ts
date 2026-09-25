export type MapRack = {
    id: string
    floors: string
    boxesPerFloor: string
}

export type MapZone = {
    id: string
    prefix: string
    zoneName: string
    usage: string
    shelves: string
    racks: MapRack[]
}

export type MapAddressContextValue = {
    zones: MapZone[]
    addressStep: number
    setAddressStep: (step: number) => void
    addZone: () => void
    updateZone: (id: string, patch: Partial<Omit<MapZone, 'id' | 'racks'>>) => void
    updateRack: (
        zoneId: string,
        rackId: string,
        patch: Partial<Omit<MapRack, 'id'>>
    ) => void
    removeZone: (id: string) => void
}

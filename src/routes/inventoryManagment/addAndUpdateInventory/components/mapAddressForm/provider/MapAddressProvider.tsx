'use client'

import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react'
import type {
    MapAddressContextValue,
    MapRack,
    MapZone,
} from '../types'

export const parseCount = (value: string) => {
    const digits = value.match(/[0-9۰-۹]+/)?.[0] ?? '0'
    const latin = digits.replace(/[۰-۹]/g, (digit) =>
        String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
    )
    return Number(latin) || 0
}

const createRack = (): MapRack => ({
    id: `rack-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    floors: '',
    boxesPerFloor: '',
})

const racksForShelfCount = (count: number, current: MapRack[] = []) => {
    if (current.length === count) return current
    if (current.length > count) return current.slice(0, count)
    return [
        ...current,
        ...Array.from({ length: count - current.length }, () => createRack()),
    ]
}

const withRacks = (
    zone: Omit<MapZone, 'racks'> & { racks?: MapRack[] }
): MapZone => ({
    ...zone,
    racks: racksForShelfCount(parseCount(zone.shelves), zone.racks),
})

export const NEW_ZONE_DEFAULTS = {
    prefix: 'A',
    zoneName: 'ناحیه جدید',
    usage: 'ذخیره‌سازی',
    shelves: '۱ قفسه',
} as const

const INITIAL_ZONES: MapZone[] = [
    withRacks({
        id: 'zone-b',
        prefix: 'B',
        zoneName: 'ناحیه',
        usage: 'ذخیره‌سازی',
        shelves: '۳ قفسه',
    }),
    withRacks({
        id: 'zone-c',
        prefix: 'C',
        zoneName: 'ناحیه',
        usage: 'قرنطینه',
        shelves: '۲ قفسه',
    }),
    withRacks({
        id: 'zone-d',
        prefix: 'D',
        zoneName: 'ناحیه',
        usage: 'ذخیره‌سازی',
        shelves: '۱ قفسه',
    }),
]

const MapAddressContext = createContext<MapAddressContextValue | null>(null)

export const MapAddressProvider = ({ children }: { children: ReactNode }) => {
    const [zones, setZones] = useState<MapZone[]>(INITIAL_ZONES)
    const [addressStep, setAddressStep] = useState(1)

    const value = useMemo<MapAddressContextValue>(
        () => ({
            zones,
            addressStep,
            setAddressStep,
            addZone: () => {
                setZones((prev) => [
                    ...prev,
                    withRacks({
                        id: `zone-${Date.now()}`,
                        ...NEW_ZONE_DEFAULTS,
                    }),
                ])
            },
            updateZone: (id, patch) => {
                setZones((prev) =>
                    prev.map((zone) => {
                        if (zone.id !== id) return zone
                        const next = { ...zone, ...patch }
                        if (patch.shelves !== undefined) {
                            next.racks = racksForShelfCount(
                                parseCount(patch.shelves),
                                zone.racks
                            )
                        }
                        return next
                    })
                )
            },
            updateRack: (zoneId, rackId, patch) => {
                setZones((prev) =>
                    prev.map((zone) =>
                        zone.id === zoneId
                            ? {
                                  ...zone,
                                  racks: zone.racks.map((rack) =>
                                      rack.id === rackId ? { ...rack, ...patch } : rack
                                  ),
                              }
                            : zone
                    )
                )
            },
            removeZone: (id) => {
                setZones((prev) => prev.filter((zone) => zone.id !== id))
            },
        }),
        [addressStep, zones]
    )

    return (
        <MapAddressContext.Provider value={value}>
            {children}
        </MapAddressContext.Provider>
    )
}

export const useMapAddress = () => {
    const context = useContext(MapAddressContext)
    if (!context) {
        throw new Error('useMapAddress must be used within MapAddressProvider')
    }
    return context
}

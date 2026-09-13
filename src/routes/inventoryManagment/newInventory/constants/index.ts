export const NEW_INVENTORY_STEPS = {
    define: 'define',
    details: 'details',
} as const

export type NewInventoryStep =
    (typeof NEW_INVENTORY_STEPS)[keyof typeof NEW_INVENTORY_STEPS]

import type {
    AttributeOut,
    ListAttributesParams,
} from '@/src/api/types/admin/catalog'
import type { DropdownOption } from '../types'

export const PRODUCT_ATTRIBUTE_LIST_PARAMS: ListAttributesParams = {
    page: 1,
    page_size: 100,
    is_active: true,
}

export type AttributeField = 'size' | 'color' | 'pack' | 'unit'

export const isSelectableAttribute = (attribute: AttributeOut) => {
    if ((attribute.values?.length ?? 0) > 0) return true

    return (
        attribute.kind === 'SELECT' ||
        attribute.kind === 'MULTI' ||
        attribute.kind === 'SWATCH' ||
        attribute.input_control === 'DROPDOWN' ||
        attribute.input_control === 'CHIP_SINGLE' ||
        attribute.input_control === 'CHIP_MULTI' ||
        attribute.input_control === 'SWATCH'
    )
}

export const isMultiAttribute = (attribute: AttributeOut) =>
    attribute.kind === 'MULTI' ||
    attribute.kind === 'SWATCH' ||
    attribute.input_control === 'CHIP_MULTI' ||
    attribute.input_control === 'SWATCH'

export const attributeField = (attribute: AttributeOut): AttributeField | null => {
    const text = `${attribute.code} ${attribute.name}`.toLowerCase()

    if (
        text.includes('color') ||
        text.includes('رنگ') ||
        attribute.kind === 'SWATCH'
    ) {
        return 'color'
    }

    if (text.includes('size') || text.includes('سایز')) return 'size'
    if (text.includes('pack') || text.includes('پک')) return 'pack'
    if (text.includes('unit') || text.includes('واحد')) return 'unit'

    return null
}

export const toAttributeOptions = (attribute: AttributeOut): DropdownOption[] =>
    [...(attribute.values ?? [])]
        .sort((left, right) => left.sort_order - right.sort_order)
        .map((value) => ({ label: value.value, value: value.id }))

export type AttributeValueLookup = {
    label: string
    hex: string
}

export const attributeValueMap = (attributes: AttributeOut[]) => {
    const map = new Map<string, AttributeValueLookup>()

    for (const attribute of attributes) {
        for (const value of attribute.values ?? []) {
            map.set(value.id, {
                label: value.value,
                hex: value.hex_code || '#BFBFBF',
            })
        }
    }

    return map
}

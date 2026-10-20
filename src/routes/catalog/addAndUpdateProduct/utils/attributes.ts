import type {
    AttributeOut,
    ListAttributesParams,
} from '@/src/api/types/admin/catalog'
import type { DropdownOption } from '../types'

export const PRODUCT_ATTRIBUTE_LIST_PARAMS: ListAttributesParams = {
    page: 1,
    page_size: 100,
    is_active: true,
    /** فقط ویژگی‌های مشترک روی خانواده کالا مجازند */
    role: 'COMMON',
}

export const SIZE_BASIS_ID = 'size'
export const COLOR_BASIS_ID = 'color'

export const isColorAttribute = (attribute: AttributeOut) =>
    attribute.kind === 'SWATCH' &&
    (attribute.values ?? []).some((value) => Boolean(value.hex_code))

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
    attribute.kind === 'MULTI' || isColorAttribute(attribute)

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
                hex: value.hex_code || '',
            })
        }
    }

    return map
}

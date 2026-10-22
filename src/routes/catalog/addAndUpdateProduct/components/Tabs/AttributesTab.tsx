'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/components/ui/button'
import CheckboxDropdown from '@/src/shared/components/ui/CheckboxDropdown'
import FormDropdown from '@/src/shared/components/ui/FormDropdown'
import { Spinner } from '@/src/shared/components/ui/spinner'
import {
    useListAttributes,
    useListColors,
    useListSizes,
} from '@/src/routes/catalog/hooks/catalog'
import { useListUnits } from '@/src/routes/settings/hooks/settings'
import type { AttributeOut } from '@/src/api/types/admin/catalog'
import { useCreateProducts } from '../../provider/createProductsProvider'
import {
    isColorAttribute,
    isMultiAttribute,
    isSelectableAttribute,
    toAttributeOptions,
} from '../../utils/attributes'

const PRESET_ATTRIBUTE_CODES = ['material', 'pack', 'color'] as const

const AttributesTab = () => {
    const { push } = useRouter()
    const { data, isPending: isAttributesPending } = useListAttributes()
    const {
        attributeSelections,
        setAttributeSelection,
        sizes,
        setSizes,
        colors,
        setColors,
        setPacks,
        salesUnit,
        setSalesUnit,
    } = useCreateProducts()
    const { data: sizesPage, isPending: isSizesPending } = useListSizes({
        page: 1,
        page_size: 100,
    })
    const { data: colorsPage, isPending: isColorsPending } = useListColors({
        page: 1,
        page_size: 100,
    })
    const { data: unitsPage, isPending: isUnitsPending } = useListUnits({
        page: 1,
        page_size: 100,
        is_active: true,
    })
    const isLoadingAttributes =
        isAttributesPending ||
        isSizesPending ||
        isColorsPending ||
        isUnitsPending
    const sizeOptions = (sizesPage?.results ?? []).map((size) => ({
        label: size.name,
        value: size.id,
    }))
    const colorOptions = (colorsPage?.results ?? []).map((color) => ({
        label: color.name,
        value: color.id,
        hex: color.hex_code,
    }))
    const unitOptions = (unitsPage?.results ?? []).map((unit) => ({
        label: unit.name,
        value: unit.id,
    }))

    const attributes = useMemo(
        () =>
            [...(data?.results ?? [])]
                .filter(isSelectableAttribute)
                .filter(
                    (attribute) =>
                        attribute.role === 'COMMON' ||
                        attribute.role === 'VARIANT'
                )
                .sort((left, right) => left.sort_order - right.sort_order),
        [data]
    )

    useEffect(() => {
        for (const attribute of attributes) {
            if (
                !PRESET_ATTRIBUTE_CODES.includes(
                    attribute.code as (typeof PRESET_ATTRIBUTE_CODES)[number]
                ) ||
                attributeSelections[attribute.id]
            ) {
                continue
            }

            const values = (attribute.values ?? []).map((item) => item.id)
            setAttributeSelection(attribute.id, {
                name: attribute.name,
                code: attribute.code,
                values,
            })
            if (attribute.code === 'pack') setPacks(values)
        }
    }, [
        attributes,
        attributeSelections,
        setAttributeSelection,
        setPacks,
    ])

    const applySelection = (attribute: AttributeOut, values: string[]) => {
        setAttributeSelection(attribute.id, {
            name: attribute.name,
            code: attribute.code,
            values,
        })
        if (attribute.code === 'color' || isColorAttribute(attribute)) {
            setColors(values)
        }
        if (attribute.code === 'pack') setPacks(values)
    }

    if (isLoadingAttributes) {
        return (
            <div className='flex justify-center py-16' dir='rtl'>
                <Spinner className='size-6' />
            </div>
        )
    }

    return (
        <div className='flex flex-col gap-6' dir='rtl'>
            <div className='grid grid-cols-2 gap-6'>
                <CheckboxDropdown
                    label='سایز'
                    options={sizeOptions}
                    values={sizes}
                    onChange={setSizes}
                />
                <CheckboxDropdown
                    label='رنگ'
                    options={colorOptions}
                    values={colors}
                    onChange={setColors}
                />
                <FormDropdown
                    label='واحد'
                    placeholder='انتخاب واحد'
                    options={unitOptions}
                    value={salesUnit || undefined}
                    onChange={setSalesUnit}
                />
                {attributes
                    .filter(
                        (attribute) =>
                            attribute.code !== 'size' &&
                            attribute.code !== 'color' &&
                            attribute.code !== 'unit' &&
                            !isColorAttribute(attribute)
                    )
                    .map((attribute) => {
                        const options = toAttributeOptions(attribute)
                        const selected = attributeSelections[attribute.id]?.values ?? []

                        if (isMultiAttribute(attribute)) {
                            return (
                                <CheckboxDropdown
                                    key={attribute.id}
                                    label={attribute.name}
                                    options={options}
                                    values={selected}
                                    onChange={(values) =>
                                        applySelection(attribute, values)
                                    }
                                />
                            )
                        }

                        return (
                            <FormDropdown
                                key={attribute.id}
                                label={attribute.name}
                                placeholder='انتخاب'
                                value={selected[0]}
                                options={options}
                                onChange={(value) =>
                                    applySelection(attribute, value ? [value] : [])
                                }
                            />
                        )
                    })}
            </div>
            <Button
                type='button'
                variant='outline'
                className='w-fit border-primary text-primary'
                onClick={() => push('/admin/catalog/variable/new')}
            >
                افزودن ویژگی
            </Button>
        </div>
    )
}

export default AttributesTab
